import { PatientListPage } from "@/components/doctor/patient-list-page"
import { DoctorLayout } from "@/components/doctor/doctor-layout"

export default function PatientsPage() {
  return (
    <DoctorLayout>
      <PatientListPage />
    </DoctorLayout>
  )
}

