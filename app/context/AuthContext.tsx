"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  isAuthenticated,
  logout as authLogout,
} from "../services/authService";
import { User } from "@/types/auth";
import { login as loginService } from "../services/authService";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ user?: User; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => ({ error: "Not implemented" }),
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser && isAuthenticated()) setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await loginService({ email, password });
    if (res.user) {
      setUser(res.user);
      router.replace(
        `/dashboard/${res.user.role}?name=${encodeURIComponent(res.user.name)}`
      );
    }
    return res;
  };

  const logout = () => {
    authLogout();
    setUser(null);
    router.replace("/"); 
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
