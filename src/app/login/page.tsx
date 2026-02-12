"use client"

import { login, signup } from "./actions"
import { useState, useEffect, Suspense } from "react" 
import { useSearchParams, useRouter } from "next/navigation"
import { createClient } from "../../utils/supabase/client"

function LoginContent() {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get("error")
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) router.push("/account")
    }
    checkUser()
  }, [router, supabase])

  return (
    <div className="w-full max-w-md">
       {/* ... your existing form code ... */}
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6 flex flex-col items-center">
      <Suspense fallback={<div className="text-white font-mono text-xs">LOADING AUTH...</div>}>
        <LoginContent />
      </Suspense>
    </main>
  )
}