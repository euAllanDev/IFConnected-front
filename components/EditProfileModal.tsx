"use client";

import React, { useState, useRef, useEffect } from "react";
import { User } from "@/types";
import { api } from "@/services/api";
import { X, Camera, Loader2, Save } from "lucide-react";
import Image from "next/image";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdate: (updatedUser: User) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdate,
}) => {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || "");
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user.profileImageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resetar estados ao abrir
  useEffect(() => {
    if (isOpen) {
      setUsername(user.username);
      setBio(user.bio || "");
      setPreviewUrl(user.profileImageUrl || null);
      setSelectedFile(null);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedUser = { ...user, username, bio };

      // 1. Upload da foto (se houver nova)
      if (selectedFile) {
        const userWithPhoto = await api.uploadProfilePicture(
          user.id,
          selectedFile
        );
        updatedUser.profileImageUrl = userWithPhoto.profileImageUrl;
      }

      // 2. Update dos dados de texto
      const finalUser = await api.updateUser(updatedUser);

      onUpdate(finalUser); // Atualiza a tela
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao salvar perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-lg text-slate-900 dark:text-white">
            Editar Perfil
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form
          onSubmit={handleSave}
          className="flex flex-col flex-1 overflow-y-auto"
        >
          <div className="p-6 space-y-6">
            {/* Foto */}
            <div className="flex justify-center">
              <div
                className="relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-28 h-28 rounded-full border-4 border-white dark:border-slate-800 shadow-md overflow-hidden relative bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-4xl font-bold text-slate-400">
                      {username?.[0]?.toUpperCase()}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={32} />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent dark:text-white focus:ring-2 focus:ring-sky-500 outline-none resize-none h-24"
                  placeholder="Sobre você..."
                  maxLength={160}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-slate-900/50">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-full font-bold text-white bg-black dark:bg-sky-500 hover:opacity-80 transition-opacity flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Salvar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
