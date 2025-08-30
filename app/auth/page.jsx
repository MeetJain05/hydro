"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"

export default function AuthPage() {
  const [mode, setMode] = useState("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (u) router.replace("/dashboard")
    })
    return () => unsub()
  }, [router])

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
      router.replace("/dashboard")
    } catch (err) {
      setError(err?.message || "Authentication failed")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[calc(100dvh-0px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-lg p-6 bg-background">
        <h1 className="text-2xl font-semibold">{mode === "signin" ? "Login" : "Create your account"}</h1>
        <p className="text-sm text-muted-foreground mt-1">Use email and password via Firebase.</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="text-sm text-muted-foreground block mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-background"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-muted-foreground block mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-background"
              placeholder="••••••••"
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-emerald-600 text-white px-4 py-2.5 text-sm hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Please wait..." : mode === "signin" ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-sm">
          {mode === "signin" ? (
            <span>
              New here?{" "}
              <button className="underline" onClick={() => setMode("signup")}>
                Create an account
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button className="underline" onClick={() => setMode("signin")}>
                Login
              </button>
            </span>
          )}
        </div>
      </div>
    </main>
  )
}
