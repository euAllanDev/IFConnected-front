export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar de Admin (bem simples, cinza escuro ou preto) */}
      <aside className="w-64 border-r border-gray-800 p-6 flex flex-col gap-6">
        <h1 className="text-emerald-500 font-bold text-xl">IFConnect DASHBOARD</h1>
        <a href="/admin/dashboard" className="text-gray-300">Resumo</a>
        <a href="/admin/users" className="text-gray-300">Gerenciar Usuários</a>
        <a href="/feed" className="text-red-400 mt-auto">Sair do Admin</a>
      </aside>

      {/* Conteúdo centralizado */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}