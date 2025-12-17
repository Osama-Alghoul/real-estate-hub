'use client';

import LoginForm from '../../../components/auth/LoginForm';
import { useAuth } from "../../context/AuthContext";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (user) {
      const redirect = searchParams.get("redirect");

      if (redirect) {
        router.replace(redirect);
      } else {
        router.replace("/");
      }
    }
  }, [user, router, searchParams]);

  return <LoginForm />;
}
