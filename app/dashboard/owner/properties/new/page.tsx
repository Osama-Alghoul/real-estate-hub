"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";
import { createProperty } from "../../../../services/propertyService";
import { createNotification } from "../../../../services/notificationService";
import { uploadImage } from "../../../../services/uploadService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Loader2, Upload, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";

const AMENITIES_LIST = [
  "Air Conditioning",
  "Heating",
  "Garage",
  "Swimming Pool",
  "Gym",
  "Security System",
  "Smart Home",
  "Elevator",
  "Garden",
  "Balcony",
  "Parking",
  "Internet",
];

export default function NewPropertyPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    type: "sale",
    status: "available",
    location: "",
    bedrooms: "",
    bath: "",
    garag: "",
    size: "",
    yearBuilt: "",
  });

  const [amenities, setAmenities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const newImages: string[] = [];
      // Upload each file
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const url = await uploadImage(file);
        newImages.push(url);
      }

      setImages((prev) => [...prev, ...newImages]);
    } catch (err) {
      console.error("Upload failed", err);
      setError("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      // Basic validation
      if (!formData.title || !formData.price || !formData.location) {
        throw new Error("Please fill in all required fields");
      }

      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        type: formData.type as "sale" | "rent",
        status: formData.status as "available" | "pending" | "sold",
        location: formData.location,
        bedrooms: Number(formData.bedrooms) || 0,
        bath: Number(formData.bath) || 0,
        garag: Number(formData.garag) || 0,
        size: Number(formData.size) || 0,
        yearBuilt: Number(formData.yearBuilt) || new Date().getFullYear(),
        amenities: amenities,
        images: images,
        img: images[0] || "/placeholder.png", // Main image
        ownerId: String(user.id),
        avatar: user.avatar || "", // Will be handled by service but good to have fallback
        name: user.name || "",
        createdAt: new Date().toISOString(),
      };

      await createProperty(propertyData);

      // Notify admins about new property
      await createNotification({
        userId: "all",
        type: "property",
        title: "New Property Listed",
        message: `${user.name} listed "${formData.title}"`,
        link: "/dashboard/admin/properties",
      });

      router.push("/dashboard/owner/properties");
    } catch (err: any) {
      console.error("Submission failed", err);
      setError(err.message || "Failed to create property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Add New Property</h1>
        <p className="text-muted-foreground">
          Create a new listing for your portfolio
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Key details about your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Modern Villa in Downtown"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="e.g. 500000"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Property Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(val: string) =>
                      handleSelectChange("type", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Availability Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(val: string) =>
                    handleSelectChange("status", val)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the property features, location benefits, etc."
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location & Specs */}
          <Card>
            <CardHeader>
              <CardTitle>Location & Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="location">Location / Address *</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. 123 Main St, New York, NY"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    placeholder="0"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bath">Bathrooms</Label>
                  <Input
                    id="bath"
                    name="bath"
                    type="number"
                    placeholder="0"
                    value={formData.bath}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="garag">Garages</Label>
                  <Input
                    id="garag"
                    name="garag"
                    type="number"
                    placeholder="0"
                    value={formData.garag}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="size">Size (sqft)</Label>
                  <Input
                    id="size"
                    name="size"
                    type="number"
                    placeholder="0"
                    value={formData.size}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-4 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input
                    id="yearBuilt"
                    name="yearBuilt"
                    type="number"
                    placeholder="e.g. 2020"
                    value={formData.yearBuilt}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {AMENITIES_LIST.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={amenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                    />
                    <label
                      htmlFor={`amenity-${amenity}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Property Images</CardTitle>
              <CardDescription>
                Upload high quality images of your property
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="relative cursor-pointer"
                    disabled={uploading}
                  >
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                      multiple
                      accept="image/*"
                    />
                    {uploading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="mr-2 h-4 w-4" />
                    )}
                    {uploading ? "Uploading..." : "Upload Images"}
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Supported: JPG, PNG • Max size: 5MB
                  </span>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    {images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-md overflow-hidden group border"
                      >
                        <Image
                          src={img}
                          alt={`Property ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        {idx === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-1">
                            Main Image
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {images.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-muted-foreground bg-muted/50">
                    <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
                    <p className="text-sm">No images uploaded yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || uploading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Listing
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
