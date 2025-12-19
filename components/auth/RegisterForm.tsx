'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../app/services/authService";
import type { RegisterFormData } from "../../types/auth";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterFormData>({ name: "", email: "", password: "", role: "buyer" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await register(form);
      setLoading(false);
      if (res.error) return setError(res.error);
      router.push(`/dashboard/${res.user!.role}?name=${encodeURIComponent(res.user!.name)}`);
    } catch {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-2xl p-10 space-y-6">
      <h2 className="text-3xl font-bold text-center text-[#1E2640]">Create Account</h2>
      <div>
        <label className="text-sm font-medium text-[#363A3D]">Full Name</label>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#4A60A1]/50 focus:border-[#4A60A1] outline-none transition" required />
      </div>
      <div>
        <label className="text-sm font-medium text-[#363A3D]">Email</label>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#4A60A1]/50 focus:border-[#4A60A1] outline-none transition" required />
      </div>
      <div>
        <label className="text-sm font-medium text-[#363A3D]">Password</label>
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#4A60A1]/50 focus:border-[#4A60A1] outline-none transition" required />
      </div>
      <div>
        <label className="text-sm font-medium text-[#363A3D]">Role</label>
        <select name="role" value={form.role} onChange={handleChange} className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#4A60A1]/50 focus:border-[#4A60A1] outline-none transition">
          <option value="buyer">Buyer</option>
          <option value="owner">Owner</option>
        </select>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button type="submit" disabled={loading} className="w-full bg-[#4A60A1] text-white py-3 rounded-lg font-medium hover:bg-[#4A60A1]/90 transition">
        {loading ? "Creating Account..." : "Register"}
      </button>
      <p className="text-center text-sm text-gray-500">Already have an account? <a href="/login" className="text-[#4A60A1] font-medium hover:underline">Login</a></p>
    </form>
  );
}
