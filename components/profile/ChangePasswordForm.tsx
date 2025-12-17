"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useAuth } from "@/app/context/AuthContext";
import { changePassword } from "@/app/services/userService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const passwordSchema = z.object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmNewPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ChangePasswordForm() {
    const { user, logout } = useAuth();
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    });

    const onSubmit = async (data: PasswordFormData) => {
        if (!user) return;

        setSaving(true);
        try {
            await changePassword(user.id, data.currentPassword, data.newPassword);

            toast.success("Password updated successfully. Please login again");
            logout();
            router.push("/login");

        } catch (err: any) {
            console.error(err);
            toast.error(err.message || "Failed to update password");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md space-y-4 max-w-xl mx-auto lg:mx-0">
            <h2 className="text-lg font-semibold text-gray-700">Change Password</h2>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Current Password</label>
                <Input type="password" {...register("currentPassword")} disabled={saving} />
                {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">New Password</label>
                <Input type="password" {...register("newPassword")} disabled={saving} />
                {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Confirm New Password</label>
                <Input type="password" {...register("confirmNewPassword")} disabled={saving} />
                {errors.confirmNewPassword && <p className="text-red-500 text-sm">{errors.confirmNewPassword.message}</p>}
            </div>

            <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto">
                {saving ? "Saving..." : "Change Password"}
            </Button>
        </form>
    );
}
