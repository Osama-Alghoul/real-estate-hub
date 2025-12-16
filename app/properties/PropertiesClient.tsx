"use client";

import { useState, useMemo } from "react";
import FilterControl from "@/components/properties/FilterControl";
import GridView from "@/components/properties/GridView";
import ListView from "@/components/properties/ListView";
import Pagination from "@/components/properties/Pagination";
import { useSearchParams } from "next/navigation";
import { type PropertiesProps } from "@/types/properties";

export default function PropertiesClient({
  properties,
}: {
  properties: PropertiesProps[];
}) {
  const searchParams = useSearchParams();
  const initialView = searchParams.get("view") === "list" ? "list" : "grid";
  const [view, setView] = useState<"grid" | "list">(initialView);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const displayedProperties = useMemo(() => {
    let result = [...properties];

    if (filter !== "all") {
      result = result.filter((prop) => prop.type === filter);
    }

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "newest") result.reverse();

    return result;
  }, [properties, filter, sort]);

  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return displayedProperties.slice(start, end);
  }, [displayedProperties, currentPage]);

  const totalPages = Math.ceil(displayedProperties.length / itemsPerPage);
  return (
    <>
      <FilterControl
        key={view}
        currentView={view}
        onViewChange={setView}
        onFilterChange={setFilter}
        onSortChange={setSort}
      />

      {view === "grid" ? (
        <GridView data={paginatedProperties} mode="public" />
      ) : (
        <ListView data={paginatedProperties} mode="public" />
      )}

      <div className="mt-12 flex justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
