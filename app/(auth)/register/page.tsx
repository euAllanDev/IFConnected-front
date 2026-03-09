"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/authService";
import { api, Campus } from "@/services/api";
import Link from "next/link";
import { UserPlus, AlertCircle, MapPin, Mail, Lock, User, Loader2 } from "lucide-react";

// Importando o Lottie dinamicamente
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

const PHRASES = ["Junte-se à comunidade IFPB.", "Crie seu perfil acadêmico.", "Conecte-se com seu campus.", "O seu futuro começa aqui."];

function Typewriter() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const i = loopNum % PHRASES.length;
    const fullText = PHRASES[i];
    const handleTyping = () => {
      if (!isDeleting) {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(80);
        if (text === fullText) setTimeout(() => setIsDeleting(true), 2500);
      } else {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(40);
        if (text === "") { setIsDeleting(false); setLoopNum((prev) => prev + 1); }
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return <span className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">{text}<span className="animate-pulse font-light text-green-400">|</span></span>;
}

export default function RegisterPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [campusId, setCampusId] = useState("");
  const [password, setPassword] = useState("");
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estados de carregamento idênticos ao Login
  const [bgImage, setBgImage] = useState("");
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
  let isMounted = true;

  const randomNum = Math.floor(Math.random() * 1000);
  const imageUrl = `https://picsum.photos/1920/1080?random=${randomNum}`;

  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    if (isMounted) {
      setBgImage(imageUrl);
      setIsAppLoading(false);
    }
  };

  img.onerror = () => {
    if (isMounted) setIsAppLoading(false);
  };

  api.getAllCampuses().then(setCampuses).catch(console.error);

  return () => {
    isMounted = false;
  };
}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campusId) return setError("Por favor, selecione seu Campus.");
    setLoading(true);
    setError(null);
    try {
      await authService.register({ email, username, campusId: Number(campusId), password });
      const user = await api.login({ email, password });
      login(user);
    } catch (err: any) { setError(err.message || "Erro ao criar conta."); }
    finally { setLoading(false); }
  };

  // Tela de Loading (idêntica ao Login)
  if (isAppLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-green-600 to-emerald-800">
        <div className="w-64 h-64">
          <DotLottieReact src="https://lottie.host/7740660d-94d8-4637-97bc-295f2440d1f5/MoLIQ8jEaS.lottie" loop autoplay />
        </div>
        <p className="text-white font-bold tracking-widest mt-2 animate-pulse">PREPARANDO O AMBIENTE...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-indigo-900 to-sky-900">
      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/10 dark:border-zinc-800">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 dark:bg-sky-500/15 flex items-center justify-center mb-3 border border-sky-500/20">
            <UserPlus size={26} className="text-sky-600 dark:text-sky-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
            Criar conta
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            Junte-se à rede do IF
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50/90 dark:bg-red-900/60 backdrop-blur-md border border-red-200 flex items-center gap-3">
            <AlertCircle className="text-red-600" />
            <span className="text-sm font-semibold text-red-700">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
              Usuário
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu nome público"
                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-zinc-950/40 border border-slate-200 dark:border-zinc-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
              Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@if.edu.br"
                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-zinc-950/40 border border-slate-200 dark:border-zinc-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Senha (CORRIGIDA: agora igual aos outros inputs) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
              Senha
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-zinc-950/40 border border-slate-200 dark:border-zinc-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Campus */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
              Seu Campus
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
              </div>
              <select
                required
                value={campusId}
                onChange={(e) => setCampusId(e.target.value)}
                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-zinc-950/40 border border-slate-200 dark:border-zinc-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all font-medium appearance-none cursor-pointer"
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
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Ajuda a encontrar eventos e pessoas próximas.
            </p>
          </div>

          <button
            disabled={loading}
            className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Criando...</span>
              </>
            ) : (
              "Criar conta"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Já tem conta?{" "}
            <Link
              href="/login"
              className="font-bold text-sky-500 hover:text-sky-600 hover:underline decoration-2 underline-offset-2"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}