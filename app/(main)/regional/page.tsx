"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { Post, User } from "@/types";
import { PostCard } from "../feed/PostCard";
import { Loader2, MapPin, MapPinOff, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegionalPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Se não tiver campus, para o loading e mostra o aviso
    if (!user.campusId) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        // Carrega Feed e Sugestões em paralelo
        const [feedData, suggestionsData] = await Promise.all([
          api.getRegionalFeed(user.id, 50), // Raio de 50km
          api.getSuggestions(user.id, 50),
        ]);

        setPosts(
          feedData.sort(
            (a, b) =>
              new Date(b.createdAt!).getTime() -
              new Date(a.createdAt!).getTime()
          )
        );
        setSuggestions(suggestionsData);
      } catch (error) {
        console.error("Erro ao carregar dados regionais", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  // Função simples para seguir (já que estamos fora do componente SugestoesBar)
  const handleFollowSuggestion = async (targetId: number) => {
    if (!user) return;
    try {
      await api.followUser(user.id, targetId);
      // Remove da lista visualmente
      setSuggestions((prev) => prev.filter((u) => u.id !== targetId));
    } catch (e) {
      alert("Erro ao seguir.");
    }
  };

  if (loading) {
    return (
      <div className="p-10 flex justify-center">
        <Loader2 className="animate-spin text-sky-500" size={32} />
      </div>
    );
  }

  // Caso o usuário não tenha campus vinculado
  if (user && !user.campusId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
        <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
          <MapPinOff size={48} className="text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Onde você estuda?
        </h2>
        <p className="text-slate-500 max-w-md mb-6">
          Para ver posts e pessoas próximas, você precisa vincular seu perfil a
          um Campus do IF.
        </p>
        <button
          onClick={() => router.push(`/profile/${user.id}`)}
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
        >
          Editar Perfil e Escolher Campus
        </button>
      </div>
    );
  }

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 px-4 py-3">
        <h1 className="font-bold text-xl flex items-center gap-2">
          <MapPin className="text-sky-500" /> Campus & Região
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Mostrando atividades num raio de 50km
        </p>
      </div>

      {/* Seção: Pessoas do seu Campus (Carrossel Horizontal) */}
      {suggestions.length > 0 && (
        <div className="border-b border-slate-200 dark:border-slate-800 py-4">
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Users size={18} className="text-sky-500" /> Do seu Campus
            </h2>
          </div>

          <div className="flex overflow-x-auto px-4 gap-3 pb-2 scrollbar-hide">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="min-w-[140px] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-3 flex flex-col items-center relative"
              >
                <div
                  className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 mb-2 overflow-hidden relative cursor-pointer"
                  onClick={() => router.push(`/profile/${suggestion.id}`)}
                >
                  {suggestion.profileImageUrl ? (
                    <Image
                      src={suggestion.profileImageUrl}
                      alt={suggestion.username}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-xl text-slate-500">
                      {suggestion.username[0].toUpperCase()}
                    </div>
                  )}
                </div>

                <p className="font-bold text-sm truncate w-full text-center">
                  {suggestion.username}
                </p>
                <p className="text-xs text-slate-500 mb-3 truncate w-full text-center">
                  Aluno
                </p>

                <button
                  onClick={() => handleFollowSuggestion(suggestion.id)}
                  className="text-xs bg-black dark:bg-white text-white dark:text-black font-bold py-1.5 px-4 rounded-full hover:opacity-80 transition w-full"
                >
                  Seguir
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feed Regional */}
      <div className="mt-2">
        {posts.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            <p className="font-bold">Nenhum post na região.</p>
            <p className="text-sm mt-1">
              Seja o primeiro do seu campus a publicar!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} currentUser={user!} />
          ))
        )}
      </div>
    </div>
  );
}
