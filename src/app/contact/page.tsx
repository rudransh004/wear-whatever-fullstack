"use client";

import { useState } from "react";
import Navbar from "../../components/NavBar";
import Link from "next/link";
import { Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Simulated form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // In Phase 1.2, we will wire this to Resend/Nodemailer
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#020202] text-zinc-400 selection:bg-[#f0c808] selection:text-black pt-32 pb-24 overflow-x-hidden">
      <Navbar />
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <div className="w-8 h-[1px] bg-[#f0c808] mb-6"></div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none">
            COMMUNICATIONS <br />
            <span className="text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.8)]">UPLINK</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* LEFT: Information & Quick Routing */}
          <div className="flex flex-col space-y-12">
            
            <p className="text-lg leading-relaxed text-zinc-300 font-sans max-w-md">
              Need assistance? Our support team operates from the void to resolve your inquiries. Please allow 24-48 hours for a response to all queries.
            </p>

            <div className="space-y-8 font-mono text-sm uppercase tracking-widest">
              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="text-[#f0c808] w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="text-zinc-500 mb-1 text-[10px]">Direct Inbox</p>
                  <a href="mailto:support@wearwhatever.com" className="text-white hover:text-[#f0c808] transition-colors font-bold">
                    support@wearwhatever.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <Clock className="text-[#f0c808] w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="text-zinc-500 mb-1 text-[10px]">Operating Hours</p>
                  <p className="text-white font-bold">MON - FRI / 10AM - 6PM (IST)</p>
                </div>
              </div>

              {/* HQ */}
              <div className="flex items-start gap-4">
                <MapPin className="text-[#f0c808] w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="text-zinc-500 mb-1 text-[10px]">Headquarters</p>
                  <p className="text-white font-bold">NEW DELHI, INDIA</p>
                </div>
              </div>
            </div>

            {/* Quick Routing (Support Deflection) */}
            <div className="pt-8 border-t border-white/10">
              <h3 className="text-[#f0c808] font-mono text-[10px] uppercase tracking-[0.2em] mb-4">Self Service</h3>
              <div className="flex flex-col space-y-3">
                <Link href="/orders" className="group flex items-center justify-between border border-white/10 p-4 hover:border-[#f0c808] transition-colors">
                  <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">Track Your Order</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#f0c808] transition-colors group-hover:translate-x-1" />
                </Link>
                <Link href="/refund" className="group flex items-center justify-between border border-white/10 p-4 hover:border-[#f0c808] transition-colors">
                  <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">Returns & Exchanges</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-[#f0c808] transition-colors group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>

          {/* RIGHT: The Brutalist Form */}
          <div>
            {isSubmitted ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-[#f0c808]/30 bg-[#f0c808]/5 p-8 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-[#f0c808] rounded-full flex items-center justify-center mb-6">
                  <Mail className="text-black w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Message Transmitted</h3>
                <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest leading-relaxed">
                  We have received your signal. Our team will contact you within 24-48 hours.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 text-[10px] font-mono text-[#f0c808] hover:text-white uppercase tracking-[0.2em] underline underline-offset-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Name</label>
                    <input 
                      type="text" 
                      required
                      className="bg-transparent border-b border-white/20 pb-2 text-white font-mono text-sm focus:outline-none focus:border-[#f0c808] transition-colors rounded-none" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Email</label>
                    <input 
                      type="email" 
                      required
                      className="bg-transparent border-b border-white/20 pb-2 text-white font-mono text-sm focus:outline-none focus:border-[#f0c808] transition-colors rounded-none" 
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Subject</label>
                  {/* FIX: defaultValue="" applied here, selected removed from option below */}
                  <select 
                    required 
                    defaultValue=""
                    className="bg-transparent border-b border-white/20 pb-2 text-white font-mono text-sm focus:outline-none focus:border-[#f0c808] transition-colors appearance-none rounded-none cursor-pointer"
                  >
                    <option value="" disabled className="text-zinc-500 bg-black">Select an inquiry type...</option>
                    <option value="order" className="bg-black">Order Status / Tracking</option>
                    <option value="return" className="bg-black">Returns & Exchanges</option>
                    <option value="product" className="bg-black">Product Inquiry / Sizing</option>
                    <option value="collab" className="bg-black">Press & Collaborations</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Order ID (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ord_123456789"
                    className="bg-transparent border-b border-white/20 pb-2 text-zinc-300 font-mono text-sm focus:outline-none focus:border-[#f0c808] transition-colors rounded-none placeholder:text-zinc-700" 
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Message</label>
                  <textarea 
                    required
                    rows={4}
                    className="bg-transparent border-b border-white/20 pb-2 text-white font-mono text-sm focus:outline-none focus:border-[#f0c808] transition-colors resize-none rounded-none" 
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex justify-center py-5 bg-[#f0c808] text-black font-mono text-sm font-black uppercase tracking-[0.2em] overflow-hidden transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(240,200,8,0.15)] hover:shadow-[0_0_40px_rgba(240,200,8,0.3)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  <div className="absolute inset-0 h-full w-0 bg-white transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE"}
                  </span>
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}