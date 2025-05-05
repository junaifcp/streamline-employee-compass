
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search,
  Plus,
  UserPlus
} from "lucide-react";

// Mock employee data
const mockEmployees = [
  {
    id: "1",
    name: "Michael Johnson",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    position: "Senior Developer",
    department: "Engineering",
    status: "Active",
    location: "New York",
    startDate: "Jan 15, 2022",
  },
  {
    id: "2",
    name: "Sarah Williams",
    photo: "https://randomuser.me/api/portraits/women/1.jpg",
    position: "Marketing Manager",
    department: "Marketing",
    status: "Active",
    location: "Chicago",
    startDate: "Mar 5, 2021",
  },
  {
    id: "3",
    name: "David Brown",
    photo: "https://randomuser.me/api/portraits/men/2.jpg",
    position: "Financial Analyst",
    department: "Finance",
    status: "Active",
    location: "Remote",
    startDate: "Jun 22, 2023",
  },
  {
    id: "4",
    name: "Jessica Martinez",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    position: "HR Specialist",
    department: "HR",
    status: "On Leave",
    location: "Miami",
    startDate: "Sep 10, 2020",
  },
  {
    id: "5",
    name: "Robert Jones",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    position: "Product Manager",
    department: "Product",
    status: "Active",
    location: "San Francisco",
    startDate: "Nov 2, 2021",
  },
  {
    id: "6",
    name: "Lisa Thompson",
    photo: "https://randomuser.me/api/portraits/women/3.jpg",
    position: "Sales Representative",
    department: "Sales",
    status: "Active",
    location: "Boston",
    startDate: "Aug 15, 2022",
  },
  {
    id: "7",
    name: "Andrew Wilson",
    photo: "https://randomuser.me/api/portraits/men/4.jpg",
    position: "UI/UX Designer",
    department: "Design",
    status: "Active",
    location: "Seattle",
    startDate: "Apr 5, 2023",
  },
  {
    id: "8",
    name: "Emily Davis",
    photo: "https://randomuser.me/api/portraits/women/4.jpg",
    position: "Content Writer",
    department: "Marketing",
    status: "New",
    location: "Remote",
    startDate: "Jan 3, 2024",
  },
];

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = mockEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Employee Directory</h1>
          <Button className="flex items-center gap-2 bg-hrms-blue hover:bg-hrms-blue-dark">
            <UserPlus size={16} />
            <span>Add Employee</span>
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by name, position, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">Filters</Button>
        </div>

        <div className="bg-white rounded-md shadow">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Start Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      <Link to={`/employees/${employee.id}`} className="flex items-center gap-3 hover:underline">
                        <img
                          src={employee.photo}
                          alt={employee.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {employee.name}
                      </Link>
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          employee.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : employee.status === "On Leave"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </TableCell>
                    <TableCell>{employee.location}</TableCell>
                    <TableCell>{employee.startDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="p-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Employees;
