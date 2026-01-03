"use client";
import React from "react";
import { X, Github, ExternalLink, Calendar, Code2 } from "lucide-react";
import { Project } from "@/types";

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl relative">
        
        {/* Botão Fechar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
        >
          <X size={20} />
        </button>

        {/* Imagem de Capa Grande */}
        <div className="h-64 sm:h-80 bg-slate-100 dark:bg-slate-800 relative w-full">
          {project.imageUrl ? (
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <Code2 size={64} />
              <span className="mt-2 text-sm">Sem imagem de capa</span>
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {project.title}
          </h2>

          {/* Tecnologias */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Links de Ação */}
          <div className="flex gap-4 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg font-bold hover:opacity-90 transition"
              >
                <Github size={18} /> Ver Código
              </a>
            )}
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <ExternalLink size={18} /> Acessar Demo
              </a>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Sobre o Projeto</h3>
            <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed text-lg">
              {project.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}