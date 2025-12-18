"use client";

import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProperties } from "@/app/services/propertyService";
import { getBookingsByUserId } from "@/app/services/bookingService";
import { getFavorites } from "@/app/services/favoriteService";
import Card from "@/components/common/Card";
import { Button } from "@/components/ui/button";
import { Heart, CalendarClock, Search } from "lucide-react";
import { Property } from "@/types/property.type";
import { Booking } from "@/app/services/bookingService";

export default function BuyerLandingPage() {
  const { user } = useAuth();

  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        const { data } = await fetchProperties({ _limit: 4 });
        setProperties(data);

        const bookingsRes = await getBookingsByUserId(String(user.id));
        setBookings(bookingsRes.bookings?.slice(0, 3) || []);

        const favs = await getFavorites(user.id);
        setFavoritesCount(favs.length);
      } catch (err) {
        console.error("Buyer overview load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  const propertyMap = Object.fromEntries(
    properties.map((p) => [p.id, p.title])
  );

  return (
    <div className="space-y-10 p-4">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl p-6 md:p-10">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-lg space-y-4">
            <h1 className="text-2xl md:text-2xl font-semibold leading-snug">
              Discover properties that match your lifestyle
            </h1>

            <Link href="/properties">
              <Button
                className="
            mt-2
            bg-white text-blue-600
            hover:bg-gray-100
            font-semibold
            px-6
            py-2
            rounded-md
            shadow
          "
              >
                <Search className="mr-2 h-4 w-4" />
                Explore Properties
              </Button>
            </Link>
          </div>

          <div className="w-24 hidden md:block absolute right-6 bottom-0">
            <img
              src="/banner.png"
              alt="Explore Properties"
              className="
          w-[260px]
          object-contain
          drop-shadow-xl
          translate-y-6
        "
            />
          </div>
        </div>
      </div>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Recommended Properties
          </h1>

          <Link
            href="/properties"
            className="text-md text-blue-600 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {properties.slice(0, 4).map((p, i) => (
            <Card
              key={p.id}
              id={p.id}
              img={p.img}
              title={p.title}
              price={p.price}
              garag={p.garag}
              bath={p.bath}
              size={p.size}
              avatar={p.avatar}
              name={p.name}
              description={p.description}
              type={p.type}
              index={i}
            />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <CalendarClock size={18} className="text-blue-600" />

            <h1 className="text-2xl font-bold text-gray-800">
              Recent Requests
            </h1>
          </div>

          <Link
            href="/dashboard/buyer/requests"
            className="text-md text-blue-600 hover:underline"
          >
            View all
          </Link>
        </div>

        {bookings.length === 0 ? (
          <p className="text-sm text-gray-500">
            You haven’t made any requests yet.
          </p>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 4).map((b) => (
              <div
                key={b.id}
                className="flex justify-between items-center border rounded-lg px-4 py-3 hover:bg-gray-50 transition"
              >
                {/* LEFT */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-800">
                    {propertyMap[b.propertyId ?? ""] || "Property"}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="capitalize">{b.visitType}</span>
                    <span>•</span>
                    <span>{new Date(b.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full capitalize
              ${
                b.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : b.status === "approved"
                  ? "bg-green-100 text-green-700"
                  : b.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600"
              }
            `}
                >
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="relative overflow-hidden bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
            <Heart className="text-red-500" size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">Your Favorites</h3>

            {favoritesCount === 0 ? (
              <p className="text-sm text-gray-500 mt-1">
                You haven’t saved any properties yet.
                <br />
                Start saving homes you love
              </p>
            ) : (
              <p className="text-sm text-gray-500 mt-1">
                You have
                <span className="font-medium text-gray-800">
                  {favoritesCount}
                </span>
                saved properties waiting for you.
              </p>
            )}
          </div>
        </div>

        <Link href="/dashboard/buyer/favorites">
          <Button
            variant={favoritesCount === 0 ? "default" : "outline"}
            className="whitespace-nowrap"
          >
            {favoritesCount === 0 ? "Explore & Save" : "View Favorites"}
          </Button>
        </Link>

        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-red-50 rounded-full opacity-50" />
      </section>
    </div>
  );
}
