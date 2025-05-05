import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building, 
  User,
  Edit,
  File,
  AlertCircle,
  Plus
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock employee data
const mockEmployee = {
  id: "1",
  name: "Michael Johnson",
  photo: "https://randomuser.me/api/portraits/men/1.jpg",
  position: "Senior Developer",
  department: "Engineering",
  status: "Active",
  email: "michael.johnson@example.com",
  phone: "+1 555-123-4567",
  location: "New York, NY",
  startDate: "Jan 15, 2022",
  manager: "Sarah Williams",
  dateOfBirth: "May 12, 1985",
  address: "123 Broadway, New York, NY 10001",
  jobDetails: {
    employmentType: "Full-time",
    jobTitle: "Senior Developer",
    department: "Engineering",
    team: "Backend Development",
    location: "New York Office",
    salary: "$120,000",
    startDate: "Jan 15, 2022",
    workEmail: "michael.johnson@company.com",
    workPhone: "+1 555-123-4567",
  },
  emergencyContacts: [
    {
      name: "Emily Johnson",
      relationship: "Spouse",
      phone: "+1 555-987-6543",
      email: "emily.johnson@example.com",
    },
    {
      name: "Robert Johnson",
      relationship: "Father",
      phone: "+1 555-456-7890",
      email: "robert.johnson@example.com",
    },
  ],
  documents: [
    {
      name: "Employment Contract",
      type: "PDF",
      uploadDate: "Jan 10, 2022",
      size: "2.4 MB",
    },
    {
      name: "ID Card",
      type: "JPG",
      uploadDate: "Jan 12, 2022",
      size: "1.2 MB",
    },
    {
      name: "Resume",
      type: "PDF",
      uploadDate: "Dec 5, 2021",
      size: "1.8 MB",
    },
  ],
};

const EmployeeProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("personal");

  // In a real app, we would fetch the employee data based on the ID
  // For now, we'll just use the mock data
  const employee = mockEmployee;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Employee Profile</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <Edit size={16} />
            <span>Edit Profile</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={employee.photo}
                    alt={employee.name}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                  />
                  <h2 className="text-xl font-bold">{employee.name}</h2>
                  <p className="text-muted-foreground">{employee.position}</p>
                  
                  <Separator className="my-4" />
                  
                  <div className="w-full space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gray-500" />
                      <span className="text-sm">{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      <span className="text-sm">{employee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-500" />
                      <span className="text-sm">{employee.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span className="text-sm">{employee.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building size={16} className="text-gray-500" />
                      <span className="text-sm">{employee.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <span className="text-sm">Reports to: {employee.manager}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="w-full">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs ${
                        employee.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="job">Job Details</TabsTrigger>
                <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                          <p>{employee.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Date of Birth</h3>
                          <p>{employee.dateOfBirth}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Personal Email</h3>
                          <p>{employee.email}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
                          <p>{employee.phone}</p>
                        </div>
                        <div className="md:col-span-2">
                          <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                          <p>{employee.address}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="job" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Employment Type</h3>
                        <p>{employee.jobDetails.employmentType}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Job Title</h3>
                        <p>{employee.jobDetails.jobTitle}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Department</h3>
                        <p>{employee.jobDetails.department}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Team</h3>
                        <p>{employee.jobDetails.team}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                        <p>{employee.jobDetails.location}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Salary</h3>
                        <p>{employee.jobDetails.salary}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
                        <p>{employee.jobDetails.startDate}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Work Email</h3>
                        <p>{employee.jobDetails.workEmail}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Work Phone</h3>
                        <p>{employee.jobDetails.workPhone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="emergency" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {employee.emergencyContacts.map((contact, index) => (
                        <div key={index} className="border p-4 rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{contact.name}</h3>
                            <span className="text-sm text-muted-foreground">{contact.relationship}</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="flex items-center gap-2">
                              <Phone size={16} className="text-gray-500" />
                              <span>{contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail size={16} className="text-gray-500" />
                              <span>{contact.email}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        <Plus size={16} className="mr-2" /> Add Emergency Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="documents" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {employee.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center gap-3">
                            <File size={20} className="text-blue-500" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {doc.uploadDate} • {doc.size}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        <Plus size={16} className="mr-2" /> Upload Document
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeProfile;
