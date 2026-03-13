"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { DashboardDTO } from "@/types";
import AdminGuard from "@/components/AdminGuard";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardDTO | null>(null);

  useEffect(() => {
    const userId = Number(localStorage.getItem("ifconnected:userId"));
    api.getDashboard(userId).then(setStats);
  }, []);

  if (!stats) return <div className="text-white">Carregando métricas...</div>;

  return (
    <AdminGuard>
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Usuários" value={stats.users} />
        <StatCard title="Vagas" value={stats.jobs} />
        <StatCard title="Posts" value={stats.posts} />
        <StatCard title="Campi" value={stats.campuses} />
      </div>
    </AdminGuard>
  );
}

// Sub-componente rápido para o card
function StatCard({ title, value }: { title: string, value: number }) {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-700">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-4xl font-bold text-emerald-500">{value}</p>
    </div>
  );
}