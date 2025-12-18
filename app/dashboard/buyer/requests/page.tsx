"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import {
  Booking,
  getBookingsByUserId,
  updateBookingStatus,
} from "@/app/services/bookingService";
import { fetchProperties } from "@/app/services/propertyService";
import DataTable, { Column } from "@/components/common/DataTable";
import Pagination from "@/components/properties/Pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, XCircle, Calendar } from "lucide-react";
import { SuccessToast, ErrorToast } from "@/components/ui/toast";
import Link from "next/link";

interface BookingWithProperty extends Booking {
  propertyTitle?: string;
}

export default function BuyerRequestsPage() {
  const { user } = useAuth();

  const [requests, setRequests] = useState<BookingWithProperty[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visitTypeFilter, setVisitTypeFilter] = useState("all");

  const [page, setPage] = useState(1);
  const limit = 5;

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const loadRequests = async () => {
    if (!user) return;

    setLoading(true);

    const { bookings } = await getBookingsByUserId(user.id);
    if (!bookings) {
      setLoading(false);
      return;
    }

    const { data: properties } = await fetchProperties();

    const merged = bookings.map((b) => {
      const property = properties.find((p) => p.id === b.propertyId);
      return {
        ...b,
        propertyTitle: property?.title || "Unknown Property",
      };
    });

    setRequests(merged);
    setLoading(false);
  };

  useEffect(() => {
    loadRequests();
  }, [user]);

  const filteredRequests = requests.filter((r) => {
    const matchSearch = r.propertyTitle
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || r.status === statusFilter;

    const matchVisitType =
      visitTypeFilter === "all" || r.visitType === visitTypeFilter;

    return matchSearch && matchStatus && matchVisitType;
  });

  const total = filteredRequests.length;
  const paginatedData = filteredRequests.slice(
    (page - 1) * limit,
    page * limit
  );

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this request?")) return;

    const { booking, error } = await updateBookingStatus(id, "rejected");

    if (booking) {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: "rejected" } : r
        )
      );
      setToast({
        type: "success",
        message: "Request cancelled successfully",
      });
    } else {
      setToast({
        type: "error",
        message: error || "Failed to cancel request",
      });
    }
  };

  const columns: Column<BookingWithProperty>[] = [
    {
      key: "propertyTitle",
      label: "Property",
      render: (row) => (
        <span className="font-medium text-gray-800">
          {row.propertyTitle}
        </span>
      ),
    },
    {
      key: "visitType",
      label: "Visit Type",
      render: (row) => (
        <span className="capitalize">
          {row.visitType.replace("-", " ")}
        </span>
      ),
    },
    {
      key: "date",
      label: "Date & Time",
      render: (row) => (
        <div className="flex flex-col">
          <span>{row.date}</span>
          <span className="text-xs text-gray-500">
            {row.timeSlot}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold capitalize ${row.status === "approved"
              ? "bg-green-100 text-green-800"
              : row.status === "rejected"
                ? "bg-red-100 text-red-800"
                : row.status === "completed"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="w-6 h-6" />
        <h1 className="text-2xl font-bold text-gray-800">
          My Requests
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by property name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="md:w-1/3"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded p-2 bg-white"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={visitTypeFilter}
          onChange={(e) => setVisitTypeFilter(e.target.value)}
          className="border rounded p-2 bg-white"
        >
          <option value="all">All Visit Types</option>
          <option value="in-person">In Person</option>
          <option value="virtual">Virtual</option>
          <option value="open-house">Open House</option>
        </select>
      </div>

      <DataTable
        data={paginatedData}
        columns={columns}
        isLoading={loading}
        emptyMessage="No requests found"
        renderActions={(row) => (
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/buyer/requests/${row.id}`}>
              <Button variant="ghost" size="icon" title="View Details">
                <Eye className="w-4 h-4 text-blue-600" />
              </Button>
            </Link>

            {row.status === "pending" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCancel(row.id)}
                title="Cancel Request"
              >
                <XCircle className="w-4 h-4 text-red-600" />
              </Button>
            )}
          </div>
        )}
      />


      {total > limit && (
        <div className="flex justify-center">
          <Pagination
            totalPages={Math.ceil(total / limit)}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      )}

      {toast &&
        (toast.type === "success" ? (
          <SuccessToast
            message={toast.message}
            onClose={() => setToast(null)}
          />
        ) : (
          <ErrorToast
            message={toast.message}
            onClose={() => setToast(null)}
          />
        ))}
    </div>
  );
}
