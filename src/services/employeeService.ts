
import { get, post, put, del } from './api';
import { ApiResponse, PaginatedResponse, Employee } from '../types/api';

export interface EmployeeFilters {
  department?: string;
  position?: string;
  status?: 'active' | 'on-leave' | 'terminated';
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const employeeService = {
  getAllEmployees: async (filters: EmployeeFilters): Promise<PaginatedResponse<Employee>> => {
    const queryParams = new URLSearchParams();
    
    if (filters.department) queryParams.append('department', filters.department);
    if (filters.position) queryParams.append('position', filters.position);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());
    if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
    if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder);
    
    const response = await get<PaginatedResponse<Employee>>(`/employees?${queryParams.toString()}`);
    return response;
  },
  
  getEmployeeById: async (id: string): Promise<Employee> => {
    const response = await get<ApiResponse<Employee>>(`/employees/${id}`);
    return response.data;
  },
  
  createEmployee: async (employeeData: Partial<Employee>): Promise<Employee> => {
    const response = await post<ApiResponse<Employee>>('/employees', employeeData);
    return response.data;
  },
  
  updateEmployee: async (id: string, employeeData: Partial<Employee>): Promise<Employee> => {
    const response = await put<ApiResponse<Employee>>(`/employees/${id}`, employeeData);
    return response.data;
  },
  
  deleteEmployee: async (id: string): Promise<ApiResponse<null>> => {
    const response = await del<ApiResponse<null>>(`/employees/${id}`);
    return response;
  },
  
  getCurrentEmployee: async (): Promise<Employee> => {
    const response = await get<ApiResponse<Employee>>('/employees/me');
    return response.data;
  },
  
  uploadProfileImage: async (employeeId: string, file: File): Promise<Employee> => {
    const formData = new FormData();
    formData.append('profileImage', file);
    
    const response = await post<ApiResponse<Employee>>(`/employees/${employeeId}/upload-profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  }
};

export default employeeService;
