"use client"

import ProfileAvatarCard from "@/components/profile/ProfileAvatarCard";
import ProfileInfoForm from "@/components/profile/ProfileInfoForm";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

export default function BuyerProfilePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      <ProfileAvatarCard />

      <div className="lg:col-span-2 space-y-6">
        <ProfileInfoForm />
        <ChangePasswordForm />
      </div>
    </div>
  );
}
