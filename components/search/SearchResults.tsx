"use client";

import { Property } from "@/types/property";
import GridView from "@/components/properties/GridView";
import ListView from "@/components/properties/ListView";
import Pagination from "@/components/properties/Pagination";
import { List, LayoutGrid } from "lucide-react";

interface SearchResultsProps {
  properties: Property[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export default function SearchResults({
  properties,
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
  view,
  onViewChange,
}: SearchResultsProps) {
  const startIndex = (currentPage - 1) * 6 + 1;
  const endIndex = Math.min(currentPage * 6, totalCount);

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex justify-between items-center bg-white rounded-lg shadow-sm p-4">
        <div className="text-gray-700">
          <span className="font-semibold text-lg">{totalCount}</span>
          <span className="text-gray-600 ml-2">
            {totalCount === 1 ? "Property Found" : "Properties Found"}
          </span>
          {totalCount > 0 && (
            <span className="text-gray-500 text-sm ml-2">
              (Showing {startIndex}-{endIndex})
            </span>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => onViewChange("list")}
            className={`p-2 transition-colors ${
              view === "list"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            aria-label="List view"
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => onViewChange("grid")}
            className={`p-2 transition-colors ${
              view === "grid"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Results */}
      {properties.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Properties Found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We couldn't find any properties matching your search criteria. Try
            adjusting your filters or broadening your search.
          </p>
        </div>
      ) : (
        <>
          {view === "grid" ? (
            <GridView data={properties} />
          ) : (
            <ListView data={properties} />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
