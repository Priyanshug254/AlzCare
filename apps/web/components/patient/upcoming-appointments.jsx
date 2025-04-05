"use client"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, Phone } from "lucide-react"

export function UpcomingAppointments() {
  // Mock data for appointments
  const appointments = [
    {
      id: "1",
      doctor: "Dr. Sarah Johnson",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "video",
    },
    {
      id: "2",
      doctor: "Dr. Sarah Johnson",
      date: "May 15, 2025",
      time: "2:30 PM",
      type: "video",
    },
    {
      id: "3",
      doctor: "Dr. Michael Chen",
      date: "May 22, 2025",
      time: "11:15 AM",
      type: "phone",
    },
  ]

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center space-x-4 rounded-lg border p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            {appointment.type === "video" ? (
              <Video className="h-6 w-6 text-primary" />
            ) : (
              <Phone className="h-6 w-6 text-primary" />
            )}
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-medium">{appointment.doctor}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              <span className="mr-3">{appointment.date}</span>
              <Clock className="mr-1 h-3 w-3" />
              <span>{appointment.time}</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            {appointment.type === "video" ? "Join" : "Call"}
          </Button>
        </div>
      ))}
    </div>
  )
}

