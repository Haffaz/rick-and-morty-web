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
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-3 xl:w-96 mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-100 mb-4">
              Character Search
            </h1>
            <p className="text-xl text-gray-400">
              Find your favorite Rick and Morty characters
            </p>
          </div>
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              value={filter}
              onChange={handleInputChange}
              placeholder="Start typing to search..."
              className="relative m-0 block flex-auto rounded border border-solid border-gray-700 bg-gray-800 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-gray-200 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-blue-500 focus:text-gray-200 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <span
              className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-gray-200"
              id="basic-addon2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data?.characters.results.map((result) => (
            <Link
              to={`/result/${result.id}`}
              key={result.id}
              className="block hover:bg-gray-800 transition duration-150 ease-in-out"
            >
              <div className="px-6 py-4 flex items-center h-32 w-full">
                <div className="flex-shrink-0 h-16 w-16">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={result.image}
                    alt={result.name}
                  />
                </div>
                <div className="ml-4">
                  <div className="text-lg font-medium text-gray-100">
                    {result.name}
                  </div>
                  <div className="text-sm text-gray-400">{result.species}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {data?.characters.results.length === 0 && filter && (
        <div className="text-center py-8 text-gray-400">
          No results found for "{filter}"
        </div>
      )}
    </div>
  );
}
