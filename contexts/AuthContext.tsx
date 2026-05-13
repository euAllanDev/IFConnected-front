"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUserAndPersist: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

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
  }, []);

  // Route guard
  useEffect(() => {
    if (isLoading) return;

    const isAuthRoute =
      pathname.includes("/login") ||
      pathname.includes("/register") ||
      pathname.includes("/apresentation") ||
      pathname.includes("/infoEnterprise");

    const isCompleteProfile = pathname.includes("/complete-profile");

    if (user) {
      if (!user.campusId && !isCompleteProfile) {
        router.push("/complete-profile");
      } else if (user.campusId && (isAuthRoute || isCompleteProfile)) {
        router.push("/feed");
      }
    } else {
      if (!isAuthRoute) {
        router.push("/apresentation");
      }
    }
  }, [user, isLoading, pathname, router]);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("ifconnected:user", JSON.stringify(userData));
    toast.success(`Bem-vindo de volta, ${userData.username}!`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ifconnected:user");
    localStorage.removeItem("ifconnected:token");
    toast.info("Você saiu da sua conta");
    router.push("/apresentation");
  };

  const setUserAndPersist = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("ifconnected:user", JSON.stringify(updatedUser));
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent("ifconnected:user-updated"));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isLoading,
        setUserAndPersist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
