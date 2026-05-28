import { LandingNav } from "@/components/LandingNav";
import Link from "next/link";
import {
  Building2,
  Target,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const clayCard =
  "rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[14px_14px_30px_rgba(15,23,42,0.08),-10px_-10px_24px_rgba(255,255,255,0.95),inset_1px_1px_0_rgba(255,255,255,0.95),inset_-2px_-2px_0_rgba(15,23,42,0.04)] dark:border-white/5 dark:bg-[#161616] dark:shadow-[14px_14px_30px_rgba(0,0,0,0.42),-10px_-10px_24px_rgba(255,255,255,0.03),inset_1px_1px_0_rgba(255,255,255,0.05),inset_-2px_-2px_0_rgba(0,0,0,0.45)]";

export default function infoEnterprisePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f4f4f2] text-slate-950 selection:bg-emerald-200 selection:text-slate-950 dark:bg-[#0b0b0b] dark:text-white">
      <LandingNav />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_18%)] dark:bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.03),transparent_15%)]" />

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-20">
        <section className="rounded-[2.4rem] border border-slate-200 bg-white px-8 py-16 text-center shadow-[16px_16px_32px_rgba(15,23,42,0.1),-12px_-12px_28px_rgba(255,255,255,0.95),inset_1px_1px_0_rgba(255,255,255,0.95),inset_-2px_-2px_0_rgba(15,23,42,0.04)] dark:border-white/5 dark:bg-[#141414] dark:shadow-[16px_16px_32px_rgba(0,0,0,0.45),-12px_-12px_28px_rgba(255,255,255,0.03),inset_1px_1px_0_rgba(255,255,255,0.05),inset_-2px_-2px_0_rgba(0,0,0,0.45)] md:px-14">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 shadow-[inset_1px_1px_0_rgba(255,255,255,0.95),inset_-2px_-2px_0_rgba(5,150,105,0.08)] dark:border-emerald-500/15 dark:bg-[#1d2a22] dark:text-emerald-300 dark:shadow-[inset_1px_1px_0_rgba(255,255,255,0.04),inset_-2px_-2px_0_rgba(0,0,0,0.35)]">
            <Building2 size={16} /> Soluções para recrutamento
          </div>

          <h1 className="mb-6 text-4xl font-black tracking-tight md:text-6xl">
            Sua empresa conectada aos <br />
            <span className="text-emerald-600 dark:text-emerald-400">talentos do IFPB.</span>
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-lg leading-8 text-slate-700 dark:text-white/70 md:text-xl">
            O <strong>IFConnected</strong> não é apenas um banco de currículos. É uma rede social acadêmica viva, onde você vê os projetos, a evolução e o potencial real dos estudantes antes mesmo da entrevista.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/register-enterprise"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-8 py-4 text-lg font-bold text-white shadow-[10px_10px_22px_rgba(15,23,42,0.18),inset_1px_1px_0_rgba(255,255,255,0.08)] transition-colors hover:bg-[#1a1a1a] dark:bg-white dark:text-slate-950 dark:shadow-[10px_10px_22px_rgba(0,0,0,0.45),inset_1px_1px_0_rgba(255,255,255,0.55)] dark:hover:bg-slate-100"
            >
              Cadastrar Empresa
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#beneficios"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-900 shadow-[10px_10px_22px_rgba(15,23,42,0.08),-8px_-8px_20px_rgba(255,255,255,0.9),inset_1px_1px_0_rgba(255,255,255,0.95)] transition-colors hover:text-emerald-700 dark:border-white/5 dark:bg-[#171717] dark:text-white dark:shadow-[10px_10px_22px_rgba(0,0,0,0.42),-8px_-8px_20px_rgba(255,255,255,0.03),inset_1px_1px_0_rgba(255,255,255,0.06)] dark:hover:text-emerald-300"
            >
              Entenda a Lógica
            </Link>
          </div>
        </section>

        <section id="beneficios" className="py-24">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Por que recrutar no IFConnected?</h2>
            <p className="text-slate-700 dark:text-white/70">
              Diferente de sites de emprego genéricos, aqui o foco é técnico e acadêmico.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <div className={clayCard}>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-emerald-100 text-emerald-700 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-3px_-3px_6px_rgba(5,150,105,0.18)] dark:bg-[#1d2a22] dark:text-emerald-300 dark:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.04),inset_-3px_-3px_6px_rgba(0,0,0,0.45)]">
                <Target size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold">Filtro de Talentos Reais</h3>
              <p className="text-sm leading-7 text-slate-700 dark:text-white/70">
                Divulgue vagas direcionadas para cursos específicos. Encontre exatamente o estagiário de TI, Edificações ou Automação que você precisa.
              </p>
            </div>

            <div className={clayCard}>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-white text-slate-900 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.95),inset_-4px_-4px_7px_rgba(15,23,42,0.08)] dark:bg-[#202020] dark:text-white dark:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.04),inset_-4px_-4px_7px_rgba(0,0,0,0.45)]">
                <Users size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold">Portfólio Vivo</h3>
              <p className="text-sm leading-7 text-slate-700 dark:text-white/70">
                Acesse o perfil do aluno e veja os projetos que ele postou na rede. Avalie a capacidade técnica (Hard Skills) na prática.
              </p>
            </div>

            <div className={clayCard}>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-white text-slate-900 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.95),inset_-4px_-4px_7px_rgba(15,23,42,0.08)] dark:bg-[#202020] dark:text-white dark:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.04),inset_-4px_-4px_7px_rgba(0,0,0,0.45)]">
                <Zap size={24} />
              </div>
              <h3 className="mb-3 text-xl font-bold">Conexão Institucional</h3>
              <p className="text-sm leading-7 text-slate-700 dark:text-white/70">
                Sua empresa ganha visibilidade dentro do Instituto Federal, criando uma marca empregadora forte entre os futuros profissionais.
              </p>
            </div>
          </div>
        </section>

        <section className="px-0 py-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Como funciona a parceria?
              </h2>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-3px_-3px_6px_rgba(5,150,105,0.18)] dark:bg-[#1d2a22] dark:text-emerald-300 dark:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.04),inset_-3px_-3px_6px_rgba(0,0,0,0.45)]">1</div>
                <div>
                  <h4 className="text-lg font-bold">Cadastro Empresarial</h4>
                  <p className="text-sm text-slate-700 dark:text-white/70">Crie seu perfil com CNPJ e logo da empresa para passar credibilidade.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white font-bold text-slate-900 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.95),inset_-4px_-4px_7px_rgba(15,23,42,0.08)] dark:bg-[#202020] dark:text-white dark:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.04),inset_-4px_-4px_7px_rgba(0,0,0,0.45)]">2</div>
                <div>
                  <h4 className="text-lg font-bold">Publicação de Vagas</h4>
                  <p className="text-sm text-slate-700 dark:text-white/70">Poste oportunidades de estágio ou emprego. Os alunos recebem notificações baseadas no curso deles.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white font-bold text-slate-900 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.95),inset_-4px_-4px_7px_rgba(15,23,42,0.08)] dark:bg-[#202020] dark:text-white dark:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.04),inset_-4px_-4px_7px_rgba(0,0,0,0.45)]">3</div>
                <div>
                  <h4 className="text-lg font-bold">Seleção Direta</h4>
                  <p className="text-sm text-slate-700 dark:text-white/70">Receba candidaturas, visite o perfil do aluno na rede social e agende entrevistas.</p>
                </div>
              </div>
            </div>

            <div className="flex h-[350px] flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[14px_14px_30px_rgba(15,23,42,0.08),-10px_-10px_24px_rgba(255,255,255,0.95),inset_1px_1px_0_rgba(255,255,255,0.95),inset_-2px_-2px_0_rgba(15,23,42,0.04)] dark:border-white/5 dark:bg-[#161616] dark:shadow-[14px_14px_30px_rgba(0,0,0,0.42),-10px_-10px_24px_rgba(255,255,255,0.03),inset_1px_1px_0_rgba(255,255,255,0.05),inset_-2px_-2px_0_rgba(0,0,0,0.45)]">
              <CheckCircle2 size={64} className="mb-4 text-emerald-500 opacity-80" />
              <h3 className="text-xl font-bold">Painel do Recrutador</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-white/55">Em breve: dashboard exclusivo para gestão de vagas.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[2.2rem] border border-slate-200 bg-white py-20 text-center shadow-[14px_14px_30px_rgba(15,23,42,0.08),-10px_-10px_24px_rgba(255,255,255,0.95),inset_1px_1px_0_rgba(255,255,255,0.95),inset_-2px_-2px_0_rgba(15,23,42,0.04)] dark:border-white/5 dark:bg-[#151515] dark:shadow-[14px_14px_30px_rgba(0,0,0,0.42),-10px_-10px_24px_rgba(255,255,255,0.03),inset_1px_1px_0_rgba(255,255,255,0.05),inset_-2px_-2px_0_rgba(0,0,0,0.45)]">
          <h2 className="mb-8 text-3xl font-bold">Encontre seu próximo estagiário hoje.</h2>
          <Link
            href="/register-enterprise"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-8 py-4 text-lg font-bold text-white shadow-[10px_10px_22px_rgba(15,23,42,0.18),inset_1px_1px_0_rgba(255,255,255,0.08)] transition-colors hover:bg-[#1a1a1a] dark:bg-white dark:text-slate-950 dark:shadow-[10px_10px_22px_rgba(0,0,0,0.45),inset_1px_1px_0_rgba(255,255,255,0.55)] dark:hover:bg-slate-100"
          >
            Criar Conta Corporativa
          </Link>
        </section>
      </main>
    </div>
  );
}
