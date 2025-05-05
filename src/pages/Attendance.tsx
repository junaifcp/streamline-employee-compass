
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Plus, Check, Clock, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock attendance data
const mockAttendanceRecords = [
  {
    id: 1,
    employee: "Michael Johnson",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    checkIn: "09:02 AM",
    checkOut: "05:15 PM",
    duration: "8h 13m",
    status: "Present",
    date: "2024-05-04",
  },
  {
    id: 2,
    employee: "Sarah Williams",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    checkIn: "08:55 AM",
    checkOut: "06:05 PM",
    duration: "9h 10m",
    status: "Present",
    date: "2024-05-04",
  },
  {
    id: 3,
    employee: "David Brown",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    checkIn: "09:20 AM",
    checkOut: "05:30 PM",
    duration: "8h 10m",
    status: "Late",
    date: "2024-05-04",
  },
  {
    id: 4,
    employee: "Jessica Martinez",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    checkIn: "",
    checkOut: "",
    duration: "",
    status: "Absent",
    date: "2024-05-04",
  },
  {
    id: 5,
    employee: "Michael Johnson",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    checkIn: "08:58 AM",
    checkOut: "05:05 PM",
    duration: "8h 07m",
    status: "Present",
    date: "2024-05-03",
  },
  {
    id: 6,
    employee: "Sarah Williams",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    checkIn: "09:02 AM",
    checkOut: "05:45 PM",
    duration: "8h 43m",
    status: "Present",
    date: "2024-05-03",
  },
];

// Generate dates for the attendance calendar
const generateCalendarDays = () => {
  const days = [];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    let status = "present";
    
    // Randomly assign statuses for demonstration
    if (i > today.getDate()) {
      status = "none"; // Future dates
    } else if (isWeekend) {
      status = "weekend";
    } else {
      const random = Math.random();
      if (random < 0.05) status = "absent";
      else if (random < 0.15) status = "late";
      else if (random < 0.25) status = "leave";
    }
    
    days.push({
      date,
      day: i,
      status,
      isToday: i === today.getDate(),
      isWeekend,
    });
  }
  
  return days;
};

const calendarDays = generateCalendarDays();

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  
  const formattedDate = selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : '';
  
  const filteredRecords = selectedDate
    ? mockAttendanceRecords.filter(
        (record) => record.date === format(selectedDate, 'yyyy-MM-dd')
      )
    : [];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Attendance Tracking</h1>
          <div className="flex gap-2">
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-hrms-blue hover:bg-hrms-blue-dark">
                  <Plus size={16} />
                  <span>Manual Entry</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Attendance Record</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="employee" className="text-sm font-medium">
                      Employee
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="michael">Michael Johnson</SelectItem>
                        <SelectItem value="sarah">Sarah Williams</SelectItem>
                        <SelectItem value="david">David Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">
                      Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        id="date"
                        type="text"
                        placeholder="Select date"
                        value={selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : ''}
                        readOnly
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="check-in" className="text-sm font-medium">
                        Check In
                      </label>
                      <Input
                        id="check-in"
                        type="time"
                        defaultValue="09:00"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="check-out" className="text-sm font-medium">
                        Check Out
                      </label>
                      <Input
                        id="check-out"
                        type="time"
                        defaultValue="17:00"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium">
                      Status
                    </label>
                    <Select defaultValue="present">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="leave">Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium">
                      Notes (Optional)
                    </label>
                    <Input
                      id="notes"
                      placeholder="Add any additional information"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setAddDialogOpen(false)} className="bg-hrms-blue hover:bg-hrms-blue-dark">
                    Save Record
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Check size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Present Today</p>
                <h3 className="text-2xl font-bold">85%</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Late Today</p>
                <h3 className="text-2xl font-bold">8%</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <ArrowUpDown size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Absent Today</p>
                <h3 className="text-2xl font-bold">7%</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="calendar">
          <TabsList className="mb-6">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>May 2025</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm">Today</Button>
                    <Button variant="outline" size="sm">Next</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 mb-2 text-center text-sm font-medium text-gray-500">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, i) => (
                    <div
                      key={i}
                      className={cn(
                        "aspect-square p-1 relative",
                        day.isWeekend && "bg-gray-50",
                        day.isToday && "ring-2 ring-hrms-blue ring-offset-2"
                      )}
                      onClick={() => setSelectedDate(day.date)}
                    >
                      <div 
                        className={cn(
                          "w-full h-full flex flex-col items-center justify-center rounded-md cursor-pointer hover:bg-gray-50",
                          selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day.date, 'yyyy-MM-dd') && 'bg-gray-100'
                        )}
                      >
                        <span className="text-sm">{day.day}</span>
                        {day.status !== 'none' && day.status !== 'weekend' && (
                          <div 
                            className={cn(
                              "w-2 h-2 rounded-full mt-1",
                              day.status === 'present' && "bg-green-500",
                              day.status === 'late' && "bg-yellow-500",
                              day.status === 'absent' && "bg-red-500",
                              day.status === 'leave' && "bg-blue-500"
                            )}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {selectedDate && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Attendance: {formattedDate}</CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredRecords.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Employee</TableHead>
                          <TableHead>Check In</TableHead>
                          <TableHead>Check Out</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRecords.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <img
                                  src={record.photo}
                                  alt={record.employee}
                                  className="w-8 h-8 rounded-full"
                                />
                                <span>{record.employee}</span>
                              </div>
                            </TableCell>
                            <TableCell>{record.checkIn || "—"}</TableCell>
                            <TableCell>{record.checkOut || "—"}</TableCell>
                            <TableCell>{record.duration || "—"}</TableCell>
                            <TableCell>
                              <span
                                className={cn(
                                  "px-2 py-1 rounded-full text-xs",
                                  record.status === "Present" && "bg-green-100 text-green-800",
                                  record.status === "Late" && "bg-yellow-100 text-yellow-800",
                                  record.status === "Absent" && "bg-red-100 text-red-800"
                                )}
                              >
                                {record.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-4 text-center text-muted-foreground">
                      No attendance records found for this date.
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="list">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Attendance Records</CardTitle>
                  <div className="flex gap-2">
                    <div className="w-[200px]">
                      <Select defaultValue="may">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="may">May 2025</SelectItem>
                          <SelectItem value="april">April 2025</SelectItem>
                          <SelectItem value="march">March 2025</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-[150px]">
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="present">Present</SelectItem>
                          <SelectItem value="late">Late</SelectItem>
                          <SelectItem value="absent">Absent</SelectItem>
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
                        <TableHead>Date</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAttendanceRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <img
                                src={record.photo}
                                alt={record.employee}
                                className="w-8 h-8 rounded-full"
                              />
                              <span>{record.employee}</span>
                            </div>
                          </TableCell>
                          <TableCell>{format(new Date(record.date), 'MMM dd, yyyy')}</TableCell>
                          <TableCell>{record.checkIn || "—"}</TableCell>
                          <TableCell>{record.checkOut || "—"}</TableCell>
                          <TableCell>{record.duration || "—"}</TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                "px-2 py-1 rounded-full text-xs",
                                record.status === "Present" && "bg-green-100 text-green-800",
                                record.status === "Late" && "bg-yellow-100 text-yellow-800",
                                record.status === "Absent" && "bg-red-100 text-red-800"
                              )}
                            >
                              {record.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Attendance;
