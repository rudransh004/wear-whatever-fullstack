"use client"

import { login, signup } from "./actions"
import { useState, useEffect, Suspense } from "react" // Added Suspense
import { useSearchParams, useRouter } from "next/navigation"
import { createClient } from "../../utils/supabase/client"

// 1. Move the logic into a sub-component
function LoginContent() {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get("error")
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push("/account")
      }
    }
    checkUser()
  }, [router, supabase])

  return (
    <div className="w-full max-w-md">
      <h1 className="text-6xl font-black text-white mb-2 uppercase italic tracking-tighter text-center">
        Identity <span className="text-zinc-800">Check</span>
      </h1>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 p-4 mb-6 text-red-500 font-mono text-xs uppercase text-center">
          {error}
        </div>
      )}

      <form className="space-y-4">
        <input
          name="email"
          type="email"
          required
          placeholder="EMAIL ADDRESS"
          className="w-full bg-zinc-950 border border-white/10 p-4 text-white font-mono focus:border-purple-500 outline-none transition-all uppercase"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="PASSWORD"
          className="w-full bg-zinc-950 border border-white/10 p-4 text-white font-mono focus:border-purple-500 outline-none transition-all"
        />

        <div className="flex flex-col gap-4 pt-4">
          <button
            formAction={async (formData) => {
              setLoading(true)
              await login(formData)
              setLoading(false)
            }}
            disabled={loading}
            className="w-full bg-white text-black py-4 font-black uppercase hover:bg-purple-600 hover:text-white transition-all disabled:opacity-50"
          >
            {loading ? "PROCESSING..." : "Login"}
          </button>
          
          <button
            formAction={async (formData) => {
              setLoading(true)
              await signup(formData)
              setLoading(false)
            }}
            disabled={loading}
            className="w-full bg-zinc-900 text-white py-4 font-black uppercase border border-white/10 hover:border-purple-500 transition-all disabled:opacity-50"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

// 2. The main page now wraps the content in Suspense
export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6 flex flex-col items-center">
      <Suspense fallback={<div className="text-white font-mono uppercase text-xs">Loading Security...</div>}>
        <LoginContent />
      </Suspense>
    </main>
  )
}