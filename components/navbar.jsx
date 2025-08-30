"use client"

import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!auth || typeof auth.onAuthStateChanged !== "function") {
      setUser(null)
      return
    }
    const unsub = auth.onAuthStateChanged(setUser)
    return () => unsub && unsub()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div aria-hidden className="h-7 w-7 rounded-md bg-primary" />
          <span className="font-semibold text-foreground text-pretty">Green Hydrogen Mapping</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a href="/dashboard" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            Dashboard
          </a>
          <a href="/dashboard" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            Maps
          </a>
          <a href="/dashboard" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            Data Insights
          </a>
          <a href="/dashboard" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
            Settings
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-muted-foreground">{user.email}</span>
              <button
                onClick={() => signOut(auth)}
                className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm hover:opacity-90 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/dashboard"
                className="hidden sm:inline rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                View Demo
              </a>
              <a
                href="/auth"
                className="rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm hover:opacity-90 transition-colors"
              >
                Login / Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
