"use client";

import HomeLandingPage from "../app/landing/page"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
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
  return <HomeLandingPage />;
}
