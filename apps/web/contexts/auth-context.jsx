"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth, getDocument } from "@/lib/firebase"

// Create the authentication context
const AuthContext = createContext({
  user: null,
  userData: null,
  isLoading: true,
})

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Set up the Firebase Auth state observer
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true)

      if (firebaseUser) {
        setUser(firebaseUser)

        // Get additional user data from Firestore
        try {
          const userDoc = await getDocument("users", firebaseUser.uid)
          setUserData(userDoc)
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      } else {
        setUser(null)
        setUserData(null)
      }

      setIsLoading(false)
    })

    // Clean up the observer when the component unmounts
    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, userData, isLoading }}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

