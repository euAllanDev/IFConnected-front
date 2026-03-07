"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";

// Importando o Lottie dinamicamente para evitar erros de SSR no Next.js
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

// Frases que serão digitadas e apagadas na tela
const PHRASES =[
  "Conectando você ao seu Campus.",
  "Fique por dentro de tudo do IFPB.",
  "Compartilhe conhecimento e projetos.",
  "Seu espaço acadêmico digital."
];

// --- COMPONENTE DE ANIMAÇÃO DE DIGITAÇÃO ---
function Typewriter() {
  const[text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const[loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const i = loopNum % PHRASES.length;
    const fullText = PHRASES[i];

    const handleTyping = () => {
      if (!isDeleting) {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(80);
        if (text === fullText) {
          setTimeout(() => setIsDeleting(true), 2500);
        }
      } else {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(40);
        if (text === "") {
          setIsDeleting(false);
          setLoopNum((prev) => prev + 1);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">
      {text}
      <span className="animate-pulse font-light text-green-400">|</span>
    </span>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function LoginPage() {
  const router = useRouter(); 
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const [error, setError] = useState("");
  const[loading, setLoading] = useState(false);
  
  const [bgImage, setBgImage] = useState("");
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Busca e pré-carrega a imagem aleatória
  useEffect(() => {
    let isMounted = true; 
    const randomNum = Math.floor(Math.random() * 1000);
    const imageUrl = `https://loremflickr.com/1920/1080/white?random=${randomNum}`;

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

    return () => {
      isMounted = false;
    };
  },[]);

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await api.login({ email, password });
      // ⚠️ IMPORTANTE: O login manual também precisa do token gerado pelo backend.
      // Se a sua API não retornar token no login manual, ele vai dar erro 401 depois.
      login(user);
      // O router.push() foi removido. O AuthContext assume o volante.
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

 const handleGoogleSuccess = async (credentialResponse: any) => {
    setError("");
    setLoading(true);
    try {
      const data = await api.loginGoogle(credentialResponse.credential);

      if (data.token && data.user) {
        localStorage.setItem("ifconnected:token", data.token);
        
        login(data.user); 
        // O router.push() foi removido daqui também! O AuthContext assume.
      }
    } catch (err: any) {
      console.error("Erro Google", err);
      setError("Falha ao autenticar com Google.");
    } finally {
      setLoading(false);
    }
  };

  if (isAppLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-green-600 to-emerald-800">
        <div className="w-64 h-64">
          <DotLottieReact
            src="https://lottie.host/7740660d-94d8-4637-97bc-295f2440d1f5/MoLIQ8jEaS.lottie"
            loop
            autoplay
          />
        </div>
        <p className="text-white font-bold tracking-widest mt-2 animate-pulse">
          PREPARANDO O AMBIENTE...
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center lg:justify-start p-4 lg:pl-32 lg:gap-24 xl:gap-32 bg-green-950 bg-cover bg-center bg-no-repeat transition-all duration-700"
      style={{ backgroundImage: bgImage ? `url('${bgImage}')` : "none" }}
    >
      <div className="absolute inset-0 bg-green-950/60 backdrop-blur-[2px]" />

      <div className="relative z-10 bg-white/40 dark:bg-black/40 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] w-full max-w-md border border-white/40 dark:border-white/10 transition-all flex-shrink-0 animate-in fade-in zoom-in duration-500">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-2 drop-shadow-sm">
            IFconnected
          </h1>
          <p className="text-slate-800 dark:text-slate-200 font-bold drop-shadow-sm">
            Bem-vindo de volta
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50/90 dark:bg-red-900/60 backdrop-blur-md border border-red-200 dark:border-red-800 flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-sm font-semibold text-red-700 dark:text-red-200">
              {error}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider ml-1 drop-shadow-sm">
              Email institucional
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500 dark:text-slate-400 group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="nome@ifpb.edu.br"
                className="block w-full pl-11 pr-4 py-3.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-white/50 dark:border-zinc-700/50 rounded-2xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/60 focus:border-green-500 transition-all font-medium shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider ml-1 drop-shadow-sm">
              Senha
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500 dark:text-slate-400 group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="block w-full pl-11 pr-4 py-3.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-white/50 dark:border-zinc-700/50 rounded-2xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/60 focus:border-green-500 transition-all font-medium shadow-inner"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed border border-white/20"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Autenticando...</span>
              </>
            ) : (
              <>
                <span>Entrar</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-slate-500/30 dark:border-zinc-400/30"></div>
          <span className="px-4 text-xs font-black text-slate-700 dark:text-slate-200 uppercase drop-shadow-sm">OU</span>
          <div className="flex-1 border-t border-slate-500/30 dark:border-zinc-400/30"></div>
        </div>

        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Login com Google falhou")}
            theme="outline"
            shape="pill"
            size="large"
            text="continue_with"
            width="100%"
          />
        </div>

        <div className="mt-8 pt-6 border-t border-slate-500/20 dark:border-zinc-400/20 text-center">
          <p className="text-sm text-slate-800 dark:text-slate-200 font-semibold drop-shadow-sm">
            Ainda não faz parte?{" "}
            <Link
              href="/register"
              className="font-black text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:underline decoration-2 underline-offset-2 transition-colors"
            >
              Criar conta agora
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex relative z-10 flex-col justify-center max-w-2xl text-left animate-in fade-in slide-in-from-right-8 duration-700">
        <h2 className="text-2xl font-semibold text-green-50 mb-2 drop-shadow-md tracking-wide">
          Conectando campus e pessoas.
        </h2>
        <div className="h-24 flex items-start">
          <Typewriter />
        </div>
      </div>
    </div>
  );
}