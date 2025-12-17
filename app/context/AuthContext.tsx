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
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser && isAuthenticated()) {
      setUser(currentUser as User);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await loginService({ email, password });
    if (res.user) {
      setUser(res.user);
      router.replace(`/dashboard/${res.user.role}`);
    }
    return res;
  };

  const logout = () => {
    authLogout();
    setUser(null);
    router.push("/login");
  };

  const updateUser = (data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };

      localStorage.setItem(
        "authUser",
        JSON.stringify({
          id: updated.id,
          name: updated.name,
          email: updated.email,
          role: updated.role,
          avatar: updated.avatar,
        })
      );

      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
