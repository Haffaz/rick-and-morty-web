import {gql, useLazyQuery} from '@apollo/client';

export type Origin = {
    name: string;
}

export type Location = {
    name: string;
}

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
}

export type Info = {
    count: number;
}

export type CharactersData = {
    characters: {
        info: Info;
        results: Character[];
    };
}

export type FilterCharacter = {
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
}

export type UseCharactersQueryParams = {
    page: number;
    filter: Partial<FilterCharacter>
}

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
`

export const useCharactersQuery = ({page, filter}: UseCharactersQueryParams) => {
    const [executeSearch, {
        loading,
        data
    }] = useLazyQuery<CharactersData, UseCharactersQueryParams>(GET_CHARACTERS_QUERY, {
        variables: {page, filter}
    });
    return {executeSearch, loading, data};
}
