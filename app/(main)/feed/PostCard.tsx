"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Post, User } from "@/types";
import { api } from "@/services/api";
import {
  MessageCircle,
  Heart,
  Repeat2,
  Share2,
  MoreHorizontal,
  Loader2,
  Send,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  currentUser: User | null;
}

const formatTimeAgo = (dateString?: string) => {
  if (!dateString) return "agora";
  try {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(dateString).getTime()) / 1000
    );
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  } catch (e) {
    return "agora";
  }
};

export function PostCard({ post, currentUser }: PostCardProps) {
  const router = useRouter();

  const [authorName, setAuthorName] = useState(`User ${post.userId}`);
  const [author, setAuthor] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [isLiked, setIsLiked] = useState(
    currentUser ? post.likes?.includes(currentUser.id) || false : false
  );
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [commentCount, setCommentCount] = useState(post.comments?.length || 0);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);

  const isOwnPost = currentUser?.id === post.userId;

  useEffect(() => {
    api
      .getUserById(post.userId)
      .then((user) => {
        if (user) {
          setAuthorName(user.username);
          setAuthor(user);
        }
      })
      .catch(() => setAuthorName(`ID #${post.userId}`));

    if (currentUser && !isOwnPost) {
      api
        .isFollowing(currentUser.id, post.userId)
        .then(setIsFollowing)
        .catch(console.error);
    }
  }, [post.userId, currentUser, isOwnPost]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      router.push("/login");
      return;
    }

    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    setLikeCount((prev) => prev + (newLikeState ? 1 : -1));

    if (newLikeState) {
      setLikeAnimation(true);
      setTimeout(() => setLikeAnimation(false), 300);
    }

    try {
      await api.toggleLike(post.id, currentUser.id);
    } catch (error) {
      setIsLiked(!newLikeState);
      setLikeCount((prev) => prev - (newLikeState ? 1 : -1));
      console.error("Erro ao curtir:", error);
    }
  };

  const handleFollowToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser || !author || loadingFollow) return;

    setLoadingFollow(true);
    const action = isFollowing ? api.unfollowUser : api.followUser;
    const newFollowingState = !isFollowing;

    try {
      await action(currentUser.id, post.userId);
      setIsFollowing(newFollowingState);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFollow(false);
    }
  };

  const toggleCommentInput = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setShowCommentInput((prev) => !prev);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!commentText.trim() || loadingComment || !currentUser) return;

    setLoadingComment(true);
    try {
      const updatedPost = await api.addComment({
        postId: post.id,
        userId: currentUser.id,
        content: commentText.trim(),
      });

      setCommentText("");

      if (updatedPost && updatedPost.comments) {
        setComments(updatedPost.comments);
        setCommentCount(updatedPost.comments.length);
      }
    } catch (error) {
      alert("Erro ao enviar comentário.");
      console.error(error);
    } finally {
      setLoadingComment(false);
    }
  };

  const goToPost = () => {
    router.push(`/post/${post.id}`);
  };

  const goToProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/profile/${post.userId}`);
  };

  const avatarLetter = (authorName || "?")[0].toUpperCase();

  return (
    <TooltipProvider>
      <article
        onClick={goToPost}
        className="border-b border-border bg-card hover:bg-accent/30 cursor-pointer transition-colors duration-200 animate-fade-in"
      >
        <div className="p-4">
          <div className="flex gap-3">
            <Avatar
              onClick={goToProfile}
              className="h-10 w-10 shrink-0 cursor-pointer ring-2 ring-transparent hover:ring-primary/20 transition-all"
            >
              <AvatarImage src={author?.profileImageUrl || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {avatarLetter}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  onClick={goToProfile}
                  className="font-bold text-foreground hover:underline cursor-pointer"
                >
                  {authorName}
                </span>
                <span className="text-muted-foreground">
                  @{authorName.toLowerCase().replace(/\s/g, "")}
                </span>
                <span className="text-muted-foreground">·</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-muted-foreground text-sm hover:underline cursor-pointer">
                      {formatTimeAgo(post.createdAt)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{post.createdAt && new Date(post.createdAt).toLocaleString()}</p>
                  </TooltipContent>
                </Tooltip>

                {!isOwnPost && currentUser && (
                  <>
                    <span className="text-border">·</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleFollowToggle}
                      disabled={loadingFollow}
                      className={cn(
                        "h-auto p-0 text-xs font-semibold transition-colors",
                        isFollowing
                          ? "text-muted-foreground hover:text-destructive"
                          : "text-primary hover:text-primary/80"
                      )}
                    >
                      {loadingFollow ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : isFollowing ? (
                        <>Seguindo <Check size={12} /></>
                      ) : (
                        "Seguir"
                      )}
                    </Button>
                  </>
                )}

                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                        <MoreHorizontal size={16} className="text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        Compartilhar
                      </DropdownMenuItem>
                      {isOwnPost && (
                        <DropdownMenuItem
                          onClick={(e) => e.stopPropagation()}
                          className="text-destructive"
                        >
                          Excluir post
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <p className="text-foreground mt-1 mb-3 whitespace-pre-wrap leading-relaxed">
                {post.content}
              </p>

              {post.imageUrl && (
                <div className="mt-3 mb-3 overflow-hidden rounded-xl border border-border bg-muted">
                  <Image
                    src={post.imageUrl}
                    alt="Post media"
                    width={600}
                    height={400}
                    className="w-full h-auto max-h-[500px] object-contain"
                    unoptimized
                  />
                </div>
              )}

              <div className="flex items-center justify-between max-w-md mt-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleCommentInput}
                      className="h-8 gap-2 text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 -ml-2"
                    >
                      <MessageCircle size={18} />
                      <span className="text-xs">{commentCount}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Comentar</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLike}
                      className={cn(
                        "h-8 gap-2 transition-all duration-200 -ml-2",
                        isLiked
                          ? "text-pink-500 hover:text-pink-600 hover:bg-pink-500/10"
                          : "text-muted-foreground hover:text-pink-500 hover:bg-pink-500/10",
                        likeAnimation && "scale-110"
                      )}
                    >
                      <Heart
                        size={18}
                        className={cn("transition-all", isLiked && "fill-pink-500")}
                      />
                      <span className="text-xs">{likeCount}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isLiked ? "Descurtir" : "Curtir"}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-2 text-muted-foreground hover:text-green-500 hover:bg-green-500/10 -ml-2"
                    >
                      <Repeat2 size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Republicar</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10 -ml-2"
                    >
                      <Share2 size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Compartilhar</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {showCommentInput && (
                <div
                  className="mt-4 pt-4 border-t border-border animate-fade-in"
                  onClick={(e) => e.stopPropagation()}
                >
                  {comments.length > 0 && (
                    <div className="mb-4 space-y-3">
                      {comments.slice(-3).map((comment: any, index) => (
                        <div
                          key={comment.commentId || index}
                          className="flex gap-2 text-sm"
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-muted text-xs">
                              {comment.userId === currentUser?.id
                                ? "V"
                                : "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-muted rounded-2xl rounded-tl-none px-3 py-2">
                            <span className="font-semibold text-xs block">
                              {comment.userId === currentUser?.id
                                ? "Você"
                                : `User ${comment.userId}`}
                            </span>
                            <span className="text-foreground">{comment.text}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <form onSubmit={handleCommentSubmit} className="flex gap-2">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarImage src={currentUser?.profileImageUrl || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {currentUser?.username?.[0]?.toUpperCase() || "V"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex gap-2">
                      <Textarea
                        placeholder="Escreva um comentário..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        disabled={loadingComment}
                        className="min-h-[40px] resize-none rounded-xl bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary py-2"
                        autoFocus
                      />
                      <Button
                        type="submit"
                        disabled={!commentText.trim() || loadingComment}
                        size="icon"
                        className="h-10 w-10 shrink-0 rounded-full bg-primary hover:bg-primary/90"
                      >
                        {loadingComment ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Send size={16} />
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </TooltipProvider>
  );
}
