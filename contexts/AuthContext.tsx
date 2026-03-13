"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const[user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // 1. Carrega o usuário ao iniciar o app
  useEffect(() => {
    const storedUser = localStorage.getItem("ifconnected:user");
    if (storedUser) {
        try {
            setUser(JSON.parse(storedUser)); 
        } catch (e) {
            localStorage.removeItem("ifconnected:user");
        }
    }
    setIsLoading(false);
  },[]);
  
  // 2. VIGILANTE DE ROTAS (Aqui a mágica acontece)
  useEffect(() => {
  if (isLoading) return;

  const isAuthRoute = 
    pathname.includes("/login") || 
    pathname.includes("/register") || 
    pathname.includes("/apresentation") ||
    pathname.includes("/infoEnterprise");

  const isCompleteProfile = pathname.includes("/complete-profile");
  const isAdminRoute = pathname.startsWith("/admin"); // ← novo

  if (user) {
    if (!user.campusId && !isCompleteProfile && !isAdminRoute) {
      router.push("/complete-profile");
    } else if (user.campusId && (isAuthRoute || isCompleteProfile) && !isAdminRoute) {
      router.push("/feed");
    }
  } else {
    if (!isAuthRoute && !isAdminRoute) {
      router.push("/apresentation");
    }
  }
}, [user, isLoading, pathname, router]);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("ifconnected:user", JSON.stringify(userData));
    // Removemos o router.push("/feed") daqui! O useEffect acima fará o redirecionamento automático!
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ifconnected:user");
    localStorage.removeItem("ifconnected:token");
    router.push("/apresentation");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};