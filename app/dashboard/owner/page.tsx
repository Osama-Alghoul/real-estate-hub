'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getCurrentUser, isAuthenticated, logout } from '../../../app/services/authService';

interface Props {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export default function OwnerLandingPage() {
  const router = useRouter();
  const [user, setUser] = useState<Props['user'] | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser || !isAuthenticated() || currentUser.role !== 'owner') {
      logout();
      router.replace('/login');
      return;
    }

    setUser(currentUser);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) return <p>Loading Owner Dashboard...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to Owner Dashboard</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Owner features: Add, Delete, Edit properties, accept/reject Booking Date.</p>
      <button onClick={handleLogout} className="mt-4 bg-red-600 text-white p-2 rounded">
        Logout
      </button>
    </div>
  );
}
