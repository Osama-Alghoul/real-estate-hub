"use client";

import { useEffect, useState } from "react";
import {
  Booking,
  getBookings,
  updateBookingStatus,
  deleteBooking,
} from "@/app/services/bookingService";
import DataTable, { Column } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Trash2, Calendar } from "lucide-react";
import { SuccessToast, ErrorToast } from "@/components/ui/toast";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const loadBookings = async () => {
    setLoading(true);
    const { bookings, error } = await getBookings();
    if (bookings) {
      setBookings(bookings);
    } else {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusUpdate = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    const { booking, error } = await updateBookingStatus(id, status);
    if (booking) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
      setToast({ type: "success", message: `Booking ${status} successfully` });
    } else {
      setToast({ type: "error", message: error || "Failed to update status" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    const { success, error } = await deleteBooking(id);
    if (success) {
      setBookings((prev) => prev.filter((b) => b.id !== id));
      setToast({ type: "success", message: "Booking deleted successfully" });
    } else {
      setToast({ type: "error", message: error || "Failed to delete booking" });
    }
  };

  const columns: Column<Booking>[] = [
    { key: "id", label: "ID" },
    {
      key: "date",
      label: "Date & Time",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.date}</span>
          <span className="text-xs text-gray-500">{row.timeSlot}</span>
        </div>
      ),
    },
    {
      key: "visitType",
      label: "Type",
      render: (row) => (
        <span className="capitalize">
          {row.visitType === "in-person" ? "In-Person" : "Video Call"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold capitalize ${
            row.status === "approved"
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
    {
      key: "message",
      label: "Message",
      render: (row) => (
        <span
          className="text-sm text-gray-600 truncate max-w-[200px] block"
          title={row.message}
        >
          {row.message || "-"}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Bookings Management
        </h1>
      </div>

      <DataTable
        data={bookings}
        columns={columns}
        isLoading={loading}
        emptyMessage="No bookings found"
        renderActions={(row) => (
          <div className="flex gap-2">
            {row.status === "pending" && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleStatusUpdate(row.id, "approved")}
                  title="Approve"
                >
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleStatusUpdate(row.id, "rejected")}
                  title="Reject"
                >
                  <XCircle className="w-4 h-4 text-red-600" />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(row.id)}
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" />
            </Button>
          </div>
        )}
      />

      {toast &&
        (toast.type === "success" ? (
          <SuccessToast
            message={toast.message}
            onClose={() => setToast(null)}
          />
        ) : (
          <ErrorToast message={toast.message} onClose={() => setToast(null)} />
        ))}
    </div>
  );
}
