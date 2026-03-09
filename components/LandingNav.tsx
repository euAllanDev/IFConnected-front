import Link from "next/link";

export function LandingNav() {
  return (
    // 'absolute' faz a nav flutuar sobre a imagem de fundo. 'z-50' garante que fique na frente.
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-5 lg:px-16 bg-gradient-to-b from-black/60 to-transparent">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link href="/apresentation">
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white drop-shadow-lg cursor-pointer hover:opacity-80 transition-opacity">
            IFConnected
          </span>
        </Link>
      </div>

      {/* Links de Navegação */}
      <div className="flex items-center gap-6 md:gap-8">
        <Link 
          href="/apresentation" 
          className="text-white/90 hover:text-green-400 font-medium transition-colors hidden sm:block"
        >
          Início
        </Link>
        <Link 
          href="/infoEnterprise" 
          className="text-white/90 hover:text-green-400 font-medium transition-colors hidden sm:block"
        >
          Sobre o Projeto
        </Link>

        {/* Botões de Ação */}
        <div className="flex items-center gap-3">
          <Link 
            href="/login" 
            className="text-white font-bold hover:text-green-300 transition-colors"
          >
            Entrar
          </Link>
          <Link 
            href="/register" 
            className="hidden md:block px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]"
          >
            Criar Conta
          </Link>
        </div>
      </div>

    </nav>
  );
}