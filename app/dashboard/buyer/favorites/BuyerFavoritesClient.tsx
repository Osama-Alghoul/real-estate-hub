"use client";

import { useEffect, useMemo, useState } from "react";
import { getCurrentUser } from "@/app/services/authService";
import { getFavorites, removeFavorite } from "@/app/services/favoriteService";
import DataTable, { Column } from "@/components/common/DataTable";
import { Favorite } from "@/types/favorite";
import Image from "next/image";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Pagination from "@/components/properties/Pagination";

export default function BuyerFavoritesClient() {
  const [data, setData] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const limit = 5;

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) return;

    getFavorites(user.id).then((res) => {
      const enriched = res.map((fav: any) => ({
        ...fav,
        avatar: fav.avatar || "/people/A1.png",
      }));
      setData(enriched);
      setLoading(false);
    });
  }, []);

  const handleRemove = async (id: number) => {
    await removeFavorite(id.toString());
    setData((prev) => prev.filter((f) => f.id !== id));
    toast.error("Removed from favorites");
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.owner.toLowerCase().includes(search.toLowerCase());

      const matchesType = typeFilter === "all" || item.type === typeFilter;

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [data, search, typeFilter, statusFilter]);

  /* pagination logic */
  const paginatedData = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredData.slice(start, start + limit);
  }, [filteredData, page]);

  const totalPages = Math.ceil(filteredData.length / limit);
  useEffect(() => {
    setPage(1);
  }, [search, typeFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "sold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns: Column<Favorite>[] = [
    { key: "propertyId", label: "ID" },
    {
      key: "image",
      label: "Image",
      render: (row) => (
        <Image
          src={row.image}
          alt={row.title}
          width={70}
          height={50}
          className="rounded object-cover"
        />
      ),
    },
    { key: "title", label: "Title" },
    { key: "price", label: "Price" },
    {
      key: "owner",
      label: "Owner",
      render: (row) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.avatar || "/people/A1.png"}
            alt={row.owner}
            width={30}
            height={30}
            className="rounded-full object-cover"
          />
          <span>{row.owner}</span>
        </div>
      ),
    },
    { key: "type", label: "Type" },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
            row.status
          )}`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Favorites Management
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            placeholder="Search favorites..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded p-2 md:w-1/3"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border rounded p-2 bg-white"
          >
            <option value="all">All Types</option>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded p-2 bg-white"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>
      <DataTable
        data={paginatedData}
        columns={columns}
        isLoading={loading}
        renderActions={(row) => (
          <button onClick={() => handleRemove(row.id)}>
            <Trash2 size={18} className="w-4 h-4 text-red-600" />
          </button>
        )}
      />
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {filteredData.length > limit && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
