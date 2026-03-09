"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function RootPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Se tem usuário logado, manda para o Feed
        router.replace("/feed");
      } else {
        // 🚀 MUDANÇA AQUI: Se NÃO tem login, manda para a Apresentação
        router.replace("/apresentation"); 
      }
    }
  },[user, isLoading, router]);

  // Enquanto decide, mostra um loading centralizado
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
    </div>
  );
}