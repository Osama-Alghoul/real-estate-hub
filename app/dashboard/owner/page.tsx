'use client';

import { useAuth } from "../../context/AuthContext";
import DashboardPage from "./dashboard";

export default function OwnerLandingPage() {
   const { user } = useAuth();

  return (
    <div className="flex-1 space-y-6 p-6">
     <DashboardPage name={user?.name || ''} />
    </div>
  )
}
