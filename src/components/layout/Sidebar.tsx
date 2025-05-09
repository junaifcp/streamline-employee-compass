
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  FileText, 
  DollarSign, 
  Briefcase, 
  User, 
  File, 
  Home, 
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Employees", path: "/employees" },
    { icon: Calendar, label: "Attendance", path: "/attendance" },
    { icon: FileText, label: "Leave", path: "/leave" },
    { icon: DollarSign, label: "Payroll", path: "/payroll" },
    { icon: Briefcase, label: "Recruitment", path: "/recruitment" },
    { icon: User, label: "Performance", path: "/performance" },
    { icon: File, label: "Documents", path: "/documents" },
  ];

  return (
    <div 
      className={cn(
        "bg-white shadow-md flex flex-col border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!collapsed && (
          <h1 className="text-xl font-bold text-hrms-blue">
            <Link to="/">HRCompass</Link>
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full flex justify-start gap-3 mb-1 font-medium",
                  location.pathname === item.path
                    ? "bg-hrms-blue-light/10 text-hrms-blue hover:bg-hrms-blue-light/20"
                    : "hover:bg-gray-100"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            </Link>
          ))}
          
          {/* Employee Portal Link */}
          <Link to="/employee/portal">
            <Button
              variant="outline"
              className={cn(
                "w-full flex justify-start gap-3 mb-1 font-medium mt-4",
                location.pathname.startsWith("/employee")
                  ? "bg-hrms-blue-light/10 text-hrms-blue hover:bg-hrms-blue-light/20 border-hrms-blue"
                  : "hover:bg-gray-100"
              )}
            >
              <User size={20} />
              {!collapsed && <span>Employee Portal</span>}
            </Button>
          </Link>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <Button variant="outline" className="w-full flex items-center gap-2">
          <X size={16} />
          {!collapsed && <span>Log out</span>}
        </Button>
      </div>
    </div>
  );
};
