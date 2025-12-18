"use client";
import { useState, useMemo } from "react";
import FilterControl from "@/components/properties/FilterControl";
import GridView from "@/components/properties/GridView";
import ListView from "@/components/properties/ListView";
import Pagination from "@/components/properties/Pagination";
import { useSearchParams } from "next/navigation";
import { Property } from "@/types/property.type";
type Props = { properties: Property[]; enableFavorites?: boolean };
export default function PropertiesExplorer({ properties }: Props) {
    const searchParams = useSearchParams();
    const initialView = searchParams.get("view") === "list" ? "list" : "grid";
    const [view, setView] = useState<"grid" | "list">(initialView);
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const filteredProperties = useMemo(() => {
        let result = [...properties];
        if (filter !== "all") {
            result = result.filter((p) => p.type === filter);
        }
        if (sort === "price-asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sort === "price-desc") {
            result.sort((a, b) => b.price - a.price);
        } else if (sort === "newest") {
            result.reverse();
        }
        return result;
    }, [properties, filter, sort]);
    const paginatedProperties = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProperties.slice(start, start + itemsPerPage);
    }, [filteredProperties, currentPage]);
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    return (
        <>
            <FilterControl
                currentView={view}
                onViewChange={setView}
                onFilterChange={(v) => {
                    setFilter(v);
                    setCurrentPage(1);
                }}
                onSortChange={setSort}
            />
            {view === "grid" ? (
                <GridView data={paginatedProperties} />
            ) : (
                <ListView data={paginatedProperties} />
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
