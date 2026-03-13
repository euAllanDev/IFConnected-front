import { LandingNav } from "@/components/LandingNav";
import Link from "next/link";
import { 
  Building2, 
  Target, 
  Users, 
  Zap, 
  CheckCircle2, 
  ArrowRight 
} from "lucide-react";

export default function infoEnterprisePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-900 text-slate-200 selection:bg-emerald-500/30">
      <LandingNav />
      
      {/* --- HERO SECTION (RESUMO DA REDE) --- */}
      <main className="relative z-10 pt-32 pb-20 px-6 lg:px-20 max-w-7xl mx-auto text-center">
        
  
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 font-medium text-sm mb-8 border border-emerald-500/20">
          <Building2 size={16} /> Soluções para Recrutamento
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
          Sua empresa conectada aos <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">
            talentos do IFPB.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          O <strong>IFConnected</strong> não é apenas um banco de currículos. É uma rede social acadêmica viva, onde você vê os projetos, a evolução e o potencial real dos estudantes antes mesmo da entrevista.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register-enterprise" // Rota futura de cadastro de empresa
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-emerald-600/25 hover:-translate-y-1"
          >
            Cadastrar Empresa
            <ArrowRight size={20} />
          </Link>
          <Link
            href="#beneficios"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition-all"
          >
            Entenda a Lógica
          </Link>
        </div>
      </main>

      {/* --- POR QUE DIVULGAR AQUI? (BENEFÍCIOS) --- */}
      <section id="beneficios" className="py-24 bg-slate-800/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Por que recrutar no IFConnected?</h2>
            <p className="text-slate-400">Diferente de sites de emprego genéricos, aqui o foco é técnico e acadêmico.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            
            {/* Benefício 1 */}
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Filtro de Talentos Reais</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Divulgue vagas direcionadas para cursos específicos. Encontre exatamente o estagiário de TI, Edificações ou Automação que você precisa.
              </p>
            </div>

            {/* Benefício 2 */}
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Portfólio Vivo</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Acesse o perfil do aluno e veja os projetos que ele postou na rede. Avalie a capacidade técnica (Hard Skills) na prática.
              </p>
            </div>

            {/* Benefício 3 */}
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Conexão Institucional</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Sua empresa ganha visibilidade dentro do Instituto Federal, criando uma marca empregadora forte entre os futuros profissionais.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- A LÓGICA (COMO FUNCIONA) --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Como funciona a parceria?
            </h2>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900">1</div>
              <div>
                <h4 className="text-lg font-bold text-white">Cadastro Empresarial</h4>
                <p className="text-slate-400 text-sm">Crie seu perfil com CNPJ e logo da empresa para passar credibilidade.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900">2</div>
              <div>
                <h4 className="text-lg font-bold text-white">Publicação de Vagas</h4>
                <p className="text-slate-400 text-sm">Poste oportunidades de estágio ou emprego. Os alunos recebem notificações baseadas no curso deles.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900">3</div>
              <div>
                <h4 className="text-lg font-bold text-white">Seleção Direta</h4>
                <p className="text-slate-400 text-sm">Receba candidaturas, visite o perfil do aluno na rede social e agende entrevistas.</p>
              </div>
            </div>
          </div>

          {/* Área visual Ilustrativa */}
          <div className="relative h-[350px] bg-gradient-to-br from-emerald-900/20 to-slate-800 rounded-3xl border border-white/10 p-8 flex flex-col items-center justify-center text-center">
            <CheckCircle2 size={64} className="text-emerald-500 mb-4 opacity-80" />
            <h3 className="text-white font-bold text-xl">Painel do Recrutador</h3>
            <p className="text-slate-500 text-sm mt-2">Em breve: dashboard exclusivo para gestão de vagas.</p>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="py-20 text-center bg-emerald-900/10 border-t border-emerald-500/10">
        <h2 className="text-3xl font-bold text-white mb-8">Encontre seu próximo estagiário hoje.</h2>
        <Link
            href="/register-enterprise"
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold text-lg transition-all"
          >
            Criar Conta Corporativa
          </Link>
      </section>

    </div>
  );
}