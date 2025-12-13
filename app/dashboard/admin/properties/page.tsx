"use client";

import { useEffect, useState } from "react";
import { Property } from "@/types/property.type";
import { fetchProperties } from "@/app/services/propertyService";
import DataTable, { Column } from "@/components/common/DataTable";
import AddPropertyModal from "@/components/properties/AddPropertyModal";
import EditPropertyModal from "@/components/properties/EditPropertyModal";
import DeletePropertyModal from "@/components/properties/DeletePropertyModal";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 6;

  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [deletingProperty, setDeletingProperty] = useState<Property | null>(
    null
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const loadProperties = async () => {
    setLoading(true);
    try {
      const { data, total } = await fetchProperties({
        q: search,
        type: typeFilter,
        status: statusFilter,
        _page: page,
        _limit: limit,
      });
      setProperties(data);
      setTotal(total);
    } catch (error) {
      console.error("Failed to load properties:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  // إعادة الصفحة إلى 1 عند تغيير البحث أو الفلترة
  setPage(1);
}, [search, typeFilter, statusFilter]);

  useEffect(() => {
    loadProperties();
  }, [search, typeFilter, statusFilter, page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const columns: Column<Property>[] = [
    { key: "id", label: "ID" },
    {
      key: "img",
      label: "Image",
      render: (row) => (
        <img
          src={row.img}
          alt={row.title}
          className="w-25 h-20 object-cover rounded"
        />
      ),
    },
    { key: "title", label: "Title" },
    {
      key: "price",
      label: "Price",
      render: (row) => `$${row.price.toLocaleString()}`,
    },
    {
      key: "type",
      label: "Type",
      render: (row) => <span className="capitalize">{row.type}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.status === "available"
              ? "bg-green-100 text-green-800"
              : row.status === "sold"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status || "Available"}
        </span>
      ),
    },
    // {
    //   key: "createdAt",
    //   label: "Created At",
    //   render: (row) =>
    //     row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
    // },
    {
      key: "id", // Using ID as key for actions column
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditingProperty(row)}
          >
            <Edit className="w-4 h-4 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDeletingProperty(row)}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Properties Management
        </h1>
        <AddPropertyModal onSuccess={loadProperties} />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search properties..."
          value={search}
          onChange={handleSearch}
          className="md:w-1/3"
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

      <DataTable data={properties} columns={columns} isLoading={loading} />

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span>Page {page}</span>
        <Button
          variant="outline"
          disabled={properties.length < limit}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>

      <EditPropertyModal
        property={editingProperty}
        open={!!editingProperty}
        onOpenChange={(open) => !open && setEditingProperty(null)}
        onSuccess={loadProperties}
      />

      <DeletePropertyModal
        property={deletingProperty}
        open={!!deletingProperty}
        onOpenChange={(open) => !open && setDeletingProperty(null)}
        onSuccess={loadProperties}
      />
    </div>
  );
}
