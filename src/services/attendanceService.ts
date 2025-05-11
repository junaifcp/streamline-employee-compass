
import { get, post, put } from './api';
import { ApiResponse, PaginatedResponse, AttendanceRecord } from '../types/api';

export interface AttendanceFilters {
  employeeId?: string;
  startDate?: string;
  endDate?: string;
  status?: 'present' | 'absent' | 'half-day' | 'work-from-home';
  page?: number;
  limit?: number;
}

export interface AttendanceSummary {
  present: number;
  absent: number;
  halfDay: number;
  workFromHome: number;
  totalWorkHours: number;
}

export const attendanceService = {
  getAttendanceRecords: async (filters: AttendanceFilters): Promise<PaginatedResponse<AttendanceRecord>> => {
    const queryParams = new URLSearchParams();
    
    if (filters.employeeId) queryParams.append('employeeId', filters.employeeId);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.endDate) queryParams.append('endDate', filters.endDate);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await get<PaginatedResponse<AttendanceRecord>>(`/attendance?${queryParams.toString()}`);
    return response;
  },
  
  getAttendanceById: async (id: string): Promise<AttendanceRecord> => {
    const response = await get<ApiResponse<AttendanceRecord>>(`/attendance/${id}`);
    return response.data;
  },
  
  markAttendance: async (data: { status: AttendanceRecord['status'], notes?: string }): Promise<AttendanceRecord> => {
    const response = await post<ApiResponse<AttendanceRecord>>('/attendance/mark', data);
    return response.data;
  },
  
  checkIn: async (notes?: string): Promise<AttendanceRecord> => {
    const response = await post<ApiResponse<AttendanceRecord>>('/attendance/check-in', { notes });
    return response.data;
  },
  
  checkOut: async (notes?: string): Promise<AttendanceRecord> => {
    const response = await post<ApiResponse<AttendanceRecord>>('/attendance/check-out', { notes });
    return response.data;
  },
  
  updateAttendance: async (id: string, data: Partial<AttendanceRecord>): Promise<AttendanceRecord> => {
    const response = await put<ApiResponse<AttendanceRecord>>(`/attendance/${id}`, data);
    return response.data;
  },
  
  getAttendanceSummary: async (employeeId: string, month: string, year: string): Promise<AttendanceSummary> => {
    const response = await get<ApiResponse<AttendanceSummary>>(`/attendance/summary/${employeeId}?month=${month}&year=${year}`);
    return response.data;
  },
  
  getCurrentUserAttendance: async (filters?: Omit<AttendanceFilters, 'employeeId'>): Promise<PaginatedResponse<AttendanceRecord>> => {
    const queryParams = new URLSearchParams();
    
    if (filters?.startDate) queryParams.append('startDate', filters.startDate);
    if (filters?.endDate) queryParams.append('endDate', filters.endDate);
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await get<PaginatedResponse<AttendanceRecord>>(`/attendance/my-attendance?${queryParams.toString()}`);
    return response;
  },
  
  getCurrentUserAttendanceSummary: async (month: string, year: string): Promise<AttendanceSummary> => {
    const response = await get<ApiResponse<AttendanceSummary>>(`/attendance/my-summary?month=${month}&year=${year}`);
    return response.data;
  },
  
  getTodayStatus: async (): Promise<AttendanceRecord | null> => {
    const response = await get<ApiResponse<AttendanceRecord | null>>('/attendance/today');
    return response.data;
  }
};

export default attendanceService;
