"use client";

import { LandingNav } from "@/components/LandingNav";
import { 
  MapPin, 
  Users, 
  Briefcase, 
  Code2, 
  Globe2, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function InfoEnterprisePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white dark:bg-slate-900 font-sans selection:bg-green-500 selection:text-white">
      
      {/* O componente Nav flutuante que criamos */}
      <LandingNav />

      {/* =========================================
          SEÇÃO 1: HERO (Capa gigante)
          ========================================= */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        {/* Fundo dinâmico (Substitua a URL depois por uma foto do IF ou de alunos) */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')" }}
        />
        {/* Degradê sobre a imagem para dar leitura ao texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/80 via-green-900/60 to-slate-900/90" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg tracking-tight">
            Mais que uma rede. <br/> Uma <span className="text-green-400">Comunidade.</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-50/90 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Conectamos mentes brilhantes do Instituto Federal através de geolocalização e tecnologia de ponta.
          </p>
          <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
            Faça parte agora <ArrowRight size={20} />
          </Link>
        </div>
        
        {/* Setinha indicando para rolar para baixo */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50 hidden md:block">
          <p className="text-xs uppercase tracking-widest mb-2 font-bold">Role para descobrir</p>
          <div className="w-[1px] h-12 bg-white/50 mx-auto" />
        </div>
      </section>

      {/* =========================================
          SEÇÃO 2: SOBRE A PLATAFORMA
          ========================================= */}
      <section className="py-24 px-6 lg:px-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-green-600 dark:text-green-400 font-bold tracking-widest uppercase text-sm">O Propósito</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              Eliminando as barreiras entre os campi.
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              O IFConnected nasceu da necessidade de integrar alunos de diferentes turmas e unidades. Muitas vezes, projetos incríveis e eventos importantes ficam restritos às paredes de uma única sala de aula.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Nossa plataforma centraliza a vida acadêmica: publicações, grupos de estudo, portfólio de projetos e vagas de estágio, tudo em um único ecossistema digital.
            </p>
          </div>
          
          {/* Imagem representativa ou Mockup */}
          <div className="w-full lg:w-1/2 relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" 
              alt="Estudantes colaborando" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO 3: NOSSOS PILARES (Cards em Grid)
          ========================================= */}
      <section className="py-24 px-6 lg:px-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
              Tudo o que você precisa em um só lugar
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Ferramentas desenvolvidas especificamente para as necessidades do estudante do IF.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mb-6">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Feed Regional</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Usamos tecnologia geoespacial para mostrar o que está acontecendo no seu campus e nas unidades vizinhas num raio de 50km.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                <Code2 size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Vitrine de Projetos</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Construa seu portfólio acadêmico exibindo seus projetos, links para o GitHub e as tecnologias que você domina.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700">
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Mural de Oportunidades</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Fique sabendo de vagas de estágio, emprego e editais de monitoria exclusivos divulgados pela coordenação.
              </p>
            </div>
          </div>
        </div>
      </section>

          <section className="py-24 px-6 lg:px-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-green-600 dark:text-green-400 font-bold tracking-widest uppercase text-sm">É uma empresa?</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            Aqui voce pode oferecer suas vagas de uma forma otimizada
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Nossa rede social oferece uma comunicação dinâmica entre os campus e a divulgação pode ser em conjunto ou por campus separados. 
          </p>
          
          {/* Botão Adicionado */}
          <div className="pt-2">
            <Link 
              href="/infoEnterprise"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Saiba mais
            </Link>
          </div>
        </div>
        
        {/* Imagem representativa ou Mockup */}
        <div className="w-full lg:w-1/2 relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
          <Image 
            src="https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg" 
            alt="Estudantes colaborando" 
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>


      {/* =========================================
          SEÇÃO 4: TECNOLOGIA (Faixa Escura)
          ========================================= */}
      <section className="py-24 px-6 lg:px-20 bg-green-950 relative overflow-hidden">
        {/* Elemento de decoração visual no fundo */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
              Arquitetura de Software Moderna e Escalável
            </h2>
            <p className="text-green-100/80 text-lg mb-8 leading-relaxed">
              O IFConnected não é apenas uma rede social, é um laboratório de persistência poliglota. Combinamos bancos relacionais para integridade, NoSQL para alto volume de dados, e processamento espacial em tempo real.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white font-medium">
                <ShieldCheck className="text-green-400" /> Java 17 + Spring Boot 3
              </li>
              <li className="flex items-center gap-3 text-white font-medium">
                <Globe2 className="text-green-400" /> Next.js + React Native
              </li>
              <li className="flex items-center gap-3 text-white font-medium">
                <Users className="text-green-400" /> PostgreSQL + MongoDB + Redis
              </li>
            </ul>
          </div>
          
          {/* Caixa de Código decorativa */}
          <div className="md:w-1/2 w-full bg-[#0d1117] rounded-2xl p-6 border border-slate-800 shadow-2xl font-mono text-sm sm:text-base text-slate-300">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <p><span className="text-pink-400">SELECT</span> u.username, c.name</p>
            <p><span className="text-pink-400">FROM</span> users u</p>
            <p><span className="text-pink-400">JOIN</span> campus c <span className="text-pink-400">ON</span> u.campus_id = c.id</p>
            <p><span className="text-pink-400">WHERE</span> <span className="text-sky-300">ST_DWithin</span>(</p>
            <p>  c.location::geography,</p>
            <p>  <span className="text-sky-300">ST_SetSRID</span>(<span className="text-sky-300">ST_MakePoint</span>(-34.87, -7.13), 4326)::geography,</p>
            <p>  <span className="text-orange-400">50000</span></p>
            <p>);</p>
            <p className="text-green-400 mt-4 font-bold">// 4.902 estudantes encontrados perto de você</p>
          </div>
        </div>
      </section>

      {/* =========================================
          SEÇÃO 5: CALL TO ACTION (Rodapé)
          ========================================= */}
      <section className="py-24 px-6 lg:px-20 bg-white dark:bg-slate-900 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">
            Sua jornada acadêmica integrada.
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10">
            Crie sua conta agora, encontre seus colegas e comece a compartilhar seu mundo no IF.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/register" 
              className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full hover:scale-105 transition-transform"
            >
              Criar Conta Grátis
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer simples */}
      <footer className="py-8 text-center border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} IFConnected. Desenvolvido por Jorge Allan.</p>
      </footer>

    </div>
  );
}