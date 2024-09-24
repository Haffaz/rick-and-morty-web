import { gql, useQuery } from "@apollo/client";
import type { Character } from "./types.ts";

const GET_CHARACTER = gql`
    query GetCharacter($id: ID!) {
        character(id: $id) {
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
`;

type CharacterQueryData = {
  character: Character;
};

type CharacterQueryVariables = {
  id?: string;
};

export const useCharacterQuery = ({ id }: CharacterQueryVariables) => {
  const { loading, error, data } = useQuery<
    CharacterQueryData,
    CharacterQueryVariables
  >(GET_CHARACTER, {
    variables: { id },
  });

  const character = data?.character;

  return { loading, error, character };
};
