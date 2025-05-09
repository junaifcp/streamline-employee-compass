
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Clock } from "lucide-react";

const EmployeeLeavePage = () => {
  // Mock leave data - in a real application, this would come from an API or context
  const leaveBalance = [
    { type: "Annual Leave", total: 20, used: 8, remaining: 12 },
    { type: "Sick Leave", total: 10, used: 3, remaining: 7 },
    { type: "Personal Leave", total: 5, used: 1, remaining: 4 },
  ];

  const leaveHistory = [
    { id: 1, type: "Annual Leave", startDate: "May 1, 2025", endDate: "May 5, 2025", status: "Approved", days: 5 },
    { id: 2, type: "Sick Leave", startDate: "Mar 15, 2025", endDate: "Mar 16, 2025", status: "Approved", days: 2 },
    { id: 3, type: "Personal Leave", startDate: "Feb 3, 2025", endDate: "Feb 3, 2025", status: "Approved", days: 1 },
    { id: 4, type: "Annual Leave", startDate: "Jun 10, 2025", endDate: "Jun 15, 2025", status: "Pending", days: 6 },
  ];

  const renderStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">{status}</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leave Management</h1>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>Apply for Leave</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leaveBalance.map((leave, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{leave.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold">{leave.remaining} days</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Used</p>
                  <p className="text-xl">{leave.used}/{leave.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Leave History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Duration</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.map((leave) => (
                  <tr key={leave.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">{leave.type}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span>{leave.startDate} {leave.startDate !== leave.endDate ? `to ${leave.endDate}` : ""}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span>{leave.days} {leave.days === 1 ? "day" : "days"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {renderStatusBadge(leave.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeLeavePage;
