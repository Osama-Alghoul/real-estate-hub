"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function BookViewingButton({ propertyId }: { propertyId: string }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return null;

  const handleClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      router.push(`/login?redirect=/booking?propertyId=${propertyId}`);
    }
  };

  return (
    <Link
      href={`/booking?propertyId=${propertyId}`}
      onClick={handleClick}
      className="block w-full bg-white text-blue-600 px-6 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 transform text-center"
    >
      Book a Viewing
    </Link>
  );
}
