"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, FileUp, MessageSquare, FileEdit, Activity } from "lucide-react"

export function RecentActivities() {
  // Mock data for activities
  const activities = [
    {
      id: "1",
      type: "new_patient",
      description: "Added new patient Eleanor Davis",
      timestamp: "2 hours ago",
      icon: UserPlus,
    },
    {
      id: "2",
      type: "report_generated",
      description: "Generated monthly report for Robert Johnson",
      timestamp: "5 hours ago",
      icon: FileUp,
    },
    {
      id: "3",
      type: "message",
      description: "Sent message to Maria Garcia",
      timestamp: "Yesterday at 2:30 PM",
      icon: MessageSquare,
    },
    {
      id: "4",
      type: "therapy_update",
      description: "Updated therapy level for James Wilson to Moderate",
      timestamp: "Yesterday at 10:15 AM",
      icon: FileEdit,
    },
    {
      id: "5",
      type: "session_completed",
      description: "Patricia Brown completed therapy session",
      timestamp: "2 days ago",
      icon: Activity,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Your latest actions and patient activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="mr-4 mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <activity.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.description}</p>
                <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

