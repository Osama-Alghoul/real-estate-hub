"use client";

import { useState, useEffect } from "react";
import { User } from "@/types/auth";
import { getCurrentUser, updateUser } from "@/app/services/authService";
import { uploadImage, deleteImage } from "@/app/services/uploadService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SuccessToast, ErrorToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import {
  User as UserIcon,
  Mail,
  Lock,
  Save,
  Loader2,
  Camera,
} from "lucide-react";

export default function SettingsForm() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name,
        email: currentUser.email,
      }));
      fetchUserData(currentUser.id.toString());
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${id}`);
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
        setFormData((prev) => ({
          ...prev,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar || "",
        }));
      } else if (res.status === 404) {
        // User not found in DB, likely stale session
        console.error("User not found in DB");
        setErrorMessage("Session invalid. Please login again.");
        setShowErrorToast(true);
        // Optional: Auto logout after delay
        setTimeout(() => {
          // We should probably call a logout function here, but for now just redirect
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // If there's an existing avatar that is a local upload, delete it first
      if (formData.avatar && formData.avatar.startsWith("/uploads/")) {
        await deleteImage(formData.avatar);
      }

      const url = await uploadImage(file);
      setFormData((prev) => ({ ...prev, avatar: url }));
    } catch (error) {
      console.error("Upload error:", error);
      setErrorMessage("Failed to upload image");
      setShowErrorToast(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setShowErrorToast(true);
      return;
    }

    setLoading(true);
    try {
      const updatePayload: Partial<User> = {
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar,
      };

      if (formData.password) {
        updatePayload.password = formData.password;
      }

      const result = await updateUser(user.id.toString(), updatePayload);

      if (result.error) {
        setErrorMessage(result.error);
        setShowErrorToast(true);
      } else {
        setShowToast(true);
        setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
        router.refresh();
      }
    } catch (error) {
      console.error("Update failed", error);
      setErrorMessage("An error occurred while updating profile");
      setShowErrorToast(true);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Account Settings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 bg-gray-50 flex items-center justify-center">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="w-12 h-12 text-gray-300" />
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Camera size={16} />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Click icon to change photo
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <UserIcon size={16} /> Full Name
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Mail size={16} /> Email Address
          </label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Change Password
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock size={16} /> New Password
              </label>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock size={16} /> Confirm Password
              </label>
              <Input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </form>

      {showToast && (
        <SuccessToast
          message="Profile updated successfully!"
          onClose={() => setShowToast(false)}
        />
      )}

      {showErrorToast && (
        <ErrorToast
          message={errorMessage}
          onClose={() => setShowErrorToast(false)}
        />
      )}
    </div>
  );
}
