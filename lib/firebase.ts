// // Simple storage abstraction that works reliably
// const isBrowser = typeof window !== "undefined"

// export interface CanvasState {
//   canvasData: any
//   updatedAt: string
//   createdAt: string
// }

// // LocalStorage implementation (always works)
// const STORAGE_PREFIX = "canvas_editor_"

// function saveToLocalStorage(sceneId: string, canvasData: any): void {
//   if (!isBrowser) return

//   try {
//     const now = new Date().toISOString()
//     const existingCreated = localStorage.getItem(`${STORAGE_PREFIX}${sceneId}_created`)

//     const data = {
//       canvasData,
//       updatedAt: now,
//       createdAt: existingCreated || now,
//     }

//     localStorage.setItem(`${STORAGE_PREFIX}${sceneId}`, JSON.stringify(data))
//     if (!existingCreated) {
//       localStorage.setItem(`${STORAGE_PREFIX}${sceneId}_created`, now)
//     }

//     console.log("Canvas saved to localStorage:", sceneId)
//   } catch (error) {
//     console.error("Failed to save to localStorage:", error)
//     throw error
//   }
// }

// function loadFromLocalStorage(sceneId: string): any | null {
//   if (!isBrowser) return null

//   try {
//     const stored = localStorage.getItem(`${STORAGE_PREFIX}${sceneId}`)
//     if (stored) {
//       const data = JSON.parse(stored)
//       console.log("Canvas loaded from localStorage:", sceneId)
//       return data.canvasData
//     }
//     return null
//   } catch (error) {
//     console.error("Failed to load from localStorage:", error)
//     return null
//   }
// }

// // Firebase configuration check (without initialization)
// const hasFirebaseConfig = !!(
//   process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
//   process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
//   process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
//   process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET &&
//   process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID &&
//   process.env.NEXT_PUBLIC_FIREBASE_APP_ID
// )

// // Firebase implementation (lazy loaded)
// let firebaseInitialized = false
// let db: any = null
// let isFirebaseAvailable = false

// async function initializeFirebase() {
//   if (firebaseInitialized) return { db, isFirebaseAvailable }

//   firebaseInitialized = true

//   if (!isBrowser || !hasFirebaseConfig) {
//     console.log("Firebase not available - missing config or not in browser")
//     return { db: null, isFirebaseAvailable: false }
//   }

//   try {
//     // Dynamic imports to avoid loading Firebase if not needed
//     const { initializeApp, getApps, getApp } = await import("firebase/app")
//     const { getFirestore, doc, setDoc, getDoc, serverTimestamp } = await import("firebase/firestore")

//     const firebaseConfig = {
//       apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//       authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//       projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//       storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//       messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//       appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//     }

//     const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
//     db = getFirestore(app)
//     isFirebaseAvailable = true

//     console.log("Firebase initialized successfully")
//     return { db, isFirebaseAvailable: true }
//   } catch (error) {
//     console.error("Firebase initialization failed:", error)
//     return { db: null, isFirebaseAvailable: false }
//   }
// }

// // Save canvas state
// export async function saveCanvasState(sceneId: string, canvasData: any): Promise<void> {
//   // Try Firebase first if config is available
//   if (hasFirebaseConfig) {
//     try {
//       const { db: firebaseDb, isFirebaseAvailable: fbAvailable } = await initializeFirebase()

//       if (fbAvailable && firebaseDb) {
//         const { doc, setDoc, getDoc, serverTimestamp } = await import("firebase/firestore")

//         const docRef = doc(firebaseDb, "canvases", sceneId)
//         const existingDoc = await getDoc(docRef)

//         const data: any = {
//           canvasData,
//           updatedAt: serverTimestamp(),
//         }

//         if (!existingDoc.exists()) {
//           data.createdAt = serverTimestamp()
//         }

//         await setDoc(docRef, data, { merge: true })
//         console.log("Canvas saved to Firebase:", sceneId)
//         return
//       }
//     } catch (error) {
//       console.warn("Firebase save failed, falling back to localStorage:", error)
//     }
//   }

//   // Fallback to localStorage
//   saveToLocalStorage(sceneId, canvasData)
// }

