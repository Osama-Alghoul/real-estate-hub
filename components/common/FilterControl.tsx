'use client';

import { List, LayoutGrid, ArrowDown } from "lucide-react";
import { useRouter, } from "next/navigation";
import React, { useState, } from "react";

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

export default function FilterControl({ 
  currentView, 
  onViewChange,
  onFilterChange,
  onSortChange, 
}) {
  const router = useRouter();

  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSort, setCurrentSort] = useState("default");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);


  const handleSortChange = (option) => {
    setCurrentSort(option.value);
    onSortChange?.(option.value);
    setIsSortDropdownOpen(false);
  };

  const handleFilterChange = (tab) => {
    setCurrentFilter(tab.value);
    onFilterChange?.(tab.value);
  };

  const handleViewChange = (view) => {
    onViewChange?.(view)
    router.push(`/properties?view=${view}`);
  };

  const currentSortLabel = sortOptions.find(opt => opt.value === currentSort)?.label || sortOptions[0].label;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-b border-gray-200 mb-6">

      <div className="flex items-center space-x-4 mb-4 md:mb-0">

        <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => handleViewChange('list')}
            className={`p-2 transition-colors ${currentView === 'list'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
            aria-label="List View"
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleViewChange('grid')}
            className={`p-2 transition-colors ${currentView === 'grid'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
            aria-label="Grid View"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            className="flex items-center text-sm text-gray-700 bg-white p-2 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition-all"
          >
            <span className="mr-2">Sort by:</span>
            <span className="font-medium mr-1">{currentSortLabel}</span>
            <ArrowDown className={`w-4 h-4 transition-transform ${isSortDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
          </button>

          {isSortDropdownOpen && (
            <div className="absolute z-20 top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option)}
                  className={`block w-full text-left px-4 py-2 text-sm transition-colors ${option.value === currentSort
                      ? "bg-indigo-50 text-indigo-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 p-1 bg-white rounded-full shadow-sm border border-gray-200">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleFilterChange(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${tab.value === currentFilter
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-50"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
