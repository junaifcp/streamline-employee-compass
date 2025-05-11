
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Users, 
  Search, 
  Plus,
  Mail,
  Calendar,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import JobPostModal from "@/components/recruitment/JobPostModal";
import AddCandidateModal from "@/components/recruitment/AddCandidateModal";

// Types for our data
type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  postedDate: string;
  applicants: number;
  status: "open" | "closed" | "draft";
};

type Candidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  appliedDate: string;
  source: string;
  stage: "screening" | "interview" | "technical" | "offer" | "rejected" | "hired";
  resume: string;
};

const Recruitment = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("jobs");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<string>("all");
  
  // Modal states
  const [isJobPostModalOpen, setIsJobPostModalOpen] = useState(false);
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false);
  
  // Mock data for jobs
  const jobs: Job[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-Time",
      postedDate: "2024-04-15",
      applicants: 24,
      status: "open",
    },
    {
      id: "2",
      title: "HR Manager",
      department: "Human Resources",
      location: "New York",
      type: "Full-Time",
      postedDate: "2024-04-10",
      applicants: 16,
      status: "open",
    },
    {
      id: "3",
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Chicago",
      type: "Full-Time",
      postedDate: "2024-04-05",
      applicants: 32,
      status: "open",
    },
    {
      id: "4",
      title: "Sales Representative",
      department: "Sales",
      location: "Los Angeles",
      type: "Full-Time",
      postedDate: "2024-04-01",
      applicants: 18,
      status: "closed",
    },
    {
      id: "5",
      title: "Backend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Contract",
      postedDate: "2024-03-28",
      applicants: 42,
      status: "open",
    },
  ];

  // Mock data for candidates
  const allCandidates: Candidate[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 555-123-4567",
      appliedDate: "2024-04-16",
      source: "LinkedIn",
      stage: "screening",
      resume: "john_smith_resume.pdf",
    },
    {
      id: "2",
      name: "Emma Johnson",
      email: "emma.johnson@example.com",
      phone: "+1 555-234-5678",
      appliedDate: "2024-04-17",
      source: "Indeed",
      stage: "interview",
      resume: "emma_johnson_resume.pdf",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 555-345-6789",
      appliedDate: "2024-04-15",
      source: "Referral",
      stage: "technical",
      resume: "michael_brown_resume.pdf",
    },
    {
      id: "4",
      name: "Sophia Davis",
      email: "sophia.davis@example.com",
      phone: "+1 555-456-7890",
      appliedDate: "2024-04-12",
      source: "Company Website",
      stage: "offer",
      resume: "sophia_davis_resume.pdf",
    },
    {
      id: "5",
      name: "William Garcia",
      email: "william.garcia@example.com",
      phone: "+1 555-567-8901",
      appliedDate: "2024-04-10",
      source: "LinkedIn",
      stage: "hired",
      resume: "william_garcia_resume.pdf",
    },
    {
      id: "6",
      name: "Olivia Wilson",
      email: "olivia.wilson@example.com",
      phone: "+1 555-678-9012",
      appliedDate: "2024-04-08",
      source: "Indeed",
      stage: "rejected",
      resume: "olivia_wilson_resume.pdf",
    },
  ];

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedJob = selectedJobId ? jobs.find(job => job.id === selectedJobId) : null;
  
  const candidates = selectedJobId 
    ? allCandidates.filter(candidate => 
        (selectedStage === "all" || candidate.stage === selectedStage)
      )
    : [];

  const handleSelectJob = (jobId: string) => {
    setSelectedJobId(jobId);
    setSelectedTab("candidates");
  };

  const handleSendOffer = (candidateId: string) => {
    toast({
      title: "Offer Email Sent",
      description: "The offer letter has been sent to the candidate.",
    });
  };

  // Helper to render stage badge
  const renderStageBadge = (stage: Candidate['stage']) => {
    let color = "";
    switch(stage) {
      case "screening":
        color = "bg-gray-100 text-gray-800";
        break;
      case "interview":
        color = "bg-blue-100 text-blue-800";
        break;
      case "technical":
        color = "bg-purple-100 text-purple-800";
        break;
      case "offer":
        color = "bg-orange-100 text-orange-800";
        break;
      case "hired":
        color = "bg-green-100 text-green-800";
        break;
      case "rejected":
        color = "bg-red-100 text-red-800";
        break;
    }
    
    return (
      <Badge className={color}>
        {stage.charAt(0).toUpperCase() + stage.slice(1)}
      </Badge>
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Recruitment Pipeline</h1>
          <Button 
            className="flex items-center gap-2 bg-hrms-blue hover:bg-hrms-blue-dark"
            onClick={() => setIsJobPostModalOpen(true)}
          >
            <Plus size={16} />
            <span>Post New Job</span>
          </Button>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="jobs">
              <Briefcase className="mr-2 h-4 w-4" />
              Job Listings
            </TabsTrigger>
            <TabsTrigger value="candidates" disabled={!selectedJob}>
              <Users className="mr-2 h-4 w-4" />
              Candidates
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs" className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Posted Date</TableHead>
                      <TableHead>Applicants</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                          No jobs found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredJobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.title}</TableCell>
                          <TableCell>{job.department}</TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>{job.type}</TableCell>
                          <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
                          <TableCell>{job.applicants}</TableCell>
                          <TableCell>
                            <Badge
                              className={`${
                                job.status === "open"
                                  ? "bg-green-100 text-green-800"
                                  : job.status === "closed"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleSelectJob(job.id)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="candidates" className="space-y-4">
            {selectedJob && (
              <>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-lg">{selectedJob.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                    <div>Department: {selectedJob.department}</div>
                    <div>Location: {selectedJob.location}</div>
                    <div>Type: {selectedJob.type}</div>
                    <div>Total Applicants: {selectedJob.applicants}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Select value={selectedStage} onValueChange={setSelectedStage}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stages</SelectItem>
                      <SelectItem value="screening">Screening</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="offer">Offer</SelectItem>
                      <SelectItem value="hired">Hired</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsAddCandidateModalOpen(true)}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Candidate
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Applied Date</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Stage</TableHead>
                          <TableHead className="w-[150px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {candidates.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                              No candidates found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          candidates.map((candidate) => (
                            <TableRow key={candidate.id}>
                              <TableCell className="font-medium">{candidate.name}</TableCell>
                              <TableCell>{candidate.email}</TableCell>
                              <TableCell>{new Date(candidate.appliedDate).toLocaleDateString()}</TableCell>
                              <TableCell>{candidate.source}</TableCell>
                              <TableCell>
                                {renderStageBadge(candidate.stage)}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                  >
                                    <FileText size={14} />
                                    <span className="sr-only">View Resume</span>
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                  >
                                    <Calendar size={14} />
                                    <span className="sr-only">Schedule Interview</span>
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleSendOffer(candidate.id)}
                                  >
                                    <Mail size={14} />
                                    <span className="sr-only">Send Offer</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <JobPostModal 
        open={isJobPostModalOpen} 
        onOpenChange={setIsJobPostModalOpen} 
      />
      
      {selectedJob && (
        <AddCandidateModal 
          open={isAddCandidateModalOpen} 
          onOpenChange={setIsAddCandidateModalOpen}
          jobId={selectedJob.id}
          jobTitle={selectedJob.title}
        />
      )}
    </MainLayout>
  );
};

export default Recruitment;
