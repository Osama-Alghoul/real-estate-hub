"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Booking,
    getBookingById,
    updateBookingStatus,
} from "@/app/services/bookingService";
import { fetchProperties } from "@/app/services/propertyService";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Clock,
    Home,
    Phone,
    CreditCard,
    XCircle,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { SuccessToast, ErrorToast } from "@/components/ui/toast";

export default function RequestDetailsPage() {
    const { id } = useParams();
    const router = useRouter();

    const [booking, setBooking] = useState<Booking | null>(null);
    const [propertyTitle, setPropertyTitle] = useState("");
    const [loading, setLoading] = useState(true);

    const [toast, setToast] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;

            const { booking } = await getBookingById(id as string);
            if (!booking) return;

            setBooking(booking);

            if (booking.propertyId) {
                const { data } = await fetchProperties();
                const property = data.find((p) => p.id === booking.propertyId);
                setPropertyTitle(property?.title || "Unknown Property");
            }

            setLoading(false);
        };

        loadData();
    }, [id]);

    const handleCancel = async () => {
        if (!booking) return;
        if (!confirm("Are you sure you want to cancel this request?")) return;

        const { booking: updated, error } = await updateBookingStatus(
            booking.id,
            "rejected"
        );

        if (updated) {
            setBooking(updated);
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

    if (loading || !booking) {
        return <div className="p-6">Loading...</div>;
    }

    const statusColor = 
    booking.status === "approved"
        ? "bg-green-100 text-green-800"
        : booking.status === "rejected"
            ? "bg-red-100 text-red-800"
            : booking.status === "completed"
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800";

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
            >
                <ArrowLeft size={16} /> Back to requests
            </button>

            <div className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">
                    Request Details
                </h1>
                <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold capitalize ${statusColor}`}>
                        {booking.status}
                    </span>
                    <span className="text-gray-500 capitalize">{booking.visitType.replace("-", " ")}</span>
                </div>

            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                    <Home size={18} />
                    <span className="font-medium">Property</span>
                </div>

                <Link
                    href={`/properties/${booking.propertyId}`}
                    className="text-blue-600 font-semibold hover:underline"
                >
                    {propertyTitle}
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                    <h3 className="font-semibold text-gray-800">Visit Info</h3>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>{booking.date}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>{booking.timeSlot}</span>
                    </div>

                    <div className="text-sm text-gray-600 capitalize">
                        Visit Type:{" "}
                        <span className="font-medium">
                            {booking.visitType.replace("-", " ")}
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                    <h3 className="font-semibold text-gray-800">Preferences</h3>

                    <div className="flex items-center gap-3 text-sm">
                        <Phone size={16} />
                        <span>
                            Call requested:{" "}
                            <strong>{booking.wantCall ? "Yes" : "No"}</strong>
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        <CreditCard size={16} />
                        <span>
                            Deposit:{" "}
                            <strong>{booking.payDeposit ? "Yes" : "No"}</strong>
                        </span>
                    </div>
                </div>
            </div>

            {booking.message && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Message</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {booking.message}
                    </p>
                </div>
            )}

            {booking.status === "pending" && (
                <div className="flex justify-end">
                    <Button
                        variant="destructive"
                        onClick={handleCancel}
                        className="flex items-center gap-2"
                    >
                        <XCircle size={16} />
                        Cancel Request
                    </Button>
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
