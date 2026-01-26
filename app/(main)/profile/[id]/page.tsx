"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/services/api";
import { Post, User, Project } from "@/types";
import { PostCard } from "../../feed/PostCard";
import { useAuth } from "@/contexts/AuthContext";
import { EditProfileModal } from "@/components/EditProfileModal";
import { ProjectCard } from "@/features/profile/ProjectCard";
import { ProjectModal } from "@/features/profile/ProjectModal";
import { ProjectDetailModal } from "@/features/profile/ProjectDetailModal";
import {
  ArrowLeft,
  Loader2,
  MapPin,
  Calendar,
  Check,
  UserPlus,
  Edit2,
  Grid,
  FolderGit2,
  Plus
} from "lucide-react";
import Image from "next/image";

interface UserProfileData {
  user: User;
  followersCount: number;
  followingCount: number;
  postCount: number;
}

export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user: currentUser, setUserAndPersist } = useAuth();
  const profileId = Number(id);

  // Estados Base
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [isHoveringFollow, setIsHoveringFollow] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Estados Projetos
  const [activeTab, setActiveTab] = useState<"posts" | "projects">("posts");
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Modais de Projeto
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); // Detalhes
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null); // Edição

  // ... (Carregamento de dados igual ao anterior) ...
  const loadData = useCallback(async () => {
    if (isNaN(profileId) || !currentUser) {
      setLoading(false);
      return;
    }
    try {
      const [profileRes, postsRes] = await Promise.all([
        api.getUserProfile(profileId),
        api.getPostsByUser(profileId),
      ]);
      setProfileData(profileRes);
      setPosts(postsRes.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()));
      if (currentUser.id !== profileId) {
        const followingStatus = await api.isFollowing(currentUser.id, profileId);
        setIsFollowing(followingStatus);
      }
    } catch (e) {
      console.error(e);
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  }, [profileId, currentUser]);

  useEffect(() => { loadData(); }, [loadData]);
  useEffect(() => {
    if (!isNaN(profileId)) api.getUserProjects(profileId).then(setProjects).catch(console.error);
  }, [profileId]);

  // Handlers
  const handleFollowToggle = async () => { /* ... igual ao anterior ... */ };
  const handleProfileUpdate = (updatedUser: User) => {
    // 1) atualiza o estado local da página
    setProfileData((prev) =>
      prev ? { ...prev, user: updatedUser } : prev
    );

    // 2) se você estiver editando seu próprio perfil,
    // atualiza o user global do app (feed / navbar / composer)
    if (isOwnProfile) {
      setUserAndPersist(updatedUser);
    }
  };
  const handleDeleteProject = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este projeto?")) return;
    try {
      await api.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (error) { console.error(error); }
  };

  // --- NOVOS HANDLERS DE EDIÇÃO ---
  
  const openCreateModal = () => {
    setProjectToEdit(null); // Garante que está limpo
    setIsProjectModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setProjectToEdit(project); // Preenche para edição
    setIsProjectModalOpen(true);
  };

  const handleProjectSuccess = (savedProject: Project, isEdit: boolean) => {
    if (isEdit) {
       // Atualiza na lista
       setProjects(prev => prev.map(p => p.id === savedProject.id ? savedProject : p));
    } else {
       // Adiciona no topo
       setProjects(prev => [savedProject, ...prev]);
    }
  };

  // ... (Verificações de Loading e Null iguais) ...
  if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin text-sky-500 mx-auto" size={32} /></div>;
  if (!profileData) return <div className="p-10 text-center">Perfil não encontrado.</div>;
  if (!currentUser) return null;
  const isOwnProfile = currentUser.id === profileId;

  return (
    <div className="pb-10 min-h-screen">
      {/* Header e Banner (IGUAL AO ANTERIOR) */}
      <div className="bg-white dark:bg-zinc-900 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors"><ArrowLeft size={20} /></button>
        <div>
          <h1 className="font-bold text-xl leading-tight">{profileData.user.username}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">{profileData.postCount} publicações</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-slate-800 p-4">
        <div className="h-36 bg-gradient-to-r from-zinc-700 to-zinc-900 w-full relative -mx-4 -mt-4"></div>
        <div className="-mt-16 ml-4 relative z-10">
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-zinc-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-5xl font-bold text-slate-500 overflow-hidden">
            {profileData.user.profileImageUrl ? (
              <Image src={profileData.user.profileImageUrl} alt="Foto" width={128} height={128} className="w-full h-full object-cover" priority unoptimized />
            ) : profileData.user.username[0].toUpperCase()}
          </div>
        </div>
        
        {/* Botões do Perfil */}
        <div className="flex justify-end -mt-10 mb-4 relative z-20">
           {/* ... código dos botões seguir/editar perfil igual ao anterior ... */}
           {isOwnProfile ? (
            <button onClick={() => setIsEditModalOpen(true)} className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-full font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
              <Edit2 size={16} /> Editar Perfil
            </button>
          ) : (
            <button /* ... lógica de seguir igual ... */ className="px-6 py-2 rounded-full bg-black text-white font-bold text-sm">Seguir</button>
          )}
        </div>

        {/* Infos do Perfil (IGUAL) */}
        <div className="mt-4">
            {/* ... nome, bio, stats ... */}
             <h2 className="text-xl font-bold">{profileData.user.username}</h2>
             <p className="whitespace-pre-wrap text-sm mb-3">{profileData.user.bio || "Sem bio."}</p>
             <div className="flex gap-4 text-sm font-bold">
                <span>{profileData.followingCount} Seguindo</span>
                <span>{profileData.followersCount} Seguidores</span>
             </div>
        </div>
      </div>

      {/* ABAS */}
      <div className="mt-0">
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button onClick={() => setActiveTab("posts")} className={`flex-1 px-4 py-3 font-bold text-sm transition flex items-center justify-center gap-2 ${activeTab === "posts" ? "text-slate-900 dark:text-white border-b-4 border-sky-500" : "text-slate-500"}`}>
            <Grid size={16} /> Publicações
          </button>
          <button onClick={() => setActiveTab("projects")} className={`flex-1 px-4 py-3 font-bold text-sm transition flex items-center justify-center gap-2 ${activeTab === "projects" ? "text-slate-900 dark:text-white border-b-4 border-sky-500" : "text-slate-500"}`}>
            <FolderGit2 size={16} /> Projetos
          </button>
        </div>

        <div className="min-h-[200px]">
          {activeTab === "posts" && (
            <div>
                {posts.length === 0 ? <p className="p-10 text-center text-slate-500">Nenhuma publicação.</p> : posts.map(post => <PostCard key={post.id} post={post} currentUser={currentUser!} />)}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="p-4 space-y-4">
                {isOwnProfile && (
                     <button 
                        onClick={openCreateModal} // Chama a função que limpa o estado
                        className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-slate-500 hover:border-sky-500 hover:text-sky-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition flex flex-col items-center justify-center gap-2 font-bold"
                    >
                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full"><Plus size={24} /></div>
                        Adicionar Novo Projeto
                    </button>
                )}

                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projects.map(project => (
                            <ProjectCard 
                                key={project.id} 
                                project={project} 
                                currentUser={currentUser}
                                onDelete={handleDeleteProject}
                                onClick={(p) => setSelectedProject(p)}
                                onEdit={openEditModal} // Passa a função de editar
                            />
                        ))}
                    </div>
                ) : (
                    <div className="p-10 text-center text-slate-500">Nenhum projeto.</div>
                )}
            </div>
          )}
        </div>
      </div>

      {/* Modais */}
      {isOwnProfile && isEditModalOpen && <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={profileData.user} onUpdate={handleProfileUpdate} />}
      
      {/* Modal Projeto (Criação e Edição) */}
      <ProjectModal 
         isOpen={isProjectModalOpen} 
         onClose={() => setIsProjectModalOpen(false)}
         userId={profileId}
         onSuccess={handleProjectSuccess} // Callback unificado
         projectToEdit={projectToEdit} // Passa o projeto se for edição
      />

      <ProjectDetailModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}