import { request } from "./apiClient";
import { CandidateResponseDTO, Job, JobApplication, JobApplyRequest, JobStatusUpdateRequest, MyApplicationDTO } from "@/types";

export const jobService = {
  // Feed público de vagas
  getAllJobs: () => request<Job[]>("/jobs"),

  // Criar vaga (Apenas Empresa)
  createJob: (userId: number, jobData: Partial<Job>) =>
    request<Job>(`/jobs?userId=${userId}`, {
      method: "POST",
      body: JSON.stringify(jobData),
    }),

  // Aluno se candidata à vaga
  applyToJob: (jobId: number, data: JobApplyRequest) =>
    request<void>(`/jobs/${jobId}/apply`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Aluno vê suas candidaturas
  getMyApplications: (userId: number) =>
    request<MyApplicationDTO[]>(`/jobs/my-applications?userId=${userId}`),

  // Empresa vê quem se candidatou
  getJobCandidates: (jobId: number, companyId: number) =>
    request<CandidateResponseDTO[]>(`/jobs/${jobId}/candidates?companyId=${companyId}`),

  // Empresa muda o status do candidato
  updateApplicationStatus: (applicationId: number, data: JobStatusUpdateRequest) =>
    request<void>(`/jobs/applications/${applicationId}/status`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

    getCompanyJobs: (companyId: number) =>
    request<Job[]>(`/jobs/company/${companyId}`),
};