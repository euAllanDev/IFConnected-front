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
  Plus,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

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

  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

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
      setPosts(
        postsRes.sort(
          (a, b) =>
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        )
      );
      if (currentUser.id !== profileId) {
        const followingStatus = await api.isFollowing(
          currentUser.id,
          profileId
        );
        setIsFollowing(followingStatus);
      }
    } catch (e) {
      console.error(e);
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  }, [profileId, currentUser]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (!isNaN(profileId)) {
      api.getUserProjects(profileId).then(setProjects).catch(console.error);
    }
  }, [profileId]);

  const handleFollowToggle = async () => {
    if (!currentUser || loadingFollow) return;
    setLoadingFollow(true);
    try {
      if (isFollowing) {
        await api.unfollowUser(currentUser.id, profileId);
        setIsFollowing(false);
        setProfileData((prev) =>
          prev
            ? { ...prev, followersCount: prev.followersCount - 1 }
            : prev
        );
      } else {
        await api.followUser(currentUser.id, profileId);
        setIsFollowing(true);
        setProfileData((prev) =>
          prev
            ? { ...prev, followersCount: prev.followersCount + 1 }
            : prev
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFollow(false);
    }
  };

  const handleProfileUpdate = (updatedUser: User) => {
    setProfileData((prev) =>
      prev ? { ...prev, user: updatedUser } : prev
    );
    if (isOwnProfile) {
      setUserAndPersist(updatedUser);
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este projeto?")) return;
    try {
      await api.deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const openCreateModal = () => {
    setProjectToEdit(null);
    setIsProjectModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setProjectToEdit(project);
    setIsProjectModalOpen(true);
  };

  const handleProjectSuccess = (savedProject: Project, isEdit: boolean) => {
    if (isEdit) {
      setProjects((prev) =>
        prev.map((p) => (p.id === savedProject.id ? savedProject : p))
      );
    } else {
      setProjects((prev) => [savedProject, ...prev]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pb-10">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border px-4 py-3">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
            <div className="space-y-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
        <div className="h-32 bg-muted" />
        <div className="px-4 -mt-12 relative z-10">
          <Skeleton className="h-24 w-24 rounded-full border-4 border-background" />
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Perfil não encontrado.</p>
      </div>
    );
  }

  if (!currentUser) return null;
  const isOwnProfile = currentUser.id === profileId;

  return (
    <div className="pb-10 min-h-screen">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-xl sticky top-0 z-10 border-b border-border px-4 py-3 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="font-bold text-xl leading-tight">
            {profileData.user.username}
          </h1>
          <p className="text-xs text-muted-foreground">
            {profileData.postCount} publicações
          </p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="border-b border-border">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-700 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
        </div>

        <div className="px-4 -mt-12 relative z-10">
          <div className="flex justify-between items-end">
            <Avatar className="h-24 w-24 rounded-full border-4 border-background shadow-xl">
              <AvatarImage
                src={profileData.user.profileImageUrl || undefined}
                className="object-cover"
              />
              <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                {profileData.user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="mb-2">
              {isOwnProfile ? (
                <Button
                  variant="outline"
                  onClick={() => setIsEditModalOpen(true)}
                  className="rounded-full"
                >
                  <Edit2 size={16} className="mr-2" />
                  Editar Perfil
                </Button>
              ) : (
                <Button
                  onClick={handleFollowToggle}
                  disabled={loadingFollow}
                  className={cn(
                    "rounded-full px-6 font-semibold transition-all",
                    isFollowing
                      ? "bg-background border-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  )}
                >
                  {loadingFollow ? (
                    <Loader2 className="animate-spin h-4 w-4" />
                  ) : isFollowing ? (
                    <>Seguindo <Check size={14} className="ml-1" /></>
                  ) : (
                    <><UserPlus size={16} className="mr-2" /> Seguir</>
                  )}
                </Button>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <h2 className="text-xl font-bold">{profileData.user.username}</h2>
              <p className="text-sm text-muted-foreground">
                @{profileData.user.email?.split("@")[0]}
              </p>
            </div>

            {profileData.user.bio && (
              <p className="text-sm whitespace-pre-wrap">{profileData.user.bio}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {profileData.user.campusName && (
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>{profileData.user.campusName}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>
                  Entrou em{" "}
                  {new Date(profileData.user.createdAt || Date.now()).toLocaleDateString(
                    "pt-BR",
                    { month: "long", year: "numeric" }
                  )}
                </span>
              </div>
            </div>

            <div className="flex gap-6 py-2">
              <button className="hover:underline">
                <span className="font-bold">{profileData.followingCount}</span>{" "}
                <span className="text-muted-foreground">Seguindo</span>
              </button>
              <button className="hover:underline">
                <span className="font-bold">{profileData.followersCount}</span>{" "}
                <span className="text-muted-foreground">Seguidores</span>
              </button>
            </div>
          </div>
        </div>

        <Separator className="mt-6" />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2 rounded-none border-b border-border bg-transparent h-auto p-0">
          <TabsTrigger
            value="posts"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 gap-2"
          >
            <Grid size={16} /> Publicações
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 gap-2"
          >
            <FolderGit2 size={16} /> Projetos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-0">
          {posts.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground">
              <p>Nenhuma publicação.</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUser={currentUser!}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="projects" className="mt-0 p-4 space-y-4">
          {isOwnProfile && (
            <Button
              variant="outline"
              onClick={openCreateModal}
              className="w-full border-dashed h-24 flex-col gap-2"
            >
              <div className="p-2 rounded-full bg-muted">
                <Plus size={24} />
              </div>
              <span className="font-semibold">Adicionar Novo Projeto</span>
            </Button>
          )}

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  currentUser={currentUser}
                  onDelete={handleDeleteProject}
                  onClick={(p) => setSelectedProject(p)}
                  onEdit={openEditModal}
                />
              ))}
            </div>
          ) : (
            <div className="p-10 text-center text-muted-foreground">
              <p>Nenhum projeto.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {isOwnProfile && isEditModalOpen && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={profileData.user}
          onUpdate={handleProfileUpdate}
        />
      )}

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        userId={profileId}
        onSuccess={handleProjectSuccess}
        projectToEdit={projectToEdit}
      />

      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
