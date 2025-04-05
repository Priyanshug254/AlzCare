
import { doc, setDoc, getDoc, collection, addDoc, getDocs } from "firebase/firestore"
import { getFirestore } from "firebase/firestore"
import { app } from "./firebase"

export const db = getFirestore(app)

// Save user data (doctor or patient)
export async function saveUserData(uid, data) {
  await setDoc(doc(db, "users", uid), data)
}

// Get user data
export async function getUserData(uid) {
  const docRef = doc(db, "users", uid)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? docSnap.data() : null
}

// Add appointment
export async function addAppointment(data) {
  await addDoc(collection(db, "appointments"), data)
}

// Get all appointments
export async function getAppointments() {
  const snapshot = await getDocs(collection(db, "appointments"))
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
