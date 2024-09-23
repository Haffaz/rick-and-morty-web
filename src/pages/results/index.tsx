import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

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

export default function ResultPage() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { id },
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-600 mt-8">
        Error: {error.message}
      </div>
    );

  const character = data?.character;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              src={character?.image}
              alt={character?.name}
              className="h-48 w-full object-cover md:w-48"
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {character?.name}
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Status" value={character?.status} />
              <InfoItem label="Species" value={character?.species} />
              <InfoItem label="Gender" value={character?.gender} />
              <InfoItem label="Origin" value={character?.origin?.name} />
              <InfoItem label="Location" value={character?.location?.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}
