
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building, 
  User,
  Edit,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmployeeProfilePage = () => {
  // Mock employee data - in a real application, this would come from an API or context
  const employee = {
    id: "1",
    name: "John Employee",
    photo: "https://randomuser.me/api/portraits/men/43.jpg",
    position: "Software Engineer",
    department: "Engineering",
    status: "Active",
    email: "john.employee@example.com",
    phone: "+1 555-123-4567",
    location: "San Francisco, CA",
    startDate: "Mar 12, 2023",
    manager: "Jane Manager",
    dateOfBirth: "Apr 15, 1990",
    address: "456 Tech Ave, San Francisco, CA 94107",
    jobDetails: {
      employmentType: "Full-time",
      jobTitle: "Software Engineer",
      department: "Engineering",
      team: "Frontend Development",
      location: "San Francisco Office",
      salary: "$110,000",
      startDate: "Mar 12, 2023",
      workEmail: "john.employee@company.com",
      workPhone: "+1 555-123-4567",
    },
    emergencyContacts: [
      {
        name: "Sarah Employee",
        relationship: "Spouse",
        phone: "+1 555-987-6543",
        email: "sarah.employee@example.com",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
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
          <Tabs defaultValue="personal">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="job">Job Details</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfilePage;
