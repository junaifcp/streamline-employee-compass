
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

type FeedbackSession = {
  id: string;
  employeeName: string;
  reviewerName: string;
  date: string;
  type: string;
  status: "completed" | "pending" | "missed";
  notes?: string;
};

type Goal = {
  id: string;
  title: string;
  employeeName: string;
  dueDate: string;
  progress: number;
  status: "not-started" | "in-progress" | "completed" | "overdue";
};

const Performance = () => {
  const [activeTab, setActiveTab] = useState<string>("feedback");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for feedback sessions
  const feedbackSessions: FeedbackSession[] = [
    {
      id: "1",
      employeeName: "Michael Johnson",
      reviewerName: "Sarah Williams",
      date: "2024-04-15",
      type: "1-on-1 Weekly",
      status: "completed",
      notes: "Discussed recent project progress and career development goals."
    },
    {
      id: "2",
      employeeName: "Sarah Williams",
      reviewerName: "Robert Jones",
      date: "2024-04-17",
      type: "Quarterly Review",
      status: "pending"
    },
    {
      id: "3",
      employeeName: "David Brown",
      reviewerName: "Sarah Williams",
      date: "2024-04-10",
      type: "1-on-1 Weekly",
      status: "completed",
      notes: "Focused on upcoming deadlines and resource allocation."
    },
    {
      id: "4",
      employeeName: "Jessica Martinez",
      reviewerName: "Robert Jones",
      date: "2024-04-05",
      type: "1-on-1 Weekly",
      status: "missed"
    },
    {
      id: "5",
      employeeName: "Robert Jones",
      reviewerName: "Michael Johnson",
      date: "2024-04-20",
      type: "Performance Review",
      status: "pending"
    },
  ];

  // Mock data for goals
  const goals: Goal[] = [
    {
      id: "1",
      title: "Complete Project X Documentation",
      employeeName: "Michael Johnson",
      dueDate: "2024-05-15",
      progress: 75,
      status: "in-progress"
    },
    {
      id: "2",
      title: "Implement New Marketing Strategy",
      employeeName: "Sarah Williams",
      dueDate: "2024-06-01",
      progress: 30,
      status: "in-progress"
    },
    {
      id: "3",
      title: "Finish Financial Analysis Report",
      employeeName: "David Brown",
      dueDate: "2024-04-10",
      progress: 100,
      status: "completed"
    },
    {
      id: "4",
      title: "Organize Team Building Event",
      employeeName: "Jessica Martinez",
      dueDate: "2024-04-01",
      progress: 0,
      status: "overdue"
    },
    {
      id: "5",
      title: "Recruit Three New Team Members",
      employeeName: "Robert Jones",
      dueDate: "2024-07-31",
      progress: 0,
      status: "not-started"
    },
  ];

  const filteredFeedbackSessions = feedbackSessions.filter(session => 
    session.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.reviewerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGoals = goals.filter(goal => 
    goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function for status badges
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>;
      case "missed":
        return <Badge className="bg-red-100 text-red-800">Missed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "not-started":
        return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Performance & Feedback</h1>
          <Button className="flex items-center gap-2 bg-hrms-blue hover:bg-hrms-blue-dark">
            <Plus size={16} />
            <span>New Session</span>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="feedback">Feedback Sessions</TabsTrigger>
            <TabsTrigger value="goals">Goals & Objectives</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <TabsContent value="feedback" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Reviewer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeedbackSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">{session.employeeName}</TableCell>
                        <TableCell>{session.reviewerName}</TableCell>
                        <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                        <TableCell>{session.type}</TableCell>
                        <TableCell>{getStatusBadge(session.status)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader className="border-b">
                <CardTitle>Schedule New Feedback Session</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Employee</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Michael Johnson</SelectItem>
                        <SelectItem value="2">Sarah Williams</SelectItem>
                        <SelectItem value="3">David Brown</SelectItem>
                        <SelectItem value="4">Jessica Martinez</SelectItem>
                        <SelectItem value="5">Robert Jones</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Reviewer</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reviewer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Michael Johnson</SelectItem>
                        <SelectItem value="2">Sarah Williams</SelectItem>
                        <SelectItem value="3">David Brown</SelectItem>
                        <SelectItem value="4">Jessica Martinez</SelectItem>
                        <SelectItem value="5">Robert Jones</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Session Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1on1">1-on-1 Weekly</SelectItem>
                        <SelectItem value="quarterly">Quarterly Review</SelectItem>
                        <SelectItem value="performance">Performance Review</SelectItem>
                        <SelectItem value="probation">Probation Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label>Notes/Agenda</Label>
                    <Textarea placeholder="Enter session agenda or talking points..." />
                  </div>
                </div>
                
                <Button className="w-full">Schedule Session</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="goals" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Goal</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGoals.map((goal) => (
                      <TableRow key={goal.id}>
                        <TableCell className="font-medium">{goal.title}</TableCell>
                        <TableCell>{goal.employeeName}</TableCell>
                        <TableCell>{new Date(goal.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={goal.progress} className="h-2" />
                            <span className="text-xs">{goal.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(goal.status)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader className="border-b">
                <CardTitle>Add New Goal</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label>Goal Title</Label>
                    <Input placeholder="Enter goal title..." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Assigned To</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Michael Johnson</SelectItem>
                        <SelectItem value="2">Sarah Williams</SelectItem>
                        <SelectItem value="3">David Brown</SelectItem>
                        <SelectItem value="4">Jessica Martinez</SelectItem>
                        <SelectItem value="5">Robert Jones</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input type="date" />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label>Description</Label>
                    <Textarea placeholder="Enter goal description and key results..." />
                  </div>
                </div>
                
                <Button className="w-full">Add Goal</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Performance;
