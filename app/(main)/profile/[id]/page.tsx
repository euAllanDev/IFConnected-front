"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/services/api";
import { Post, User, Project, Job } from "@/types";
import { PostCard } from "../../feed/PostCard";
import { useAuth } from "@/contexts/AuthContext";
import { EditProfileModal } from "@/components/EditProfileModal";
import { ProjectCard } from "@/features/profile/ProjectCard";
import { ProjectModal } from "@/features/profile/ProjectModal";
import { ProjectDetailModal } from "@/features/profile/ProjectDetailModal";
import {
  ArrowLeft, Loader2, Edit2, Grid, FolderGit2, Plus,
  Briefcase, MapPin, ExternalLink, Building2, Users, FileText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UserProfileData {
  user: User;
  followersCount: number;
  followingCount: number;
  postCount: number;
}

export default function ProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { user: currentUser, login } = useAuth();
  const profileId = Number(id);

  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [isHoveringFollow, setIsHoveringFollow] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Estudante
  const [activeTab, setActiveTab] = useState<"posts" | "projects">("posts");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  // Empresa
  const [companyTab, setCompanyTab] = useState<"posts" | "jobs">("posts");
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  const loadData = useCallback(async () => {
    if (isNaN(profileId) || !currentUser) { setLoading(false); return; }
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
    } catch (e) { console.error(e); setProfileData(null); }
    finally { setLoading(false); }
  }, [profileId, currentUser]);

  useEffect(() => { loadData(); }, [loadData]);
  useEffect(() => { if (!isNaN(profileId)) api.getUserProjects(profileId).then(setProjects).catch(console.error); }, [profileId]);
  useEffect(() => {
    if (!profileData || profileData.user.role !== "COMPANY") return;
    setLoadingJobs(true);
    api.getCompanyJobs(profileId).then(setCompanyJobs).catch(console.error).finally(() => setLoadingJobs(false));
  }, [profileData, profileId]);

  const handleFollowToggle = async () => {
    if (!currentUser) return;
    setLoadingFollow(true);
    try {
      if (isFollowing) {
        await api.unfollowUser(currentUser.id, profileId);
        setIsFollowing(false);
        setProfileData(prev => prev ? { ...prev, followersCount: prev.followersCount - 1 } : prev);
      } else {
        await api.followUser(currentUser.id, profileId);
        setIsFollowing(true);
        setProfileData(prev => prev ? { ...prev, followersCount: prev.followersCount + 1 } : prev);
      }
    } catch (e) { console.error(e); } finally { setLoadingFollow(false); }
  };

  const handleProfileUpdate = (updatedUser: User) => {
    setProfileData(prev => prev ? { ...prev, user: updatedUser } : prev);
    if (isOwnProfile) login(updatedUser);
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Tem certeza?")) return;
    try { await api.deleteProject(id); setProjects(prev => prev.filter(p => p.id !== id)); }
    catch (e) { console.error(e); }
  };

  const openCreateModal = () => { setProjectToEdit(null); setIsProjectModalOpen(true); };
  const openEditModal = (project: Project) => { setProjectToEdit(project); setIsProjectModalOpen(true); };
  const handleProjectSuccess = (saved: Project, isEdit: boolean) => {
    if (isEdit) setProjects(prev => prev.map(p => p.id === saved.id ? saved : p));
    else setProjects(prev => [saved, ...prev]);
  };

  if (loading) return <div className="p-10 text-center"><Loader2 className="animate-spin text-emerald-500 mx-auto" size={32} /></div>;
  if (!profileData) return <div className="p-10 text-center">Perfil não encontrado.</div>;
  if (!currentUser) return null;

  const isOwnProfile = currentUser.id === profileId;
  const isCompany = profileData.user.role === "COMPANY";

  // ─── Perfil de Empresa ────────────────────────────────────────────────────
  if (isCompany) {
    return (
      <div className="pb-10 min-h-screen">
        {/* Header sticky */}
        <div className="bg-white dark:bg-zinc-900 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-bold text-xl leading-tight">{profileData.user.username}</h1>
            <p className="text-xs text-slate-500 flex items-center gap-1"><Building2 size={11} /> Empresa</p>
          </div>
        </div>

        {/* Banner — fora de qualquer padding container */}
        <div className="h-40 w-full bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 40px)`
          }} />
        </div>

        {/* Seção de info — padding próprio, logo sobe com -mt */}
        <div className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-slate-800 px-6 pb-5">
          <div className="flex justify-between items-start">
            {/* Logo puxa pra cima */}
            <div className="-mt-12 w-24 h-24 rounded-2xl border-4 border-white dark:border-zinc-900 bg-white dark:bg-zinc-800 flex items-center justify-center overflow-hidden shadow-lg flex-shrink-0 z-10 relative">
              {profileData.user.profileImageUrl
                ? <Image src={profileData.user.profileImageUrl} alt="Logo" width={96} height={96} className="w-full h-full object-cover" unoptimized />
                : <Building2 size={36} className="text-emerald-500" />
              }
            </div>
            {/* Botão fica no topo sem precisar compensar o logo */}
            <div className="pt-3">
              {isOwnProfile ? (
                <button onClick={() => setIsEditModalOpen(true)} className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-full font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                  <Edit2 size={14} /> Editar Perfil
                </button>
              ) : (
                <button onClick={handleFollowToggle} disabled={loadingFollow} onMouseEnter={() => setIsHoveringFollow(true)} onMouseLeave={() => setIsHoveringFollow(false)}
                  className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${isFollowing ? "bg-transparent border border-slate-600 text-slate-300 hover:border-red-500 hover:text-red-400" : "bg-emerald-600 hover:bg-emerald-500 text-white"}`}>
                  {isFollowing ? (isHoveringFollow ? "Deixar de seguir" : "Seguindo") : "Seguir"}
                </button>
              )}
            </div>
          </div>

          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">{profileData.user.username}</h2>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                <Building2 size={11} /> Empresa
              </span>
            </div>
            {profileData.user.bio && <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{profileData.user.bio}</p>}
            <div className="flex gap-5 pt-1 text-sm">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Briefcase size={13} className="text-emerald-500" />
                <span className="font-bold text-slate-900 dark:text-white">{companyJobs.filter(j => j.active).length}</span>
                <span>vagas ativas</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Users size={13} className="text-emerald-500" />
                <span className="font-bold text-slate-900 dark:text-white">{profileData.followersCount}</span>
                <span>seguidores</span>
              </div>
            </div>
          </div>
        </div>

        {/* Abas empresa */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-zinc-900">
          <TabBtn active={companyTab === "posts"} onClick={() => setCompanyTab("posts")} icon={<Grid size={15} />} label="Publicações" />
          <TabBtn active={companyTab === "jobs"} onClick={() => setCompanyTab("jobs")} icon={<Briefcase size={15} />} label={`Vagas (${companyJobs.filter(j => j.active).length})`} />
        </div>

        {companyTab === "posts" && (
          <div>
            {posts.length === 0
              ? <EmptyState icon={<FileText size={36} />} message="Nenhuma publicação ainda." />
              : posts.map(post => <PostCard key={post.id} post={post} currentUser={currentUser} />)}
          </div>
        )}

        {companyTab === "jobs" && (
          <div className="p-4 space-y-3 max-w-2xl">
            {isOwnProfile && (
              <div className="flex justify-end">
                <Link href="/jobs/new" className="text-sm text-emerald-500 hover:text-emerald-400 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-emerald-500/10 transition-colors">
                  <Plus size={14} /> Nova vaga
                </Link>
              </div>
            )}
            {loadingJobs
              ? <div className="text-center py-8"><Loader2 className="animate-spin text-emerald-500 mx-auto" size={24} /></div>
              : companyJobs.length === 0
                ? <EmptyState icon={<Briefcase size={36} />} message="Nenhuma vaga publicada ainda." />
                : companyJobs.map(job => <CompanyJobCard key={job.id} job={job} />)
            }
          </div>
        )}

        {isOwnProfile && isEditModalOpen && (
          <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={profileData.user} onUpdate={handleProfileUpdate} />
        )}
      </div>
    );
  }

  // ─── Perfil de Estudante ──────────────────────────────────────────────────
  return (
    <div className="pb-10 min-h-screen">
      <div className="bg-white dark:bg-zinc-900 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-bold text-xl leading-tight">{profileData.user.username}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">{profileData.postCount} publicações</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-slate-800">
        {/* Banner sem padding negativo */}
        <div className="h-36 w-full bg-gradient-to-r from-zinc-700 to-zinc-900" />
        <div className="px-4 pb-4">
          <div className="flex justify-between items-start">
            <div className="-mt-16 w-32 h-32 rounded-full border-4 border-white dark:border-zinc-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-5xl font-bold text-slate-500 overflow-hidden flex-shrink-0">
              {profileData.user.profileImageUrl
                ? <Image src={profileData.user.profileImageUrl} alt="Foto" width={128} height={128} className="w-full h-full object-cover" priority unoptimized />
                : profileData.user.username[0].toUpperCase()}
            </div>
            <div className="pt-3">
              {isOwnProfile ? (
                <button onClick={() => setIsEditModalOpen(true)} className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-full font-bold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                  <Edit2 size={16} /> Editar Perfil
                </button>
              ) : (
                <button onClick={handleFollowToggle} disabled={loadingFollow} onMouseEnter={() => setIsHoveringFollow(true)} onMouseLeave={() => setIsHoveringFollow(false)}
                  className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${isFollowing ? "bg-transparent border border-slate-600 text-slate-300 hover:border-red-500 hover:text-red-400" : "bg-black dark:bg-white text-white dark:text-black hover:opacity-90"}`}>
                  {isFollowing ? (isHoveringFollow ? "Deixar de seguir" : "Seguindo") : "Seguir"}
                </button>
              )}
            </div>
          </div>
          <div className="mt-3">
            <h2 className="text-xl font-bold">{profileData.user.username}</h2>
            <p className="whitespace-pre-wrap text-sm mb-3 text-slate-600 dark:text-slate-400">{profileData.user.bio || "Sem bio."}</p>
            <div className="flex gap-4 text-sm">
              <span><span className="font-bold text-slate-900 dark:text-white">{profileData.followingCount}</span> <span className="text-slate-500">Seguindo</span></span>
              <span><span className="font-bold text-slate-900 dark:text-white">{profileData.followersCount}</span> <span className="text-slate-500">Seguidores</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <TabBtn active={activeTab === "posts"} onClick={() => setActiveTab("posts")} icon={<Grid size={15} />} label="Publicações" />
        <TabBtn active={activeTab === "projects"} onClick={() => setActiveTab("projects")} icon={<FolderGit2 size={15} />} label="Projetos" />
      </div>

      <div className="min-h-[200px]">
        {activeTab === "posts" && (
          <div>
            {posts.length === 0
              ? <EmptyState icon={<FileText size={36} />} message="Nenhuma publicação." />
              : posts.map(post => <PostCard key={post.id} post={post} currentUser={currentUser} />)}
          </div>
        )}
        {activeTab === "projects" && (
          <div className="p-4 space-y-4">
            {isOwnProfile && (
              <button onClick={openCreateModal} className="w-full border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-slate-500 hover:border-emerald-500 hover:text-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition flex flex-col items-center justify-center gap-2 font-bold">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full"><Plus size={24} /></div>
                Adicionar Novo Projeto
              </button>
            )}
            {projects.length > 0
              ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map(p => <ProjectCard key={p.id} project={p} currentUser={currentUser} onDelete={handleDeleteProject} onClick={p => setSelectedProject(p)} onEdit={openEditModal} />)}
                </div>
              : <EmptyState icon={<FolderGit2 size={36} />} message="Nenhum projeto." />
            }
          </div>
        )}
      </div>

      {isOwnProfile && isEditModalOpen && (
        <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={profileData.user} onUpdate={handleProfileUpdate} />
      )}
      <ProjectModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} userId={profileId} onSuccess={handleProjectSuccess} projectToEdit={projectToEdit} />
      <ProjectDetailModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

// ─── Auxiliares ───────────────────────────────────────────────────────────────

function TabBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button onClick={onClick} className={`flex-1 px-4 py-3 font-bold text-sm transition flex items-center justify-center gap-2 ${active ? "text-slate-900 dark:text-white border-b-4 border-emerald-500" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}>
      {icon} {label}
    </button>
  );
}

function EmptyState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400 dark:text-slate-600 gap-3">
      <div className="opacity-30">{icon}</div>
      <p className="text-sm">{message}</p>
    </div>
  );
}

function CompanyJobCard({ job }: { job: Job }) {
  return (
    <Link href="/jobs">
      <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-emerald-500/50 transition-all group">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm truncate">{job.title}</h4>
            <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${job.active ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30" : "text-slate-400 bg-slate-100 dark:bg-slate-800"}`}>
              {job.active ? "Ativa" : "Encerrada"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
            {job.location && <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>}
            {job.type && <span>{job.type}</span>}
          </div>
        </div>
        <ExternalLink size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 transition flex-shrink-0" />
      </div>
    </Link>
  );
}