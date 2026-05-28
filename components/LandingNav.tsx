import Link from "next/link";

export function LandingNav() {
  return (
    <nav className="absolute top-0 left-0 z-50 w-full px-6 py-5 lg:px-16">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[2rem] border border-white/10 bg-white px-5 py-3 shadow-[10px_10px_24px_rgba(15,23,42,0.12),-8px_-8px_20px_rgba(255,255,255,0.9),inset_1px_1px_0_rgba(255,255,255,0.9),inset_-1px_-1px_0_rgba(15,23,42,0.06)] dark:border-white/5 dark:bg-[#121212] dark:shadow-[10px_10px_24px_rgba(0,0,0,0.45),-8px_-8px_20px_rgba(255,255,255,0.03),inset_1px_1px_0_rgba(255,255,255,0.06),inset_-1px_-1px_0_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2">
          <Link href="/apresentation">
            <span className="cursor-pointer text-xl font-black text-slate-950 transition-opacity hover:opacity-80 dark:text-white sm:text-2xl">
              IFConnected
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-6 md:gap-8">
          <Link
            href="/apresentation"
            className="hidden font-medium text-slate-600 transition-colors hover:text-slate-950 dark:text-white/70 dark:hover:text-white sm:block"
          >
            Início
          </Link>
          <Link
            href="/infoEnterprise"
            className="hidden font-medium text-slate-600 transition-colors hover:text-slate-950 dark:text-white/70 dark:hover:text-white sm:block"
          >
            Empresas
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="font-semibold text-slate-700 transition-colors hover:text-slate-950 dark:text-white/80 dark:hover:text-white"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              className="hidden rounded-full bg-[#111111] px-5 py-2.5 font-semibold text-white shadow-[6px_6px_16px_rgba(15,23,42,0.18),inset_1px_1px_0_rgba(255,255,255,0.08)] transition-colors hover:bg-[#1b1b1b] dark:bg-white dark:text-slate-950 dark:shadow-[6px_6px_18px_rgba(0,0,0,0.35),inset_1px_1px_0_rgba(255,255,255,0.55)] dark:hover:bg-slate-100 md:block"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
