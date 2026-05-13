"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { postService } from "@/services/postService";
import { Post } from "@/types";
import { PostCard } from "./PostCard";
import { Home, Users, MapPin, Loader2, RefreshCw } from "lucide-react";
import CreatePost from "@/features/feed/CreatePost";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type FeedType = "global" | "following" | "regional";

const tabItems: { id: FeedType; icon: typeof Home; label: string }[] = [
  { id: "global", icon: Home, label: "Global" },
  { id: "following", icon: Users, label: "Seguindo" },
  { id: "regional", icon: MapPin, label: "Perto" },
];

export default function FeedPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<FeedType>("global");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      let data: Post[] = [];

      if (activeTab === "global") {
        data = await postService.getAll();
      } else if (activeTab === "following") {
        data = await postService.getFriendsFeed(user.id);
      } else if (activeTab === "regional") {
        data = await postService.getRegionalFeed(user.id, 50);
      }

      const sorted = data.sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
      setPosts(sorted);
    } catch (e: any) {
      console.error("Erro ao buscar feed:", e);
      setError(e.message || "Erro ao conectar com o servidor.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [user, activeTab]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostCreated = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
    setActiveTab("global");
  };

  const FeedSkeleton = () => (
    <div className="divide-y divide-border">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 animate-pulse">
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-20 w-full rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="pb-10">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Página Inicial</h1>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as FeedType)}>
            <TabsList className="w-full grid grid-cols-3 bg-muted/50">
              {tabItems.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="flex items-center gap-2 data-[state=active]:bg-background"
                >
                  <item.icon size={16} />
                  <span className="hidden sm:inline">{item.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Create Post */}
      <CreatePost user={user!} onPostCreated={handlePostCreated} />

      {/* Feed Content */}
      {loading ? (
        <FeedSkeleton />
      ) : error ? (
        <div className="p-10 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
              <RefreshCw className="text-destructive" size={24} />
            </div>
            <p className="text-destructive font-medium">{error}</p>
            <Button
              onClick={fetchPosts}
              variant="outline"
              className="mt-4"
            >
              <RefreshCw size={16} className="mr-2" />
              Tentar novamente
            </Button>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="p-10 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
              <MapPin className="text-muted-foreground" size={24} />
            </div>
            <p className="font-semibold text-foreground">Sem posts para mostrar.</p>
            {activeTab === "regional" && (
              <p className="text-sm text-muted-foreground">
                Vincule seu campus ao perfil para ver posts da sua região!
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} currentUser={user!} />
          ))}
        </div>
      )}
    </div>
  );
}
