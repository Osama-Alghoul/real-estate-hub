"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import {
  fetchProperties,
  deleteProperty,
} from "../../../services/propertyService";
import { Property } from "@/types/property.type";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Plus,
  Trash2,
  Pencil,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  AlertCircle,
} from "lucide-react";

export default function OwnerPropertiesPage() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadProperties();
    }
  }, [user]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      // Fetch properties for the current owner
      const { data } = await fetchProperties({
        ownerId: user?.id ? String(user.id) : undefined,
      });
      setProperties(data);
      setError(null);
    } catch (err) {
      console.error("Failed to load properties", err);
      setError("Failed to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this property? This action cannot be undone."
      )
    ) {
      try {
        await deleteProperty(id);
        // Refresh list
        loadProperties();
      } catch (err) {
        console.error("Failed to delete property", err);
        alert("Failed to delete property. Please try again.");
      }
    }
  };

  if (loading)
    return <div className="p-8 text-center">Loading properties...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Properties</h1>
          <p className="text-muted-foreground">Manage your property listings</p>
        </div>
        <Link href="/dashboard/owner/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Property
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          {error}
        </div>
      )}

      {properties.length === 0 && !error ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="rounded-full bg-primary/10 p-4">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">No properties listed</h3>
                <p className="text-muted-foreground">
                  You haven't listed any properties yet. Create your first
                  listing to get started.
                </p>
              </div>
              <Link href="/dashboard/owner/new">
                <Button variant="outline">Create Listing</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden flex flex-col">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={
                    property.images?.[0] || property.img || "/placeholder.png"
                  }
                  alt={property.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />

                {/* Status Badge Replacement */}
                <div
                  className={`absolute left-2 top-2 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white ${
                    property.status === "available"
                      ? "bg-green-500"
                      : property.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {property.status || "available"}
                </div>

                {/* Type Badge Replacement */}
                <div className="absolute right-2 top-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 capitalize border border-gray-200">
                  {property.type}
                </div>
              </div>

              <CardHeader className="p-4">
                <CardTitle className="line-clamp-1 text-lg">
                  {property.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  <span className="line-clamp-1">
                    {property.location || "Location not specified"}
                  </span>
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-end">
                <div className="text-xl font-bold text-primary mb-4">
                  ${property.price.toLocaleString()}
                  {property.type === "rent" && (
                    <span className="text-sm font-normal text-muted-foreground">
                      /mo
                    </span>
                  )}
                </div>

                <div className="flex justify-between text-muted-foreground text-sm mb-4 border-t pt-4">
                  <div className="flex flex-col items-center">
                    <BedDouble className="h-4 w-4 mb-1" />
                    <span>{property.bedrooms || 0} Beds</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Bath className="h-4 w-4 mb-1" />
                    <span>{property.bath} Baths</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Maximize className="h-4 w-4 mb-1" />
                    <span>{property.size} sqft</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto">
                  <Button variant="outline" className="flex-1" disabled>
                    <Pencil className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(property.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
