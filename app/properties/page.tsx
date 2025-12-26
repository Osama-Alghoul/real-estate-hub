"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Banner from "@/components/layout/Banner";
import AdvancedSearchFilters from "@/components/search/AdvancedSearchFilters";
import SearchResults from "@/components/search/SearchResults";
import { useSearchFilters } from "@/app/utils/useSearchFilters";
import { Property } from "@/types/property";
import { Menu, X } from "lucide-react";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const {
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
  } = useSearchFilters(properties);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("http://localhost:3001/properties", {
          cache: "no-store",
        });
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Banner title="Properties" breadcrumb="Home / Properties" />

      <main className="grow max-w-[1500px] mx-auto px-4 py-8 w-full">
        <div className="flex gap-6 relative">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-40 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition"
          >
            {mobileFiltersOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Filters Sidebar */}
          <aside
            className={`
              fixed lg:static top-0 left-0 h-full lg:h-auto w-80 lg:w-80
              bg-gray-50 lg:bg-transparent z-30 lg:z-auto
              transition-transform duration-300 ease-in-out
              ${
                mobileFiltersOpen
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
              }
              overflow-y-auto lg:overflow-visible
              pt-20 lg:pt-0 px-4 lg:px-0 pb-4 lg:pb-0
            `}
          >
            <AdvancedSearchFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Overlay for mobile */}
          {mobileFiltersOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
          )}

          {/* Results */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <SearchResults
                properties={paginatedProperties}
                totalCount={filteredProperties.length}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                view={view}
                onViewChange={handleViewChange}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
