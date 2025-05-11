
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Clock,
  FileText,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { dashboardService, attendanceService } from "@/services";

const EmployeePortalLanding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ['employeeDashboard'],
    queryFn: dashboardService.getEmployeeDashboard,
  });

  const { data: todayStatus, isLoading: isAttendanceLoading } = useQuery({
    queryKey: ['todayAttendance'],
    queryFn: attendanceService.getTodayStatus,
  });

  const handleCheckIn = async () => {
    try {
      await attendanceService.checkIn();
      toast({
        title: "Success",
        description: "You have successfully checked in.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check in. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCheckOut = async () => {
    try {
      await attendanceService.checkOut();
      toast({
        title: "Success",
        description: "You have successfully checked out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderAttendanceActions = () => {
    if (isAttendanceLoading) {
      return (
        <div className="flex justify-center">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Loading attendance status...</p>
            <div className="animate-spin h-8 w-8 border-4 border-t-blue-500 border-blue-200 rounded-full mx-auto"></div>
          </div>
        </div>
      );
    }

    if (!todayStatus) {
      return (
        <div className="flex justify-center">
          <Button 
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            onClick={handleCheckIn}
          >
            <Clock className="h-4 w-4" />
            Check In
          </Button>
        </div>
      );
    }

    if (todayStatus.status === 'present' && !todayStatus.checkOutTime) {
      return (
        <div className="flex justify-center">
          <div className="text-center">
            <p className="text-sm text-green-600 font-medium mb-2">
              You checked in at {new Date(todayStatus.checkInTime || "").toLocaleTimeString()}
            </p>
            <Button 
              className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
              onClick={handleCheckOut}
            >
              <Clock className="h-4 w-4" />
              Check Out
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center">
        <p className="text-sm text-gray-600">
          You've completed your workday!
        </p>
        <div className="flex justify-center items-center gap-2 mt-2">
          <p className="text-xs">Check In: {new Date(todayStatus.checkInTime || "").toLocaleTimeString()}</p>
          <p className="text-xs">Check Out: {new Date(todayStatus.checkOutTime || "").toLocaleTimeString()}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Employee Portal</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Today's Attendance</h2>
        <div className="py-4">
          {renderAttendanceActions()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Present Days</p>
                <p className="text-2xl font-bold">
                  {isDashboardLoading ? "-" : dashboardData?.attendanceSummary.present || 0}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Absent Days</p>
                <p className="text-2xl font-bold">
                  {isDashboardLoading ? "-" : dashboardData?.attendanceSummary.absent || 0}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Leave Balance</p>
                <p className="text-2xl font-bold">
                  {isDashboardLoading || !dashboardData?.leaveBalance ? "-" : 
                    dashboardData.leaveBalance.reduce((total, item) => total + item.remaining, 0)
                  } days
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Documents</p>
                <p className="text-2xl font-bold">View</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isDashboardLoading ? (
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
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {isDashboardLoading ? (
                <p className="text-center py-4">Loading reviews...</p>
              ) : dashboardData?.upcomingReviews && dashboardData.upcomingReviews.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.upcomingReviews.map((review) => (
                    <div key={review._id} className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">{review.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.reviewDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          With: {review.reviewerName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4">No upcoming reviews.</p>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Leave Balance</CardTitle>
            </CardHeader>
            <CardContent>
              {isDashboardLoading ? (
                <p className="text-center py-4">Loading leave balance...</p>
              ) : dashboardData?.leaveBalance && dashboardData.leaveBalance.length > 0 ? (
                <div className="space-y-4">
                  {dashboardData.leaveBalance.map((leave, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{leave.type}</span>
                        <span className="text-sm">{leave.remaining}/{leave.total} days</span>
                      </div>
                      <Progress 
                        value={(leave.remaining / leave.total) * 100} 
                        className="h-2" 
                      />
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => navigate("/employee/leave")}
                  >
                    Request Leave
                  </Button>
                </div>
              ) : (
                <p className="text-center py-4">No leave balance data available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeePortalLanding;
