'use client';

import LoginForm from '../../../components/auth/LoginForm';
import { useAuth } from "../../context/AuthContext";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
        if (user) {
      router.replace(`/dashboard/${user.role}?name=${encodeURIComponent(user.name)}`);
    }
  }, [user, router]);

  return <LoginForm />;
}
