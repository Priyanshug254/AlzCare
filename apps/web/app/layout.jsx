import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"
import Footer, { LandingFooter } from "@/components/landing-footer"
import Navbar, { LandingNavbar } from "@/components/landing-navbar"




const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AlzCare - Alzheimer's Care Platform",
  description: "A platform for doctors and patients to manage Alzheimer's care",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LandingNavbar/>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        <LandingFooter/>
      </body>
    </html>
  )
}



import './globals.css'