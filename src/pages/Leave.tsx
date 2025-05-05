
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarRange,
  Check,
  X,
  CalendarDays,
  Clock,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock leaves data
const mockLeaves = [
  {
    id: 1,
    employee: "Michael Johnson",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    type: "Annual Leave",
    startDate: "2025-05-10",
    endDate: "2025-05-14",
    days: 5,
    status: "Approved",
    submittedOn: "2025-05-01",
  },
  {
    id: 2,
    employee: "Sarah Williams",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    type: "Sick Leave",
    startDate: "2025-05-07",
    endDate: "2025-05-08",
    days: 2,
    status: "Pending",
    submittedOn: "2025-05-06",
  },
  {
    id: 3,
    employee: "David Brown",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    type: "Personal Leave",
    startDate: "2025-05-20",
    endDate: "2025-05-20",
    days: 1,
    status: "Pending",
    submittedOn: "2025-05-04",
  },
  {
    id: 4,
    employee: "Jessica Martinez",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    type: "Annual Leave",
    startDate: "2025-05-24",
    endDate: "2025-06-03",
    days: 7,
    status: "Rejected",
    submittedOn: "2025-05-02",
  },
];

// Generate calendar events based on leaves
const generateCalendarEvents = () => {
  const events = [];
  
  mockLeaves.forEach(leave => {
    const startDate = new Date(leave.startDate);
    const endDate = new Date(leave.endDate);
    
    let colorClass = "";
    switch (leave.type) {
      case "Annual Leave":
        colorClass = "bg-blue-500";
        break;
      case "Sick Leave":
        colorClass = "bg-red-500";
        break;
      case "Personal Leave":
        colorClass = "bg-purple-500";
        break;
      default:
        colorClass = "bg-gray-500";
    }
    
    // Status opacity
    let opacity = "opacity-100";
    if (leave.status === "Rejected") {
      opacity = "opacity-50";
    } else if (leave.status === "Pending") {
      opacity = "opacity-70";
    }
    
    events.push({
      id: leave.id,
      employee: leave.employee,
      type: leave.type,
      startDate,
      endDate,
      colorClass: `${colorClass} ${opacity}`,
      status: leave.status,
    });
  });
  
  return events;
};

const leaveEvents = generateCalendarEvents();

// Mock balance data
const mockLeaveBalances = [
  { type: "Annual Leave", total: 20, used: 7, remaining: 13 },
  { type: "Sick Leave", total: 10, used: 2, remaining: 8 },
  { type: "Personal Leave", total: 5, used: 1, remaining: 4 },
];

