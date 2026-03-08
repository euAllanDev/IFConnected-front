"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { LandingNav } from "@/components/LandingNav"; // <-- NOSSO NOVO COMPONENTE

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

const PHRASES =[
  "Conectando você ao seu Campus.",
  "Fique por dentro de tudo do IFPB.",
  "Compartilhe conhecimento e projetos.",
  "Seu espaço acadêmico digital."
];

function Typewriter() {
  const [text, setText] = useState("");
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
    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight">
      {text}
      <span className="animate-pulse font-light text-green-400">|</span>
    </span>
  );
}

export default function ApresentationPage() {
  const router = useRouter();
  const [bgImage, setBgImage] = useState("");
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const randomNum = Math.floor(Math.random() * 1000);
    const imageUrl = `https://loremflickr.com/1920/1080/nature?random=${randomNum}`;

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

    const timeout = setTimeout(() => {
      if (isMounted) setIsAppLoading(false);
    }, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  },[]);

  if (isAppLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-green-800 to-emerald-950">
        <div className="w-64 h-64">
          <DotLottieReact src="https://lottie.host/7740660d-94d8-4637-97bc-295f2440d1f5/MoLIQ8jEaS.lottie" loop autoplay />
        </div>
        <p className="text-white font-bold tracking-widest mt-2 animate-pulse">CARREGANDO...</p>
      </div>
    );
  }

  return (
    // w-full e overflow-x-hidden garantem que não haverá barra lateral horizontal!
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col bg-green-950">
      
      {/* Imagem de Fundo Edge-to-Edge */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: bgImage ? `url('${bgImage}')` : "none" }}
      />
      {/* Overlay Escuro para destacar o texto */}
      <div className="absolute inset-0 w-full h-full bg-green-950/70 backdrop-blur-[2px]" />

      {/* COMPONENTE REUTILIZÁVEL DA NAV */}
      <LandingNav />

      {/* CONTEÚDO PRINCIPAL TELA CHEIA */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center w-full px-6 lg:px-20 xl:px-32 pt-24 pb-12 gap-12 lg:gap-0">
        
        {/* Lado Esquerdo - Animação Typewriter */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-green-300 mb-4 tracking-widest uppercase">
            A Rede Social do Instituto Federal
          </h2>
          <div className="h-32 md:h-40 flex items-start">
            <Typewriter />
          </div>
          <p className="text-green-50/80 text-lg max-w-md mt-4">
            Descubra eventos, conheça pessoas do seu campus e compartilhe seus projetos com a comunidade acadêmica.
          </p>
        </div>

        {/* Lado Direito - Call to Action (Caixa de vidro) */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/20 w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h3 className="text-3xl font-black text-white mb-2">Pronto para entrar?</h3>
            <p className="text-green-100 mb-8">Faça login com seu e-mail acadêmico ou crie uma conta agora mesmo.</p>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => router.push("/register")}
                className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] hover:-translate-y-1"
              >
                Começar Agora
              </button>
              
              <button 
                onClick={() => router.push("/login")}
                className="w-full py-4 bg-transparent border-2 border-white/30 hover:border-white text-white font-bold rounded-2xl transition-all hover:bg-white/10"
              >
                Já tenho conta
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}