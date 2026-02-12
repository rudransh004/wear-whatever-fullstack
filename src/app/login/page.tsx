"use client"

import { login, signup } from "./actions"
import { useState, useEffect, Suspense } from "react" 
import { useSearchParams, useRouter } from "next/navigation"
import { createClient } from "../../utils/supabase/client"

function LoginContent() {
  const [loading, setLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(true) // New state to prevent flickering
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get("error")
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          router.replace("/account") // Use replace instead of push for redirects
        } else {
          setIsChecking(false) // Only show the form if NO user is found
        }
      } catch (e) {
        setIsChecking(false)
      }
    }
    checkUser()
  }, [router, supabase])

  // If still checking the session, show a clean loader
  if (isChecking) {
    return <div className="text-zinc-500 font-mono text-[10px] uppercase">Authenticating...</div>
  }

  return (
    <div className="w-full max-w-md">
       <h1 className="text-6xl font-black text-white mb-2 uppercase italic tracking-tighter text-center">
          Identity <span className="text-zinc-800">Check</span>
        </h1>
        {/* ... Rest of your existing Form code ... */}
        <form className="space-y-4">
           {/* Ensure your inputs and buttons are here as before */}
           <input name="email" type="email" required placeholder="EMAIL" className="w-full bg-zinc-950 border border-white/10 p-4 text-white font-mono outline-none" />
           <input name="password" type="password" required placeholder="PASSWORD" className="w-full bg-zinc-950 border border-white/10 p-4 text-white font-mono outline-none" />
           <div className="flex flex-col gap-4 pt-4">
              <button formAction={login} className="w-full bg-white text-black py-4 font-black uppercase hover:bg-purple-600 transition-all">Login</button>
              <button formAction={signup} className="w-full bg-zinc-900 text-white py-4 font-black uppercase border border-white/10 hover:border-purple-500 transition-all">Sign Up</button>
           </div>
        </form>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6 flex flex-col items-center">
      <Suspense fallback={<div className="text-white font-mono text-xs">BOOTING SECURITY...</div>}>
        <LoginContent />
      </Suspense>
    </main>
  )
}