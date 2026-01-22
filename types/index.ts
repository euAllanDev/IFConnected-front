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
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  campusId: number;
  password: string;
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  eventDate: string;
  locationName: string;
  campusId: number;
  creatorId: number;
  participantIds: number[];
}


export interface CreateEventRequest {
  title: string;
  description: string;
  eventDate: string;
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
