
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  FileText, 
  FileCheck, 
  FileClock, 
  Download, 
  Eye, 
  Plus 
} from "lucide-react";

const EmployeeDocumentsPage = () => {
  // Mock documents - in a real application, this would come from an API
  const documents = [
    {
      id: 1,
      name: "Employment Contract",
      category: "Human Resources",
      uploadDate: "Jan 15, 2023",
      status: "Signed",
      type: "PDF",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Pay Slip - April 2025",
      category: "Payroll",
      uploadDate: "May 1, 2025",
      status: "Available",
      type: "PDF",
      size: "1.1 MB",
    },
    {
      id: 3,
      name: "Employee Handbook",
      category: "Policies",
      uploadDate: "Jan 16, 2023",
      status: "Available",
      type: "PDF",
      size: "4.2 MB",
    },
    {
      id: 4,
      name: "Health Insurance Policy",
      category: "Benefits",
      uploadDate: "Jan 20, 2023",
      status: "Available",
      type: "PDF",
      size: "3.6 MB",
    },
    {
      id: 5,
      name: "Annual Performance Review",
      category: "Performance",
      uploadDate: "Dec 15, 2024",
      status: "Pending",
      type: "DOC",
      size: "1.8 MB",
    },
  ];

  const documentCategories = [
    { name: "All Documents", count: documents.length, icon: FileText },
    { name: "Payroll", count: documents.filter(doc => doc.category === "Payroll").length, icon: FileCheck },
    { name: "Pending", count: documents.filter(doc => doc.status === "Pending").length, icon: FileClock },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Signed":
        return "text-green-600";
      case "Available":
        return "text-blue-600";
      case "Pending":
        return "text-amber-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Documents</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus size={16} />
          <span>Upload Document</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {documentCategories.map((category, index) => (
          <Card key={index} className="hover:bg-gray-50 cursor-pointer">
            <CardContent className="flex items-center p-6">
              <div className="mr-4 bg-blue-50 p-3 rounded-lg">
                <category.icon size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} documents</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>All Documents</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Document</th>
                  <th className="text-left py-3 px-4 hidden md:table-cell">Category</th>
                  <th className="text-left py-3 px-4 hidden md:table-cell">Upload Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <FileText size={20} className="text-gray-500 mr-2" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground hidden sm:block">
                            {doc.type} • {doc.size}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">{doc.category}</td>
                    <td className="py-4 px-4 hidden md:table-cell">{doc.uploadDate}</td>
                    <td className="py-4 px-4">
                      <span className={getStatusColor(doc.status)}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" title="View">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" title="Download">
                          <Download size={16} />
                        </Button>
                      </div>
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

export default EmployeeDocumentsPage;
