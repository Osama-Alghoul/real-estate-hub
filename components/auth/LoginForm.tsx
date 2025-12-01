'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../app/services/authService';
import type { LoginFormData } from '../../types/auth';

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormData>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(form);
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
      <div className="text-center mb-4">
        <h2 className="text-5xl font-bold text-[#1E2640]">Login</h2>
        <p className="text-[#889099] mt-1">Enter your credentials to continue</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-[#363A3D]">Email</label>
          <input name="email" type="email" placeholder="example@mail.com" value={form.email} onChange={handleChange} required className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#4A60A1]/50 focus:border-[#4A60A1] outline-none transition" />
        </div>

        <div>
          <label className="text-sm font-medium text-[#363A3D]">Password</label>
          <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required className="mt-1 w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#4A60A1]/50 focus:border-[#4A60A1] outline-none transition" />
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button type="submit" disabled={loading} className="w-full bg-[#4A60A1] text-white py-3 rounded-lg font-medium hover:bg-[#4A60A1]/90 transition">
        {loading ? "Loading..." : "Login"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Don’t have an account? <a href="/register" className="text-[#4A60A1] font-medium hover:underline">Register</a>
      </p>
    </form>
  );
}
