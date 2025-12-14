"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  getBookingsByPropertyId,
  updateBookingStatus,
  Booking,
} from "../../../services/bookingService";
import { fetchProperties } from "../../../services/propertyService";
import { Property } from "@/types/property.type";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Calendar,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Image from "next/image";

interface BookingWithProperty extends Booking {
  property?: Property;
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingWithProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Custom Tab State
  const [activeTab, setActiveTab] = useState<"pending" | "history">("pending");

  useEffect(() => {
    if (user?.id) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: properties } = await fetchProperties({
        ownerId: user?.id ? String(user.id) : undefined,
      });

      if (properties.length === 0) {
        setBookings([]);
        setLoading(false);
        return;
      }

      const bookingsPromises = properties.map(async (property) => {
        const result = await getBookingsByPropertyId(property.id);
        if (result.bookings) {
          return result.bookings.map((booking) => ({
            ...booking,
            property,
          }));
        }
        return [];
      });

      const bookingsArrays = await Promise.all(bookingsPromises);
      const allBookings = bookingsArrays.flat();

      allBookings.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setBookings(allBookings);
    } catch (err) {
      console.error("Failed to load messages", err);
      setError("Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    id: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      setProcessingId(id);
      await updateBookingStatus(id, newStatus);

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update booking status.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading)
    return <div className="p-8 text-center">Loading messages...</div>;

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const otherBookings = bookings.filter((b) => b.status !== "pending");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Messages & Requests
        </h1>
        <p className="text-muted-foreground">
          Manage booking requests for your properties
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="w-full">
        <div className="flex bg-muted p-1 rounded-md w-full max-w-md gap-1">
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex-1 flex items-center justify-center py-2 text-sm font-medium transition-all rounded-sm ${
              activeTab === "pending"
                ? "bg-white text-black shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Pending Requests
            {pendingBookings.length > 0 && (
              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {pendingBookings.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 flex items-center justify-center py-2 text-sm font-medium transition-all rounded-sm ${
              activeTab === "history"
                ? "bg-white text-black shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            History
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {activeTab === "pending" && (
            <>
              {pendingBookings.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <CheckCircle className="h-10 w-10 mb-2 opacity-20" />
                    <p>No pending requests</p>
                  </CardContent>
                </Card>
              ) : (
                pendingBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onStatusUpdate={handleStatusUpdate}
                    isProcessing={processingId === booking.id}
                  />
                ))
              )}
            </>
          )}

          {activeTab === "history" && (
            <>
              {otherBookings.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Clock className="h-10 w-10 mb-2 opacity-20" />
                    <p>No past history</p>
                  </CardContent>
                </Card>
              ) : (
                otherBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onStatusUpdate={handleStatusUpdate}
                    readonly
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function BookingCard({
  booking,
  onStatusUpdate,
  isProcessing = false,
  readonly = false,
}: {
  booking: BookingWithProperty;
  onStatusUpdate: (id: string, status: "approved" | "rejected") => void;
  isProcessing?: boolean;
  readonly?: boolean;
}) {
  return (
    <Card
      className={`overflow-hidden ${
        booking.status === "rejected" ? "bg-red-50/50" : ""
      } ${booking.status === "approved" ? "bg-green-50/50" : ""}`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Property Image Thumbnail */}
        <div className="relative h-32 w-full md:w-48 bg-muted flex-shrink-0">
          <Image
            src={
              booking.property?.img ||
              booking.property?.images?.[0] ||
              "/placeholder.png"
            }
            alt="Property"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                    booking.visitType === "in-person"
                      ? "bg-primary text-primary-foreground border-transparent"
                      : "bg-secondary text-secondary-foreground border-transparent"
                  }`}
                >
                  {booking.visitType}
                </span>

                <span className="text-xs text-muted-foreground">
                  Posted {new Date(booking.createdAt).toLocaleDateString()}
                </span>

                {readonly && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white ${
                      booking.status === "approved"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-lg">
                {booking.property?.title || "Unknown Property"}
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {booking.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {booking.timeSlot}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  Request from{" "}
                  {booking.userId
                    ? `User #${booking.userId.substring(0, 4)}`
                    : "Guest"}
                </div>
              </div>

              {booking.message && (
                <div className="mt-3 bg-muted/50 p-2 rounded-md text-sm italic">
                  "{booking.message}"
                </div>
              )}
            </div>

            {!readonly && (
              <div className="flex gap-2 items-start md:flex-col md:min-w-[120px]">
                <Button
                  size="sm"
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => onStatusUpdate(booking.id, "approved")}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  )}
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="w-full"
                  onClick={() => onStatusUpdate(booking.id, "rejected")}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <XCircle className="h-3 w-3 mr-1" />
                  )}
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
