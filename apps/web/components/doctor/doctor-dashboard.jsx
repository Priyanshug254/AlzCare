"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Users,
  Activity,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
} from "lucide-react"
import { PatientList } from "@/components/doctor/patient-list"
import { RecentActivities } from "@/components/doctor/recent-activities"

// Import Firestore services
import { db } from "@/lib/firebase" // Import Firestore configuration
import { collection, getDocs } from "firebase/firestore"

export function DoctorDashboard() {
  const [patients, setPatients] = useState([]) // State to store fetched patients
  const [stats, setStats] = useState([
    {
      title: "Total Patients",
      value: "0", // Will be updated with real data
      icon: Users,
      change: "+0%",
      changeDirection: "up",
    },
    {
      title: "Active Therapy Sessions",
      value: "0", // Placeholder value
      icon: Activity,
      change: "+0%",
      changeDirection: "up",
    },
    {
      title: "Upcoming Appointments",
      value: "0", // Placeholder value
      icon: Calendar,
      change: "-0%",
      changeDirection: "down",
    },
    {
      title: "Avg. Session Duration",
      value: "0m", // Placeholder value
      icon: Clock,
      change: "+0%",
      changeDirection: "up",
    },
  ])

  // Fetch users (patients) from Firebase Firestore
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Query Firestore for the users collection
        const patientsRef = collection(db, "users") // Updated to use "users" collection
        const snapshot = await getDocs(patientsRef)

        if (snapshot.empty) {
          console.log("No patients found in Firestore.")
          return
        }

        // Map the data from Firestore documents to an array and filter by role 'patient'
        const patientsList = snapshot.docs
          .map(doc => {
            const data = doc.data()
            const createdAt = data.createdAt ? data.createdAt.toDate().toLocaleString() : "N/A" // Check if createdAt exists

            console.log("Fetched data:", data) // Log the data for debugging

            return {
              id: doc.id, // Including the document ID for debugging if needed
              name: data.displayName, // Using displayName instead of name
              email: data.email,
              role: data.role,
              subscription: data.subscription,
              createdAt: createdAt, // Handle undefined or missing createdAt gracefully
            }
          })
          .filter(patient => patient.role === "patient") // Filter out non-patient users

        console.log("Patients list:", patientsList) // Log the final patients list

        setPatients(patientsList) // Set the fetched patients in the state

        // Update stats with the real patient count
        setStats(prevStats => [
          {
            ...prevStats[0],
            value: patientsList.length.toString(),
          },
          // Add logic for active therapy sessions, etc.
        ])
      } catch (error) {
        console.error("Error fetching patients from Firestore:", error)
      }
    }

    fetchPatients()
  }, [])

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Welcome back, Doctor
          </h2>
          <p className="text-sm text-muted-foreground">
            Here's a quick overview of your activity.
          </p>
        </div>
        <Link href="/doctor/patients/new">
          <Button size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Patient
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="mt-1 flex items-center text-xs text-muted-foreground">
                {stat.changeDirection === "up" ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span
                  className={stat.changeDirection === "up" ? "text-green-500" : "text-red-500"}
                >
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="patients" className="space-y-4">
      <TabsList className="w-full md:w-auto">
  <TabsTrigger value="patients" className="mr-2">Recent Patients</TabsTrigger>
  <TabsTrigger value="activities">Recent Activities</TabsTrigger>
</TabsList>

        <TabsContent value="patients">
          <PatientList patients={ patients } /> {/* Pass real patients data to PatientList */}
        </TabsContent>
        <TabsContent value="activities">
          <RecentActivities />
        </TabsContent>
      </Tabs>
    </div>
  )
}
