"use client"

import { useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
} from "@/components/ui/sidebar"
import {
  Brain,
  LayoutDashboard,
  Activity,
  MessageSquare,
  Users,
  FileText,
  Settings,
  LogOut,
  User,
  Crown,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { signOut } from "@/lib/firebase"
import { Badge } from "@/components/ui/badge"

export function PatientLayout({ children }) {
  const pathname = usePathname()
  const { toast } = useToast()
  const router = useRouter()
  const { user, userData, isLoading } = useAuth()

  // Redirect if not authenticated or not a patient
  useEffect(() => {
    if (!isLoading && (!user || userData?.role !== "patient")) {
      router.push("/login")
    }
  }, [user, userData, isLoading, router])

  const handleLogout = async () => {
    try {
      await signOut()
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "There was a problem logging out.",
      })
    }
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/patient/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Therapy Activities",
      href: "/patient/activities",
      icon: Activity,
    },
    {
      title: "AI Assistant",
      href: "/patient/assistant",
      icon: MessageSquare,
      premium: true,
    },
    {
      title: "Community",
      href: "/patient/community",
      icon: Users,
    },
    {
      title: "Reports",
      href: "/patient/reports",
      icon: FileText,
    },
    {
      title: "Settings",
      href: "/patient/settings",
      icon: Settings,
    },
  ]

  // Show loading state or redirect if not authenticated
  if (isLoading || !user || userData?.role !== "patient") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">AlzCare</span>
              {userData?.subscription === "premium" && (
                <Badge variant="outline" className="ml-auto bg-yellow-100 text-yellow-800 border-yellow-300">
                  <Crown className="h-3 w-3 mr-1 text-yellow-600" />
                  Premium
                </Badge>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        disabled={item.premium && userData?.subscription !== "premium"}
                      >
                        <Link href={item.href}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                          {item.premium && userData?.subscription !== "premium" && (
                            <Crown className="ml-auto h-4 w-4 text-muted-foreground" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <div>
                  <p className="text-sm font-medium">{userData?.displayName || user.email}</p>
                  <p className="text-xs text-muted-foreground">
                    {userData?.subscription === "premium" ? "Premium User" : "Free User"}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Patient Portal</h1>
              </div>
            </header>
            <main className="flex-1 p-6">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

