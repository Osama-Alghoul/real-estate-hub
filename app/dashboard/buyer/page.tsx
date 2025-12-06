'use client';
import { useAuth } from "../../context/AuthContext";

export default function BuyerLandingPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome to Dashboard {user?.name}</h1>
      <p>{user?.role} features: Explore properties, favorites, etc.</p>
    </div>
  );
}
