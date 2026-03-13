"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
import { Job } from "@/types";

export default function JobFeed() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Usamos o useEffect para buscar as vagas assim que o componente monta
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await api.getAllJobs();
      setJobs(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar vagas");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId: number) => {
    const userId = Number(localStorage.getItem("ifconnected:userId"));
    if (!userId) return alert("Você precisa estar logado!");

    // Um modal simples (pode virar um Dialog bonito depois)
    const coverLetter = window.prompt("Escreva uma breve apresentação (Opcional):");
    
    if (coverLetter !== null) { // null significa que ele cancelou o prompt
      try {
        await api.applyToJob(jobId, { userId, coverLetter });
        alert("Candidatura enviada com sucesso!");
      } catch (err: any) {
        alert(err.message || "Erro ao se candidatar.");
      }
    }
  };

  if (loading) return <div className="text-center text-gray-400">Carregando vagas...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (jobs.length === 0) return <div className="text-center text-gray-400">Nenhuma vaga disponível no momento.</div>;

  return (
    <div className="flex flex-col gap-4">
      {jobs.map((job) => (
        <div key={job.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-md">
          
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-semibold text-white">{job.title}</h2>
            <span className="bg-green-900 text-green-300 text-xs font-bold px-2 py-1 rounded">
              {job.type || "Full-time"}
            </span>
          </div>

          <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
            📍 {job.location || "Não especificado"} • 🏢 Empresa ID: {job.companyId}
          </p>

          <p className="text-gray-300 mb-4 line-clamp-3">
            {job.description}
          </p>

          {job.requirements && (
            <div className="mb-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Requisitos</h4>
              <p className="text-sm text-gray-300">{job.requirements}</p>
            </div>
          )}

          <div className="flex justify-end border-t border-gray-700 pt-4 mt-2">
            <button 
              onClick={() => handleApply(job.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Candidatar-se
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}