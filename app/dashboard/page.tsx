'use client';

import { useAuth } from "../context/AuthContext";
import AdminLandingPage from './admin/page';
import BuyerLandingPage from './buyer/page';
import OwnerLandingPage from './owner/page';
export default function DashboardRole() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminLandingPage />;
    case 'buyer':
      return <BuyerLandingPage />;
    case 'owner':
      return <OwnerLandingPage />;
    default:
      return <p>Unknown role</p>;
  }
}
