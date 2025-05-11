
import { get, post, put, del } from './api';
import { ApiResponse, PaginatedResponse } from '../types/api';

export interface PayrollRecord {
  _id: string;
  employeeId: string;
  month: number;
  year: number;
  basicSalary: number;
  allowances: {
    type: string;
    amount: number;
  }[];
  deductions: {
    type: string;
    amount: number;
  }[];
  netSalary: number;
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  paymentDate?: string;
  generatedBy: string;
  generatedAt: string;
}

export interface PayrollFilters {
  employeeId?: string;
  month?: number;
  year?: number;
  status?: 'pending' | 'paid' | 'cancelled';
  page?: number;
  limit?: number;
}

export const payrollService = {
  getPayrollRecords: async (filters: PayrollFilters): Promise<PaginatedResponse<PayrollRecord>> => {
    const queryParams = new URLSearchParams();
    
    if (filters.employeeId) queryParams.append('employeeId', filters.employeeId);
    if (filters.month) queryParams.append('month', filters.month.toString());
    if (filters.year) queryParams.append('year', filters.year.toString());
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await get<PaginatedResponse<PayrollRecord>>(`/payroll?${queryParams.toString()}`);
    return response;
  },
  
  getPayrollById: async (id: string): Promise<PayrollRecord> => {
    const response = await get<ApiResponse<PayrollRecord>>(`/payroll/${id}`);
    return response.data;
  },
  
  generatePayroll: async (data: { 
    month: number;
    year: number;
    employeeIds?: string[];
    departmentIds?: string[];
  }): Promise<ApiResponse<{ generatedCount: number }>> => {
    const response = await post<ApiResponse<{ generatedCount: number }>>('/payroll/generate', data);
    return response;
  },
  
  approvePayroll: async (id: string): Promise<PayrollRecord> => {
    const response = await put<ApiResponse<PayrollRecord>>(`/payroll/${id}/approve`, {});
    return response.data;
  },
  
  cancelPayroll: async (id: string, reason?: string): Promise<PayrollRecord> => {
    const response = await put<ApiResponse<PayrollRecord>>(`/payroll/${id}/cancel`, { reason });
    return response.data;
  },
  
  getEmployeePayrollHistory: async (employeeId: string, filters?: Omit<PayrollFilters, 'employeeId'>): Promise<PaginatedResponse<PayrollRecord>> => {
    const queryParams = new URLSearchParams();
    
    if (filters?.month) queryParams.append('month', filters.month.toString());
    if (filters?.year) queryParams.append('year', filters.year.toString());
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await get<PaginatedResponse<PayrollRecord>>(`/payroll/employee/${employeeId}?${queryParams.toString()}`);
    return response;
  },
  
  getCurrentUserPayroll: async (filters?: Omit<PayrollFilters, 'employeeId'>): Promise<PaginatedResponse<PayrollRecord>> => {
    const queryParams = new URLSearchParams();
    
    if (filters?.month) queryParams.append('month', filters.month.toString());
    if (filters?.year) queryParams.append('year', filters.year.toString());
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await get<PaginatedResponse<PayrollRecord>>(`/payroll/my-payroll?${queryParams.toString()}`);
    return response;
  }
};

export default payrollService;
