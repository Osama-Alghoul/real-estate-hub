'use client';

import RegisterForm from '../../components/auth/RegisterForm';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-white w-full grid grid-cols-1 lg:grid-cols-2">
      <div className="relative lg:flex flex-col justify-center bg-[#f5f5f5]">
        <div className="absolute bottom-10 left-10 text-white max-w-md z-10">
          <h1 className="text-3xl font-bold mb-3">
            Manage Properties Efficiently
          </h1>
          <p className="text-sm opacity-80 leading-relaxed">
            Easily track rent payments, maintenance requests, and tenant
            communications in one place. Say goodbye to manual management.
          </p>
        </div>
        <div className="mt-10 w-100 h-100 z-1 opacity-95">
          <Image
            src="/banner/banner.jpg"
            alt="Houses"
            fill
            className="object-cover rounded-r-xs"
          />
        </div>
      </div>

      <div className="flex items-center justify-center px-4"><RegisterForm /></div>
    </div>
  );
}
