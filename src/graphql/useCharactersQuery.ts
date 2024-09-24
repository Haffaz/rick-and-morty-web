import { gql, useLazyQuery } from "@apollo/client";
import type { Character } from "./types.ts";

type Info = {
  count: number;
};

type CharactersQueryData = {
  characters: {
    info: Info;
    results: Character[];
  };
};

type CharactersQueryVariables = {
  page?: number;
  filter?: Partial<FilterCharacter>;
};

type FilterCharacter = {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
};

export type UseCharactersQueryParams = CharactersQueryVariables;

export const GET_CHARACTERS_QUERY = gql`
  query getCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
      }
    }
  }
`;

export const useCharactersQuery = (params?: UseCharactersQueryParams) => {
  const { page = 1, filter } = params || {};

  const [executeSearch, { loading, data }] = useLazyQuery<
    CharactersQueryData,
    CharactersQueryVariables
  >(GET_CHARACTERS_QUERY, {
    variables: { page, filter },
  });

  const characters = data?.characters.results || [];
  const info = data?.characters.info;

  return { executeSearch, loading, characters, info };
};
