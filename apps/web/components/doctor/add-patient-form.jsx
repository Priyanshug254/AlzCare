"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { addDocument, createUserWithEmailAndPassword } from "@/lib/firebase"

export function AddPatientForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    therapyLevel: "mild",
    notes: "",
    generateAccount: true,
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create patient document in Firestore
      const patientData = {
        name: formData.name,
        email: formData.email,
        age: Number.parseInt(formData.age),
        therapyLevel: formData.therapyLevel,
        notes: formData.notes,
        status: "active",
        createdAt: new Date(),
      }

      const patientRef = await addDocument("patients", patientData)

      // If generateAccount is true, create a user account for the patient
      if (formData.generateAccount) {
        // Generate a temporary password
        const tempPassword = Math.random().toString(36).slice(-8)

        try {
          // Create user account
          await createUserWithEmailAndPassword(formData.email, tempPassword, {
            displayName: formData.name,
            role: "patient",
            subscription: "free",
            patientId: patientRef.id,
          })

          // In a real app, you would send an email with the temporary password
          console.log(`Temporary password for ${formData.email}: ${tempPassword}`)
        } catch (authError) {
          console.error("Error creating user account:", authError)
          // Continue even if account creation fails
          // We'll just show a warning in the toast
        }
      }

      toast({
        title: "Patient added",
        description: `${formData.name} has been successfully added to your patients.`,
      })

      router.push("/doctor/patients")
    } catch (error) {
      console.error("Error adding patient:", error)

      toast({
        variant: "destructive",
        title: "Failed to add patient",
        description: error.message || "There was a problem adding the patient.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required value={formData.name} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                required
                min="0"
                max="120"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="therapyLevel">Therapy Level</Label>
              <Select
                value={formData.therapyLevel}
                onValueChange={(value) => handleSelectChange("therapyLevel", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select therapy level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add any relevant notes about the patient's condition or therapy requirements"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="generateAccount"
              checked={formData.generateAccount}
              onChange={(e) => setFormData((prev) => ({ ...prev, generateAccount: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="generateAccount" className="text-sm font-normal">
              Generate user account for this patient
            </Label>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/doctor/patients")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Patient...
                </>
              ) : (
                "Add Patient"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

