
import { get, post, put, del } from './api';
import { ApiResponse, PaginatedResponse, Document } from '../types/api';

export interface DocumentFilters {
  employeeId?: string;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const documentService = {
  getDocuments: async (filters: DocumentFilters): Promise<PaginatedResponse<Document>> => {
    const queryParams = new URLSearchParams();
    
    if (filters.employeeId) queryParams.append('employeeId', filters.employeeId);
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await get<PaginatedResponse<Document>>(`/documents?${queryParams.toString()}`);
    return response;
  },
  
  getDocumentById: async (id: string): Promise<Document> => {
    const response = await get<ApiResponse<Document>>(`/documents/${id}`);
    return response.data;
  },
  
  uploadDocument: async (data: { 
    employeeId?: string; 
    title: string; 
    description?: string; 
    category: string;
    tags?: string[];
    file: File;
  }): Promise<Document> => {
    const formData = new FormData();
    
    if (data.employeeId) formData.append('employeeId', data.employeeId);
    formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    formData.append('category', data.category);
    if (data.tags) formData.append('tags', JSON.stringify(data.tags));
    formData.append('file', data.file);
    
    const response = await post<ApiResponse<Document>>('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
  
  updateDocument: async (id: string, data: {
    title?: string;
    description?: string;
    category?: string;
    tags?: string[];
  }): Promise<Document> => {
    const response = await put<ApiResponse<Document>>(`/documents/${id}`, data);
    return response.data;
  },
  
  deleteDocument: async (id: string): Promise<ApiResponse<null>> => {
    const response = await del<ApiResponse<null>>(`/documents/${id}`);
    return response;
  },
  
  downloadDocument: async (id: string): Promise<Blob> => {
    const response = await get<Blob>(`/documents/${id}/download`, {
      responseType: 'blob',
    });
    return response;
  },
  
  getCurrentUserDocuments: async (filters?: Omit<DocumentFilters, 'employeeId'>): Promise<PaginatedResponse<Document>> => {
    const queryParams = new URLSearchParams();
    
    if (filters?.category) queryParams.append('category', filters.category);
    if (filters?.search) queryParams.append('search', filters.search);
    if (filters?.page) queryParams.append('page', filters.page.toString());
    if (filters?.limit) queryParams.append('limit', filters.limit.toString());
    
    const response = await get<PaginatedResponse<Document>>(`/documents/my-documents?${queryParams.toString()}`);
    return response;
  }
};

export default documentService;
