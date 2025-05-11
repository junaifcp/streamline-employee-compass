
import { get, post, put, del } from './api';
import { ApiResponse, PaginatedResponse, PerformanceReview } from '../types/api';

export interface PerformanceFilters {
  employeeId?: string;
  reviewerId?: string;
  type?: string;
  status?: 'completed' | 'pending' | 'missed';
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export const performanceService = {
  getPerformanceReviews: async (filters: PerformanceFilters): Promise<PaginatedResponse<PerformanceReview>> => {
    const queryParams = new URLSearchParams();
    
    if (filters.employeeId) queryParams.append('employeeId', filters.employeeId);
    if (filters.reviewerId) queryParams.append('reviewerId', filters.reviewerId);
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await get<PaginatedResponse<PerformanceReview>>(`/performance?${queryParams.toString()}`);
    return response;
  },
  
  getReviewById: async (id: string): Promise<PerformanceReview> => {
    const response = await get<ApiResponse<PerformanceReview>>(`/performance/${id}`);
    return response.data;
  },
  
  createReview: async (reviewData: Partial<PerformanceReview>): Promise<PerformanceReview> => {
    const response = await post<ApiResponse<PerformanceReview>>('/performance', reviewData);
    return response.data;
  },
  
  updateReview: async (id: string, reviewData: Partial<PerformanceReview>): Promise<PerformanceReview> => {
    const response = await put<ApiResponse<PerformanceReview>>(`/performance/${id}`, reviewData);
    return response.data;
  },
  
  completeReview: async (id: string, reviewData: {
    metrics: { name: string; rating: number; comment?: string }[];
    overallRating?: number;
    strengths?: string[];
    areasForImprovement?: string[];
    notes?: string;
  }): Promise<PerformanceReview> => {
    const response = await put<ApiResponse<PerformanceReview>>(`/performance/${id}/complete`, reviewData);
    return response.data;
  },
  
  deleteReview: async (id: string): Promise<ApiResponse<null>> => {
    const response = await del<ApiResponse<null>>(`/performance/${id}`);
    return response;
  },
  
  getEmployeeReviews: async (employeeId: string, filters?: Omit<PerformanceFilters, 'employeeId'>): Promise<PaginatedResponse<PerformanceReview>> => {
    const queryParams = new URLSearchParams();
    
    if (filters?.reviewerId) queryParams.append('reviewerId', filters.reviewerId);
    if (filters?.type) queryParams.append('type', filters.type);
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.startDate) queryParams.append('startDate', filters.startDate);
    if (filters?.endDate) queryParams.append('endDate', filters.endDate);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await get<PaginatedResponse<PerformanceReview>>(`/performance/employee/${employeeId}?${queryParams.toString()}`);
    return response;
  },
  
  getCurrentUserReviews: async (filters?: Omit<PerformanceFilters, 'employeeId'>): Promise<PaginatedResponse<PerformanceReview>> => {
    const queryParams = new URLSearchParams();
    
    if (filters?.reviewerId) queryParams.append('reviewerId', filters.reviewerId);
    if (filters?.type) queryParams.append('type', filters.type);
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.startDate) queryParams.append('startDate', filters.startDate);
    if (filters?.endDate) queryParams.append('endDate', filters.endDate);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await get<PaginatedResponse<PerformanceReview>>('/performance/my-reviews');
    return response;
  }
};

export default performanceService;
