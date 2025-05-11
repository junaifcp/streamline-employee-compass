
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Download, Filter, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { payrollService } from "@/services";
import { PayrollRecord } from "@/services/payrollService";

const PayrollPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("records");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>(new Date().getFullYear().toString());
  const [filterStatus, setFilterStatus] = useState<string>("");

  const { data: payrollData, isLoading, refetch } = useQuery({
    queryKey: ['payroll', { page: currentPage, month: filterMonth, year: filterYear, status: filterStatus }],
    queryFn: () => payrollService.getPayrollRecords({
      page: currentPage,
      limit: 10,
      month: filterMonth ? parseInt(filterMonth) : undefined,
      year: filterYear ? parseInt(filterYear) : undefined,
      status: filterStatus ? filterStatus as 'pending' | 'paid' | 'cancelled' : undefined
    }),
  });

  const handleGeneratePayroll = () => {
    // This would typically open a modal to select month/year and employees
    toast({
      title: "Generate Payroll",
      description: "Payroll generation feature would open here.",
    });
  };

  const handleDownloadPayslip = (recordId: string) => {
    toast({
      title: "Download Payslip",
      description: "Downloading payslip...",
    });
  };

  const handleFilter = () => {
    refetch();
  };

  const renderPayrollStatus = (status: string) => {
    let badgeClass = "";
    switch(status) {
      case 'pending':
        badgeClass = "bg-yellow-100 text-yellow-800";
        break;
      case 'paid':
        badgeClass = "bg-green-100 text-green-800";
        break;
      case 'cancelled':
        badgeClass = "bg-red-100 text-red-800";
        break;
    }

    return (
      <Badge className={badgeClass}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Payroll Management</h1>
          <Button className="flex items-center gap-2" onClick={handleGeneratePayroll}>
            <Plus size={16} />
            <span>Generate Payroll</span>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="records">Payroll Records</TabsTrigger>
            <TabsTrigger value="settings">Payroll Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-4">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium">Month</label>
                <Select value={filterMonth} onValueChange={setFilterMonth}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Months</SelectItem>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Year</label>
                <Select value={filterYear} onValueChange={setFilterYear}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button onClick={handleFilter} className="flex items-center gap-2">
                <Filter size={16} />
                Apply Filters
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Month/Year</TableHead>
                      <TableHead>Basic Salary</TableHead>
                      <TableHead>Allowances</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Salary</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          Loading payroll records...
                        </TableCell>
                      </TableRow>
                    ) : payrollData?.data.items && payrollData.data.items.length > 0 ? (
                      payrollData.data.items.map((record: PayrollRecord) => (
                        <TableRow key={record._id}>
                          <TableCell className="font-medium">Employee Name</TableCell>
                          <TableCell>
                            {months.find(m => parseInt(m.value) === record.month)?.label} {record.year}
                          </TableCell>
                          <TableCell>${record.basicSalary.toLocaleString()}</TableCell>
                          <TableCell>
                            ${record.allowances.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            ${record.deductions.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                          </TableCell>
                          <TableCell className="font-semibold">${record.netSalary.toLocaleString()}</TableCell>
                          <TableCell>{renderPayrollStatus(record.paymentStatus)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleDownloadPayslip(record._id)}
                              >
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download Payslip</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                              >
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No payroll records found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            {/* Pagination controls would go here */}
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Pay Structure Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Default Pay Day</label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue placeholder="Select pay day" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                            <SelectItem key={day} value={day.toString()}>
                              {day}
                            </SelectItem>
                          ))}
                          <SelectItem value="last">Last day of month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pay Frequency</label>
                      <Select defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Allowances</h3>
                  {/* Allowance settings would go here */}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Deductions</h3>
                  {/* Deductions settings would go here */}
                </div>
                
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PayrollPage;
