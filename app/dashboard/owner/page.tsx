'use client';

import { useAuth } from "../../context/AuthContext";

export default function OwnerLandingPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to Dashboard {user?.name}</h1>
      <p>{user?.role} features: Add, Delete, Edit properties, accept/reject Booking Date.</p>
    </div>
  );
}
