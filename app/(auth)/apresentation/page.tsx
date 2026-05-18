"use client";

import { LandingNav } from "@/components/LandingNav";
import {
  MapPin,
  Users,
  Briefcase,
  Code2,
  Globe2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const clayCard =
  "rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[14px_14px_30px_rgba(15,23,42,0.08),-10px_-10px_24px_rgba(255,255,255,0.95),inset_1px_1px_0_rgba(255,255,255,0.95),inset_-2px_-2px_0_rgba(15,23,42,0.04)] dark:border-white/5 dark:bg-[#161616] dark:shadow-[14px_14px_30px_rgba(0,0,0,0.42),-10px_-10px_24px_rgba(255,255,255,0.03),inset_1px_1px_0_rgba(255,255,255,0.05),inset_-2px_-2px_0_rgba(0,0,0,0.45)]";

export default function InfoEnterprisePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f4f4f2] font-sans text-slate-950 selection:bg-emerald-200 selection:text-slate-950 dark:bg-[#0b0b0b] dark:text-white">
      <LandingNav />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.09),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent_22%)] dark:bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_18%)]" />

      <section className="relative flex min-h-[42rem] items-center justify-center px-6 pb-20 pt-32 lg:px-20">
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-white/70 dark:bg-black/70" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-8 inline-flex rounded-full border border-emerald-200 bg-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700 shadow-[8px_8px_18px_rgba(15,23,42,0.08),-6px_-6px_18px_rgba(255,255,255,0.9),inset_1px_1px_0_rgba(255,255,255,0.95)] dark:border-emerald-500/15 dark:bg-[#151515] dark:text-emerald-300 dark:shadow-[8px_8px_18px_rgba(0,0,0,0.4),-6px_-6px_18px_rgba(255,255,255,0.03),inset_1px_1px_0_rgba(255,255,255,0.06)]">
            Rede social academica para o IF
          </div>
          <h1 className="mb-6 text-5xl font-black tracking-tight text-slate-950 dark:text-white md:text-7xl">
            Mais que uma rede. <br /> Uma <span className="text-emerald-600 dark:text-emerald-400">Comunidade.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-slate-700 dark:text-white/72 md:text-xl">
            Conectamos mentes brilhantes do Instituto Federal através de geolocalização e tecnologia de ponta.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#101010] px-8 py-4 text-lg font-bold text-white shadow-[10px_10px_22px_rgba(15,23,42,0.18),inset_1px_1px_0_rgba(255,255,255,0.08)] transition-colors hover:bg-[#1a1a1a] dark:bg-white dark:text-slate-950 dark:shadow-[10px_10px_22px_rgba(0,0,0,0.45),inset_1px_1px_0_rgba(255,255,255,0.55)] dark:hover:bg-slate-100"
            >
              Faça parte agora <ArrowRight size={20} />
            </Link>
            <Link
              href="/infoEnterprise"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-lg font-semibold text-slate-900 shadow-[10px_10px_22px_rgba(15,23,42,0.08),-8px_-8px_20px_rgba(255,255,255,0.9),inset_1px_1px_0_rgba(255,255,255,0.95)] transition-colors hover:text-emerald-700 dark:border-white/5 dark:bg-[#171717] dark:text-white dark:shadow-[10px_10px_22px_rgba(0,0,0,0.42),-8px_-8px_20px_rgba(255,255,255,0.03),inset_1px_1px_0_rgba(255,255,255,0.06)] dark:hover:text-emerald-300"
            >
              Versão para empresas
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row">
          <div className="w-full space-y-6 lg:w-1/2">
            <h2 className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-700 dark:text-emerald-400">
              O Propósito
            </h2>
            <h3 className="text-4xl font-black leading-tight md:text-5xl">
              Eliminando as barreiras entre os campus.
            </h3>
            <p className="text-lg leading-8 text-slate-700 dark:text-white/70">
              O IFConnected nasceu da necessidade de integrar alunos de diferentes turmas e unidades. Muitas vezes, projetos incríveis e eventos importantes ficam restritos às paredes de uma única sala de aula.
            </p>
            <p className="text-lg leading-8 text-slate-700 dark:text-white/70">
              Nossa plataforma centraliza a vida acadêmica: publicações, grupos de estudo, portfólio de projetos e vagas de estágio, tudo em um único ecossistema digital.
            </p>
          </div>

          <div className="relative h-[400px] w-full overflow-hidden rounded-[2.2rem] border border-slate-200 shadow-[14px_14px_30px_rgba(15,23,42,0.08),-10px_-10px_24px_rgba(255,255,255,0.95)] dark:border-white/5 dark:shadow-[14px_14px_30px_rgba(0,0,0,0.42),-10px_-10px_24px_rgba(255,255,255,0.03)] lg:w-1/2">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
              alt="Estudantes colaborando"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-black md:text-4xl">
              Tudo o que você precisa em um só lugar
            </h2>
            <p className="text-lg text-slate-700 dark:text-white/70">
              Ferramentas desenvolvidas especificamente para as necessidades do estudante do IF.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className={clayCard}>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-emerald-100 text-emerald-700 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-3px_-3px_6px_rgba(5,150,105,0.18)] dark:bg-[#1d2a22] dark:text-emerald-300 dark:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.04),inset_-3px_-3px_6px_rgba(0,0,0,0.45)]">
                <MapPin size={28} />
              </div>
              <h3 className="mb-3 text-xl font-bold">Feed Regional</h3>
              <p className="leading-7 text-slate-700 dark:text-white/70">
                Usamos tecnologia geoespacial para mostrar o que está acontecendo no seu campus e nas unidades vizinhas num raio de 50km.
              </p>
            </div>

            <div className={clayCard}>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-white text-slate-900 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.95),inset_-4px_-4px_7px_rgba(15,23,42,0.08)] dark:bg-[#202020] dark:text-white dark:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.04),inset_-4px_-4px_7px_rgba(0,0,0,0.45)]">
                <Code2 size={28} />
              </div>
              <h3 className="mb-3 text-xl font-bold">Vitrine de Projetos</h3>
              <p className="leading-7 text-slate-700 dark:text-white/70">
                Construa seu portfólio acadêmico exibindo seus projetos, links para o GitHub e as tecnologias que você domina.
              </p>
            </div>

            <div className={clayCard}>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-white text-slate-900 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.95),inset_-4px_-4px_7px_rgba(15,23,42,0.08)] dark:bg-[#202020] dark:text-white dark:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.04),inset_-4px_-4px_7px_rgba(0,0,0,0.45)]">
                <Briefcase size={28} />
              </div>
              <h3 className="mb-3 text-xl font-bold">Mural de Oportunidades</h3>
              <p className="leading-7 text-slate-700 dark:text-white/70">
                Fique sabendo de vagas de estágio, emprego e editais de monitoria exclusivos divulgados pela coordenação.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row">
          <div className="w-full space-y-6 lg:w-1/2">
            <h2 className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-700 dark:text-emerald-400">
              É uma empresa?
            </h2>
            <h3 className="text-4xl font-black leading-tight md:text-5xl">
              Aqui voce pode oferecer suas vagas de uma forma otimizada
            </h3>
            <p className="text-lg leading-8 text-slate-700 dark:text-white/70">
              Nossa rede social oferece uma comunicação dinâmica entre os campus e a divulgação pode ser em conjunto ou por campus separados.
            </p>

            <div className="pt-2">
              <Link
                href="/infoEnterprise"
                className="inline-flex items-center justify-center rounded-full bg-[#111111] px-8 py-3 font-semibold text-white shadow-[10px_10px_22px_rgba(15,23,42,0.18),inset_1px_1px_0_rgba(255,255,255,0.08)] transition-colors hover:bg-[#1a1a1a] dark:bg-white dark:text-slate-950 dark:shadow-[10px_10px_22px_rgba(0,0,0,0.45),inset_1px_1px_0_rgba(255,255,255,0.55)] dark:hover:bg-slate-100"
              >
                Saiba mais
              </Link>
            </div>
          </div>

          <div className="relative h-[400px] w-full overflow-hidden rounded-[2.2rem] border border-slate-200 shadow-[14px_14px_30px_rgba(15,23,42,0.08),-10px_-10px_24px_rgba(255,255,255,0.95)] dark:border-white/5 dark:shadow-[14px_14px_30px_rgba(0,0,0,0.42),-10px_-10px_24px_rgba(255,255,255,0.03)] lg:w-1/2">
            <Image
              src="https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg"
              alt="Estudantes colaborando"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 md:flex-row">
          <div className="md:w-1/2">
            <h2 className="mb-6 text-3xl font-black leading-tight md:text-4xl">
              Arquitetura de Software Moderna e Escalável
            </h2>
            <p className="mb-8 text-lg leading-8 text-slate-700 dark:text-white/70">
              O IFConnected não é apenas uma rede social, é um laboratório de persistência poliglota. Combinamos bancos relacionais para integridade, NoSQL para alto volume de dados, e processamento espacial em tempo real.
            </p>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 font-medium">
                <ShieldCheck className="text-emerald-600 dark:text-emerald-400" /> Java 17 + Spring Boot 3
              </li>
              <li className="flex items-center gap-3 font-medium">
                <Globe2 className="text-emerald-600 dark:text-emerald-400" /> Next.js + React Native
              </li>
              <li className="flex items-center gap-3 font-medium">
                <Users className="text-emerald-600 dark:text-emerald-400" /> PostgreSQL + MongoDB + Redis
              </li>
            </ul>
          </div>

          <div className="w-full rounded-[2rem] border border-slate-200 bg-[#151515] p-6 font-mono text-sm text-slate-300 shadow-[14px_14px_30px_rgba(15,23,42,0.12),-10px_-10px_24px_rgba(255,255,255,0.7),inset_1px_1px_0_rgba(255,255,255,0.08)] dark:border-white/5 dark:shadow-[14px_14px_30px_rgba(0,0,0,0.42),-10px_-10px_24px_rgba(255,255,255,0.03),inset_1px_1px_0_rgba(255,255,255,0.05)] sm:text-base md:w-1/2">
            <div className="mb-4 flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <p><span className="text-pink-400">SELECT</span> u.username, c.name</p>
            <p><span className="text-pink-400">FROM</span> users u</p>
            <p><span className="text-pink-400">JOIN</span> campus c <span className="text-pink-400">ON</span> u.campus_id = c.id</p>
            <p><span className="text-pink-400">WHERE</span> <span className="text-sky-300">ST_DWithin</span>(</p>
            <p>  c.location::geography,</p>
            <p>  <span className="text-sky-300">ST_SetSRID</span>(<span className="text-sky-300">ST_MakePoint</span>(-34.87, -7.13), 4326)::geography,</p>
            <p>  <span className="text-orange-400">50000</span></p>
            <p>);</p>
            <p className="mt-4 font-bold text-green-400">4.902 estudantes encontrados perto de você</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center lg:px-20">
        <div className="mx-auto max-w-3xl rounded-[2.2rem] border border-slate-200 bg-white px-8 py-12 shadow-[14px_14px_30px_rgba(15,23,42,0.08),-10px_-10px_24px_rgba(255,255,255,0.95),inset_1px_1px_0_rgba(255,255,255,0.95),inset_-2px_-2px_0_rgba(15,23,42,0.04)] dark:border-white/5 dark:bg-[#151515] dark:shadow-[14px_14px_30px_rgba(0,0,0,0.42),-10px_-10px_24px_rgba(255,255,255,0.03),inset_1px_1px_0_rgba(255,255,255,0.05),inset_-2px_-2px_0_rgba(0,0,0,0.45)]">
          <h2 className="mb-6 text-4xl font-black">
            Sua jornada acadêmica integrada.
          </h2>
          <p className="mb-10 text-xl text-slate-700 dark:text-white/70">
            Crie sua conta agora, encontre seus colegas e comece a compartilhar seu mundo no IF.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="rounded-full bg-[#111111] px-8 py-4 font-bold text-white shadow-[10px_10px_22px_rgba(15,23,42,0.18),inset_1px_1px_0_rgba(255,255,255,0.08)] transition-colors hover:bg-[#1a1a1a] dark:bg-white dark:text-slate-950 dark:shadow-[10px_10px_22px_rgba(0,0,0,0.45),inset_1px_1px_0_rgba(255,255,255,0.55)] dark:hover:bg-slate-100"
            >
              Criar Conta Grátis
            </Link>
            <Link
              href="/login"
              className="rounded-full border border-slate-200 bg-white px-8 py-4 font-bold text-slate-900 shadow-[10px_10px_22px_rgba(15,23,42,0.08),-8px_-8px_20px_rgba(255,255,255,0.9),inset_1px_1px_0_rgba(255,255,255,0.95)] transition-colors hover:text-emerald-700 dark:border-white/5 dark:bg-[#171717] dark:text-white dark:shadow-[10px_10px_22px_rgba(0,0,0,0.42),-8px_-8px_20px_rgba(255,255,255,0.03),inset_1px_1px_0_rgba(255,255,255,0.06)] dark:hover:text-emerald-300"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/70 bg-transparent py-8 text-center text-sm text-slate-500 dark:border-white/5 dark:text-white/45">
        <p>© {new Date().getFullYear()} IFConnected. Desenvolvido por Jorge Allan.</p>
      </footer>
    </div>
  );
}
