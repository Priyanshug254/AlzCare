"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Activity, Calendar, Clock, ArrowUpRight, ArrowDownRight, UserPlus } from "lucide-react"
import { PatientList } from "@/components/doctor/patient-list"
import { RecentActivities } from "@/components/doctor/recent-activities"

export function DoctorDashboard() {
  // Mock data for dashboard
  const stats = [
    {
      title: "Total Patients",
      value: "42",
      icon: Users,
      change: "+12%",
      changeDirection: "up",
    },
    {
      title: "Active Therapy Sessions",
      value: "28",
      icon: Activity,
      change: "+5%",
      changeDirection: "up",
    },
    {
      title: "Upcoming Appointments",
      value: "8",
      icon: Calendar,
      change: "-3%",
      changeDirection: "down",
    },
    {
      title: "Avg. Session Duration",
      value: "32m",
      icon: Clock,
      change: "+2%",
      changeDirection: "up",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Link href="/doctor/patients/new">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stat.changeDirection === "up" ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={stat.changeDirection === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="patients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patients">Recent Patients</TabsTrigger>
          <TabsTrigger value="activities">Recent Activities</TabsTrigger>
        </TabsList>
        <TabsContent value="patients" className="space-y-4">
          <PatientList />
        </TabsContent>
        <TabsContent value="activities" className="space-y-4">
          <RecentActivities />
        </TabsContent>
      </Tabs>
    </div>
  )
}

