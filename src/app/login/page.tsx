"use client"

import { useState, useEffect, Suspense } from "react" 
import { useSearchParams, useRouter } from "next/navigation"
import { loginWithPassword, signupWithPassword, loginWithMagicLink, loginWithOAuth } from "./actions"
import { createClient } from "../../utils/supabase/client"
import Navbar from "../../components/NavBar"
import { GridScan } from "../../components/GridScan" // <-- NEW IMPORT

function LoginContent() {
  const [activeTab, setActiveTab] = useState<'password' | 'magic'>('password')
  const [isChecking, setIsChecking] = useState(true)
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get("error")
  const message = searchParams.get("message")
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          router.replace("/account")
        } else {
          setIsChecking(false)
        }
      } catch (e) {
        setIsChecking(false)
      }
    }
    checkUser()
  }, [router, supabase])

  if (isChecking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] z-10 relative">
        <div className="w-8 h-8 border-2 border-[#f0c808] border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Verifying Clearance...</div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      
      {/* HEADER */}
      <div className="mb-8 text-center">
        <div className="w-8 h-[1px] bg-[#f0c808] mx-auto mb-6"></div>
        <h1 className="text-5xl md:text-6xl font-black text-white mb-2 uppercase italic tracking-tighter">
          ACCESS <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)]">UPLINK</span>
        </h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
          Identify yourself to access the Member Vault.
        </p>
      </div>

      {/* NOTIFICATIONS */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 p-4 mb-6 text-red-500 font-mono text-[10px] uppercase tracking-widest text-center animate-in fade-in">
          ERROR: {error}
        </div>
      )}

      {message && (
        <div className="bg-green-500/10 border border-green-500/30 p-4 mb-6 text-green-500 font-mono text-[10px] uppercase tracking-widest text-center animate-in fade-in">
          {message}
        </div>
      )}

      <div className="bg-zinc-950 border border-white/10 p-6 md:p-8 shadow-2xl">
        
        {/* TABS */}
        <div className="flex border-b border-white/10 mb-6">
          <button 
            onClick={() => setActiveTab('password')}
            className={`flex-1 pb-3 text-xs font-mono uppercase tracking-widest transition-colors ${activeTab === 'password' ? 'text-[#f0c808] border-b-2 border-[#f0c808]' : 'text-zinc-500 hover:text-white'}`}
          >
            Password
          </button>
          <button 
            onClick={() => setActiveTab('magic')}
            className={`flex-1 pb-3 text-xs font-mono uppercase tracking-widest transition-colors ${activeTab === 'magic' ? 'text-[#f0c808] border-b-2 border-[#f0c808]' : 'text-zinc-500 hover:text-white'}`}
          >
            Magic Link
          </button>
        </div>

        {/* PASSWORD FORM */}
        {activeTab === 'password' && (
          <form className="space-y-4 animate-in fade-in slide-in-from-left-2">
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="EMAIL" 
              className="w-full bg-black border border-white/10 p-4 text-white font-mono text-sm focus:outline-none focus:border-[#f0c808] transition-colors placeholder:text-zinc-700" 
            />
            <input 
              name="password" 
              type="password" 
              required 
              placeholder="PASSWORD" 
              className="w-full bg-black border border-white/10 p-4 text-white font-mono text-sm focus:outline-none focus:border-[#f0c808] transition-colors placeholder:text-zinc-700" 
            />
            <div className="flex gap-4 pt-2">
              <button formAction={loginWithPassword} className="flex-1 bg-white text-black py-4 font-black text-xs uppercase tracking-widest hover:bg-[#f0c808] transition-colors">Log In</button>
              <button formAction={signupWithPassword} className="flex-1 bg-zinc-900 text-white py-4 font-black text-xs uppercase tracking-widest border border-white/10 hover:border-[#f0c808] transition-colors">Create</button>
            </div>
          </form>
        )}

        {/* MAGIC LINK FORM */}
        {activeTab === 'magic' && (
          <form className="space-y-4 animate-in fade-in slide-in-from-right-2">
            <input 
              name="email" 
              type="email" 
              required 
              placeholder="EMAIL ADDRESS" 
              className="w-full bg-black border border-white/10 p-4 text-white font-mono text-sm focus:outline-none focus:border-[#f0c808] transition-colors placeholder:text-zinc-700" 
            />
            <button 
              formAction={loginWithMagicLink} 
              className="w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-[#f0c808] transition-colors"
            >
              Send Secure Link
            </button>
          </form>
        )}

        {/* SOCIAL AUTH SEPARATOR */}
        <div className="relative my-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative bg-zinc-950 px-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Or Authenticate Via</span>
        </div>

        {/* SOCIAL BUTTONS */}
        <div className="grid grid-cols-2 gap-4">
          <form>
            <input type="hidden" name="provider" value="google" />
            <button formAction={loginWithOAuth} className="flex w-full items-center justify-center gap-2 border border-white/10 bg-black hover:border-white hover:bg-white/5 text-white p-3 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Google</span>
            </button>
          </form>
          
          <form>
            <input type="hidden" name="provider" value="github" />
            <button formAction={loginWithOAuth} className="flex w-full items-center justify-center gap-2 border border-white/10 bg-black hover:border-white hover:bg-white/5 text-white p-3 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest">GitHub</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#020202] pt-32 pb-20 px-6 flex flex-col items-center relative overflow-hidden">
      <Navbar />
      
      {/* NEW INTERACTIVE GRIDSCAN BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <GridScan
          className="w-full h-full"
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#1a1a1a"    /* Dark grey to blend with bg */
          gridScale={0.1}
          scanColor="#f0c808"     /* Brand Yellow */
          scanOpacity={0.4}
          enablePost={true}
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          lineJitter={0.1}
          scanGlow={0.5}
          scanSoftness={2}
          enableWebcam={false}
          showPreview={false}
        />
      </div>

      {/* Keeps the subtle yellow glow behind the form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#f0c808]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[50vh] z-10 relative">
          <div className="w-8 h-8 border-2 border-[#f0c808] border-t-transparent rounded-full animate-spin mb-4"></div>
        </div>
      }>
        <LoginContent />
      </Suspense>
    </main>
  )
}