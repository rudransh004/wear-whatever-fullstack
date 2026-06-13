import { createClient } from '../../utils/supabase/server';
import { redirect } from 'next/navigation';
import { logout } from "../login/actions";
import { prisma } from "../../lib/prisma";
import Navbar from "../../components/NavBar";
import Link from "next/link";
import { ShieldCheck, Package, MapPin, LogOut, ArrowRight, Clock, Fingerprint, Mail, HelpCircle } from "lucide-react";

export default async function AccountPage() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();

  // If no user is found by the server client, bounce them to login
  if (!user || error) {
    redirect('/login');
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
    <main className="min-h-screen bg-[#020202] text-zinc-400 selection:bg-[#f0c808] selection:text-black pt-32 pb-24 overflow-x-hidden">
      <Navbar />
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER & LOGOUT */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="w-8 h-[1px] bg-[#f0c808] mb-6"></div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
              MEMBER <br />
              <span className="text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.8)]">VAULT</span>
            </h1>
          </div>
          
          <form action={logout}>
            <button className="group flex items-center gap-2 text-[10px] font-mono font-black uppercase border border-white/10 px-6 py-3 text-zinc-400 hover:border-red-500 hover:text-red-500 hover:bg-red-500/10 transition-all shadow-inner">
              <LogOut className="w-4 h-4" /> Sign Out Session
            </button>
          </form>
        </div>

        {/* BENTO BOX DASHBOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Profile & Settings (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Identity Card */}
            <div className="bg-zinc-950 border border-white/5 p-6 md:p-8">
              <Fingerprint className="text-[#f0c808] w-8 h-8 mb-6" />
              <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">Authenticated Entity</p>
              <p className="text-white font-bold truncate mb-6">{user.email}</p>
              
              <div className="pt-6 border-t border-white/10">
                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">Clearance Code (ID)</p>
                <p className="text-zinc-300 font-mono text-xs uppercase bg-black border border-white/10 px-3 py-2">
                  {user.id.split('-')[0]}...{user.id.split('-')[4]}
                </p>
              </div>
            </div>

            {/* Security Status */}
            <div className="bg-zinc-950 border border-white/5 p-6 md:p-8">
              <ShieldCheck className="text-green-500 w-8 h-8 mb-6" />
              <h3 className="text-white font-black uppercase tracking-widest mb-2">Security Protocol</h3>
              <p className="text-zinc-500 font-mono text-[10px] uppercase leading-relaxed mb-4">
                Connection encrypted. Multi-factor authentication is recommended for high-tier accounts.
              </p>
              <div className="inline-flex items-center gap-2 text-green-500 font-mono text-[10px] uppercase font-bold bg-green-500/10 px-3 py-1.5 border border-green-500/20">
                <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Session Active
              </div>
            </div>

            {/* Quick Support Routing */}
            <div className="bg-[#f0c808] p-6 md:p-8 text-black group relative overflow-hidden">
              <HelpCircle className="w-8 h-8 text-black mb-6" />
              <h3 className="font-black uppercase tracking-widest mb-2">Need Assistance?</h3>
              <p className="font-mono text-[10px] uppercase leading-relaxed mb-6 text-black/70">
                Access the communications uplink for returns, sizing queries, or order anomalies.
              </p>
              <Link href="/contact" className="font-mono text-[10px] uppercase font-bold tracking-widest hover:underline underline-offset-4 flex items-center gap-2">
                Open Support Ticket <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>

          {/* RIGHT COLUMN: Order History (Spans 8 columns) */}
          <div className="lg:col-span-8">
            <div className="bg-zinc-950 border border-white/5 p-6 md:p-8 h-full">
              
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                  <Package className="text-[#f0c808] w-6 h-6" /> Order Manifests
                </h2>
                <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                  Total Records: {userOrders.length}
                </div>
              </div>
              
              {userOrders.length === 0 ? (
                /* Empty State */
                <div className="py-20 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Package className="w-8 h-8 text-zinc-600" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">No Deployments Found</h3>
                  <p className="text-zinc-500 font-mono text-xs uppercase mb-8 max-w-sm mx-auto">
                    Your acquisition history is empty. Access the shop to initiate your first transfer.
                  </p>
                  <Link href="/#shop" className="bg-white text-black px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#f0c808] transition-colors">
                    Access Shop
                  </Link>
                </div>
              ) : (
                /* Order List */
                <div className="space-y-6">
                  {userOrders.map((order) => (
                    <div key={order.id} className="bg-black border border-white/10 p-6 flex flex-col xl:flex-row justify-between gap-8 hover:border-[#f0c808]/50 transition-colors group">
                      
                      {/* Left: Order Info & Images */}
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <p className="text-[#f0c808] font-mono text-[10px] uppercase tracking-widest">REF: {order.id.substring(0, 12)}...</p>
                          <p className="text-zinc-600 font-mono text-[10px] uppercase flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>

                        {/* Items Preview */}
                        <div className="space-y-3">
                          {order.items.map((item: any) => (
                            <div key={item.id} className="flex items-center gap-4">
                              <div className="w-12 h-16 bg-zinc-900 border border-white/5 overflow-hidden relative shrink-0">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center text-zinc-800 font-mono text-[8px] uppercase">IMG</div>
                                )}
                              </div>
                              <div>
                                <p className="text-white font-bold text-sm uppercase tracking-wide">{item.name}</p>
                                <p className="text-zinc-500 font-mono text-[10px] uppercase mt-1">QTY: {item.quantity} | ₹{item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Right: Status, Total & Actions */}
                      <div className="flex flex-row xl:flex-col items-center xl:items-end justify-between xl:justify-center border-t xl:border-t-0 xl:border-l border-white/10 pt-4 xl:pt-0 xl:pl-8 shrink-0 gap-4">
                        <div className="text-left xl:text-right">
                          <p className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 mb-2 inline-block border ${
                            order.status.toLowerCase().includes('delivered') ? 'text-green-500 border-green-500/30 bg-green-500/10' : 
                            order.status.toLowerCase().includes('processing') ? 'text-[#f0c808] border-[#f0c808]/30 bg-[#f0c808]/10' : 
                            'text-blue-500 border-blue-500/30 bg-blue-500/10'
                          }`}>
                            {order.status}
                          </p>
                          <p className="text-white font-mono text-xl font-bold">₹{order.totalAmount.toFixed(2)}</p>
                        </div>
                        
                        <Link href="/orders" className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-white hover:bg-white hover:text-black text-white px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest transition-all">
                          Track <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}