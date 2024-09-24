import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCharactersQuery } from "../graphql/useCharactersQuery.ts";

export default function Home() {
  const [transparentIds, setTransparentIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const inputRef = useRef<HTMLInputElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get("filter") || "";

  const { executeSearch, loading, characters, info } = useCharactersQuery({
    page: currentPage,
    filter: { name: filterParam },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (filterParam.trim()) {
        executeSearch();
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [filterParam, executeSearch]);

  const setFilterQueryParam = (value: string) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("filter", value);
    setSearchParams(updatedParams);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQueryParam(e.target.value);
  };

  const handleResultClick = (id: string) => {
    setTransparentIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleReset = () => {
    setTransparentIds(new Set());
    setSearchParams(undefined);
    setCurrentPage(1);
    executeSearch();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    executeSearch();
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-3 xl:w-96 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Character Search
          </h1>
          <p className="text-xl text-gray-600">
            Find your favorite Rick and Morty characters
          </p>
        </div>
        <div className="relative mb-4 mx-auto flex w-full sm:w-1/2 flex-wrap items-stretch">
          <input
            ref={inputRef}
            value={filterParam}
            onChange={handleInputChange}
            placeholder="Start typing to search..."
            className="relative m-0 block flex-auto rounded-l border border-solid border-gray-300 bg-gray-100 bg-clip-padding px-3 py-2 text-base font-normal leading-6 text-gray-900 outline-none transition duration-200 ease-in-out focus:z-10 focus:border-blue-400 focus:text-gray-900 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
            aria-label="Search"
            aria-describedby="button-addon2"
          />
          <span
            className="input-group-text flex items-center whitespace-nowrap rounded-r px-3 py-2 text-center text-base font-normal text-gray-600 bg-gray-200"
            id="basic-addon2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <title>Search</title>
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={handleReset}
            className="mt-2 mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Reset
          </button>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((character) => (
          <button
            type="button"
            key={character.id}
            onClick={() => handleResultClick(character.id)}
            className={`block bg-gray-100 hover:bg-gray-200 transition duration-150 ease-in-out rounded-md cursor-pointer ${
              transparentIds.has(character.id) ? "opacity-50" : ""
            }`}
          >
            <div className="p-4 flex flex-col items-center gap-4">
              <div className="flex-shrink-0 h-24 w-24">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={character.image}
                  alt={character.name}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-lg font-semibold text-gray-900">
                  {character.name}
                </div>
                <div className="text-sm text-gray-600">{character.species}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
      {characters.length === 0 && !loading && filterParam && (
        <div className="text-center py-8 text-gray-600">
          No results found for "{filterParam}"
        </div>
      )}
      {characters.length > 0 && (
        <div className="flex justify-center items-center py-8 space-x-4">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 ease-in-out disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-lg text-gray-700">
            Page {currentPage} of {info ? Math.ceil(info.count / 20) : 1}
          </span>
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={info && currentPage >= Math.ceil(info.count / 20)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 ease-in-out disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
