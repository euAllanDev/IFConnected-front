// src/app/(main)/manage-jobs/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/services/api";
// IMPORTANTE: Adicionado ApplicationStatus na importação abaixo 👇
import { CandidateResponseDTO, Job, ApplicationStatus } from "@/types"; 

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Estado para controlar qual vaga o recrutador clicou para ver os candidatos
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [candidates, setCandidates] = useState<CandidateResponseDTO[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);

  useEffect(() => {
    fetchCompanyJobs();
  }, []);

  const fetchCompanyJobs = async () => {
    try {
      const userId = Number(localStorage.getItem("ifconnected:userId"));
      if (!userId) throw new Error("Usuário não logado.");

      const data = await api.getCompanyJobs(userId);
      setJobs(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar suas vagas.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewCandidates = async (job: Job) => {
    setSelectedJob(job);
    setLoadingCandidates(true);
    try {
      const companyId = Number(localStorage.getItem("ifconnected:userId"));
      const data = await api.getJobCandidates(job.id, companyId);
      setCandidates(data);
    } catch (err) {
      alert("Erro ao carregar candidatos.");
    } finally {
      setLoadingCandidates(false);
    }
  };

  const handleStatusChange = async (applicationId: number, newStatus: ApplicationStatus) => {
    try {
      const companyId = Number(localStorage.getItem("ifconnected:userId"));
      
      // Bate na API para atualizar no banco
      await api.updateApplicationStatus(applicationId, { companyId, status: newStatus });
      
      // Atualiza a tela sem precisar recarregar (Otimista)
      setCandidates(candidates.map(app => 
        app.applicationId === applicationId ? { ...app, status: newStatus } : app
      ));
      
      alert(`Status alterado para ${newStatus}`);
    } catch (err: any) {
      alert(err.message || "Erro ao atualizar status.");
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-400">Carregando painel...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* COLUNA ESQUERDA: LISTA DE VAGAS DA EMPRESA */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Minhas Vagas Publicadas</h1>
        
        {jobs.length === 0 ? (
          <p className="text-gray-400 bg-gray-800 p-4 rounded border border-gray-700">Você ainda não publicou nenhuma vaga.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {jobs.map(job => (
              <div 
                key={job.id} 
                onClick={() => handleViewCandidates(job)}
                className={`p-4 rounded-xl border cursor-pointer transition ${selectedJob?.id === job.id ? 'bg-gray-700 border-green-500' : 'bg-gray-800 border-gray-700 hover:border-gray-500'}`}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-white">{job.title}</h2>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${job.active ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                    {job.active ? 'Ativa' : 'Encerrada'}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{job.type} • {job.location}</p>
                <p className="text-xs text-green-400 mt-3 font-semibold">👉 Clique para ver os candidatos</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* COLUNA DIREITA: LISTA DE CANDIDATOS (Aparece ao clicar numa vaga) */}
      <div>
        {selectedJob ? (
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 sticky top-4">
            <h2 className="text-xl font-bold text-white mb-4">
              Candidatos: {selectedJob.title}
            </h2>

            {loadingCandidates ? (
              <p className="text-gray-400">Buscando talentos...</p>
            ) : candidates.length === 0 ? (
              <p className="text-gray-400 bg-gray-900 p-4 rounded">Ninguém se candidatou ainda.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {candidates.map(app => (
                  <div key={app.applicationId} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    
                    {/* Cabeçalho do Card do Candidato */}
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        {/* FOTO OU INICIAL */}
                        <div className="w-10 h-10 bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border border-gray-600">
                          {app.candidatePhoto ? (
                            <img src={app.candidatePhoto} alt="Avatar" className="w-full h-full object-cover"/>
                          ) : (
                                <span className="text-gray-400 text-sm font-bold uppercase">
                                    {app.candidateName ? app.candidateName.charAt(0) : "C"}
                                </span>)}
                        </div>
                        
                        {/* NOME E EMAIL */}
                        <div>
                          <p className="font-bold text-white text-md">{app.candidateName}</p>
                          <p className="text-xs text-gray-400">{app.candidateEmail}</p>
                        </div>
                      </div>

                      {/* STATUS ATUAL */}
                      <span className="text-xs font-bold px-2 py-1 rounded bg-gray-800 text-gray-300">
                        Status: {app.status}
                      </span>
                    </div>

                    {/* CARTA DE APRESENTAÇÃO */}
                    {app.coverLetter && (
                      <div className="mt-3 text-sm text-gray-300 border-l-2 border-emerald-600 pl-3 italic bg-gray-800/50 py-2 rounded-r">
                        "{app.coverLetter}"
                      </div>
                    )}

                    {/* BOTÕES DE AÇÃO (FUNIL) */}
                    <div className="mt-4 flex gap-2 border-t border-gray-700 pt-3">
                        <button 
                          onClick={() => handleStatusChange(app.applicationId, "REVIEWED")}
                          className="text-xs bg-blue-900 hover:bg-blue-800 text-blue-200 px-3 py-1 rounded transition"
                        >
                          Marcar Visto
                        </button>
                        
                        <button 
                          onClick={() => handleStatusChange(app.applicationId, "INTERVIEW")}
                          className="text-xs bg-purple-900 hover:bg-purple-800 text-purple-200 px-3 py-1 rounded transition"
                        >
                          Chamar p/ Entrevista
                        </button>

                        {/* O ml-auto joga o botão de Dispensar pro lado direito */}
                        <button 
                          onClick={() => handleStatusChange(app.applicationId, "REJECTED")}
                          className="text-xs bg-red-900/50 hover:bg-red-800/80 text-red-300 px-3 py-1 rounded transition ml-auto"
                        >
                          Dispensar
                        </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 border-dashed flex items-center justify-center h-full min-h-[300px]">
            <p className="text-gray-500 text-center">Selecione uma vaga ao lado para ver quem se candidatou.</p>
          </div>
        )}
      </div>

    </div>
  );
}