const Leave = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  
  // Filter pending approvals
  const pendingApprovals = mockLeaves.filter(leave => leave.status === "Pending");

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Leave Management</h1>
          <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-hrms-blue hover:bg-hrms-blue-dark">
                <Plus size={16} />
                <span>Request Leave</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Request Leave</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Leave Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="annual">Annual Leave</SelectItem>
                        <SelectItem value="sick">Sick Leave</SelectItem>
                        <SelectItem value="personal">Personal Leave</SelectItem>
                        <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">For Employee</label>
                    <Select defaultValue="self">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="self">Myself</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="border rounded-md p-4">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange as any}
                      numberOfMonths={2}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-2 text-muted-foreground">
                    <p>
                      From: {dateRange.from ? format(dateRange.from, "PPP") : "Select start date"}
                    </p>
                    <p>
                      To: {dateRange.to ? format(dateRange.to, "PPP") : "Select end date"}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Reason</label>
                  <Textarea
                    placeholder="Provide a reason for your leave request"
                    className="resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact While Away (Optional)</label>
                  <Input
                    placeholder="Email or phone number"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setRequestDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-hrms-blue hover:bg-hrms-blue-dark" onClick={() => setRequestDialogOpen(false)}>
                  Submit Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {mockLeaveBalances.map((balance, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  {balance.type}
                </h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold">{balance.remaining}</span>
                  <span className="text-sm text-muted-foreground">
                    / {balance.total} days remaining
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-hrms-blue h-2.5 rounded-full"
                    style={{ width: `${(balance.remaining / balance.total) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="calendar">
          <TabsList className="mb-6">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Leave Calendar</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm">Today</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
                <CardDescription className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs">Annual Leave</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-xs">Sick Leave</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-xs">Personal Leave</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded-lg">
                  <Calendar
                    mode="default"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className={cn("p-3 pointer-events-auto")}
                    modifiers={{
                      withEvents: leaveEvents.map(event => 
                        ({ from: event.startDate, to: event.endDate })
                      ),
                    }}
                    modifiersStyles={{
                      withEvents: {
                        borderBottom: '2px solid currentColor',
                        color: 'var(--hrms-blue)',
                      },
                    }}
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Events for {format(date, 'MMMM dd, yyyy')}</h3>
                  <div className="space-y-2">
                    {leaveEvents
                      .filter(event => {
                        const eventDate = new Date(event.startDate);
                        const selectedDate = new Date(date);
                        return (
                          eventDate <= selectedDate && 
                          new Date(event.endDate) >= selectedDate
                        );
                      })
                      .map(event => (
                        <div 
                          key={event.id} 
                          className="flex items-center gap-3 p-3 border rounded-md"
                        >
                          <div className={`w-2 h-full rounded-full ${event.colorClass.split(' ')[0]}`}></div>
                          <div>
                            <p className="font-medium">{event.employee}</p>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>{event.type}</span>
                              <div className="flex items-center gap-1">
                                <CalendarDays size={14} />
                                <span>
                                  {format(event.startDate, 'MMM d')} - {format(event.endDate, 'MMM d')}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="ml-auto">
                            <span
                              className={cn(
                                "px-2 py-1 rounded-full text-xs",
                                event.status === "Approved" && "bg-green-100 text-green-800",
                                event.status === "Pending" && "bg-yellow-100 text-yellow-800",
                                event.status === "Rejected" && "bg-red-100 text-red-800"
                              )}
                            >
                              {event.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    {leaveEvents.filter(event => {
                        const eventDate = new Date(event.startDate);
                        const selectedDate = new Date(date);
                        return (
                          eventDate <= selectedDate && 
                          new Date(event.endDate) >= selectedDate
                        );
                      }).length === 0 && (
                      <div className="text-center py-6 text-muted-foreground">
                        No leave events for this date
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="list">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Leave Requests</CardTitle>
                  <div className="flex gap-2">
                    <div className="w-[150px]">
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-[150px]">
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="annual">Annual</SelectItem>
                          <SelectItem value="sick">Sick</SelectItem>
                          <SelectItem value="personal">Personal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead className="text-center">Days</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockLeaves.map((leave) => (
                        <TableRow key={leave.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <img
                                src={leave.photo}
                                alt={leave.employee}
                                className="w-8 h-8 rounded-full"
                              />
                              <span>{leave.employee}</span>
                            </div>
                          </TableCell>
                          <TableCell>{leave.type}</TableCell>
                          <TableCell className="whitespace-nowrap">
                            {format(new Date(leave.startDate), "MMM d, yyyy")} - {format(new Date(leave.endDate), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-center">{leave.days}</TableCell>
                          <TableCell>{format(new Date(leave.submittedOn), "MMM d, yyyy")}</TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "px-2 py-1 rounded-full text-xs",
                                leave.status === "Approved" && "bg-green-100 text-green-800",
                                leave.status === "Pending" && "bg-yellow-100 text-yellow-800",
                                leave.status === "Rejected" && "bg-red-100 text-red-800"
                              )}
                            >
                              {leave.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="approvals">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingApprovals.length > 0 ? (
                  <div className="space-y-4">
                    {pendingApprovals.map((leave) => (
                      <div key={leave.id} className="border rounded-md p-4">
                        <div className="flex justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={leave.photo}
                              alt={leave.employee}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <h3 className="font-medium">{leave.employee}</h3>
                              <p className="text-sm text-muted-foreground">{leave.type}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Submitted on {format(new Date(leave.submittedOn), "MMM d, yyyy")}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Period</p>
                            <p className="font-medium">
                              {format(new Date(leave.startDate), "MMM d")} - {format(new Date(leave.endDate), "MMM d, yyyy")}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-medium">{leave.days} days</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <span
                              className={
                                "px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800"
                              }
                            >
                              Pending
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="sm" variant="outline" className="text-red-500 border-red-200">
                                  <X size={16} className="mr-1" /> Reject
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Reject leave request</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button size="sm" className="text-white bg-green-500 hover:bg-green-600">
                                  <Check size={16} className="mr-1" /> Approve
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Approve leave request</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No pending approvals at the moment
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Leave;
