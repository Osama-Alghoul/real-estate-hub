import { ArrowLeft, ArrowRight } from "lucide-react";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
};

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center space-x-2">
      <button 
        className="p-2 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 transition"
        disabled={currentPage === 1}
      >
        <ArrowLeft size={20} />
      </button>

      <div className="flex space-x-2">
        {pages.map((page) => (
          <button
            key={page}
            className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
              page === currentPage
                ? "bg-primary-light text-white" 
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
        <span className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
        <button
          className="w-10 h-10 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition"
        >
          {totalPages + 1}
        </button>
      </div>

      <button 
        className="w-10 h-10 flex items-center justify-center p-2 border border-gray-200 text-gray-500 rounded-lg bg-primary-light hover:bg-primary-dark transition"
        disabled={currentPage === totalPages}
      >
        <ArrowRight size={20} className="text-white" />
      </button>
    </div>
  );
}