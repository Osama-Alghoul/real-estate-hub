
import React from "react";
import FilterControl from "@/components/common/FilterControl";
import GridView from "@/components/common/GridView";
import Pagination from "@/components/common/Pagination";
import Banner from "@/components/layout/Banner";

async function getProperties() {
  const res = await fetch("http://localhost:3001/properties", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Banner title="Properties" breadcrumb="Home / Properties" />

      <main className="flex-grow max-w-[1500px] mx-auto px-4 py-5 w-full">
        <FilterControl />
        <GridView data={properties} />
        <div className="mt-12 flex justify-center">
          <Pagination totalPages={5} currentPage={1} />
        </div>
      </main>
    </div>
  );
}
