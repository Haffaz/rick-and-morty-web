import type React from "react";
import { useEffect, useState } from "react";
import { TbRefreshDot } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination.tsx";
import Search from "../components/Search.tsx";
import { useCharactersQuery } from "../graphql/useCharactersQuery.ts";

export default function Home() {
  const [transparentIds, setTransparentIds] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get("filter") || "";

  const { executeSearch, loading, characters, info } = useCharactersQuery({
    page: currentPage,
    filter: { name: filterParam },
  });

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
      <div className="mb-3 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Character Search
          </h1>
          <p className="text-xl text-gray-600">
            Find your favorite Rick and Morty characters
          </p>
        </div>
        <div className="mb-4 max-w-md mx-auto">
          <Search value={filterParam} handleOnChange={handleInputChange} />
        </div>
        <div className="flex justify-center mt-2 mb-8">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-2 py-2 cursor-pointer border-gray-600 border-2 text-gray-700 rounded-lg hover:border-gray-500 hover:text-gray-500"
          >
            <TbRefreshDot className="h-5 w-5 inline-block" />
            Reset
          </button>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center py-16">
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
        <Pagination
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          resultsCount={info?.count}
        />
      )}
    </div>
  );
}
