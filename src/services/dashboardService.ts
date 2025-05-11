
import { get } from './api';
import { ApiResponse } from '../types/api';
import { LeaveBalance } from './leaveService';
import { AttendanceSummary } from './attendanceService';

export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  openPositions: number;
}

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
}

export interface Task {
  _id: string;
  title: string;
  count: number;
  priority: 'low' | 'medium' | 'high';
  url?: string;
}

export interface DashboardData {
  stats: DashboardStats;
  announcements: Announcement[];
  tasks: Task[];
}

export interface EmployeeDashboardData {
  attendanceSummary: AttendanceSummary;
  leaveBalance: LeaveBalance[];
  announcements: Announcement[];
  upcomingReviews: {
    _id: string;
    type: string;
    reviewDate: string;
    reviewerId: string;
    reviewerName: string;
  }[];
}

export const dashboardService = {
  getAdminDashboard: async (): Promise<DashboardData> => {
    const response = await get<ApiResponse<DashboardData>>('/dashboard/admin');
    return response.data;
  },
  
  getEmployeeDashboard: async (): Promise<EmployeeDashboardData> => {
    const response = await get<ApiResponse<EmployeeDashboardData>>('/dashboard/employee');
    return response.data;
  }
};

export default dashboardService;
