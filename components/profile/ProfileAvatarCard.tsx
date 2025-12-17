"use client";

import React, { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { uploadImage } from "@/app/services/uploadService";
import { updateUser } from "@/app/services/userService";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

export default function ProfileAvatarCard() {
    const { user, updateUser: updateAuthUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!user || !file) return;
        setLoading(true);

        try {
            const url = await uploadImage(file);
            const updated = await updateUser(user.id, { avatar: url });
            updateAuthUser({ avatar: updated.avatar });
            toast.success("Profile picture updated successfully");
            setFile(null);
        } catch (err) {
            console.error(err);
            toast.error("Failed to upload avatar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-md flex flex-col items-center space-y-4 max-w-xs mx-auto lg:mx-0">
            <img
                src={user?.avatar || "/people/A1.png"}
                alt="avatar"
                className="w-32 h-32 rounded-full object-cover border"
            />
            <input type="file" onChange={handleFileChange} disabled={loading} />
            <Button
                onClick={handleUpload}
                disabled={!file || loading}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
            >
                {loading ? "Uploading..." : "Change Avatar"}
            </Button>
        </div>
    );
}
