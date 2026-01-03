// src/types/index.ts

export interface User {
  id: number;
  username: string;
  email: string;
  bio?: string;
  profileImageUrl?: string;
  campusId?: number;
}

export interface Post {
  id: number | string;
  userId: number;
  content: string;
  imageUrl?: string;
  comments?: any[];
  likes?: number[];
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  username?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  campusId: number; // <--- Novo campo obrigatório
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  eventDate: string; // Vem como string ISO do Java
  locationName: string;
  campusId: number;
  creatorId: number;
  participantIds: number[]; // Lista de IDs de quem vai
}

// Interface para criar evento
export interface CreateEventRequest {
  title: string;
  description: string;
  eventDate: string; // ISO String
  locationName: string;
  campusId: number;
  creatorId: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  technologies?: string[];
  userId: number;
}
