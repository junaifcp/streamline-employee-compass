
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin/HR Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeProfile />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/documents" element={<Documents />} />
          
          {/* Employee Portal Routes */}
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee/portal" element={
            <EmployeeLayout>
              <EmployeePortalLanding />
            </EmployeeLayout>
          } />
          <Route path="/employee/attendance" element={
            <EmployeeLayout>
              <EmployeePortal defaultTab="attendance" />
            </EmployeeLayout>
          } />
          <Route path="/employee/leave" element={
            <EmployeeLayout>
              <EmployeeLeavePage />
            </EmployeeLayout>
          } />
          <Route path="/employee/profile" element={
            <EmployeeLayout>
              <EmployeeProfilePage />
            </EmployeeLayout>
          } />
          <Route path="/employee/documents" element={
            <EmployeeLayout>
              <EmployeeDocumentsPage />
            </EmployeeLayout>
          } />
          
          {/* Redirect old employee-portal URL to new one */}
          <Route path="/employee-portal" element={<Navigate to="/employee/portal" replace />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
