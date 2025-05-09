
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, User } from "lucide-react";
import EmployeeLayout from "@/components/layout/EmployeeLayout";

const EmployeePortalLanding = () => {
  // Mock employee data
  const employee = {
    name: "John Employee",
    position: "Software Engineer",
  };

  // Quick access links
  const quickLinks = [
    {
      title: "Attendance",
      description: "Mark attendance and view your history",
      icon: Calendar,
      link: "/employee/attendance",
      color: "bg-blue-50 text-blue-500"
    },
    {
      title: "Apply for Leave",
      description: "Submit leave requests and check status",
      icon: FileText,
      link: "/employee/leave",
      color: "bg-green-50 text-green-500"
    },
    {
      title: "Profile",
      description: "View and update your profile information",
      icon: User,
      link: "/employee/profile",
      color: "bg-purple-50 text-purple-500"
    }
  ];

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome, {employee.name}</h1>
          <p className="text-muted-foreground">
            Access your employee portal to manage attendance, leave, and documents.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quickLinks.map((link, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${link.color}`}>
                  <link.icon size={24} />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl mb-2">{link.title}</CardTitle>
                <p className="text-muted-foreground mb-4">{link.description}</p>
                <Button asChild>
                  <Link to={link.link}>Access</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-1">
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-medium">You marked attendance today</p>
                <p className="text-sm text-muted-foreground">Today at 9:05 AM</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="font-medium">Your leave request was approved</p>
                <p className="text-sm text-muted-foreground">Yesterday at 2:30 PM</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <p className="font-medium">New document uploaded: Pay slip for April 2025</p>
                <p className="text-sm text-muted-foreground">Apr 5, 2025 at 10:15 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </EmployeeLayout>
  );
};

export default EmployeePortalLanding;
