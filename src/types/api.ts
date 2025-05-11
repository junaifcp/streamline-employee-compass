
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    totalCount: number;
    page: number;
    limit: number;
  };
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'hr' | 'employee';
  isActive: boolean;
  profileImage?: string;
}

export interface Employee {
  _id: string;
  employeeId: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joiningDate: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  profileImage?: string;
  documents?: string[];
  employmentType: 'full-time' | 'part-time' | 'contract' | 'intern';
  status: 'active' | 'on-leave' | 'terminated';
}

export interface LeaveRequest {
  _id: string;
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  comments?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceRecord {
  _id: string;
  employeeId: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'present' | 'absent' | 'half-day' | 'work-from-home';
  workHours?: number;
  notes?: string;
}

export interface Document {
  _id: string;
  employeeId?: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  category: 'contract' | 'id' | 'resume' | 'certificate' | 'other';
  uploadedBy: string;
  uploadedAt: string;
  tags?: string[];
}

export interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  employmentType: 'full-time' | 'part-time' | 'contract' | 'intern';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  status: 'open' | 'closed' | 'draft';
  postedBy: string;
  postedAt: string;
  deadlineDate?: string;
}

export interface Candidate {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  coverLetterUrl?: string;
  appliedFor: string; // Job ID
  stage: 'applied' | 'screening' | 'interview' | 'technical' | 'offer' | 'hired' | 'rejected';
  notes?: string;
  rating?: number;
  appliedAt: string;
  lastUpdated: string;
}

export interface PerformanceReview {
  _id: string;
  employeeId: string;
  reviewerId: string;
  reviewDate: string;
  type: '1-on-1' | 'quarterly-review' | 'performance-review' | 'probation-review';
  status: 'completed' | 'pending' | 'missed';
  metrics: {
    name: string;
    rating: number;
    comment?: string;
  }[];
  overallRating?: number;
  strengths?: string[];
  areasForImprovement?: string[];
  goals?: {
    description: string;
    targetDate?: string;
    status: 'not-started' | 'in-progress' | 'completed' | 'overdue';
  }[];
  notes?: string;
}
