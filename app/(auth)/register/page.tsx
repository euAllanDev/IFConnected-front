"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/authService";
import { api, Campus } from "@/services/api"; // Importe a interface Campus
import Link from "next/link";
import { UserPlus, ArrowLeft, AlertCircle, MapPin } from "lucide-react";

export default function RegisterPage() {
  const { login } = useAuth();

  // Estados do Form
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [campusId, setCampusId] = useState(""); // String para o select, converte depois

  // Estados de Dados e UI
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Carregar lista de Campi ao iniciar
  useEffect(() => {
    api
      .getAllCampuses()
      .then(setCampuses)
      .catch((err) => console.error("Erro ao carregar campi", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples
    if (!campusId) {
      setError("Por favor, selecione seu Campus.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // POST para /api/users com o campusId
      const user = await authService.register({
        email,
        username,
        campusId: Number(campusId), // Converte para number
      });

      login(user);
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 transition-colors">
      <div className="flex flex-col items-center mb-8">
        <UserPlus
          size={36}
          className="text-indigo-600 dark:text-sky-500 mb-3"
        />
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">
          Cadastre-se
        </h1>
        <p className="text-slate-500 text-sm mt-2">Junte-se à rede do IF</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Usuário
          </label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg bg-slate-50 dark:bg-slate-700 dark:border-slate-600 focus:ring-indigo-500 outline-none transition-colors text-slate-900 dark:text-slate-50"
            placeholder="Seu nome público"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg bg-slate-50 dark:bg-slate-700 dark:border-slate-600 focus:ring-indigo-500 outline-none transition-colors text-slate-900 dark:text-slate-50"
            placeholder="seu.email@if.edu.br"
          />
        </div>

        {/* --- NOVO: SELEÇÃO DE CAMPUS --- */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            Seu Campus
          </label>
          <div className="relative">
            <MapPin
              className="absolute left-3 top-3.5 text-slate-400"
              size={18}
            />
            <select
              required
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className="w-full p-3 pl-10 border rounded-lg bg-slate-50 dark:bg-slate-700 dark:border-slate-600 focus:ring-indigo-500 outline-none transition-colors text-slate-900 dark:text-slate-50 appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Selecione sua unidade...
              </option>
              {campuses.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus.name}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Isso ajuda a encontrar eventos e pessoas próximas.
          </p>
        </div>
        {/* ------------------------------- */}

        {error && (
          <div className="text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm flex gap-2 border border-red-200 dark:border-red-800">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <button
          disabled={loading}
          className="w-full bg-indigo-600 dark:bg-sky-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 dark:hover:bg-sky-600 transition disabled:opacity-60"
        >
          {loading ? "Criando..." : "Criar Conta"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
        Já tem conta?{" "}
        <Link
          href="/login"
          className="text-indigo-600 dark:text-sky-500 font-bold hover:underline transition"
        >
          Fazer Login
        </Link>
      </p>
    </div>
  );
}
