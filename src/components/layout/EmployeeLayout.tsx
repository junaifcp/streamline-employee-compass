
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  User, 
  Calendar, 
  FileText,  
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

interface EmployeeLayoutProps {
  children: React.ReactNode;
}

export const EmployeeLayout = ({ children }: EmployeeLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mock employee data
  const employee = {
    name: "John Employee",
    position: "Software Engineer",
    profileImage: "https://randomuser.me/api/portraits/men/43.jpg",
  };

  const handleLogout = () => {
    // Mock logout functionality
    navigate("/employee/login");
  };

  const menuItems = [
    { icon: Calendar, label: "Attendance", path: "/employee/attendance" },
    { icon: FileText, label: "Leave", path: "/employee/leave" },
    { icon: User, label: "Profile", path: "/employee/profile" },
    { icon: FileText, label: "Documents", path: "/employee/documents" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">Employee Portal</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img 
                src={employee.profileImage} 
                alt={employee.name} 
                className="w-8 h-8 rounded-full"
              />
              <span>{employee.name}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700" onClick={handleLogout}>
              <LogOut size={18} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 bg-white rounded-lg shadow p-4">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 font-medium",
                      location.pathname === item.path
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-100"
                    )}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              ))}
            </nav>
          </aside>
          
          <main className="flex-1 bg-white rounded-lg shadow p-6">
            {children}
          </main>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

export default EmployeeLayout;
