'use client';

import LoginForm from '../../../components/auth/LoginForm';
import { isAuthenticated, getCurrentUser } from '../../services/authService';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated()) {
      const user = getCurrentUser();
      if (user) router.replace(`/dashboard/${user.role}?name=${encodeURIComponent(user.name)}`);
    }
  }, [router]);

  return (
    <LoginForm />
  );
}