// // Load canvas state
// export async function loadCanvasState(sceneId: string): Promise<any | null> {
//   // Try Firebase first if config is available
//   if (hasFirebaseConfig) {
//     try {
//       const { db: firebaseDb, isFirebaseAvailable: fbAvailable } = await initializeFirebase()

//       if (fbAvailable && firebaseDb) {
//         const { doc, getDoc } = await import("firebase/firestore")

//         const docRef = doc(firebaseDb, "canvases", sceneId)
//         const docSnap = await getDoc(docRef)

//         if (docSnap.exists()) {
//           const data = docSnap.data() as CanvasState
//           console.log("Canvas loaded from Firebase:", sceneId)
//           return data.canvasData
//         }
//       }
//     } catch (error) {
//       console.warn("Firebase load failed, falling back to localStorage:", error)
//     }
//   }

//   // Fallback to localStorage
//   return loadFromLocalStorage(sceneId)
// }

// // Get current storage status
// export async function getStorageStatus(): Promise<"firebase" | "local" | "error"> {
//   if (!hasFirebaseConfig) {
//     return "local"
//   }

//   try {
//     const { isFirebaseAvailable: fbAvailable } = await initializeFirebase()
//     return fbAvailable ? "firebase" : "error"
//   } catch (error) {
//     return "error"
//   }
// }

// // Export configuration status
// export { hasFirebaseConfig as isFirebaseConfigured }
 


import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"

export interface CanvasState {
  canvasData: any
  updatedAt: any
  createdAt: any
}

// ✅ Firebase Config via ENV Variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// ✅ Check Firebase availability
const isFirebaseAvailable =
  !!firebaseConfig.apiKey &&
  !!firebaseConfig.authDomain &&
  !!firebaseConfig.projectId &&
  !!firebaseConfig.storageBucket &&
  !!firebaseConfig.messagingSenderId &&
  !!firebaseConfig.appId

// ✅ Initialize app and DB
const app = isFirebaseAvailable ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null
const db = isFirebaseAvailable && app ? getFirestore(app) : null

// ✅ LocalStorage fallback
const STORAGE_PREFIX = "canvas_editor_"

function saveToLocalStorage(sceneId: string, canvasData: any): void {
  try {
    const created = localStorage.getItem(`${STORAGE_PREFIX}${sceneId}_created`) || new Date().toISOString()
    const data = {
      canvasData,
      updatedAt: new Date().toISOString(),
      createdAt: created,
    }
    localStorage.setItem(`${STORAGE_PREFIX}${sceneId}`, JSON.stringify(data))
    localStorage.setItem(`${STORAGE_PREFIX}${sceneId}_created`, created)
  } catch (error) {
    console.error("LocalStorage save error:", error)
  }
}

function loadFromLocalStorage(sceneId: string): any | null {
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${sceneId}`)
    return stored ? JSON.parse(stored).canvasData : null
  } catch (error) {
    console.error("LocalStorage load error:", error)
    return null
  }
}

// ✅ Save canvas (Firebase or local)
export async function saveCanvasState(sceneId: string, canvasData: any): Promise<void> {
  if (isFirebaseAvailable && db) {
    try {
      const docRef = doc(db, "canvases", sceneId)
      const existingDoc = await getDoc(docRef)

      const data: Partial<CanvasState> = {
        canvasData,
        updatedAt: serverTimestamp(),
      }

      if (!existingDoc.exists()) {
        data.createdAt = serverTimestamp()
      }

      await setDoc(docRef, data, { merge: true })
      return
    } catch (error) {
      console.warn("Firebase save failed, using localStorage fallback:", error)
    }
  }

  saveToLocalStorage(sceneId, canvasData)
}

// ✅ Load canvas (Firebase or local)
export async function loadCanvasState(sceneId: string): Promise<any | null> {
  if (isFirebaseAvailable && db) {
    try {
      const docRef = doc(db, "canvases", sceneId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data() as CanvasState
        return data.canvasData
      }
    } catch (error) {
      console.warn("Firebase load failed, using localStorage fallback:", error)
    }
  }

  return loadFromLocalStorage(sceneId)
}

export { db, isFirebaseAvailable }
