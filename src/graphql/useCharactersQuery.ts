import { gql, useLazyQuery } from "@apollo/client";

export type Origin = {
  name: string;
};

export type Location = {
  name: string;
};

export type Character = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
};

export type Info = {
  count: number;
};

export type CharactersQueryData = {
  characters: {
    info: Info;
    results: Character[];
  };
};

type CharactersQueryVariables = {
  page?: number;
  filter?: Partial<FilterCharacter>;
};

export type FilterCharacter = {
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
