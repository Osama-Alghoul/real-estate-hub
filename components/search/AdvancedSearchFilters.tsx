"use client";

import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export interface SearchFilters {
  query: string;
  minPrice: string;
  maxPrice: string;
  type: "all" | "sale" | "rent";
  status: "all" | "available" | "pending" | "sold";
  bedrooms: string;
  bathrooms: string;
  minSize: string;
  maxSize: string;
  minYear: string;
  maxYear: string;
  amenities: string[];
}

interface AdvancedSearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
}

const AMENITIES_OPTIONS = [
  "Swimming Pool",
  "Central Heating",
  "Smart Home",
  "Solar Panels",
  "Private Garden",
  "Security System",
  "Gym Room",
  "Fireplace",
  "Parking",
  "Elevator",
  "Balcony",
];

export default function AdvancedSearchFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: AdvancedSearchFiltersProps) {
  const [showAmenities, setShowAmenities] = useState(false);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    updateFilter("amenities", newAmenities);
  };

  const hasActiveFilters =
    filters.query ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.type !== "all" ||
    filters.status !== "all" ||
    filters.bedrooms ||
    filters.bathrooms ||
    filters.minSize ||
    filters.maxSize ||
    filters.minYear ||
    filters.maxYear ||
    filters.amenities.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Filter Properties</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search By Title
        </label>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Enter property name..."
            value={filters.query}
            onChange={(e) => updateFilter("query", e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {["all", "sale", "rent"].map((type) => (
            <button
              key={type}
              onClick={() => updateFilter("type", type)}
              className={`py-2 px-4 rounded-lg font-medium text-sm transition ${
                filters.type === type
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type === "all"
                ? "All"
                : type === "sale"
                ? "For Sale"
                : "For Rent"}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range ($)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Bedrooms & Bathrooms */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms
          </label>
          <select
            value={filters.bedrooms}
            onChange={(e) => updateFilter("bedrooms", e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}+
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms
          </label>
          <select
            value={filters.bathrooms}
            onChange={(e) => updateFilter("bathrooms", e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}+
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Size Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Size (sqft)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filters.minSize}
            onChange={(e) => updateFilter("minSize", e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxSize}
            onChange={(e) => updateFilter("maxSize", e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Year Built Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Year Built
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            placeholder="Min Year"
            value={filters.minYear}
            onChange={(e) => updateFilter("minYear", e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
          <input
            type="number"
            placeholder="Max Year"
            value={filters.maxYear}
            onChange={(e) => updateFilter("maxYear", e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Amenities */}
      <div>
        <button
          onClick={() => setShowAmenities(!showAmenities)}
          className="w-full flex justify-between items-center text-sm font-medium text-gray-700 mb-2 hover:text-indigo-600 transition"
        >
          <span>
            Amenities{" "}
            {filters.amenities.length > 0 && `(${filters.amenities.length})`}
          </span>
          {showAmenities ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {showAmenities && (
          <div className="space-y-2 mt-3 max-h-48 overflow-y-auto">
            {AMENITIES_OPTIONS.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
              >
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
