
import { get, post, put } from './api';
import { ApiResponse, PaginatedResponse, LeaveRequest } from '../types/api';

export interface LeaveFilters {
  employeeId?: string;
  status?: 'pending' | 'approved' | 'rejected';
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface LeaveBalance {
  type: string;
  total: number;
  used: number;
  remaining: number;
}

export const leaveService = {
  getLeaveRequests: async (filters: LeaveFilters): Promise<PaginatedResponse<LeaveRequest>> => {
    const queryParams = new URLSearchParams();
    
    if (filters.employeeId) queryParams.append('employeeId', filters.employeeId);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await get<PaginatedResponse<LeaveRequest>>(`/leaves?${queryParams.toString()}`);
    return response;
  },
  
  getLeaveById: async (id: string): Promise<LeaveRequest> => {
    const response = await get<ApiResponse<LeaveRequest>>(`/leaves/${id}`);
    return response.data;
  },
  
  createLeaveRequest: async (leaveData: Partial<LeaveRequest>): Promise<LeaveRequest> => {
    const response = await post<ApiResponse<LeaveRequest>>('/leaves', leaveData);
    return response.data;
  },
  
  approveLeaveRequest: async (id: string, comments?: string): Promise<LeaveRequest> => {
    const response = await put<ApiResponse<LeaveRequest>>(`/leaves/${id}/approve`, { comments });
    return response.data;
  },
  
  rejectLeaveRequest: async (id: string, comments?: string): Promise<LeaveRequest> => {
    const response = await put<ApiResponse<LeaveRequest>>(`/leaves/${id}/reject`, { comments });
    return response.data;
  },
  
  cancelLeaveRequest: async (id: string): Promise<LeaveRequest> => {
    const response = await put<ApiResponse<LeaveRequest>>(`/leaves/${id}/cancel`, {});
    return response.data;
  },
  
  getEmployeeLeaveBalance: async (employeeId: string): Promise<LeaveBalance[]> => {
    const response = await get<ApiResponse<LeaveBalance[]>>(`/leaves/balance/${employeeId}`);
    return response.data;
  },
  
  getCurrentUserLeaves: async (filters?: Omit<LeaveFilters, 'employeeId'>): Promise<PaginatedResponse<LeaveRequest>> => {
    const queryParams = new URLSearchParams();
    
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.startDate) queryParams.append('startDate', filters.startDate);
    if (filters?.endDate) queryParams.append('endDate', filters.endDate);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await get<PaginatedResponse<LeaveRequest>>(`/leaves/my-leaves?${queryParams.toString()}`);
    return response;
  },
  
  getCurrentUserLeaveBalance: async (): Promise<LeaveBalance[]> => {
    const response = await get<ApiResponse<LeaveBalance[]>>('/leaves/my-balance');
    return response.data;
  }
};

export default leaveService;
