"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { updateUser } from "@/app/services/userService";
import { useAuth } from "@/app/context/AuthContext";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md space-y-4 max-w-xl mx-auto lg:mx-0">
            <h2 className="text-lg font-semibold text-gray-700">Profile Information</h2>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Name</label>
                <Input {...register("name")} disabled={saving} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <Input {...register("email")} disabled={saving} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto">
                {saving ? "Saving..." : "Save Changes"}
            </Button>
        </form>
    );
}
