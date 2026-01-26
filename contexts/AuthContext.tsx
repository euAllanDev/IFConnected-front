// src/contexts/AuthContext.tsx

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/types";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "../services/authService";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUserAndPersist: (userData: User) => void;

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
  const storedUser = localStorage.getItem("ifconnected:user");

  // Se não tiver nada salvo, só libera a tela
  if (!storedUser) {
    setIsLoading(false);
    return;
  }

  try {
    const userData: User = JSON.parse(storedUser);
    setUser(userData);

    // ✅ Refresh no backend pra pegar dados atualizados (foto, username, etc)
    authService
      .getMe(userData.id) // ou api.getUserById(userData.id)
      .then((freshUser) => {
        setUser(freshUser);
        localStorage.setItem("ifconnected:user", JSON.stringify(freshUser));
      })
      .catch(() => {
        // Se falhar, mantém o que estava no localStorage
      })
      .finally(() => {
        setIsLoading(false);
      });
  } catch (e) {
    localStorage.removeItem("ifconnected:user");
    setUser(null);
    setIsLoading(false);
  }
}, []);

  // 2. Proteção de Rota (Redirecionamento)
  useEffect(() => {
    const isAuthRoute =
      pathname.includes("/login") || pathname.includes("/register");

    if (isLoading) return;

    if (user && isAuthRoute) {
      router.push("/feed");
    } else if (!user && !isAuthRoute) {
      router.push("/login");
    }
  }, [user, isLoading, pathname, router]);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("ifconnected:user", JSON.stringify(userData));
    router.push("/feed"); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ifconnected:user");
    router.push("/login"); 
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("ifconnected:user", JSON.stringify(userData));
  };

  const setUserAndPersist = (userData: User) => {
    setUser(userData);
    localStorage.setItem("ifconnected:user", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateUser, isAuthenticated: !!user, isLoading, setUserAndPersist }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
