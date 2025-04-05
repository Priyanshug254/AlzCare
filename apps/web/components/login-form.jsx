"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { signInWithEmailAndPassword, getDocument } from "@/lib/firebase"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const [error, setError] = useState(null)

  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
  
    const result = await signInWithEmailAndPassword(email, password)
  
    if (!result.success) {
      setError(result.error)
      return
    }
  
    const user = result.user
    const userData = await getDocument("users", user.uid)
  
    if (userData?.role === "doctor") {
      router.push("/doctor/dashboard")
    } else {
      router.push("/patient/dashboard")
    }
  }
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80">
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex items-center">
        <Checkbox id="remember-me" />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>

      <Button type="submit" className="w-full bg-blue-600 text-white" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}

    </form>
  )
}

