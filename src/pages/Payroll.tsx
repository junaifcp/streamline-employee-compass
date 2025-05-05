
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Calendar, Download, PlusCircle, Trash } from "lucide-react";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

const Payroll = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [allowances, setAllowances] = useState<Array<{id: number, name: string, amount: number}>>([
    { id: 1, name: "Housing Allowance", amount: 500 },
    { id: 2, name: "Transport Allowance", amount: 200 },
  ]);
  const [deductions, setDeductions] = useState<Array<{id: number, name: string, amount: number}>>([
    { id: 1, name: "Tax", amount: 300 },
    { id: 2, name: "Insurance", amount: 150 },
  ]);
  
  const employees = [
    { id: "1", name: "Michael Johnson" },
    { id: "2", name: "Sarah Williams" },
    { id: "3", name: "David Brown" },
    { id: "4", name: "Jessica Martinez" },
    { id: "5", name: "Robert Jones" },
  ];

  const addAllowance = () => {
    setAllowances([...allowances, { id: allowances.length + 1, name: "", amount: 0 }]);
  };

  const addDeduction = () => {
    setDeductions([...deductions, { id: deductions.length + 1, name: "", amount: 0 }]);
  };

  const removeAllowance = (id: number) => {
    setAllowances(allowances.filter(item => item.id !== id));
  };

  const removeDeduction = (id: number) => {
    setDeductions(deductions.filter(item => item.id !== id));
  };

  const updateAllowance = (id: number, field: 'name' | 'amount', value: string) => {
    setAllowances(allowances.map(item => 
      item.id === id ? { ...item, [field]: field === 'amount' ? parseFloat(value) : value } : item
    ));
  };

  const updateDeduction = (id: number, field: 'name' | 'amount', value: string) => {
    setDeductions(deductions.map(item => 
      item.id === id ? { ...item, [field]: field === 'amount' ? parseFloat(value) : value } : item
    ));
  };

  const totalAllowances = allowances.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
  const baseSalary = 5000;
  const netSalary = baseSalary + totalAllowances - totalDeductions;

  const generatePayslip = () => {
    toast({
      title: "Payslip Generated",
      description: `Payslip for ${selectedEmployee || 'selected employee'} has been generated successfully.`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Payroll Processing</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Setup Payrun</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Pay Period</Label>
                  <DatePickerWithRange date={date} setDate={setDate} />
                </div>
                
                <div className="space-y-2">
                  <Label>Select Employee</Label>
                  <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.id}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-base">Allowances</Label>
                    <Button variant="outline" size="sm" onClick={addAllowance}>
                      <PlusCircle size={16} className="mr-2" />
                      Add Allowance
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {allowances.map((item) => (
                      <div key={item.id} className="flex gap-2 items-center">
                        <Input 
                          placeholder="Allowance Name" 
                          value={item.name} 
                          onChange={(e) => updateAllowance(item.id, 'name', e.target.value)}
                          className="flex-grow"
                        />
                        <Input 
                          type="number" 
                          placeholder="Amount" 
                          value={item.amount} 
                          onChange={(e) => updateAllowance(item.id, 'amount', e.target.value)}
                          className="w-28"
                        />
                        <Button variant="ghost" size="sm" onClick={() => removeAllowance(item.id)}>
                          <Trash size={16} className="text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="text-base">Deductions</Label>
                    <Button variant="outline" size="sm" onClick={addDeduction}>
                      <PlusCircle size={16} className="mr-2" />
                      Add Deduction
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {deductions.map((item) => (
                      <div key={item.id} className="flex gap-2 items-center">
                        <Input 
                          placeholder="Deduction Name" 
                          value={item.name} 
                          onChange={(e) => updateDeduction(item.id, 'name', e.target.value)}
                          className="flex-grow"
                        />
                        <Input 
                          type="number" 
                          placeholder="Amount" 
                          value={item.amount} 
                          onChange={(e) => updateDeduction(item.id, 'amount', e.target.value)}
                          className="w-28"
                        />
                        <Button variant="ghost" size="sm" onClick={() => removeDeduction(item.id)}>
                          <Trash size={16} className="text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full" onClick={generatePayslip}>Generate Payslip</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="border-b">
              <CardTitle>Payslip Preview</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h3 className="font-semibold text-center mb-4">Salary Slip</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Employee:</span>
                      <span className="font-medium">{selectedEmployee ? employees.find(e => e.id === selectedEmployee)?.name : 'Select Employee'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Period:</span>
                      <span className="font-medium">
                        {date?.from ? date.from.toLocaleDateString() : 'N/A'} - 
                        {date?.to ? date.to.toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-b py-2 mb-2">
                    <div className="flex justify-between">
                      <span>Base Salary</span>
                      <span className="font-medium">${baseSalary.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-1 mb-2">
                    <h4 className="text-sm font-medium">Allowances</h4>
                    {allowances.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name || 'Unnamed Allowance'}</span>
                        <span>${item.amount.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-medium">
                      <span>Total Allowances</span>
                      <span>${totalAllowances.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-1 mb-2">
                    <h4 className="text-sm font-medium">Deductions</h4>
                    {deductions.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name || 'Unnamed Deduction'}</span>
                        <span>${item.amount.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-medium">
                      <span>Total Deductions</span>
                      <span>${totalDeductions.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Net Salary</span>
                      <span>${netSalary.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Download size={16} />
                  Download Payslip
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Payroll;
