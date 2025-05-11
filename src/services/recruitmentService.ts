
import { get, post, put, del } from './api';
import { ApiResponse, PaginatedResponse, Job, Candidate } from '../types/api';

export interface JobFilters {
  status?: 'open' | 'closed' | 'draft';
  department?: string;
  location?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CandidateFilters {
  jobId?: string;
  stage?: 'applied' | 'screening' | 'interview' | 'technical' | 'offer' | 'hired' | 'rejected';
  search?: string;
  page?: number;
  limit?: number;
}

export const recruitmentService = {
  // Job APIs
  getJobs: async (filters: JobFilters): Promise<PaginatedResponse<Job>> => {
    const queryParams = new URLSearchParams();
    
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.department) queryParams.append('department', filters.department);
    if (filters.location) queryParams.append('location', filters.location);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await get<PaginatedResponse<Job>>(`/recruitment/jobs?${queryParams.toString()}`);
    return response;
  },
  
  getJobById: async (id: string): Promise<Job> => {
    const response = await get<ApiResponse<Job>>(`/recruitment/jobs/${id}`);
    return response.data;
  },
  
  createJob: async (jobData: Partial<Job>): Promise<Job> => {
    const response = await post<ApiResponse<Job>>('/recruitment/jobs', jobData);
    return response.data;
  },
  
  updateJob: async (id: string, jobData: Partial<Job>): Promise<Job> => {
    const response = await put<ApiResponse<Job>>(`/recruitment/jobs/${id}`, jobData);
    return response.data;
  },
  
  closeJob: async (id: string): Promise<Job> => {
    const response = await put<ApiResponse<Job>>(`/recruitment/jobs/${id}/close`, {});
    return response.data;
  },
  
  deleteJob: async (id: string): Promise<ApiResponse<null>> => {
    const response = await del<ApiResponse<null>>(`/recruitment/jobs/${id}`);
    return response;
  },
  
  // Candidate APIs
  getCandidates: async (filters: CandidateFilters): Promise<PaginatedResponse<Candidate>> => {
    const queryParams = new URLSearchParams();
    
    if (filters.jobId) queryParams.append('jobId', filters.jobId);
    if (filters.stage) queryParams.append('stage', filters.stage);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await get<PaginatedResponse<Candidate>>(`/recruitment/candidates?${queryParams.toString()}`);
    return response;
  },
  
  getCandidateById: async (id: string): Promise<Candidate> => {
    const response = await get<ApiResponse<Candidate>>(`/recruitment/candidates/${id}`);
    return response.data;
  },
  
  createCandidate: async (candidateData: Partial<Candidate>): Promise<Candidate> => {
    const response = await post<ApiResponse<Candidate>>('/recruitment/candidates', candidateData);
    return response.data;
  },
  
  updateCandidate: async (id: string, candidateData: Partial<Candidate>): Promise<Candidate> => {
    const response = await put<ApiResponse<Candidate>>(`/recruitment/candidates/${id}`, candidateData);
    return response.data;
  },
  
  updateCandidateStage: async (id: string, stage: Candidate['stage'], notes?: string): Promise<Candidate> => {
    const response = await put<ApiResponse<Candidate>>(`/recruitment/candidates/${id}/stage`, { stage, notes });
    return response.data;
  },
  
  deleteCandidate: async (id: string): Promise<ApiResponse<null>> => {
    const response = await del<ApiResponse<null>>(`/recruitment/candidates/${id}`);
    return response;
  },
  
  uploadCandidateResume: async (id: string, file: File): Promise<Candidate> => {
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await post<ApiResponse<Candidate>>(`/recruitment/candidates/${id}/upload-resume`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
  
  uploadCandidateCoverLetter: async (id: string, file: File): Promise<Candidate> => {
    const formData = new FormData();
    formData.append('coverLetter', file);
    
    const response = await post<ApiResponse<Candidate>>(`/recruitment/candidates/${id}/upload-cover-letter`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }
};

export default recruitmentService;
