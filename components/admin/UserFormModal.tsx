"use client";

import React, { useEffect, useState } from "react";
import type { User } from "@/types/auth";
import { LucideCircleX } from "lucide-react";
import { register } from "../../app/services/authService";

type Props = {
  user?: User | null; // when provided => edit mode
  open: boolean;
  onClose: () => void;
  onSuccess?: (user: User) => void; // called after create or update
};

const API_BASE =
  process.env.NEXT_PUBLIC_JSON_SERVER_URL || "http://localhost:3001";

export default function UserFormModal({
  user,
  open,
  onClose,
  onSuccess,
}: Props) {
  const isEdit = Boolean(user);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: ("buyer" as User["role"]) || "buyer",
    status: ("active" as User["status"]) || "active",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "buyer",
        status: user.status || "active",
        password: "",
      });
    } else {
      // reset form for create mode
      setForm({
        name: "",
        email: "",
        role: "buyer",
        status: "active",
        password: "",
      });
      setError(null);
    }
  }, [user, open, isEdit]);

  if (!open) return null;

  const handleChange = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email"; // simple email regex
    if (!isEdit && !form.password?.trim()) return "Password is required";
    return null;
  };

  async function submit() {
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isEdit && user) {
        // PATCH update
        const res = await fetch(`${API_BASE}/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            role: form.role,
            status: form.status,
          }),
        });

        if (!res.ok) throw new Error("Failed to update user");
        const updated: User = await res.json();
        onSuccess?.(updated);

      } else {
        // POST create
      const { user: created, error } = await register({
        name: form.name,
        email: form.email,
        password: form.password, // will be encrypted within AuthService
        role: form.role,
      });

      if (error) throw new Error(error);
      if (created) onSuccess?.(created);
    }

      onClose();
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => !loading && onClose()}
      />

      {/* modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h3 className="text-lg font-semibold">
            {isEdit ? "Edit User" : "Create User"}
          </h3>
          <button
            onClick={() => !loading && onClose()}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close modal"
          >
            <LucideCircleX />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A60A1]/30"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter Full Name"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A60A1]/30"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="example@mail.com"
              disabled={loading}
            />
          </div>

          {!isEdit && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4A60A1]/30"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Temporary password"
                disabled={loading}
              />
            </div>
          )}

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                value={form.role}
                onChange={(e) => handleChange("role", e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2"
                disabled={loading}
              >
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>

            <div className="w-40">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2"
                disabled={loading}
              >
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
              </select>
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="px-4 py-2 rounded bg-[#4A60A1] text-white hover:bg-[#3f4f8f]"
              disabled={loading}
            >
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                ? "Update"
                : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
