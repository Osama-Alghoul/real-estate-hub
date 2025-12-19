"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { updateUser } from "@/app/services/userService";
import { useAuth } from "@/app/context/AuthContext";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { User, Mail, Save, Loader2 } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileInfoForm() {
  const { user, updateUser: updateAuthUser } = useAuth();
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name, email: user?.email },
  });

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return;
    setSaving(true);

    try {
      // user.id is string based on types/auth.ts
      const updated = await updateUser(user.id, {
        name: data.name,
        email: data.email,
      });

      updateAuthUser({
        name: updated.name,
        email: updated.email,
      });

      toast.success("Profile updated successfully");
      reset(updated);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden transition-all hover:shadow-xl">
      <CardHeader className="pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-800">
              Personal Information
            </CardTitle>
            <CardDescription className="text-gray-500">
              Update your personal details and contact information
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8 px-8 pb-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" /> Full Name
              </label>
              <div className="relative">
                <Input
                  {...register("name")}
                  disabled={saving}
                  className="h-12 pl-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all rounded-xl bg-gray-50/50 focus:bg-white"
                  placeholder="e.g. John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" /> Email Address
              </label>
              <div className="relative">
                <Input
                  {...register("email")}
                  disabled={saving}
                  className="h-12 pl-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all rounded-xl bg-gray-50/50 focus:bg-white"
                  placeholder="e.g. john@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white min-w-[160px] h-12 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" /> Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
