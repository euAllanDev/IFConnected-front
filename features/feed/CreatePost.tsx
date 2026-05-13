"use client";

import React, { useEffect, useRef, useState } from "react";
import { Post, User } from "@/types";
import { postService } from "@/services/postService";
import { ImageIcon, X, Loader2, Send } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CreatePostProps {
  user: User;
  onPostCreated: (post: Post) => void;
}

export default function CreatePost({ user, onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [currentUser, setCurrentUser] = useState<User>(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncFromStorage = () => {
      const stored = localStorage.getItem("ifconnected:user");
      if (!stored) return;
      try {
        const parsed: User = JSON.parse(stored);
        if (parsed?.id === user.id) setCurrentUser(parsed);
      } catch {}
    };

    syncFromStorage();

    const handler = () => syncFromStorage();
    window.addEventListener("ifconnected:user-updated", handler);
    return () => window.removeEventListener("ifconnected:user-updated", handler);
  }, [user.id]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        60
      )}px`;
    }
  }, [content]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        alert("A imagem deve ter menos que 5MB");
        return;
      }
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !imageFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("userId", currentUser.id.toString());
    formData.append("content", content);
    if (imageFile) formData.append("file", imageFile);

    try {
      const newPost = await postService.create(formData);

      setContent("");
      setImageFile(null);
      setImagePreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setIsFocused(false);

      onPostCreated(newPost);
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Falha ao publicar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const avatarLetter =
    currentUser?.username?.trim()?.[0]?.toUpperCase() ||
    currentUser?.email?.trim()?.[0]?.toUpperCase() ||
    "U";

  const charCount = content.length;
  const maxChars = 500;
  const isOverLimit = charCount > maxChars;

  return (
    <TooltipProvider>
      <Card className="border-b border-x-0 border-t-0 rounded-none bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 shrink-0 ring-2 ring-primary/10">
              <AvatarImage src={currentUser?.profileImageUrl || undefined} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {avatarLetter}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <Textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder={`O que está acontecendo no Campus, ${currentUser.username}?`}
                className="w-full resize-none border-0 bg-transparent text-lg placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[60px] py-2"
                maxLength={maxChars + 50}
              />

              {imagePreviewUrl && (
                <div className="relative mt-3 mb-3 overflow-hidden rounded-xl group">
                  <Image
                    src={imagePreviewUrl}
                    alt="Preview"
                    width={600}
                    height={400}
                    className="max-h-80 w-auto object-cover rounded-xl border border-border"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={clearImage}
                    className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 hover:bg-black/80 text-white"
                  >
                    <X size={16} />
                  </Button>
                </div>
              )}

              {(isFocused || content || imagePreviewUrl) && (
                <div className="flex justify-between items-center pt-3 border-t border-border/50 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => fileInputRef.current?.click()}
                          className="h-9 w-9 rounded-full text-primary hover:text-primary hover:bg-primary/10"
                        >
                          <ImageIcon size={20} />
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Adicionar imagem</p>
                      </TooltipContent>
                    </Tooltip>

                    <span
                      className={`text-xs ml-2 transition-colors ${
                        isOverLimit
                          ? "text-destructive"
                          : charCount > maxChars * 0.8
                          ? "text-amber-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {charCount}/{maxChars}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setContent("");
                        clearImage();
                        setIsFocused(false);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        loading ||
                        (!content.trim() && !imageFile) ||
                        isOverLimit
                      }
                      className="rounded-full px-6 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {loading ? (
                        <Loader2 size={16} className="animate-spin mr-2" />
                      ) : (
                        <Send size={16} className="mr-2" />
                      )}
                      Publicar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </Card>
    </TooltipProvider>
  );
}
