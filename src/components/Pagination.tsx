import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

type Props = {
  currentPage: number;
  handlePageChange: (page: number) => void;
  resultsCount?: number;
};

export default function Pagination({
  currentPage,
  resultsCount,
  handlePageChange,
}: Props) {
  return (
    <div className="flex justify-center items-center py-8 space-x-4">
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        className={`px-4 py-2 cursor-pointer text-blue-600 rounded-lg hover:text-blue-700 transition duration-200 ease-in-out bg-transparent ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <TbChevronLeft className="inline-block h-5 w-5" />
        Previous
      </button>
      <span className="text-lg text-gray-700">
        Page {currentPage} of {resultsCount ? Math.ceil(resultsCount / 20) : 1}
      </span>
      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        className={`px-4 py-2 cursor-pointer text-blue-600 rounded-lg hover:text-blue-700 transition duration-200 ease-in-out bg-transparent ${
          resultsCount && currentPage >= Math.ceil(resultsCount / 20)
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        Next
        <TbChevronRight className="inline-block h-5 w-5" />
      </button>
    </div>
  );
}
