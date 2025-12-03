'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { getCurrentUser, isAuthenticated, logout } from '../services/authService';
import AdminLandingPage from './admin/page';
import BuyerLandingPage from './buyer/page';
import OwnerLandingPage from './owner/page';

interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function DashboardRole() {
  const router = useRouter();
  const params = useParams() as { role?: string };
  const searchParams = useSearchParams();

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    const tokenValid = isAuthenticated();

    if (!currentUser || !tokenValid) {
      logout();
      router.replace('/login');
      return;
    }

    if (params.role !== currentUser.role) {
      router.replace(`/dashboard/${currentUser.role}?name=${encodeURIComponent(currentUser.name)}`);
      return;
    }

    const queryName = searchParams.get('name');
    if (!queryName || queryName !== currentUser.name) {
      router.replace(`/dashboard/${currentUser.role}?name=${encodeURIComponent(currentUser.name)}`);
      return;
    }

    setUser(currentUser);
    setLoading(false);
  }, [router, params.role, searchParams]);

  if (loading) return <p>Loading dashboard...</p>;
  if (!user) return null; 

  switch (user.role) {
    case 'admin':
      return <AdminLandingPage user={user} />;
    case 'buyer':
      return <BuyerLandingPage user={user} />;
    case 'owner':
      return <OwnerLandingPage user={user} />;
    default:
      return <p>Unknown role</p>;
  }
}
