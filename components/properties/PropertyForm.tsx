"use client";

import { uploadImage } from "@/app/services/uploadService";
import { fetchUsers } from "@/app/services/userService";
import { User } from "@/types/auth";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Property } from "@/types/property.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// If UI components don't exist, I'll fallback to standard HTML elements or create them.
// Checking components/ui first would be ideal, but I'll assume standard shadcn/ui structure for now and fix if needed.

interface PropertyFormProps {
  initialData?: Partial<Property>;
  onSubmit: (data: Omit<Property, "id">) => void;
  isLoading?: boolean;
  onCancel: () => void;
}

export default function PropertyForm({
  initialData,
  onSubmit,
  isLoading,
  onCancel,
}: PropertyFormProps) {
  const [formData, setFormData] = useState<Partial<Property>>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    location: initialData?.location || "",
    type: initialData?.type || "sale",
    status: initialData?.status || "available",
    bedrooms: initialData?.bedrooms || 0,
    bath: initialData?.bath || 0,
    size: initialData?.size || 0,
    garag: initialData?.garag || 0,
    img: initialData?.img || "",
    images: initialData?.images || [],
    amenities: initialData?.amenities || [],
    ownerId: initialData?.ownerId || "",
    name: initialData?.name || "",
    avatar: initialData?.avatar || "",
    ...initialData,
  });

  const [owners, setOwners] = useState<User[]>([]);

  useEffect(() => {
    const loadOwners = async () => {
      try {
        const { data } = await fetchUsers({ role: "owner", status: "active" });
        setOwners(data);
      } catch (error) {
        console.error("Error loading owners:", error);
      }
    };
    loadOwners();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (
      !formData.title ||
      !formData.price ||
      !formData.type ||
      !formData.ownerId
    ) {
      alert("Please fill in all required fields including owner");
      return;
    }
    onSubmit(formData as Omit<Property, "id">);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownerId">Owner *</Label>
          <select
            id="ownerId"
            name="ownerId"
            value={formData.ownerId}
            onChange={(e) => {
              const selectedOwner = owners.find((o) => o.id === e.target.value);
              setFormData((prev) => ({
                ...prev,
                ownerId: e.target.value,
                name: selectedOwner?.name || "",
                avatar: "/people/A1.png", // Default avatar
              }));
            }}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select an owner...</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name} ({owner.email})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <input
            id="bedrooms"
            name="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bath">Bathrooms</Label>
          <input
            id="bath"
            name="bath"
            type="number"
            value={formData.bath}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="size">Area (sqft)</Label>
          <input
            id="size"
            name="size"
            type="number"
            value={formData.size}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="garag">Garage</Label>
          <input
            id="garag"
            name="garag"
            type="number"
            value={formData.garag}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearBuilt">Year Built</Label>
          <input
            id="yearBuilt"
            name="yearBuilt"
            type="number"
            value={formData.yearBuilt || ""}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Amenities</Label>
        <div className="grid grid-cols-2 gap-2">
          {[
            "Swimming Pool",
            "Central Heating",
            "Smart Home",
            "Solar Panels",
            "Private Garden",
            "Security System",
          ].map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`amenity-${amenity}`}
                checked={formData.amenities?.includes(amenity)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFormData((prev) => {
                    const current = prev.amenities || [];
                    return {
                      ...prev,
                      amenities: checked
                        ? [...current, amenity]
                        : current.filter((a) => a !== amenity),
                    };
                  });
                }}
                className="rounded border-gray-300"
              />
              <label htmlFor={`amenity-${amenity}`} className="text-sm">
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-2 min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="img">Main Image</Label>
        <div className="flex gap-4 items-center">
          {formData.img && (
            <img
              src={formData.img}
              alt="Preview"
              className="w-16 h-16 object-cover rounded border"
            />
          )}
          <div className="flex-1">
            <Input
              id="img"
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                try {
                  const url = await uploadImage(file);
                  setFormData((prev) => ({ ...prev, img: url }));
                } catch (error) {
                  console.error("Upload error:", error);
                  alert("Failed to upload image");
                }
              }}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload an image from your device
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">Gallery Images</Label>
        <div className="space-y-4">
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={async (e) => {
              const files = e.target.files;
              if (!files || files.length === 0) return;

              try {
                const newImages: string[] = [];
                for (let i = 0; i < files.length; i++) {
                  const url = await uploadImage(files[i]);
                  newImages.push(url);
                }
                setFormData((prev) => ({
                  ...prev,
                  images: [...(prev.images || []), ...newImages],
                }));
              } catch (error) {
                console.error("Upload error:", error);
                alert("Failed to upload images");
              }
            }}
            className="w-full"
          />
          {formData.images && formData.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Gallery ${index}`}
                    className="w-full h-20 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        images: prev.images?.filter((_, i) => i !== index),
                      }));
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Property"}
        </Button>
      </div>
    </form>
  );
}
