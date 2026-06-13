"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Package, Truck, CheckCircle2, MapPin, AlertCircle, ArrowRight, Receipt, Globe, HelpCircle, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
import Navbar from "../../components/NavBar";
// Adjust this import path if your actions are located elsewhere
import { getOrderById } from "../../lib/actions";

// Helper to map DB status to timeline steps
const getStepFromStatus = (status: string) => {
  const s = status?.toLowerCase() || "processing";
  if (s.includes("delivered")) return 4;
  if (s.includes("out for delivery")) return 3;
  if (s.includes("shipped") || s.includes("dispatched")) return 2;
  if (s.includes("processing")) return 1;
  return 0; // Placed / Pending
};

export default function OrdersPage() {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wear_whatever_recent_orders") || "[]");
    setRecentIds(saved);
  }, []);

  const handleTrack = async (e?: React.FormEvent, idToTrack?: string) => {
    if (e) e.preventDefault();
    
    const finalId = idToTrack || orderId;
    if (!finalId) return;

    setLoading(true);
    setError("");
    setOrderData(null);
    
    try {
      const result = await getOrderById(finalId);
      
      if (result) {
        setOrderData(result);
        setOrderId(finalId);
        
        // Save to recent searches if not already there
        if (!recentIds.includes(finalId)) {
          const updated = [finalId, ...recentIds].slice(0, 3); // Keep last 3
          setRecentIds(updated);
          localStorage.setItem("wear_whatever_recent_orders", JSON.stringify(updated));
        }
      } else {
        setError("Order not found. Please verify your ID and try again.");
      }
    } catch (err) {
      setError("Network anomaly. Please try transmitting again.");
    } finally {
      setLoading(false);
    }
  };

  // Timeline Configuration
  const steps = [
    { title: "ORDER PLACED", icon: Receipt },
    { title: "PROCESSING", icon: Package },
    { title: "DISPATCHED", icon: Truck },
    { title: "DELIVERED", icon: CheckCircle2 }
  ];

  const currentStep = orderData ? getStepFromStatus(orderData.status) : 0;

  // Calculate fake EDD (Estimated Delivery Date) based on creation date + 7 days
  const orderDate = orderData ? new Date(orderData.createdAt) : new Date();
  const edd = new Date(orderDate);
  edd.setDate(edd.getDate() + 7);

  return (
    <main className="min-h-screen bg-[#020202] text-zinc-400 selection:bg-[#f0c808] selection:text-black pt-32 pb-24 overflow-x-hidden">
      <Navbar />
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="mb-12">
          <div className="w-8 h-[1px] bg-[#f0c808] mb-6"></div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
            TRACKING <br />
            <span className="text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.8)]">UPLINK</span>
          </h1>
          <p className="font-mono text-sm uppercase tracking-widest text-zinc-500">
            Enter your transaction reference to locate your gear.
          </p>
        </div>

        {/* SEARCH BAR */}
        <form onSubmit={(e) => handleTrack(e)} className="relative flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input
              type="text"
              placeholder="ENTER ORDER ID (e.g. ord_...)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full bg-zinc-950 border border-white/10 py-5 pl-12 pr-4 text-white font-mono text-sm focus:outline-none focus:border-[#f0c808] transition-colors uppercase placeholder:text-zinc-700 shadow-inner"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || !orderId} 
            className="shrink-0 bg-[#f0c808] text-black px-12 py-5 font-black uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 disabled:hover:bg-[#f0c808] shadow-[0_0_20px_rgba(240,200,8,0.1)]"
          >
            {loading ? "SCANNING..." : "LOCATE"}
          </button>
        </form>

        {/* RECENT SEARCHES */}
        {recentIds.length > 0 && !orderData && (
          <div className="flex flex-wrap items-center gap-3 animate-in fade-in mb-8">
            <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-3 h-3" /> Recent Queries:
            </span>
            {recentIds.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => handleTrack(undefined, id)}
                className="text-zinc-400 font-mono text-[10px] border border-white/10 px-3 py-1.5 hover:border-[#f0c808] hover:text-[#f0c808] transition-colors"
              >
                {id.substring(0, 12)}...
              </button>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/10 border border-red-500/30 p-4 flex items-center gap-3 text-red-500 font-mono text-xs uppercase tracking-widest mt-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* 🎬 INITIAL / EMPTY STATE DASHBOARD (Only shows before tracking an order) */}
        {/* ========================================================================= */}
        {!orderData && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-16"
          >
            {/* Box 1: Logistics Protocol */}
            <div className="bg-zinc-950 border border-white/5 p-8 hover:border-[#f0c808]/30 transition-colors group">
              <Globe className="w-8 h-8 text-zinc-600 group-hover:text-[#f0c808] mb-6 transition-colors" />
              <h3 className="text-white font-black uppercase tracking-widest mb-3 text-lg">Logistics Protocol</h3>
              <p className="text-zinc-500 font-mono text-xs leading-relaxed mb-6">
                All standard catalog drops are dispatched from our centralized void within 48 hours. Express transit generally requires 3-5 business days domestically.
              </p>
              <Link href="/shipping" className="text-[#f0c808] font-mono text-[10px] uppercase tracking-widest hover:underline underline-offset-4 flex items-center gap-2">
                View Shipping Timelines <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Box 2: 1-of-1 Custom Timing */}
            <div className="bg-zinc-950 border border-white/5 p-8 hover:border-[#f0c808]/30 transition-colors group">
              <ShieldCheck className="w-8 h-8 text-zinc-600 group-hover:text-[#f0c808] mb-6 transition-colors" />
              <h3 className="text-white font-black uppercase tracking-widest mb-3 text-lg">Studio Customs</h3>
              <p className="text-zinc-500 font-mono text-xs leading-relaxed mb-6">
                Apparel engineered via the AI Studio undergoes specific 1-of-1 localized printing. Please allow 5-7 business days for manufacturing prior to dispatch.
              </p>
              <Link href="/studio" className="text-[#f0c808] font-mono text-[10px] uppercase tracking-widest hover:underline underline-offset-4 flex items-center gap-2">
                Learn About Studio <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Box 3: Support Deflection */}
            <div className="bg-[#f0c808] p-8 text-black group relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
              
              <HelpCircle className="w-8 h-8 text-black mb-6" />
              <h3 className="font-black uppercase tracking-widest mb-3 text-lg">Signal Lost?</h3>
              <p className="font-mono text-xs leading-relaxed mb-6 text-black/70">
                Cannot locate your tracking ID? Did you receive an incorrect or anomalous item? Our support uplink is online and ready to assist.
              </p>
              <Link href="/contact" className="font-mono text-[10px] uppercase font-bold tracking-widest hover:underline underline-offset-4 flex items-center gap-2">
                Open Support Ticket <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* 🎬 ORDER DASHBOARD RESULT (Shows when tracking is successful)            */}
        {/* ========================================================================= */}
        {orderData && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="mt-16 space-y-8"
          >
            {/* Top Bar: ID & EDD */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 gap-4">
              <div>
                <p className="text-[#f0c808] font-mono text-[10px] uppercase tracking-widest mb-2">Transaction Found</p>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">ID: {orderData.id}</h2>
                <p className="text-zinc-500 font-mono text-[10px] uppercase mt-2">Placed: {orderDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <div className="md:text-right bg-zinc-900 border border-white/10 p-4 w-full md:w-auto">
                <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">Est. Delivery</p>
                <p className="text-white font-mono text-lg font-bold">{edd.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
              </div>
            </div>

            {/* TIMELINE STEPPER */}
            <div className="bg-zinc-950 border border-white/5 p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#f0c808]/20"></div>
              <h3 className="text-white font-mono text-sm uppercase tracking-widest mb-10 font-bold">Live Status</h3>
              
              <div className="relative flex justify-between items-center">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -z-10 -translate-y-1/2"></div>
                {/* Active Progress Line */}
                <div 
                  className="absolute top-1/2 left-0 h-[2px] bg-[#f0c808] -z-10 -translate-y-1/2 transition-all duration-1000 ease-out"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%`, boxShadow: '0 0 10px rgba(240,200,8,0.5)' }}
                ></div>

                {steps.map((step, index) => {
                  const isActive = index <= currentStep;
                  const isCurrent = index === currentStep;
                  const Icon = step.icon;
                  
                  return (
                    <div key={index} className="flex flex-col items-center relative z-10">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        isActive ? 'bg-black border-[#f0c808] text-[#f0c808]' : 'bg-black border-white/10 text-zinc-600'
                      } ${isCurrent ? 'shadow-[0_0_20px_rgba(240,200,8,0.3)]' : ''}`}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <p className={`mt-4 text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-center absolute top-14 w-24 -ml-12 left-1/2 ${
                        isActive ? 'text-white font-bold' : 'text-zinc-600'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="h-8"></div> {/* Spacing for absolute text */}
            </div>

            {/* SPLIT GRID: Summary & Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Items */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-white font-mono text-sm uppercase tracking-widest border-b border-white/10 pb-4">Manifest</h3>
                <div className="bg-zinc-950 border border-white/5 p-6 space-y-6">
                  {orderData.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="w-16 h-20 bg-zinc-900 border border-white/5 shrink-0 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-800 font-mono text-[8px] uppercase text-center">No Img</div>
                        {item.image && <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover z-10 opacity-80 group-hover:opacity-100 transition-opacity" />}
                      </div>
                      <div className="flex-grow">
                        <p className="text-white font-bold text-sm uppercase tracking-wide">{item.name}</p>
                        <p className="text-zinc-500 font-mono text-[10px] uppercase mt-1">QTY: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-mono text-sm font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Info & Help */}
              <div className="space-y-8">
                {/* Billing Summary */}
                <div>
                  <h3 className="text-white font-mono text-sm uppercase tracking-widest border-b border-white/10 pb-4 mb-4">Summary</h3>
                  <div className="bg-zinc-950 border border-white/5 p-6 font-mono text-xs uppercase space-y-3">
                    <div className="flex justify-between text-zinc-400">
                      <span>Subtotal</span>
                      <span>₹{orderData.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Shipping</span>
                      <span>₹0.00</span>
                    </div>
                    <div className="flex justify-between text-[#f0c808] font-bold pt-3 border-t border-white/10 text-sm">
                      <span>Total Paid</span>
                      <span>₹{orderData.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Need Help Box */}
                <div className="border border-white/10 p-6 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_25%,rgba(255,255,255,0.02)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.02)_75%,rgba(255,255,255,0.02)_100%)] bg-[length:20px_20px]">
                  <h3 className="text-white font-black uppercase tracking-widest mb-2">Anomaly Detected?</h3>
                  <p className="text-zinc-500 font-mono text-[10px] uppercase leading-relaxed mb-4">
                    If you require address modification or wish to initiate a return, contact our uplink immediately.
                  </p>
                  <Link href="/contact" className="group flex items-center justify-between bg-white text-black px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#f0c808] transition-colors">
                    <span>Contact Support</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>

          </motion.div>
        )}
      </div>
    </main>
  );
}