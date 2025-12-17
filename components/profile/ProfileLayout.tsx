"use client";

import ProfileAvatarCard from "./ProfileAvatarCard";
import ProfileInfoForm from "./ProfileInfoForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { useAuth } from "@/app/context/AuthContext";

export default function ProfileLayout() {
  const { user } = useAuth();

  if (!user) return null;

  const roleLabel = {
    admin: "Admin",
    buyer: "Buyer",
    owner: "Owner",
  }[user.role];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {roleLabel} Profile
        </h1>
        <p className="text-sm text-gray-500">
          Manage your personal information and security
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileAvatarCard />

        <div className="lg:col-span-2 space-y-6">
          <ProfileInfoForm />
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
