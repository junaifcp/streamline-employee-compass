
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      if (user?.role === 'employee') {
        navigate('/employee/portal');
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              Welcome to <span className="text-hrms-blue">HRCompass</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your complete human resource management solution
            </p>
            <Button 
              size="lg" 
              className="bg-hrms-blue hover:bg-hrms-blue-dark text-white px-8 py-2"
              onClick={handleGetStarted}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Employee Management</h2>
                <p className="text-gray-600">
                  Efficiently manage your workforce with comprehensive employee profiles, 
                  documents, and performance tracking.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Leave & Attendance</h2>
                <p className="text-gray-600">
                  Streamline attendance tracking and leave management with automated 
                  workflows and approvals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Recruitment</h2>
                <p className="text-gray-600">
                  Simplify your hiring process with job postings, applicant tracking, 
                  and interview scheduling.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
