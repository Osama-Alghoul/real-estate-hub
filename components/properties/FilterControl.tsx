'use client';

import { List, LayoutGrid, ArrowDown } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const sortOptions = [
  { label: "Default Order", value: "default" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest First", value: "newest" },
];

const filterTabs = [
  { label: "All Properties", value: "all" },
  { label: "For Buy", value: "buy" },
  { label: "For Sale", value: "sale" },
  { label: "For Rent", value: "rent" },
];

type Props = {
  currentView: "grid" | "list";
  onViewChange?: (view: "grid" | "list") => void;
  onFilterChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
};

export default function FilterControl({
  currentView,
  onViewChange,
  onFilterChange,
  onSortChange,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSort, setCurrentSort] = useState("default");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const handleViewChange = (view: "grid" | "list") => {
    onViewChange?.(view);

    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (option: { label: string; value: string }) => {
    setCurrentSort(option.value);
    onSortChange?.(option.value);
    setIsSortDropdownOpen(false);
  };

  const handleFilterChange = (tab: { label: string; value: string }) => {
    setCurrentFilter(tab.value);
    onFilterChange?.(tab.value);
  };

  const currentSortLabel =
    sortOptions.find(opt => opt.value === currentSort)?.label ||
    sortOptions[0].label;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-b border-gray-200 mb-6">

      {/* View + Sort */}
      <div className="flex items-center space-x-4 mb-4 md:mb-0">

        {/* View Switch */}
        <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => handleViewChange("list")}
            className={`p-2 transition-colors ${
              currentView === "list"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <List className="w-5 h-5" />
          </button>

          <button
            onClick={() => handleViewChange("grid")}
            className={`p-2 transition-colors ${
              currentView === "grid"
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            className="flex items-center text-sm text-gray-700 bg-white p-2 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50"
          >
            <span className="mr-2">Sort by:</span>
            <span className="font-medium mr-1">{currentSortLabel}</span>
            <ArrowDown
              className={`w-4 h-4 transition-transform ${
                isSortDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSortDropdownOpen && (
            <div className="absolute z-20 mt-2 w-48 bg-white rounded-lg shadow-lg border">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    option.value === currentSort
                      ? "bg-indigo-50 text-indigo-600 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 p-1 bg-white rounded-full shadow-sm border">
        {filterTabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => handleFilterChange(tab)}
            className={`px-4 py-2 text-sm rounded-full transition ${
              tab.value === currentFilter
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
