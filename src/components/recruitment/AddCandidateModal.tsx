
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schema for searching existing candidates
const searchSchema = z.object({
  searchQuery: z.string().optional(),
});

// Schema for adding a new candidate
const newCandidateSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  source: z.string().min(1, "Source is required"),
  resume: z.any().optional(), // In a real app, handle file upload properly
});

type SearchFormValues = z.infer<typeof searchSchema>;
type NewCandidateFormValues = z.infer<typeof newCandidateSchema>;

type Candidate = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: string;
};

type AddCandidateModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  jobTitle: string;
};

const AddCandidateModal = ({ 
  open, 
  onOpenChange, 
  jobId, 
  jobTitle 
}: AddCandidateModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("search");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  
  // Mock data for existing candidates - in a real app, fetch from API
  const existingCandidates: Candidate[] = [
    { id: "1", name: "Alex Johnson", email: "alex@example.com", phone: "123-456-7890", source: "LinkedIn" },
    { id: "2", name: "Jamie Smith", email: "jamie@example.com", phone: "234-567-8901", source: "Indeed" },
    { id: "3", name: "Taylor Wilson", email: "taylor@example.com", phone: "345-678-9012", source: "Referral" },
    { id: "4", name: "Casey Brown", email: "casey@example.com", phone: "456-789-0123", source: "Direct" },
    { id: "5", name: "Jordan Lee", email: "jordan@example.com", phone: "567-890-1234", source: "Career Fair" },
  ];

  // Form for searching existing candidates
  const searchForm = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  // Form for adding a new candidate
  const newCandidateForm = useForm<NewCandidateFormValues>({
    resolver: zodResolver(newCandidateSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      source: "",
    },
  });

  // Filter candidates based on search query
  const [searchQuery, setSearchQuery] = useState("");
  const filteredCandidates = existingCandidates.filter(candidate => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(query) ||
      candidate.email.toLowerCase().includes(query)
    );
  });

  // Toggle candidate selection
  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates(prev => {
      if (prev.includes(candidateId)) {
        return prev.filter(id => id !== candidateId);
      } else {
        return [...prev, candidateId];
      }
    });
  };

  // Handle search form submission
  const onSearchSubmit = (data: SearchFormValues) => {
    setSearchQuery(data.searchQuery || "");
  };

  // Handle new candidate form submission
  const onNewCandidateSubmit = async (data: NewCandidateFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Here you would call your API to add a new candidate
      // const response = await fetch("/api/candidates", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ ...data, jobId }),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Candidate added successfully",
        description: `${data.name} has been added to "${jobTitle}".`,
      });
      
      newCandidateForm.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add candidate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle adding selected candidates to the job
  const addSelectedCandidates = async () => {
    if (selectedCandidates.length === 0) {
      toast({
        title: "No candidates selected",
        description: "Please select at least one candidate.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would call your API to add candidates to the job
      // const response = await fetch(`/api/jobs/${jobId}/candidates`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ candidateIds: selectedCandidates }),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const candidateCount = selectedCandidates.length;
      const candidateText = candidateCount === 1 ? "candidate" : "candidates";
      
      toast({
        title: "Candidates added to pipeline",
        description: `${candidateCount} ${candidateText} added to "${jobTitle}".`,
      });
      
      setSelectedCandidates([]);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add candidates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Candidate to {jobTitle}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="search" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="search">Search Candidates</TabsTrigger>
            <TabsTrigger value="new">Add New Candidate</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="space-y-4">
            <Form {...searchForm}>
              <form onSubmit={searchForm.handleSubmit(onSearchSubmit)} className="space-y-4">
                <div className="flex items-center gap-2">
                  <FormField
                    control={searchForm.control}
                    name="searchQuery"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Search candidates by name or email" 
                              className="pl-10"
                              onChange={(e) => {
                                field.onChange(e);
                                setSearchQuery(e.target.value);
                              }}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
            
            <div className="border rounded-md">
              <ScrollArea className="h-[300px]">
                <div className="p-4">
                  {filteredCandidates.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No candidates found matching your search.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredCandidates.map((candidate) => (
                        <div 
                          key={candidate.id}
                          className={`p-3 border rounded-md flex items-center justify-between cursor-pointer hover:bg-gray-50 ${
                            selectedCandidates.includes(candidate.id) ? "bg-blue-50 border-blue-200" : ""
                          }`}
                          onClick={() => toggleCandidateSelection(candidate.id)}
                        >
                          <div className="flex flex-col">
                            <div className="font-medium">{candidate.name}</div>
                            <div className="text-sm text-muted-foreground">{candidate.email}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Source: {candidate.source} {candidate.phone ? `• Phone: ${candidate.phone}` : ""}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              selectedCandidates.includes(candidate.id) 
                                ? "bg-blue-500 border-blue-500" 
                                : "border-gray-300"
                            }`}>
                              {selectedCandidates.includes(candidate.id) && (
                                <Check size={14} className="text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
            
            {selectedCandidates.length > 0 && (
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <div>
                  <span className="font-medium">{selectedCandidates.length}</span> candidate(s) selected
                </div>
                <Button 
                  type="button"
                  disabled={isSubmitting}
                  onClick={addSelectedCandidates}
                >
                  {isSubmitting ? "Adding..." : "Add to Pipeline"}
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="new">
            <Form {...newCandidateForm}>
              <form onSubmit={newCandidateForm.handleSubmit(onNewCandidateSubmit)} className="space-y-4">
                <FormField
                  control={newCandidateForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. John Smith" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={newCandidateForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="e.g. john.smith@example.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={newCandidateForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g. 123-456-7890" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={newCandidateForm.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Where did you find this candidate?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                          <SelectItem value="Indeed">Indeed</SelectItem>
                          <SelectItem value="Referral">Referral</SelectItem>
                          <SelectItem value="Direct Application">Direct Application</SelectItem>
                          <SelectItem value="Career Fair">Career Fair</SelectItem>
                          <SelectItem value="Agency">Agency</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={newCandidateForm.control}
                  name="resume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="file" 
                          accept=".pdf,.doc,.docx" 
                          onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter className="pt-4">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Candidate"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddCandidateModal;
