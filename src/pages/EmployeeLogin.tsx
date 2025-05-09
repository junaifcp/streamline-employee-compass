
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof formSchema>;

const EmployeeLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // This would be replaced with actual API call to validate employee credentials
    console.log("Employee login attempt:", data);
    
    // Mock employee login for demo purposes
    if (data.email.includes("employee")) {
      toast({
        title: "Login successful",
        description: "Welcome to the employee portal",
      });
      navigate("/employee/portal");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid employee credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center">
        <div className="max-w-md px-8 text-white">
          <h1 className="text-4xl font-bold mb-6">Employee Portal</h1>
          <p className="text-xl mb-4">
            Welcome to the HRCompass Employee Portal
          </p>
          <p className="text-lg">
            Access your attendance records, leave requests, and personal documents in one place.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Employee Login</h2>
            <p className="text-gray-600">
              Please enter your credentials to access your employee portal
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="employee@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              HR Admin? {" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
