"use client";

import Footer from "@/components/layout/footer";
import Cards from "@/components/main-page/cards";
import CTA from "@/components/main-page/CTA";
import Hero from "@/components/main-page/hero";
import PlatformFeatures from "@/components/main-page/platformFeatures";
import PropertiesAreaGallery from "@/components/main-page/PropertiesAreaGallery";
import Slider from "@/components/main-page/slider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  // this is will be landing page, so must change Home -> LandingPage
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUserRole(data.user.role);
          router.push(`/${data.user.role.toLowerCase()}`);
        }
      });
  }, []);

  if (userRole) return null; // redirecting user

  return (
    <>
      <Hero />
      <PropertiesAreaGallery />
      <PlatformFeatures />
      <Cards />
      <Slider />
      <CTA />
      <Footer />
    </>
  );
}
