"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/types";
import Link from "next/link";
import { Briefcase, Search, Users, ExternalLink } from "lucide-react";
import JobFeed from "@/features/jobs/JobFeed";
import { request } from "@/services/apiClient";

type Tab = "vagas" | "talentos";

export default function JobsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [tab, setTab] = useState<Tab>("vagas");

  useEffect(() => {
    const stored = localStorage.getItem("ifconnected:user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const isCompanyOrAdmin = user?.role === "COMPANY" || user?.role === "ADMIN";

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isCompanyOrAdmin ? "Vagas & Talentos" : "Vagas e Oportunidades"}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {isCompanyOrAdmin
              ? "Gerencie suas vagas e encontre candidatos"
              : "Encontre oportunidades para sua carreira"}
          </p>
        </div>
        {isCompanyOrAdmin && (
          <Link
            href="/jobs/new"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
          >
            <Briefcase className="w-4 h-4" />
            Publicar Vaga
          </Link>
        )}
      </div>

      {/* Tabs — só para empresa/admin */}
      {isCompanyOrAdmin && (
        <div className="flex gap-1 bg-white/5 p-1 rounded-xl mb-6 border border-white/10">
          {(["vagas", "talentos"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === t
                  ? "bg-white/10 text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {t === "vagas" ? (
                <Briefcase className="w-4 h-4" />
              ) : (
                <Users className="w-4 h-4" />
              )}
              {t === "vagas" ? "Vagas" : "Buscar Talentos"}
            </button>
          ))}
        </div>
      )}

      {tab === "vagas" && <JobFeed user={user} />}
      {tab === "talentos" && isCompanyOrAdmin && <TalentSearch />}
    </div>
  );
}

// ─── Talent Search ─────────────────────────────────────────────────────────

interface TalentUser {
  id: number;
  username: string;
  email: string;
  bio?: string;
  profileImageUrl?: string;
}

const SUGGESTED_TECHS = ["React", "Spring Boot", "Python", "Node.js", "Java", "Docker"];

function TalentSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TalentUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const data = await request<TalentUser[]>(
        `/talents/search?tech=${encodeURIComponent(query.trim())}`
      );
      setResults(data);
    } catch {
      setError("Erro ao buscar talentos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const selectTech = (tech: string) => {
    setQuery(tech);
  };

  return (
    <div className="space-y-5">
      {/* Campo de busca */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: React, Spring Boot, Python..."
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-32 py-3.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 transition-all"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-2 top-2 bottom-2 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {/* Sugestões rápidas */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_TECHS.map((tech) => (
          <button
            key={tech}
            onClick={() => selectTech(tech)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              query === tech
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Resultados */}
      {searched && !loading && (
        <>
          <p className="text-xs text-gray-500">
            {results.length === 0
              ? `Nenhum talento encontrado com "${query}"`
              : `${results.length} talento${results.length > 1 ? "s" : ""} encontrado${results.length > 1 ? "s" : ""} com "${query}"`}
          </p>
          <div className="space-y-3">
            {results.map((talent) => (
              <TalentCard key={talent.id} talent={talent} />
            ))}
          </div>
        </>
      )}

      {!searched && (
        <div className="text-center py-16 text-gray-600">
          <Users className="w-10 h-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm">Busque por uma tecnologia para encontrar talentos</p>
          <p className="text-xs mt-1 opacity-60">Ex: "React", "Spring Boot", "Docker"</p>
        </div>
      )}
    </div>
  );
}

function TalentCard({ talent }: { talent: TalentUser }) {
  const initials = talent.username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all group">
      <div className="w-11 h-11 rounded-full flex-shrink-0 overflow-hidden bg-emerald-900/50 border border-emerald-500/20 flex items-center justify-center">
        {talent.profileImageUrl ? (
          <img src={talent.profileImageUrl} alt={talent.username} className="w-full h-full object-cover" />
        ) : (
          <span className="text-emerald-400 font-bold text-sm">{initials}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">{talent.username}</p>
        {talent.bio && (
          <p className="text-gray-500 text-xs mt-0.5 truncate">{talent.bio}</p>
        )}
      </div>
      <Link
        href={`/profile/${talent.id}`}
        className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
      >
        Ver perfil <ExternalLink className="w-3 h-3" />
      </Link>
    </div>
  );
}