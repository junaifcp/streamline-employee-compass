
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarCheck, 
  Clock, 
  User, 
  FileText, 
  Calendar,
  LogOut,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type AttendanceRecord = {
  date: Date;
  checkIn: string;
  checkOut: string;
  status: "present" | "absent" | "half-day" | "weekend" | "holiday";
};

type LeaveRequest = {
  id: string;
  type: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedOn: Date;
};

const EmployeePortal = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("attendance");
  const [attendanceDate, setAttendanceDate] = useState<Date>(new Date());
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState<Date | undefined>(new Date());
  const [leaveEndDate, setLeaveEndDate] = useState<Date | undefined>(new Date());
  const [leaveReason, setLeaveReason] = useState("");
  
  // Mock employee data
  const employee = {
    id: "123",
    name: "John Employee",
    position: "Software Engineer",
    department: "Engineering",
    joiningDate: "2022-05-15",
    manager: "Sarah Williams",
    profileImage: "https://randomuser.me/api/portraits/men/43.jpg",
    availableLeaves: {
      annual: 12,
      sick: 8,
      personal: 5,
    },
    takenLeaves: {
      annual: 4,
      sick: 2,
      personal: 1,
    },
  };

  // Mock attendance data
  const currentDate = new Date();
  const attendanceHistory: AttendanceRecord[] = [
    {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1),
      checkIn: "09:15 AM",
      checkOut: "05:30 PM",
      status: "present"
    },
    {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 2),
      checkIn: "09:02 AM",
      checkOut: "06:10 PM",
      status: "present"
    },
    {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 3),
      checkIn: "09:30 AM",
      checkOut: "03:00 PM",
      status: "half-day"
    },
    {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 4),
      checkIn: "",
      checkOut: "",
      status: "weekend"
    },
    {
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 5),
      checkIn: "",
      checkOut: "",
      status: "weekend"
    },
  ];

  // Mock leave requests
  const leaveRequests: LeaveRequest[] = [
    {
      id: "1",
      type: "Annual Leave",
      startDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 5),
      endDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 10),
      reason: "Family vacation",
      status: "pending",
      appliedOn: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 2)
    },
    {
      id: "2",
      type: "Sick Leave",
      startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      endDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 11),
      reason: "Doctor appointment",
      status: "approved",
      appliedOn: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 5)
    },
    {
      id: "3",
      type: "Personal Leave",
      startDate: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 20),
      endDate: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 20),
      reason: "Personal matters",
      status: "rejected",
      appliedOn: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 15)
    },
  ];

  // Mock current attendance status
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  // Handle check in
  const handleCheckIn = () => {
    const now = new Date();
    const timeFormatted = format(now, "hh:mm a");
    setCheckInTime(timeFormatted);
    setAttendanceMarked(true);
    
    toast({
      title: "Checked In",
      description: `You've successfully checked in at ${timeFormatted}`,
    });
  };

  // Handle check out
  const handleCheckOut = () => {
    const now = new Date();
    const timeFormatted = format(now, "hh:mm a");
    setCheckOutTime(timeFormatted);
    
    toast({
      title: "Checked Out",
      description: `You've successfully checked out at ${timeFormatted}`,
    });
  };

  // Find attendance for selected date
  const selectedAttendance = attendanceHistory.find(record => 
    record.date.getDate() === attendanceDate.getDate() &&
    record.date.getMonth() === attendanceDate.getMonth() &&
    record.date.getFullYear() === attendanceDate.getFullYear()
  );

  // Handle leave application submission
  const handleApplyLeave = () => {
    if (!leaveType || !leaveStartDate || !leaveEndDate || !leaveReason) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would submit the leave request to an API
    toast({
      title: "Leave Request Submitted",
      description: "Your leave request has been submitted for approval.",
    });
    
    setShowLeaveDialog(false);
    setLeaveType("");
    setLeaveStartDate(new Date());
    setLeaveEndDate(new Date());
    setLeaveReason("");
  };

  // Determine status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Format date range
  const formatDateRange = (start: Date, end: Date) => {
    if (start.getTime() === end.getTime()) {
      return format(start, "MMM dd, yyyy");
    }
    return `${format(start, "MMM dd")} - ${format(end, "MMM dd, yyyy")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-hrms-blue text-white shadow">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">HRCompass</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img 
                src={employee.profileImage} 
                alt={employee.name} 
                className="w-8 h-8 rounded-full"
              />
              <span>{employee.name}</span>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-hrms-blue-dark">
              <LogOut size={18} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center mb-6">
                  <img
                    src={employee.profileImage}
                    alt={employee.name}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <h2 className="text-xl font-bold">{employee.name}</h2>
                  <p className="text-muted-foreground">{employee.position}</p>
                  <p className="text-sm text-muted-foreground">{employee.department}</p>
                </div>
                
                <nav className="space-y-1">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "attendance" ? "bg-gray-100" : ""}`}
                    onClick={() => setActiveTab("attendance")}
                  >
                    <Clock size={18} className="mr-2" />
                    Attendance
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "leave" ? "bg-gray-100" : ""}`}
                    onClick={() => setActiveTab("leave")}
                  >
                    <Calendar size={18} className="mr-2" />
                    Leave
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "profile" ? "bg-gray-100" : ""}`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User size={18} className="mr-2" />
                    My Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${activeTab === "documents" ? "bg-gray-100" : ""}`}
                    onClick={() => setActiveTab("documents")}
                  >
                    <FileText size={18} className="mr-2" />
                    Documents
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {/* Wrap all TabsContent in a Tabs component with the correct value */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="attendance">
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="border-b">
                      <CardTitle>Today's Attendance</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                          <h3 className="font-medium text-lg">
                            {format(new Date(), "EEEE, MMMM d, yyyy")}
                          </h3>
                          <p className="text-muted-foreground">
                            Working Hours: 9:00 AM - 5:00 PM
                          </p>
                        </div>
                        
                        <div className="flex gap-4">
                          {!attendanceMarked ? (
                            <Button 
                              className="flex-1 md:flex-none bg-green-600 hover:bg-green-700"
                              onClick={handleCheckIn}
                            >
                              <CheckCircle size={18} className="mr-2" />
                              Check In
                            </Button>
                          ) : (
                            <>
                              <div className="text-right">
                                <div className="font-medium">Check In</div>
                                <div className="text-green-600">{checkInTime}</div>
                              </div>
                              
                              {checkOutTime ? (
                                <div className="text-right">
                                  <div className="font-medium">Check Out</div>
                                  <div className="text-red-600">{checkOutTime}</div>
                                </div>
                              ) : (
                                <Button 
                                  className="flex-1 md:flex-none bg-red-600 hover:bg-red-700"
                                  onClick={handleCheckOut}
                                >
                                  <XCircle size={18} className="mr-2" />
                                  Check Out
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="border-b">
                      <CardTitle>Attendance History</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <CalendarComponent
                            mode="single"
                            selected={attendanceDate}
                            onSelect={(date) => date && setAttendanceDate(date)}
                            className={cn("rounded-md border")}
                          />
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h3 className="font-medium text-lg mb-4">
                            {format(attendanceDate, "MMMM d, yyyy")}
                          </h3>
                          
                          {selectedAttendance ? (
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Status</span>
                                <Badge
                                  className={cn(
                                    selectedAttendance.status === "present" && "bg-green-100 text-green-800",
                                    selectedAttendance.status === "absent" && "bg-red-100 text-red-800",
                                    selectedAttendance.status === "half-day" && "bg-yellow-100 text-yellow-800",
                                    selectedAttendance.status === "weekend" && "bg-gray-100 text-gray-800",
                                    selectedAttendance.status === "holiday" && "bg-blue-100 text-blue-800",
                                  )}
                                >
                                  {selectedAttendance.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              </div>
                              
                              {selectedAttendance.status !== "weekend" && selectedAttendance.status !== "holiday" && (
                                <>
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">Check In</span>
                                    <span>{selectedAttendance.checkIn || "N/A"}</span>
                                  </div>
                                  
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">Check Out</span>
                                    <span>{selectedAttendance.checkOut || "N/A"}</span>
                                  </div>
                                  
                                  {selectedAttendance.checkIn && selectedAttendance.checkOut && (
                                    <div className="flex justify-between items-center">
                                      <span className="font-medium">Working Hours</span>
                                      <span>8.25 hrs</span>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          ) : (
                            <div className="text-center text-muted-foreground py-8">
                              No attendance data available for this date.
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="leave">
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="border-b flex justify-between items-center">
                      <CardTitle>Leave Balance</CardTitle>
                      <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
                        <DialogTrigger asChild>
                          <Button className="bg-hrms-blue hover:bg-hrms-blue-dark">
                            Apply for Leave
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Apply for Leave</DialogTitle>
                            <DialogDescription>
                              Fill out the form below to submit a leave request.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="leave-type">Leave Type</Label>
                              <Select
                                value={leaveType}
                                onValueChange={setLeaveType}
                              >
                                <SelectTrigger id="leave-type">
                                  <SelectValue placeholder="Select leave type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="annual">Annual Leave</SelectItem>
                                  <SelectItem value="sick">Sick Leave</SelectItem>
                                  <SelectItem value="personal">Personal Leave</SelectItem>
                                  <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>From Date</Label>
                                <CalendarComponent
                                  mode="single"
                                  selected={leaveStartDate}
                                  onSelect={setLeaveStartDate}
                                  className="border rounded-md p-2"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label>To Date</Label>
                                <CalendarComponent
                                  mode="single"
                                  selected={leaveEndDate}
                                  onSelect={setLeaveEndDate}
                                  className="border rounded-md p-2"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="reason">Reason</Label>
                              <Textarea
                                id="reason"
                                placeholder="Please provide a reason for your leave request"
                                value={leaveReason}
                                onChange={(e) => setLeaveReason(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowLeaveDialog(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleApplyLeave}>Submit Request</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                          <div className="text-lg font-medium">Annual Leave</div>
                          <div className="mt-2 flex items-end gap-1">
                            <span className="text-3xl font-bold">{employee.availableLeaves.annual - employee.takenLeaves.annual}</span>
                            <span className="text-muted-foreground">/ {employee.availableLeaves.annual} days</span>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            {employee.takenLeaves.annual} days used
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-md">
                          <div className="text-lg font-medium">Sick Leave</div>
                          <div className="mt-2 flex items-end gap-1">
                            <span className="text-3xl font-bold">{employee.availableLeaves.sick - employee.takenLeaves.sick}</span>
                            <span className="text-muted-foreground">/ {employee.availableLeaves.sick} days</span>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            {employee.takenLeaves.sick} days used
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-md">
                          <div className="text-lg font-medium">Personal Leave</div>
                          <div className="mt-2 flex items-end gap-1">
                            <span className="text-3xl font-bold">{employee.availableLeaves.personal - employee.takenLeaves.personal}</span>
                            <span className="text-muted-foreground">/ {employee.availableLeaves.personal} days</span>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            {employee.takenLeaves.personal} days used
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="border-b">
                      <CardTitle>Leave Requests</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-4">Type</th>
                            <th className="text-left p-4">Period</th>
                            <th className="text-left p-4">Applied On</th>
                            <th className="text-left p-4">Reason</th>
                            <th className="text-left p-4">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaveRequests.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="text-center p-8 text-muted-foreground">
                                No leave requests found.
                              </td>
                            </tr>
                          ) : (
                            leaveRequests.map((request) => (
                              <tr key={request.id} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-medium">
                                  {request.type}
                                </td>
                                <td className="p-4">
                                  {formatDateRange(request.startDate, request.endDate)}
                                </td>
                                <td className="p-4">
                                  {format(request.appliedOn, "MMM dd, yyyy")}
                                </td>
                                <td className="p-4 max-w-[200px] truncate">
                                  {request.reason}
                                </td>
                                <td className="p-4">
                                  {getStatusBadge(request.status)}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                        <p>{employee.name}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Position</h3>
                        <p>{employee.position}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                        <p>{employee.department}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Joining Date</h3>
                        <p>{format(new Date(employee.joiningDate), "MMMM d, yyyy")}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Manager</h3>
                        <p>{employee.manager}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents">
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle>My Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {["Employment Contract", "ID Card", "Resume"].map((doc, index) => (
                        <div key={index} className="flex items-center justify-between border p-3 rounded-md">
                          <div className="flex items-center gap-3">
                            <FileText size={20} className="text-blue-500" />
                            <span>{doc}</span>
                          </div>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeePortal;
