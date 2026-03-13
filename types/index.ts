// src/types/index.ts

export interface User {
  id: number;
  username: string;
  email: string;
  bio?: string;
  profileImageUrl?: string;
  campusId?: number;
  role?: string;
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

export type ApplicationStatus = "PENDING" | "REVIEWED" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN";

export interface Job {
  id: number;
  title: string;
  description: string;
  requirements?: string;
  location?: string;
  type?: string;
  active: boolean;
  companyId: number;
  createdAt: string;
}

export interface JobApplication {
  id: number;
  jobId: number;
  candidateId: number;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
}

export interface JobApplyRequest {
  userId: number;
  coverLetter?: string;
}

export interface JobStatusUpdateRequest {
  companyId: number;
  status: ApplicationStatus;
}

export interface MyApplicationDTO {
  applicationId: number;
  jobId: number;
  jobTitle: string;
  companyName: string;
  status: ApplicationStatus;
  appliedAt: string;
}

export interface CandidateResponseDTO {
  applicationId: number;
  candidateId: number;
  candidateName: string;
  candidateEmail: string;
  candidatePhoto?: string;
  coverLetter?: string;
  status: ApplicationStatus;
  appliedAt: string;
}

export interface DashboardDTO {
  users: number;
  posts: number;
  jobs: number;
  campuses: number;
}
