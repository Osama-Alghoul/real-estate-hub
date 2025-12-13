import React from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

// Define a local interface for Booking since it might not be in the global types yet
export interface Booking {
  id: string;
  propertyId: string;
  visitType: string;
  date: string;
  timeSlot: string;
  message: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

interface RecentBookingsProps {
  bookings: Booking[];
}

export default function RecentBookings({ bookings }: RecentBookingsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-700 border-green-100";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-100";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-100";
      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return CheckCircle;
      case "cancelled":
        return XCircle;
      case "completed":
        return CheckCircle;
      default:
        return AlertCircle;
    }
  };

  // Sort by date (newest first) and take top 5
  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
      <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">
        Recent Bookings
      </h3>
      <div className="space-y-2">
        {recentBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <Calendar className="w-12 h-12 mb-2 opacity-20" />
            <p className="text-sm">No bookings found</p>
          </div>
        ) : (
          recentBookings.map((booking) => {
            const StatusIcon = getStatusIcon(booking.status);
            return (
              <div
                key={booking.id}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-default"
              >
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                      {booking.visitType === "in-person"
                        ? "In-Person Visit"
                        : "Video Call"}
                    </p>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center mt-1 text-xs text-gray-500 gap-3">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded-md">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3 text-gray-400" />
                      {booking.timeSlot}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
