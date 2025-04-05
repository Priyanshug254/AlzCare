"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Activity, Brain, Calendar, Trophy, ArrowRight, MessageSquare, Crown } from "lucide-react"
import { TherapyActivities } from "@/components/patient/therapy-activities"
import { UpcomingAppointments } from "@/components/patient/upcoming-appointments"

export function PatientDashboard() {
  const [user, setUser] = useState({
    name: "Eleanor Davis",
    subscription: "premium",
    therapyLevel: "Moderate",
    progress: 68,
    streak: 7,
    nextAppointment: "Tomorrow, 10:00 AM",
    completedActivities: 24,
    totalActivities: 30,
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}</h2>
        <p className="text-muted-foreground">Here's an overview of your therapy progress and upcoming activities.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Therapy Level</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.therapyLevel}</div>
            <p className="text-xs text-muted-foreground mt-1">Assigned by your doctor</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.progress}%</div>
            <Progress value={user.progress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity Streak</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.streak} days</div>
            <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.nextAppointment}</div>
            <p className="text-xs text-muted-foreground mt-1">With Dr. Sarah Johnson</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Therapy Activities</CardTitle>
            <CardDescription>
              You've completed {user.completedActivities} of {user.totalActivities} activities this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TherapyActivities />
          </CardContent>
          <CardFooter>
            <Link href="/patient/activities">
              <Button variant="outline" className="w-full">
                View All Activities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled sessions with your doctor</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingAppointments />
          </CardContent>
        </Card>
      </div>

      {user.subscription === "premium" && (
        <Card className="bg-gradient-to-r from-amber-50 to-yellow-100 border-yellow-200">
          <CardHeader>
            <div className="flex items-center">
              <Crown className="h-5 w-5 text-yellow-600 mr-2" />
              <CardTitle className="text-yellow-800">Premium Features</CardTitle>
            </div>
            <CardDescription className="text-yellow-700">
              Exclusive features available with your premium subscription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start space-x-3">
                <MessageSquare className="h-10 w-10 text-yellow-600" />
                <div>
                  <h3 className="font-medium text-yellow-800">AI Assistant</h3>
                  <p className="text-sm text-yellow-700">Get 24/7 support from our specialized AI chatbot</p>
                  <Link href="/patient/assistant">
                    <Button variant="link" className="px-0 text-yellow-800">
                      Chat Now <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Brain className="h-10 w-10 text-yellow-600" />
                <div>
                  <h3 className="font-medium text-yellow-800">Advanced Therapy Games</h3>
                  <p className="text-sm text-yellow-700">Access to our full library of cognitive therapy games</p>
                  <Link href="/patient/activities">
                    <Button variant="link" className="px-0 text-yellow-800">
                      Play Now <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

