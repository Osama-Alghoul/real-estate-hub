import { ArrowLeft, ArrowRight } from "lucide-react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handlePrev}
        className="p-2 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition"
        disabled={currentPage === 1}
      >
        <ArrowLeft size={20} />
      </button>

      <div className="flex space-x-2">
        {pages.slice(0, 5).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
              page === currentPage
                ? "bg-primary-light text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
        {totalPages > 6 && (
          <span className="w-10 h-10 flex items-center justify-center text-gray-500">
            ...
          </span>
        )}
        {totalPages > 6 && (
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
              currentPage === totalPages
                ? "bg-primary-light text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {totalPages}
          </button>
        )}
      </div>

      <button
        className="w-10 h-10 flex items-center justify-center p-2 border border-gray-200 text-gray-500 rounded-lg bg-primary-light hover:bg-primary-dark transition"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        <ArrowRight size={20} className="text-white" />
      </button>
    </div>
  );
}
