import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AccountPage() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  // If no user is found by the server client, bounce them to login
  if (!user || error) {
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-black pt-40 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-white uppercase italic mb-8">
          Welcome, <span className="text-purple-500">{user.email}</span>
        </h1>
        <div className="bg-zinc-950 border border-white/5 p-8">
          <p className="text-zinc-500 font-mono text-xs uppercase">Account Status</p>
          <p className="text-green-500 font-bold uppercase tracking-widest">Active Session</p>
        </div>
      </div>
    </main>
  )
}