
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import EmployeeProfile from "./pages/EmployeeProfile";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Payroll from "./pages/Payroll";
import Recruitment from "./pages/Recruitment";
import Performance from "./pages/Performance";
import Documents from "./pages/Documents";
import AddEmployee from "./pages/AddEmployee";
import NotFound from "./pages/NotFound";

// Employee Portal Pages
import EmployeeLogin from "./pages/EmployeeLogin";
import EmployeeLayout from "./components/layout/EmployeeLayout";
import EmployeePortalLanding from "./pages/EmployeePortalLanding";
import EmployeePortal from "./pages/EmployeePortal";
import EmployeeProfilePage from "./pages/EmployeeProfilePage";
import EmployeeLeavePage from "./pages/EmployeeLeavePage";
import EmployeeDocumentsPage from "./pages/EmployeeDocumentsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/employee/login" element={<EmployeeLogin />} />
            
            {/* Admin/HR Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['admin', 'hr']}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/employees" element={
              <ProtectedRoute allowedRoles={['admin', 'hr']}>
                <Employees />
              </ProtectedRoute>
            } />
            <Route path="/employees/:id" element={
              <ProtectedRoute allowedRoles={['admin', 'hr']}>
                <EmployeeProfile />
              </ProtectedRoute>
            } />
            <Route path="/add-employee" element={
              <ProtectedRoute allowedRoles={['admin', 'hr']}>
                <AddEmployee />
              </ProtectedRoute>
            } />
            <Route path="/attendance" element={
              <ProtectedRoute allowedRoles={['admin', 'hr']}>
                <Attendance />
              </ProtectedRoute>
            } />
            <Route path="/leave" element={
              <ProtectedRoute allowedRoles={['admin', 'hr']}>
                <Leave />
              </ProtectedRoute>
            } />
            <Route path="/payroll" element={
              <ProtectedRoute allowedRoles={['admin', 'hr']}>
                <Payroll />
              </ProtectedRoute>
            } />
            <Route path="/recruitment" element={
              <ProtectedRoute allowedRoles={['admin', 'hr']}>
                <Recruitment />
              </ProtectedRoute>
            } />
            <Route path="/performance" element={
              <ProtectedRoute allowedRoles={['admin', 'hr']}>
                <Performance />
              </ProtectedRoute>
            } />
            <Route path="/documents" element={
              <ProtectedRoute allowedRoles={['admin', 'hr']}>
                <Documents />
              </ProtectedRoute>
            } />
            
            {/* Employee Portal Protected Routes */}
            <Route path="/employee/portal" element={
              <ProtectedRoute employeeOnly={true}>
                <EmployeeLayout>
                  <EmployeePortalLanding />
                </EmployeeLayout>
              </ProtectedRoute>
            } />
            <Route path="/employee/attendance" element={
              <ProtectedRoute employeeOnly={true}>
                <EmployeeLayout>
                  <EmployeePortal defaultTab="attendance" />
                </EmployeeLayout>
              </ProtectedRoute>
            } />
            <Route path="/employee/leave" element={
              <ProtectedRoute employeeOnly={true}>
                <EmployeeLayout>
                  <EmployeeLeavePage />
                </EmployeeLayout>
              </ProtectedRoute>
            } />
            <Route path="/employee/profile" element={
              <ProtectedRoute employeeOnly={true}>
                <EmployeeLayout>
                  <EmployeeProfilePage />
                </EmployeeLayout>
              </ProtectedRoute>
            } />
            <Route path="/employee/documents" element={
              <ProtectedRoute employeeOnly={true}>
                <EmployeeLayout>
                  <EmployeeDocumentsPage />
                </EmployeeLayout>
              </ProtectedRoute>
            } />
            
            {/* Redirect old employee-portal URL to new one */}
            <Route path="/employee-portal" element={<Navigate to="/employee/portal" replace />} />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
