"use client";

import ProfileAvatarCard from "./ProfileAvatarCard";
import ProfileInfoForm from "./ProfileInfoForm";
import ChangePasswordForm from "./ChangePasswordForm";
import { useAuth } from "@/app/context/AuthContext";
import { User, Shield, Crown, ShoppingBag } from "lucide-react";
import Header from "../dashboard/Header";

export default function ProfileLayout() {
  const { user } = useAuth();

  if (!user) return null;

  const roleConfig = {
    admin: {
      label: "Administrator",
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
      text: "text-blue-700",
    },
    buyer: {
      label: "Buyer Account",
      icon: <ShoppingBag className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-50",
      text: "text-emerald-700",
    },
    owner: {
      label: "Property Owner",
      icon: <Crown className="w-6 h-6 text-amber-600" />,
      bg: "bg-amber-50",
      text: "text-amber-700",
    },
  }[user.role];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">


      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Avatar & Quick Stats */}
        <div className="lg:col-span-4 space-y-6">
          <ProfileAvatarCard />

          {/* Optional: Add quick stats or info card here later */}
        </div>

        {/* Right Column - Forms */}
        <div className="lg:col-span-8 space-y-8">
          <ProfileInfoForm />
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
