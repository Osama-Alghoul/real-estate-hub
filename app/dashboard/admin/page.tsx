'use client';

import { useAuth } from "../../context/AuthContext";

export default function AdminLandingPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to Dashboard {user?.name}</h1>
      <p>{user?.role} features: Manage properties, users, etc.</p>
    </div>
  );
}
