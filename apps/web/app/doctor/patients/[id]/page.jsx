import { PatientDetails } from "@/components/doctor/patient-details"
import { DoctorLayout } from "@/components/doctor/doctor-layout"

export default function PatientDetailsPage({ params }) {
  return (
    <DoctorLayout>
      <PatientDetails patientId={params.id} />
    </DoctorLayout>
  )
}

