"use client";

import React, { useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

export default function CreateJobForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    type: "CLT",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userId = Number(localStorage.getItem("ifconnected:userId"));
    
    try {
      // Agora enviamos JSON simples!
      await api.createJob(userId, {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        location: formData.location,
        type: formData.type,
        // imageUrl: formData.imageUrl // Opcional
      });
      router.push("/jobs");
    } catch (err) {
      alert("Erro ao criar vaga!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl flex flex-col gap-4 border border-gray-700">
      <input 
        placeholder="Título da Vaga" 
        className="bg-gray-900 p-3 rounded text-white"
        onChange={(e) => setFormData({...formData, title: e.target.value})}
      />
      <textarea 
        placeholder="Descrição da Vaga" 
        className="bg-gray-900 p-3 rounded text-white h-32"
        onChange={(e) => setFormData({...formData, description: e.target.value})}
      />
      <input 
        placeholder="Requisitos (Techs)" 
        className="bg-gray-900 p-3 rounded text-white"
        onChange={(e) => setFormData({...formData, requirements: e.target.value})}
      />
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        className="text-gray-400"
      />
      <button 
        disabled={loading}
        className="bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700"
      >
        {loading ? "Publicando..." : "Publicar Vaga"}
      </button>
    </form>
  );
}