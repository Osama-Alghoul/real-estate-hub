"use client";

import Card from "@/components/common/Card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() { // this is will be landing page, so must change Home -> LandingPage
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
    <div className="px-20">
      <Card
        img="/properties/P1.png"
        title="92 ALLIUM PLACE, ORLANDO FL 32827"
        avatar="/pepole/A1.png"
        price={590693}
        garag={4}
        bath={4}
        size={2096.00}
        name="Jenny Wilson"
      />
    </div>
  );
}
