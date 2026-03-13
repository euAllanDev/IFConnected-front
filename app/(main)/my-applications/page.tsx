"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { MyApplicationDTO } from "@/types";

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<MyApplicationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyApplications();
  }, []);

  const fetchMyApplications = async () => {
    try {
      const userId = Number(localStorage.getItem("ifconnected:userId"));
      if (!userId) throw new Error("Usuário não logado");

      const data = await api.getMyApplications(userId);
      setApplications(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar candidaturas.");
    } finally {
      setLoading(false);
    }
  };

  // Função para mapear o status do banco para um visual amigável (Tailwind badges)
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <span className="bg-yellow-900 text-yellow-300 text-xs px-2 py-1 rounded">Em Análise</span>;
      case "REVIEWED":
        return <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded">Visualizado</span>;
      case "INTERVIEW":
        return <span className="bg-purple-900 text-purple-300 text-xs px-2 py-1 rounded">Entrevista</span>;
      case "OFFER":
        return <span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded">Proposta! 🎉</span>;
      case "REJECTED":
        return <span className="bg-red-900 text-red-300 text-xs px-2 py-1 rounded">Não aprovado</span>;
      case "WITHDRAWN":
        return <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">Desistente</span>;
      default:
        return <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">{status}</span>;
    }
  };

  // Formatar data (ex: 15/03/2026)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) return <div className="text-center text-gray-400 mt-10">Carregando suas candidaturas...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-white mb-2">Minhas Candidaturas</h1>
      <p className="text-gray-400 mb-6">Acompanhe o status das vagas que você aplicou.</p>

      {applications.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg text-center border border-gray-700">
          <p className="text-gray-400">Você ainda não se candidatou a nenhuma vaga.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => (
            <div key={app.applicationId} className="bg-gray-800 p-5 rounded-lg border border-gray-700 flex justify-between items-center shadow-sm">
              <div>
                <h2 className="text-lg font-bold text-white">{app.jobTitle}</h2>
                <p className="text-sm text-gray-400">🏢 {app.companyName}</p>
                <p className="text-xs text-gray-500 mt-2">Aplicado em: {formatDate(app.appliedAt)}</p>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                {getStatusBadge(app.status)}
                
                {/* Botão de desistir (apenas para exemplo, podemos implementar depois) */}
                {app.status === "PENDING" && (
                   <button className="text-xs text-red-400 hover:text-red-300 underline mt-2">
                     Cancelar Candidatura
                   </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}