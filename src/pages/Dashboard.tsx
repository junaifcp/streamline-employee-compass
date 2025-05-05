
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock, Calendar, FileText, Briefcase } from "lucide-react";

const Dashboard = () => {
  // Mock data
  const stats = [
    { title: "Total Employees", value: 125, icon: Users, change: "+3", color: "text-hrms-blue" },
    { title: "Present Today", value: 98, icon: Clock, change: "78%", color: "text-hrms-green" },
    { title: "On Leave", value: 12, icon: Calendar, change: "10%", color: "text-hrms-yellow" },
    { title: "Open Positions", value: 8, icon: Briefcase, change: "+2", color: "text-hrms-purple" },
  ];

  // Mock announcements
  const announcements = [
    {
      id: 1,
      title: "Company Picnic",
      date: "June 15, 2025",
      description: "Annual company picnic at Riverside Park. All employees are invited with their families.",
    },
    {
      id: 2,
      title: "New Health Benefits",
      date: "July 1, 2025",
      description: "New health insurance plan goes into effect. Check your email for details about the new coverage.",
    },
    {
      id: 3,
      title: "Quarterly Review",
      date: "May 30, 2025",
      description: "Prepare for quarterly performance reviews. Schedule will be sent out next week.",
    },
  ];

  // Mock tasks
  const tasks = [
    {
      id: 1,
      title: "Review Leave Requests",
      count: 5,
      priority: "high",
    },
    {
      id: 2,
      title: "Approve Timesheets",
      count: 12,
      priority: "medium",
    },
    {
      id: 3,
      title: "Review Job Applications",
      count: 8,
      priority: "medium",
    },
    {
      id: 4,
      title: "Complete Performance Reviews",
      count: 3,
      priority: "high",
    },
  ];

  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <div className="flex items-baseline">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <span className="ml-2 text-xs text-green-500">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.color} bg-gray-100 p-2 rounded-md`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">Announcements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{announcement.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {announcement.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {announcement.description}
                    </p>
                  </div>
                ))}
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
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
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
                  ))}
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
