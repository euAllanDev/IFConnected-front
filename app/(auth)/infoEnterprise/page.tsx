import { LandingNav } from "@/components/LandingNav";

export default function InfoEnterprisePage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-900">
      <LandingNav />
      
      {/* Adicione um 'pt-24' (padding top) para o texto não ficar embaixo da Nav */}
      <main className="relative z-10 pt-32 px-6 lg:px-20 text-white">
        <h1 className="text-4xl font-black text-green-400 mb-6">Sobre o IFConnected</h1>
        <p className="text-lg text-slate-300 max-w-3xl">
           Aqui você coloca o texto sobre o seu projeto...
        </p>
      </main>
    </div>
  );
}