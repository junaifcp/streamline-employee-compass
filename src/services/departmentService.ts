
import { get, post, put, del } from './api';
import { ApiResponse, PaginatedResponse } from '../types/api';

export interface Department {
  _id: string;
  name: string;
  description?: string;
  managerId?: string;
  employeeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  _id: string;
  title: string;
  departmentId: string;
  description?: string;
  minSalary?: number;
  maxSalary?: number;
  createdAt: string;
  updatedAt: string;
}

export const departmentService = {
  getAllDepartments: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<Department>> => {
    const response = await get<PaginatedResponse<Department>>(`/departments?page=${page}&limit=${limit}`);
    return response;
  },
  
  getDepartmentById: async (id: string): Promise<Department> => {
    const response = await get<ApiResponse<Department>>(`/departments/${id}`);
    return response.data;
  },
  
  createDepartment: async (data: Partial<Department>): Promise<Department> => {
    const response = await post<ApiResponse<Department>>('/departments', data);
    return response.data;
  },
  
  updateDepartment: async (id: string, data: Partial<Department>): Promise<Department> => {
    const response = await put<ApiResponse<Department>>(`/departments/${id}`, data);
    return response.data;
  },
  
  deleteDepartment: async (id: string): Promise<ApiResponse<null>> => {
    const response = await del<ApiResponse<null>>(`/departments/${id}`);
    return response;
  },
  
  getAllPositions: async (departmentId?: string): Promise<Position[]> => {
    const queryParams = departmentId ? `?departmentId=${departmentId}` : '';
    const response = await get<ApiResponse<Position[]>>(`/positions${queryParams}`);
    return response.data;
  },
  
  getPositionById: async (id: string): Promise<Position> => {
    const response = await get<ApiResponse<Position>>(`/positions/${id}`);
    return response.data;
  },
  
  createPosition: async (data: Partial<Position>): Promise<Position> => {
    const response = await post<ApiResponse<Position>>('/positions', data);
    return response.data;
  },
  
  updatePosition: async (id: string, data: Partial<Position>): Promise<Position> => {
    const response = await put<ApiResponse<Position>>(`/positions/${id}`, data);
    return response.data;
  },
  
  deletePosition: async (id: string): Promise<ApiResponse<null>> => {
    const response = await del<ApiResponse<null>>(`/positions/${id}`);
    return response;
  }
};

export default departmentService;
