"use client";

import React, { useEffect, useState, useMemo } from "react";
import FilterControl from "@/components/common/FilterControl";
import GridView from "@/components/common/GridView";
import ListView from "@/components/common/ListView";
import Pagination from "@/components/common/Pagination";
import Banner from "@/components/layout/Banner";
import { useSearchParams } from "next/navigation";

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const initialView = searchParams.get("view") === "list" ? "list" : "grid";

  const [properties, setProperties] = useState([]);
  const [view, setView] = useState<"grid" | "list">(initialView);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  // Fetch API (client-side)
  const getProperties = async () => {
    const res = await fetch("http://localhost:3001/properties");
    const data = await res.json();
    setProperties(data);
  };

  useEffect(() => {
    getProperties();
  }, []);

  const displayedProperties = useMemo(()=>{
    let result = [...properties]

    if (filter !== "all") {
      result = result.filter((prop) => prop.type === filter);
    }

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "newest") result.reverse();

    return result;
  }, [properties, filter, sort])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Banner title="Properties" breadcrumb="Home / Properties" />

      <main className="flex-grow max-w-[1500px] mx-auto px-4 py-5 w-full">
        <FilterControl key={view} currentView={view} onViewChange={setView} onFilterChange={setFilter} onSortChange={setSort} />

        {view === "grid" ? (
          <GridView data={displayedProperties} />
        ) : (
          <ListView data={displayedProperties} />
        )}

        <div className="mt-12 flex justify-center">
          <Pagination totalPages={5} currentPage={1} />
        </div>
      </main>
    </div>
  );
}
