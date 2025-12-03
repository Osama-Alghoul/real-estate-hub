import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white w-full grid grid-cols-1 lg:grid-cols-2">
      <div className="relative lg:flex flex-col justify-center bg-[#f5f5f5]">
        <div className="absolute md:top-10 md:left-10 top-5 left-5 text-primary max-w-md z-10">
          <Link href="/">
            <ArrowLeft className="cursor-pointer bg-primary text-white rounded-full" />
          </Link>
          <h1 className="text-3xl font-bold mb-3">
            Manage Properties Efficiently
          </h1>
          <p className="text-sm opacity-80 leading-relaxed">
            Easily track rent payments, maintenance requests, and tenant
            communications in one place. Say goodbye to manual management.
          </p>
        </div>
        <div className="mt-10 max-w-100 h-50 z-1 lg:opacity-95 opacity-30">
          <Image
            src="/banner/banner.jpg"
            alt="Houses"
            fill
            className="object-cover rounded-r-xs"
          />
        </div>
      </div>

      <div className="flex items-center justify-center px-4 relative">
        {children}
      </div>
    </div>
  );
}
