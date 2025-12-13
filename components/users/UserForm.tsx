"use client";

import { useState } from "react";
import { User, Role, Status } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/app/services/uploadService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserFormProps {
  initialData?: Partial<User>;
  onSubmit: (data: Omit<User, "id">) => void;
  isLoading?: boolean;
  onCancel: () => void;
  isEdit?: boolean;
}

export default function UserForm({
  initialData,
  onSubmit,
  isLoading,
  onCancel,
  isEdit = false,
}: UserFormProps) {
  const [formData, setFormData] = useState<Partial<User>>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    password: "", // Password is empty by default
    role: initialData?.role || "buyer",
    status: initialData?.status || "active",
    avatar: initialData?.avatar || "",
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || (!isEdit && !formData.password)) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit(formData as Omit<User, "id">);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {!isEdit && (
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required={!isEdit}
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="avatar">Profile Picture</Label>
        <div className="flex gap-4 items-center">
          {formData.avatar && (
            <img
              src={formData.avatar}
              alt="Avatar Preview"
              className="w-16 h-16 object-cover rounded-full border"
            />
          )}
          <div className="flex-1">
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                try {
                  const url = await uploadImage(file);
                  setFormData((prev) => ({ ...prev, avatar: url }));
                } catch (error) {
                  console.error("Upload error:", error);
                  alert("Failed to upload image");
                }
              }}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload a profile picture
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select
            value={formData.role}
            onValueChange={(val) => handleSelectChange("role", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="owner">Owner</SelectItem>
              <SelectItem value="buyer">Buyer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(val) => handleSelectChange("status", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="disabled">Disabled</SelectItem>
            </SelectContent>
          </Select>
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
          {isLoading ? "Saving..." : "Save User"}
        </Button>
      </div>
    </form>
  );
}
