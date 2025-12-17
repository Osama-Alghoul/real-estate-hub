"use client";

import { ReactNode, useEffect } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || !user) return;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role={user.role} onLogout={logout} />
      <div className="flex-1 flex flex-col">
        <Header
          name={user.name}
          role={user.role}
          avatar={user.avatar}
          onLogout={logout}
        />
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
