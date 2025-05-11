
import React, { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock, Calendar, FileText, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services";
import { DashboardData } from "@/services/dashboardService";

const Dashboard = () => {
  const { toast } = useToast();
  
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardService.getAdminDashboard,
  });
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Define stat icons mapping
  const statIcons = {
    totalEmployees: Users,
    presentToday: Clock,
    onLeave: Calendar,
    openPositions: Briefcase,
  };

  // Map colors for stats
  const statColors = {
    totalEmployees: "text-hrms-blue",
    presentToday: "text-hrms-green",
    onLeave: "text-hrms-yellow",
    openPositions: "text-hrms-purple",
  };

  const renderStats = () => {
    if (!dashboardData?.stats) {
      return Array(4).fill(0).map((_, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Loading...
                </p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">-</h3>
                </div>
              </div>
              <div className="bg-gray-100 p-2 rounded-md">
                <Users size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      ));
    }

    return Object.entries(dashboardData.stats).map(([key, value]) => {
      const IconComponent = statIcons[key as keyof typeof statIcons];
      const colorClass = statColors[key as keyof typeof statColors];
      
      let displayTitle = "";
      let displayChange = "";

      switch(key) {
        case "totalEmployees":
          displayTitle = "Total Employees";
          break;
        case "presentToday":
          displayTitle = "Present Today";
          displayChange = `${Math.round((value / dashboardData.stats.totalEmployees) * 100)}%`;
          break;
        case "onLeave":
          displayTitle = "On Leave";
          displayChange = `${Math.round((value / dashboardData.stats.totalEmployees) * 100)}%`;
          break;
        case "openPositions":
          displayTitle = "Open Positions";
          break;
      }

      return (
        <Card key={key}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {displayTitle}
                </p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold">{value}</h3>
                  {displayChange && (
                    <span className="ml-2 text-xs text-green-500">
                      {displayChange}
                    </span>
                  )}
                </div>
              </div>
              <div className={`${colorClass} bg-gray-100 p-2 rounded-md`}>
                {IconComponent && <IconComponent size={24} />}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    });
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {renderStats()}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Announcements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <p className="text-center py-4">Loading announcements...</p>
                ) : dashboardData?.announcements && dashboardData.announcements.length > 0 ? (
                  dashboardData.announcements.map((announcement) => (
                    <div key={announcement._id} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{announcement.title}</h3>
                        <span className="text-sm text-muted-foreground">
                          {new Date(announcement.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {announcement.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-4">No announcements found.</p>
                )}
                <Button variant="outline" className="w-full mt-2">
                  View All Announcements
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Pending Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {isLoading ? (
                    <p className="text-center py-4">Loading tasks...</p>
                  ) : dashboardData?.tasks && dashboardData.tasks.length > 0 ? (
                    dashboardData.tasks.map((task) => (
                      <div key={task._id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              task.priority === "high"
                                ? "bg-hrms-red"
                                : task.priority === "medium"
                                ? "bg-hrms-yellow"
                                : "bg-hrms-green"
                            }`}
                          />
                          <span className="font-medium">{task.title}</span>
                        </div>
                        <span className="bg-gray-200 text-xs px-2 py-1 rounded">
                          {task.count}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4">No pending tasks.</p>
                  )}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Tasks
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
