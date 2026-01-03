"use client";
import React, { useState, useEffect } from "react";
import { X, Loader2, Upload, Link as LinkIcon } from "lucide-react";
import { api } from "@/services/api";
import { Project } from "@/types";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  onSuccess: (project: Project, isEdit: boolean) => void; // Mudamos o nome para onSuccess
  projectToEdit?: Project | null; // Novo campo
}

export function ProjectModal({ isOpen, onClose, userId, onSuccess, projectToEdit }: ProjectModalProps) {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubUrl: "",
    demoUrl: "",
    technologies: "",
  });

  // Efeito para preencher os dados quando for EDIÇÃO
  useEffect(() => {
    if (isOpen) {
        if (projectToEdit) {
            setFormData({
                title: projectToEdit.title,
                description: projectToEdit.description,
                githubUrl: projectToEdit.githubUrl || "",
                demoUrl: projectToEdit.demoUrl || "",
                technologies: projectToEdit.technologies ? projectToEdit.technologies.join(", ") : "",
            });
        } else {
            // Limpa se for criação
            setFormData({ title: "", description: "", githubUrl: "", demoUrl: "", technologies: "" });
            setImage(null);
        }
    }
  }, [isOpen, projectToEdit]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    // Se for criação, precisamos mandar o userId. Na edição, o backend já sabe quem é pelo ID do projeto, 
    // mas mandar não atrapalha.
    data.append("userId", userId.toString());
    
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.githubUrl) data.append("githubUrl", formData.githubUrl);
    if (formData.demoUrl) data.append("demoUrl", formData.demoUrl);
    
    // Só manda arquivo se o usuário selecionou um novo
    if (image) data.append("file", image);
    
    if (formData.technologies) {
       const techs = formData.technologies.split(",").map(t => t.trim()).filter(t => t !== "");
       techs.forEach(t => data.append("technologies", t));
    }

    try {
      let result;
      if (projectToEdit) {
         // ATUALIZAR
         result = await api.updateProject(projectToEdit.id, data);
      } else {
         // CRIAR
         result = await api.createProject(data);
      }
      
      onSuccess(result, !!projectToEdit);
      onClose();
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar projeto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {projectToEdit ? "Editar Projeto" : "Novo Projeto"}
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {/* Capa */}
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center transition hover:bg-slate-50 dark:hover:bg-slate-800/50 group cursor-pointer relative">
             <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                accept="image/*" 
                onChange={e => setImage(e.target.files?.[0] || null)} 
             />
             <div className="flex flex-col items-center gap-2">
                <Upload className="text-slate-400 group-hover:text-sky-500 transition" size={32} />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {image 
                      ? image.name 
                      : projectToEdit?.imageUrl 
                        ? "Clique para alterar a capa" 
                        : "Clique para adicionar capa do projeto"}
                </span>
             </div>
          </div>

          <div className="space-y-3">
            <input 
              placeholder="Título do Projeto" 
              required
              className="w-full bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 focus:border-sky-500 outline-none transition text-sm"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
            
            <textarea 
              placeholder="Descrição do projeto..." 
              required
              rows={3}
              className="w-full bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 focus:border-sky-500 outline-none transition text-sm resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />

            <input 
              placeholder="Tecnologias (ex: Java, Spring, React) - Separe por vírgula" 
              className="w-full bg-slate-50 dark:bg-slate-950 p-3 rounded-lg border border-slate-200 dark:border-slate-800 focus:border-sky-500 outline-none transition text-sm"
              value={formData.technologies}
              onChange={e => setFormData({...formData, technologies: e.target.value})}
            />

            <div className="grid grid-cols-2 gap-3">
               <div className="relative">
                 <LinkIcon size={16} className="absolute left-3 top-3.5 text-slate-400" />
                 <input 
                  placeholder="Link GitHub" 
                  className="w-full bg-slate-50 dark:bg-slate-950 p-3 pl-10 rounded-lg border border-slate-200 dark:border-slate-800 focus:border-sky-500 outline-none transition text-sm"
                  value={formData.githubUrl}
                  onChange={e => setFormData({...formData, githubUrl: e.target.value})}
                />
               </div>
               <div className="relative">
                 <input 
                  placeholder="Link Demo (Site)" 
                  className="w-full bg-slate-50 dark:bg-slate-950 p-3 pl-10 rounded-lg border border-slate-200 dark:border-slate-800 focus:border-sky-500 outline-none transition text-sm"
                  value={formData.demoUrl}
                  onChange={e => setFormData({...formData, demoUrl: e.target.value})}
                />
               </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading} 
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-lg flex justify-center gap-2 transition disabled:opacity-50"
          >
            {loading && <Loader2 className="animate-spin" />} {projectToEdit ? "Salvar Alterações" : "Criar Projeto"}
          </button>
        </form>
      </div>
    </div>
  );
}