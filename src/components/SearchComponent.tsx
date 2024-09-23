import type React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCharactersQuery } from "../graphql/useCharactersQuery";

export default function SearchComponent() {
  const [filter, setFilter] = useState("");
  const { executeSearch, loading, data } = useCharactersQuery({
    page: 1,
    filter: { name: filter },
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (filter.trim() !== "") {
        executeSearch();
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [filter, executeSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Character Search
          </h1>
          <p className="text-xl text-gray-600">
            Find your favorite Rick and Morty characters
          </p>
        </div>
        <div className="mb-8">
          <input
            type="text"
            value={filter}
            onChange={handleInputChange}
            placeholder="Start typing to search..."
            className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        )}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {data?.characters.results.map((result) => (
            <Link
              to={`/result/${result.id}`}
              key={result.id}
              className="block hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <div className="px-6 py-4 flex items-center">
                <div className="flex-shrink-0 h-12 w-12">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={result.image}
                    alt={result.name}
                  />
                </div>
                <div className="ml-4">
                  <div className="text-lg font-medium text-gray-900">
                    {result.name}
                  </div>
                  <div className="text-sm text-gray-500">{result.species}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {data?.characters.results.length === 0 && filter && (
          <div className="text-center py-8 text-gray-600">
            No results found for "{filter}"
          </div>
        )}
      </div>
    </div>
  );
}
