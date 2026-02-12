import { createClient } from '../../utils/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from "../login/actions";
import { prisma } from "../../lib/prisma"; //

export default async function AccountPage() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  // If no user is found by the server client, bounce them to login
  if (!user || error) {
    redirect('/login')
  }

  // Fetch only orders linked to this specific user ID
  const userOrders = await prisma.order.findMany({
    where: {
      userId: user.id
    },
    include: {
      items: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <main className="min-h-screen bg-black pt-40 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter">
              Member <span className="text-zinc-800">Vault</span>
            </h1>
            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mt-2">
              Signed in as: {user.email}
            </p>
          </div>
          
          <form action={logout}>
            <button className="text-[10px] font-black uppercase border border-white/10 px-4 py-2 text-zinc-500 hover:border-red-500 hover:text-red-500 transition-all">
              Sign Out
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* Account Status Card */}
          <div className="bg-zinc-950 border border-white/5 p-8">
            <p className="text-zinc-500 font-mono text-[10px] uppercase mb-1">Security Status</p>
            <p className="text-green-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              Active Session
            </p>
          </div>

          {/* Order History Section */}
          <div>
            <h2 className="text-xl font-black text-white uppercase italic mb-6 tracking-tight">
              Order History
            </h2>
            
            {userOrders.length === 0 ? (
              <div className="bg-zinc-950 border border-white/5 p-12 text-center">
                <p className="text-zinc-600 font-mono text-xs uppercase">No deployments found in your history.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <div key={order.id} className="bg-zinc-950 border border-white/5 p-6 flex flex-col md:flex-row justify-between gap-6 hover:border-white/10 transition-all">
                    <div>
                      <p className="text-zinc-500 font-mono text-[10px] uppercase mb-1">Ref ID: {order.id}</p>
                      <p className="text-white font-bold text-sm uppercase">
                        {order.items.map(item => item.name).join(", ")}
                      </p>
                      <p className="text-zinc-600 font-mono text-[10px] mt-2">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex flex-col md:items-end justify-center">
                      <p className={`text-[10px] font-black uppercase px-2 py-1 mb-2 inline-block ${
                        order.status === 'Processing' ? 'text-orange-500 bg-orange-500/10' : 'text-green-500 bg-green-500/10'
                      }`}>
                        {order.status}
                      </p>
                      <p className="text-white font-mono text-lg font-bold">₹{order.totalAmount}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}