import { AddPatientForm } from "@/components/doctor/add-patient-form"
import { DoctorLayout } from "@/components/doctor/doctor-layout"

export default function AddPatientPage() {
  return (
    <DoctorLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Add New Patient</h2>
          <p className="text-muted-foreground">Register a new patient and assign their initial therapy level.</p>
        </div>

        <AddPatientForm />
      </div>
    </DoctorLayout>
  )
}

