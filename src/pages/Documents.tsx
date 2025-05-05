
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  File, 
  FileText, 
  FilePlus, 
  Calendar, 
  Tag, 
  Trash,
  Download,
  Upload,
  Plus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

type Document = {
  id: string;
  name: string;
  category: string;
  uploadedBy: string;
  uploadDate: string;
  expirationDate?: string;
  fileType: string;
  fileSize: string;
  tags: string[];
};

const Documents = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Mock data for documents
  const documents: Document[] = [
    {
      id: "1",
      name: "Employee Handbook 2024",
      category: "Policies",
      uploadedBy: "Sarah Williams",
      uploadDate: "2024-04-01",
      fileType: "PDF",
      fileSize: "2.4 MB",
      tags: ["handbook", "policy", "company"],
    },
    {
      id: "2",
      name: "Employment Contract Template",
      category: "Contracts",
      uploadedBy: "Robert Jones",
      uploadDate: "2024-03-15",
      fileType: "DOCX",
      fileSize: "548 KB",
      tags: ["contract", "legal", "template"],
    },
    {
      id: "3",
      name: "Health Insurance Policy",
      category: "Benefits",
      uploadedBy: "Sarah Williams",
      uploadDate: "2024-02-28",
      expirationDate: "2025-02-28",
      fileType: "PDF",
      fileSize: "1.2 MB",
      tags: ["insurance", "benefits", "policy"],
    },
    {
      id: "4",
      name: "Office Safety Guidelines",
      category: "Policies",
      uploadedBy: "Michael Johnson",
      uploadDate: "2024-01-20",
      fileType: "PDF",
      fileSize: "820 KB",
      tags: ["safety", "guideline", "office"],
    },
    {
      id: "5",
      name: "Offer Letter Template",
      category: "Templates",
      uploadedBy: "Jessica Martinez",
      uploadDate: "2024-02-10",
      fileType: "DOCX",
      fileSize: "425 KB",
      tags: ["offer", "template", "letter"],
    },
    {
      id: "6",
      name: "Non-Disclosure Agreement",
      category: "Contracts",
      uploadedBy: "David Brown",
      uploadDate: "2024-03-05",
      fileType: "PDF",
      fileSize: "365 KB",
      tags: ["nda", "legal", "contract"],
    },
    {
      id: "7",
      name: "Company Logo Pack",
      category: "Assets",
      uploadedBy: "Jessica Martinez",
      uploadDate: "2024-01-15",
      fileType: "ZIP",
      fileSize: "8.7 MB",
      tags: ["logo", "brand", "assets"],
    },
    {
      id: "8",
      name: "Business License",
      category: "Legal",
      uploadedBy: "Robert Jones",
      uploadDate: "2024-03-30",
      expirationDate: "2025-03-30",
      fileType: "PDF",
      fileSize: "1.5 MB",
      tags: ["license", "legal", "business"],
    },
  ];

  // Filter documents based on search term and active tab
  const filteredDocuments = documents.filter(doc => 
    (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (activeTab === "all" || doc.category.toLowerCase() === activeTab.toLowerCase())
  );

  // Get unique categories for tabs
  const categories = ["all", ...new Set(documents.map(doc => doc.category.toLowerCase()))];

  // Handle file drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // In a real app, we would handle the file upload here
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      console.log("Dropped files:", e.dataTransfer.files);
      toast({
        title: "File received",
        description: `${e.dataTransfer.files.length} file(s) ready for upload.`,
      });
    }
  };

  // Handle document delete
  const handleDeleteDocument = (id: string) => {
    // In a real app, we would handle the document deletion here
    toast({
      title: "Document Deleted",
      description: "The document has been successfully deleted.",
    });
  };

  // Handle document download
  const handleDownloadDocument = (id: string) => {
    // In a real app, we would handle the document download here
    toast({
      title: "Download Started",
      description: "Your document download has started.",
    });
  };

  // Handle document upload
  const handleUploadDocument = () => {
    setShowUploadDialog(false);
    // In a real app, we would handle the document upload here
    toast({
      title: "Document Uploaded",
      description: "The document has been successfully uploaded.",
    });
  };

  // File type icon helper
  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case "pdf":
        return <FileText className="text-red-500" size={24} />;
      case "docx":
      case "doc":
        return <FileText className="text-blue-500" size={24} />;
      case "xlsx":
      case "xls":
        return <FileText className="text-green-500" size={24} />;
      case "zip":
      case "rar":
        return <FileText className="text-amber-500" size={24} />;
      default:
        return <File className="text-gray-500" size={24} />;
    }
  };

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Documents & Assets</h1>
          
          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-hrms-blue hover:bg-hrms-blue-dark">
                <FilePlus size={16} />
                <span>Upload Document</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>
                  Upload a new document to the system. Drag and drop your file or click to browse.
                </DialogDescription>
              </DialogHeader>
              
              <div 
                className={`mt-4 border-2 border-dashed rounded-lg p-10 text-center ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-hrms-blue hover:text-hrms-blue-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-hrms-blue focus-within:ring-offset-2"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PDF, DOCX, XLSX or ZIP up to 10MB</p>
              </div>

              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Document Name</Label>
                  <Input id="name" placeholder="Enter document name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="policies">Policies</SelectItem>
                      <SelectItem value="contracts">Contracts</SelectItem>
                      <SelectItem value="benefits">Benefits</SelectItem>
                      <SelectItem value="templates">Templates</SelectItem>
                      <SelectItem value="assets">Assets</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="upload-date">Upload Date</Label>
                    <Input id="upload-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expiration-date">Expiration Date (Optional)</Label>
                    <Input id="expiration-date" type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="tag1, tag2, tag3" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Enter any additional notes about this document" />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUploadDocument}>Upload Document</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex overflow-x-auto pb-px">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Document</th>
                      <th className="text-left p-4 hidden md:table-cell">Category</th>
                      <th className="text-left p-4 hidden md:table-cell">Uploaded By</th>
                      <th className="text-left p-4 hidden md:table-cell">Date</th>
                      <th className="text-left p-4 hidden lg:table-cell">Tags</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center p-8 text-muted-foreground">
                          No documents found.
                        </td>
                      </tr>
                    ) : (
                      filteredDocuments.map((doc) => (
                        <tr key={doc.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {getFileIcon(doc.fileType)}
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {doc.fileType} • {doc.fileSize}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 hidden md:table-cell">
                            {doc.category}
                          </td>
                          <td className="p-4 hidden md:table-cell">
                            {doc.uploadedBy}
                          </td>
                          <td className="p-4 hidden md:table-cell">
                            <div className="flex flex-col">
                              <span className="text-sm">{formatDate(doc.uploadDate)}</span>
                              {doc.expirationDate && (
                                <span className="text-xs text-amber-600">
                                  Expires: {formatDate(doc.expirationDate)}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 hidden lg:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {doc.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleDownloadDocument(doc.id)}
                              >
                                <Download size={16} />
                                <span className="sr-only">Download</span>
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteDocument(doc.id)}
                              >
                                <Trash size={16} />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Documents;
