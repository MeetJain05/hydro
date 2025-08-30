"use client"

import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const REQUIRED_KEYS = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
]

// Determine if all envs are present
const hasAllEnv = REQUIRED_KEYS.every((k) => !!process.env[k])

// If any env is missing, run in "demo" mode with a minimal auth shim
if (!hasAllEnv) {
  console.warn("[firebase] Missing one or more Firebase env vars. Running in demo mode without authentication.")
}

// Only build config when envs exist
const firebaseConfig = hasAllEnv
  ? {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    }
  : null

// Initialize Firebase only if envs are available
let auth
if (hasAllEnv) {
  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
  auth = getAuth(app)
} else {
  // Minimal shim: just enough for components that call onAuthStateChanged
  auth = {
    onAuthStateChanged: (cb) => {
      try {
        // Immediately report "no user" in demo mode
        cb(null)
      } catch (_) {}
      return () => {}
    },
  }
}

export { auth }
