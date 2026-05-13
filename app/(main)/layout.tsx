"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Loader2 } from "lucide-react";
import { SugestoesBar } from "@/features/suggestions/SugestoesBar";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-black text-xl">IF</span>
          </div>
          <Loader2 className="animate-spin text-primary" size={24} />
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <div className="min-h-screen bg-background">
        <div className="max-w-[1200px] mx-auto flex">
          <Sidebar user={user!} />

          <main className="flex-1 min-h-screen border-x border-border md:ml-[275px] w-full md:pt-0 pt-14">
            {children}
          </main>

          <aside className="w-80 p-4 sticky top-0 hidden lg:block h-screen overflow-y-auto">
            <div className="space-y-4">
              <SugestoesBar />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
