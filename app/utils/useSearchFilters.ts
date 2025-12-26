"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Property } from "@/types/property";
import { SearchFilters } from "@/components/search/AdvancedSearchFilters";

const ITEMS_PER_PAGE = 6;

export const defaultFilters: SearchFilters = {
  query: "",
  minPrice: "",
  maxPrice: "",
  type: "all",
  status: "all",
  bedrooms: "",
  bathrooms: "",
  minSize: "",
  maxSize: "",
  minYear: "",
  maxYear: "",
  amenities: [],
};

export function useSearchFilters(properties: Property[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize filters from URL
  const [filters, setFilters] = useState<SearchFilters>(() => {
    return {
      query: searchParams.get("q") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      type: (searchParams.get("type") as "all" | "sale" | "rent") || "all",
      status: (searchParams.get("status") as "all" | "available" | "pending" | "sold") || "all",
      bedrooms: searchParams.get("bedrooms") || "",
      bathrooms: searchParams.get("bathrooms") || "",
      minSize: searchParams.get("minSize") || "",
      maxSize: searchParams.get("maxSize") || "",
      minYear: searchParams.get("minYear") || "",
      maxYear: searchParams.get("maxYear") || "",
      amenities: searchParams.get("amenities")?.split(",").filter(Boolean) || [],
    };
  });

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );

  const [view, setView] = useState<"grid" | "list">(
    (searchParams.get("view") as "grid" | "list") || "grid"
  );

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.query) params.set("q", filters.query);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.type !== "all") params.set("type", filters.type);
    if (filters.status !== "all") params.set("status", filters.status);
    if (filters.bedrooms) params.set("bedrooms", filters.bedrooms);
    if (filters.bathrooms) params.set("bathrooms", filters.bathrooms);
    if (filters.minSize) params.set("minSize", filters.minSize);
    if (filters.maxSize) params.set("maxSize", filters.maxSize);
    if (filters.minYear) params.set("minYear", filters.minYear);
    if (filters.maxYear) params.set("maxYear", filters.maxYear);
    if (filters.amenities.length > 0)
      params.set("amenities", filters.amenities.join(","));
    if (currentPage > 1) params.set("page", currentPage.toString());
    if (view !== "grid") params.set("view", view);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filters, currentPage, view, router, pathname]);

  // Filter properties
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Text search (title/location)
    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q)
      );
    }

    // Price range
    if (filters.minPrice) {
      const min = parseFloat(filters.minPrice);
      result = result.filter((p) => p.price >= min);
    }
    if (filters.maxPrice) {
      const max = parseFloat(filters.maxPrice);
      result = result.filter((p) => p.price <= max);
    }

    // Property type
    if (filters.type !== "all") {
      result = result.filter((p) => p.type === filters.type);
    }

    // Status
    if (filters.status !== "all") {
      result = result.filter((p) => p.status === filters.status);
    }

    // Bedrooms
    if (filters.bedrooms) {
      const min = parseInt(filters.bedrooms);
      result = result.filter((p) => (p.bedrooms || 0) >= min);
    }

    // Bathrooms
    if (filters.bathrooms) {
      const min = parseInt(filters.bathrooms);
      result = result.filter((p) => p.bath >= min);
    }

    // Size range
    if (filters.minSize) {
      const min = parseFloat(filters.minSize);
      result = result.filter((p) => p.size && p.size >= min);
    }
    if (filters.maxSize) {
      const max = parseFloat(filters.maxSize);
      result = result.filter((p) => p.size && p.size <= max);
    }

    // Year built range
    if (filters.minYear) {
      const min = parseInt(filters.minYear);
      result = result.filter((p) => p.yearBuilt && p.yearBuilt >= min);
    }
    if (filters.maxYear) {
      const max = parseInt(filters.maxYear);
      result = result.filter((p) => p.yearBuilt && p.yearBuilt <= max);
    }

    // Amenities
    if (filters.amenities.length > 0) {
      result = result.filter((p) =>
        filters.amenities.every((amenity) =>
          p.amenities?.includes(amenity)
        )
      );
    }

    return result;
  }, [properties, filters]);

  // Paginate
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProperties.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProperties, currentPage]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to page 1 when filters change
  };

  const handleClearFilters = () => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
  };

  return {
    filters,
    currentPage,
    view,
    filteredProperties,
    paginatedProperties,
    totalPages,
    handleFiltersChange,
    handleClearFilters,
    handlePageChange,
    handleViewChange,
  };
}
