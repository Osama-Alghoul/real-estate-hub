"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/services/authService";
import { updateUser } from "@/app/services/userService";
import { uploadImage } from "@/app/services/uploadService";
import { User } from "@/types/auth";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ProfileClient() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const u = getCurrentUser();
    if (u) {
      setUser(u as User);
      setName(u.name);
      setEmail(u.email);
      setAvatarPreview(u.avatar || "/people/A1.png");
    }
    setLoading(false);
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
      setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    if (!user) return;
    if (!name || !email) return toast.error("Name and Email are required");

    setSaving(true);
    try {
      let avatarUrl = avatarPreview;

      if (avatar) {
        avatarUrl = await uploadImage(avatar);
      }

      await updateUser(user.id, {
        name,
        email,
        ...(password ? { password } : {}),
        avatar: avatarUrl || "/user.png",
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">My Profile</h1>

      <div className="flex flex-col items-center gap-4">
        <img
          src={avatarPreview || "/people/A1.png"}
          alt="Profile"
          className="w-28 h-28 object-cover rounded-full border-2 border-gray-300"
        />
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label className="block text-sm font-medium">New Password</label>
          <Input
            type="password"
            placeholder="Leave empty to keep current"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
