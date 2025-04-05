"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ArrowLeft } from "lucide-react"
import { getDocument, updateDocument } from "@/lib/firebase"

export function PatientDetails({ patientId }) {
  const [patient, setPatient] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    therapyLevel: "",
    notes: "",
    status: "",
  })

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientData = await getDocument("patients", patientId)
        if (patientData) {
          setPatient(patientData)
          setFormData({
            name: patientData.name || "",
            email: patientData.email || "",
            age: patientData.age?.toString() || "",
            therapyLevel: patientData.therapyLevel || "mild",
            notes: patientData.notes || "",
            status: patientData.status || "active",
          })
        }
      } catch (error) {
        console.error("Error fetching patient:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load patient details.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPatient()
  }, [patientId, toast])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Update patient document in Firestore
      await updateDocument("patients", patientId, {
        name: formData.name,
        email: formData.email,
        age: Number.parseInt(formData.age),
        therapyLevel: formData.therapyLevel,
        notes: formData.notes,
        status: formData.status,
      })

      toast({
        title: "Patient updated",
        description: "Patient details have been successfully updated.",
      })

      // Refresh patient data
      const updatedPatient = await getDocument("patients", patientId)
      setPatient(updatedPatient)
    } catch (error) {
      console.error("Error updating patient:", error)

      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message || "There was a problem updating the patient details.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <p className="text-lg">Patient not found</p>
        <Button onClick={() => router.push("/doctor/patients")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Patients
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={() => router.push("/doctor/patients")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Patient Details</h2>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="therapy">Therapy</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>View and update basic patient information</CardDescription>
            </CardHeader>
            <CardContent>
              <form id="patient-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" required value={formData.name} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
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
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.push("/doctor/patients")}>
                Cancel
              </Button>
              <Button type="submit" form="patient-form" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="therapy">
          <Card>
            <CardHeader>
              <CardTitle>Therapy Settings</CardTitle>
              <CardDescription>Manage therapy level and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
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

                <div className="space-y-2">
                  <Label htmlFor="notes">Therapy Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Add notes about the patient's therapy requirements"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.push("/doctor/patients")}>
                Cancel
              </Button>
              <Button type="submit" form="patient-form" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointments</CardTitle>
              <CardDescription>Manage upcoming and past appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Appointment management will be implemented in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Notes</CardTitle>
              <CardDescription>Manage clinical notes and observations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Clinical notes management will be implemented in a future update.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

