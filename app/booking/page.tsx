import HeroSection from "@/components/booking/HeroSection";
import BookingContent from "@/components/booking/BookingContent";
import BookingInfoStrip from "@/components/booking/BookingInfoStrip";
import { Property } from "@/types/property";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface BookingPageProps {
  searchParams: Promise<{ propertyId?: string }>;
}

async function getProperty(id: string): Promise<Property | null> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3001";
    const res = await fetch(`${API_URL}/properties/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const { propertyId } = await searchParams;

  if (!propertyId) {
    redirect("/properties");
  }

  const property = await getProperty(propertyId);

  if (!property) {
    redirect("/properties");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <HeroSection />
      <BookingContent property={property} />
      <BookingInfoStrip />
      <Footer />
    </div>
  );
}
