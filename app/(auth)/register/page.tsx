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
    <div className="relative min-h-screen w-full flex items-center justify-center lg:justify-start p-4 lg:pl-32 lg:gap-24 xl:gap-32 bg-green-950 bg-cover bg-center bg-no-repeat transition-all duration-700" style={{ backgroundImage: bgImage ? `url('${bgImage}')` : "none" }}>
      <div className="absolute inset-0 bg-green-950/60 backdrop-blur-[2px]" />

      <div className="relative z-10 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] w-full max-w-md border border-white/40 dark:border-white/10 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 mb-2">IFconnected</h1>
          <p className="text-slate-800 dark:text-slate-200 font-bold">Criar nova conta</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50/90 dark:bg-red-900/60 backdrop-blur-md border border-red-200 flex items-center gap-3">
            <AlertCircle className="text-red-600" />
            <span className="text-sm font-semibold text-red-700">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
  {/* Inputs */}
  {[
    { label: "Nome de Usuário", icon: User, v: username, set: setUsername, type: "text", placeholder: "Seu nome" },
    { label: "Email institucional", icon: Mail, v: email, set: setEmail, type: "email", placeholder: "nome@academico.ifpb.edu.br" },
    { label: "Senha", icon: Lock, v: password, set: setPassword, type: "password", placeholder: "••••••••" }
  ].map((f, i) => (
    <div key={i} className="space-y-1">
      <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase ml-1">
        {f.label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <f.icon className="h-5 w-5 text-slate-500 group-focus-within:text-green-600" />
        </div>
        <input 
          type={f.type} 
          required 
          value={f.v} 
          onChange={(e) => f.set(e.target.value)} 
          placeholder={f.placeholder}
          className="block w-full pl-11 pr-4 py-3.5 bg-white/70 dark:bg-zinc-900/70 border border-zinc-900 rounded-2xl placeholder-slate-500 dark:placeholder-slate-500 focus:ring-2 focus:ring-green-500/60 outline-none transition-all shadow-inner" 
        />
      </div>
    </div>
  ))}

  {/* Campus Select */}
  <div className="space-y-1">
    <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase ml-1">
      Campus
    </label>
    <select 
      required 
      value={campusId} 
      onChange={(e) => setCampusId(e.target.value)} 
      className="block w-full px-4 py-3.5 bg-white/70 dark:bg-zinc-900/70 border border-zinc-900 rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-green-500/60 outline-none transition-all"
    >
      <option value="" disabled>Selecione seu Campus...</option>
      {campuses.map(c => (
        <option key={c.id} value={c.id}>{c.name}</option>
      ))}
    </select>
  </div>

  <button 
    disabled={loading} 
    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:scale-[1.02] transition-all disabled:opacity-70"
  >
    {loading ? <Loader2 className="animate-spin mx-auto" /> : "Cadastrar-se"}
  </button>
</form>

        <p className="mt-8 text-center text-sm text-white/80 font-semibold">
          Já tem conta? <Link href="/login" className="font-black text-green-700 hover:underline">Fazer login</Link>
        </p>
      </div>

      <div className="hidden lg:flex relative z-10 flex-col justify-center max-w-2xl text-left animate-in fade-in slide-in-from-right-8 duration-700">
        <h2 className="text-2xl font-semibold text-green-50 mb-2 tracking-wide">Bem-vindo ao IFconnected.</h2>
        <div className="h-24 flex items-start"><Typewriter /></div>
      </div>
    </div>
  );
}