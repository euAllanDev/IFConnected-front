"use client";
import React from "react";
import { Project, User } from "@/types";
import { Github, ExternalLink, Trash2, Code2, Edit } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  currentUser: User | null;
  onDelete: (id: number) => void;
  onClick: (project: Project) => void;
  onEdit: (project: Project) => void; // <--- NOVO
}

export function ProjectCard({ project, currentUser, onDelete, onClick, onEdit }: ProjectCardProps) {
  const isOwner = currentUser?.id === project.userId;

  return (
    <div 
      onClick={() => onClick(project)} 
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-sky-500 transition-all hover:shadow-lg hover:shadow-sky-500/10 flex flex-col h-full cursor-pointer relative"
    >
      
      {/* Imagem */}
      <div className="h-40 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-300 dark:text-slate-700">
            <Code2 size={48} />
          </div>
        )}

        {/* Botões de Ação (Só aparece para o dono) */}
        {isOwner && (
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-200 z-10">
             {/* EDITAR */}
             <button 
              onClick={(e) => {
                e.stopPropagation(); // Impede abrir o modal de detalhes
                onEdit(project);
              }} 
              className="p-2 bg-black/50 text-white rounded-full hover:bg-sky-500 transition backdrop-blur-sm"
              title="Editar Projeto"
            >
              <Edit size={16} />
            </button>
            
            {/* DELETAR */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(project.id);
              }} 
              className="p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition backdrop-blur-sm"
              title="Excluir Projeto"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 leading-tight">
          {project.title}
        </h3>
        
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span 
                key={index} 
                className="text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
               <span className="text-xs text-slate-400 py-1">+{project.technologies.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}