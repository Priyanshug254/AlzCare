"use client"
import { useEffect } from "react"
import { collection, addDoc, getDocs } from "firebase/firestore"
import { db } from "@/lib/firestore"

export default function FirestoreTestPage() {
  useEffect(() => {
    const testFirestore = async () => {
      try {
        // Add a test document
        await addDoc(collection(db, "test"), {
          message: "Hello from Firestore!",
          timestamp: new Date(),
        })

        // Read documents
        const snapshot = await getDocs(collection(db, "test"))
        snapshot.forEach(doc => {
          console.log("Doc:", doc.id, doc.data())
        })

        alert("Firestore test passed — check console 🔥")
      } catch (error) {
        console.error("Firestore error:", error)
        alert("Firestore error — check console")
      }
    }

    testFirestore()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Firestore Test Page</h1>
      <p>Check console for Firestore results!</p>
    </div>
  )
}
