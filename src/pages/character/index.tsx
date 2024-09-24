import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useCharacterQuery } from "../../graphql/useCharacterQuery.ts";

export default function CharacterPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { loading, error, character } = useCharacterQuery({
    id,
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  if (error || !character)
    return (
      <div className="text-center text-red-600 mt-8">
        Error: {error?.message}
      </div>
    );

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline flex items-center bg-gray-100 p-2 rounded-full"
        >
          <FaArrowLeft />
        </button>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-100 rounded-md overflow-hidden p-4">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                src={character.image}
                alt={character.name}
                className="h-128 w-full object-cover md:w-128 rounded-lg"
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-8 ">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {character.name}
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <InfoItem label="Status" value={character.status} />
                <InfoItem label="Species" value={character.species} />
                <InfoItem label="Gender" value={character.gender} />
                <InfoItem label="Origin" value={character.origin.name} />
                <InfoItem label="Location" value={character.location.name} />
              </div>
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
      <dt className="text-sm font-medium text-gray-600">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}
