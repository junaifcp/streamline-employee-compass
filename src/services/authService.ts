
import { post } from './api';
import { ApiResponse, AuthResponse, User } from '../types/api';

export interface LoginRequest {
  email: string;
  password: string;
  isEmployee?: boolean;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const endpoint = data.isEmployee ? '/auth/employee/login' : '/auth/login';
    const response = await post<ApiResponse<AuthResponse>>(endpoint, data);
    
    // Save tokens and user data in local storage
    if (response.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },
  
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data;
  },
  
  logout: (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    // Redirect to login page
    window.location.href = '/login';
  },
  
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await post<ApiResponse<AuthResponse>>('/auth/refresh-token', { refreshToken });
    
    if (response.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    
    return response.data;
  },
  
  resetPassword: async (data: ResetPasswordRequest): Promise<ApiResponse<null>> => {
    const response = await post<ApiResponse<null>>('/auth/reset-password', data);
    return response;
  },
  
  changePassword: async (data: ChangePasswordRequest): Promise<ApiResponse<null>> => {
    const response = await post<ApiResponse<null>>('/auth/change-password', data);
    return response;
  },
  
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },
  
  hasRole: (role: string | string[]): boolean => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  }
};

export default authService;
