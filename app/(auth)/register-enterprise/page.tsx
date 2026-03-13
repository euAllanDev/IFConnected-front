"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

export default function RegisterEnterprise() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "", // Nome da Empresa
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("1. Tentando cadastrar empresa...");
      
      // O truque aqui é não mandar a chave campusId se não for obrigatória no banco
      // Ou mandar null
      await api.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "COMPANY",
        // Deixe campusId de fora ou mande como string vazia dependendo de como está tipado
      } as any);

      console.log("2. Cadastro deu sucesso! Tentando fazer login...");

      // Tenta logar
      const user = await api.login({ 
        email: formData.email, 
        password: formData.password 
      });

      console.log("3. Login com sucesso. Token salvo. Redirecionando...", user);
      
      // Manda pro jobs (e NÃO pro feed)
      router.push("/jobs");

    } catch (err: any) {
      console.error("ERRO NO FLUXO:", err);
      setError(err.message || "Falha no processo. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c] text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl border border-gray-700 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Cadastro de Empresa</h1>
        <p className="text-gray-400 text-center mb-8">Junte-se à comunidade IFConnected</p>

        {error && <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nome da Empresa</label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-green-500 focus:outline-none"
              placeholder="Ex: Nubank, Google, IFPB"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">E-mail Corporativo</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-green-500 focus:outline-none"
              placeholder="vagas@empresa.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Senha</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-green-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-3 rounded transition-colors disabled:opacity-50"
          >
            {loading ? "Cadastrando..." : "Criar Conta Corporativa"}
          </button>
        </form>
      </div>
    </div>
  );
}