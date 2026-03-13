"use client";

import React, { useState } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext"; // 1. Importe o seu contexto

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth(); // 2. Pegue a função login do contexto
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: any = await api.adminLogin({ email: formData.email, password: formData.password });
      login(response.user); // Seta no contexto
      
      // O Login é quem redireciona, não o useEffect!
      if (response.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/feed");
      }
    } catch (e) {
      alert("Erro no login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-sm p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl">
        <h2 className="text-red-500 font-bold text-center text-2xl mb-6 tracking-widest">
            ACESSO RESTRITO
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Admin Email"
            className="bg-black border border-zinc-700 p-3 rounded text-white"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Senha"
            className="bg-black border border-zinc-700 p-3 rounded text-white"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded mt-2 transition">
            ENTRAR NO PAINEL
          </button>
        </form>
      </div>
    </div>
  );
}