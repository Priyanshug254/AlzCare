// Import the Firebase SDK
import { initializeApp, getApps } from "firebase/app"
import {
  getAuth,
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseSignUp,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth"
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  addDoc,
} from "firebase/firestore"

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getFirestore(app)

// Auth functions
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await firebaseSignIn(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error) {
    let message = "Something went wrong. Please try again."

    switch (error.code) {
      case "auth/user-not-found":
        message = "User does not exist."
        break
      case "auth/wrong-password":
        message = "Invalid password."
        break
      case "auth/invalid-email":
        message = "Invalid email format."
        break
      default:
        message = error.message
    }

    return { success: false, error: message }
  }
}


export const createUserWithEmailAndPassword = async (email, password, userData) => {
  const userCredential = await firebaseSignUp(auth, email, password)

  // Update the user profile with additional data
  if (userData?.displayName) {
    await updateProfile(userCredential.user, {
      displayName: userData.displayName,
    })
  }

  // Store additional user data in Firestore
  await setDoc(doc(db, "users", userCredential.user.uid), {
    email: userCredential.user.email,
    displayName: userData?.displayName || email.split("@")[0],
    role: userData?.role || "patient",
    subscription: userData?.subscription || "free",
    createdAt: serverTimestamp(),
    ...userData,
  })

  return userCredential
}

export const signOut = async () => {
  return firebaseSignOut(auth)
}

// Firestore functions
export const addDocument = async (collectionName, data) => {
  return addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  })
}

export const setDocument = async (collectionName, id, data) => {
  return setDoc(
    doc(db, collectionName, id),
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
}

export const getDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  } else {
    return null
  }
}

export const updateDocument = async (collectionName, id, data) => {
  const docRef = doc(db, collectionName, id)
  return updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export const deleteDocument = async (collectionName, id) => {
  const docRef = doc(db, collectionName, id)
  return deleteDoc(docRef)
}

export const queryDocuments = async (collectionName, conditions = []) => {
  let q = collection(db, collectionName)

  if (conditions.length > 0) {
    conditions.forEach((condition) => {
      q = query(q, where(condition.field, condition.operator, condition.value))
    })
  }

  const querySnapshot = await getDocs(q)
  const results = []

  querySnapshot.forEach((doc) => {
    results.push({ id: doc.id, ...doc.data() })
  })

  return results
}

// Export Firebase instances
export { app, auth, db }

