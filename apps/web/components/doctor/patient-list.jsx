"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, FileEdit, LineChart, MessageSquare } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function PatientList() {
  // Mock data for patients
  const patients = [
    {
      id: "1",
      name: "Eleanor Davis",
      age: 72,
      therapyLevel: "Moderate",
      lastActivity: "2 hours ago",
      status: "active",
    },
    {
      id: "2",
      name: "Robert Johnson",
      age: 68,
      therapyLevel: "Mild",
      lastActivity: "1 day ago",
      status: "active",
    },
    {
      id: "3",
      name: "Maria Garcia",
      age: 75,
      therapyLevel: "Advanced",
      lastActivity: "3 days ago",
      status: "inactive",
    },
    {
      id: "4",
      name: "James Wilson",
      age: 70,
      therapyLevel: "Moderate",
      lastActivity: "5 hours ago",
      status: "active",
    },
    {
      id: "5",
      name: "Patricia Brown",
      age: 65,
      therapyLevel: "Mild",
      lastActivity: "2 days ago",
      status: "inactive",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Therapy Level</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="font-medium">{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.therapyLevel}</TableCell>
              <TableCell>{patient.lastActivity}</TableCell>
              <TableCell>
                <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                  {patient.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <FileEdit className="mr-2 h-4 w-4" />
                      <span>Edit Patient</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LineChart className="mr-2 h-4 w-4" />
                      <span>View Progress</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Send Message</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

