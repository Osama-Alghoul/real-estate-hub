"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useAuth } from "@/app/context/AuthContext";
import { changePassword } from "@/app/services/userService";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Lock, ShieldCheck, Loader2 } from "lucide-react";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmNewPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ChangePasswordForm() {
  const { user, logout } = useAuth();
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    if (!user) return;

    setSaving(true);
    try {
      await changePassword(user.id, data.currentPassword, data.newPassword);

      toast.success("Password updated successfully");
      reset();
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to update password";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden transition-all hover:shadow-xl">
      <CardHeader className="pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-gray-800">
              Security Settings
            </CardTitle>
            <CardDescription className="text-gray-500">
              Ensure your account is secure by setting a strong password
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8 px-8 pb-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" /> Current Password
            </label>
            <div className="relative">
              <Input
                type="password"
                {...register("currentPassword")}
                disabled={saving}
                className="h-12 pl-4 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all rounded-xl bg-gray-50/50 focus:bg-white"
                placeholder="••••••••"
              />
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-xs mt-1 font-medium flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full" />
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-500" /> New Password
              </label>
              <div className="relative">
                <Input
                  type="password"
                  {...register("newPassword")}
                  disabled={saving}
                  className="h-12 pl-4 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all rounded-xl bg-gray-50/50 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1 font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-500" /> Confirm New
                Password
              </label>
              <div className="relative">
                <Input
                  type="password"
                  {...register("confirmNewPassword")}
                  disabled={saving}
                  className="h-12 pl-4 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all rounded-xl bg-gray-50/50 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmNewPassword && (
                <p className="text-red-500 text-xs mt-1 font-medium flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full" />
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={saving}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white min-w-[180px] h-12 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Updating...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 mr-2" /> Update Password
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
