"use client";

import React, { useEffect, useState } from 'react';
import JobFeed from '@/features/jobs/JobFeed';
import { User } from '@/types';
import Link from 'next/link';

export default function JobsPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Busca o usuário do localStorage
    const storedUser = localStorage.getItem("ifconnected:user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("DEBUG ROLE:", parsedUser.role); // 🚨 OLHE ISSO NO CONSOLE
      setUser(parsedUser);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center border-b border-gray-700 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Vagas e Oportunidades</h1>
        </div>
        
        {/* Lógica de permissão: só aparece para COMPANY ou ADMIN */}
        {(user?.role === "COMPANY" || user?.role === "ADMIN") && (
          <Link 
            href="/jobs/new" 
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            + Publicar Vaga
          </Link>
        )}
      </div>
      
      <JobFeed />
    </div>
  );
}