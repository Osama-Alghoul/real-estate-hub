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

export default function BuyerLandingPage() {
  const router = useRouter();
  const [user, setUser] = useState<Props['user'] | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!currentUser || !isAuthenticated() || currentUser.role !== 'buyer') {
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

  if (!user) return <p>Loading Buyer Dashboard...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to Buyer Dashboard</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Buyer features: Browse properties, make offers.</p>
      <button onClick={handleLogout} className="mt-4 bg-red-600 text-white p-2 rounded">
        Logout
      </button>
    </div>
  );
}
