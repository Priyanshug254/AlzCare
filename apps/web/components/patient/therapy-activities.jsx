"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Puzzle, ImageIcon, Music, ArrowRight, Clock } from "lucide-react"
import path from "path"

export function TherapyActivities() {
  // Mock data for therapy activities
  const activities = [
    {
      id: "1",
      title: "Memory Matching",
      description: "Match pairs of cards to improve short-term memory",
      icon: Brain,
      progress: 75,
      category: "Memory",
      duration: "10 min",
      path: "/games/memorymatching",
    },
    {
      id: "2",
      title: "Word Puzzles",
      description: "Complete word puzzles to enhance language skills",
      icon: Puzzle,
      progress: 40,
      category: "Language",
      duration: "15 min",
      path: "/games/wordpuzzle"
    },
    {
      id: "3",
      title: "Visual Recognition",
      description: "Identify and categorize images to strengthen visual processing",
      icon: ImageIcon,
      progress: 90,
      category: "Visual",
      path: "/games/visualrecogination",
      duration: "8 min",
    },
    {
      id: "4",
      title: "Music Therapy",
      description: "Listen and respond to music to stimulate cognitive functions",
      icon: Music,
      progress: 20,
      category: "Auditory",
      duration: "12 min",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center space-x-4 rounded-lg border p-4 transition-all hover:bg-muted/50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <activity.icon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{activity.title}</h3>
              <Badge variant="outline">{activity.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {activity.duration}
              </div>
              <div className="flex items-center gap-2">
                <Progress value={activity.progress} className="h-2 w-20" />
                <span className="text-xs text-muted-foreground">{activity.progress}%</span>
              </div>
            </div>
          </div>
          <Link href={activity.path || `/patient/activities/${activity.id}`}>
  <Button variant="ghost" size="icon">
    <ArrowRight className="h-4 w-4" />
  </Button>
</Link>

        </div>
      ))}
    </div>
  )
}

