"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { verifyAdminPasscode } from "../admin/actions";
import { ShieldAlert, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setErrorMessage(null);

    startTransition(async () => {
      const result = await verifyAdminPasscode(formData);

      if (result.success) {
        // Force Next.js client router to fetch the dashboard fresh, bypassing cached redirects
        router.refresh();
        router.push("/admin");
      } else {
        setErrorMessage(result.error || "Authorization failure.");
      }
    });
  };

  return (
    <div className="flex-1 pt-16 md:pt-20 bg-[#020202] flex items-center justify-center p-6 relative overflow-hidden min-h-[80vh] font-mono">
      {/* Brutalist Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>

      <div className="w-full max-w-md bg-zinc-950 border border-white/10 p-8 shadow-2xl relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 flex items-center justify-center rounded-full">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-3xl font-black text-white text-center uppercase tracking-tighter mb-2 font-sans">Restricted Area</h1>
        <p className="text-zinc-500 text-[10px] text-center uppercase tracking-widest mb-8">
          Wear Whatever // Employee Terminal
        </p>

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/30 p-3 mb-6 text-red-400 text-[10px] uppercase tracking-widest text-center animate-pulse">
            {errorMessage}
          </div>
        )}

        <form action={handleSubmit} className="space-y-6">
          <div>
            <label className="text-zinc-400 text-[10px] uppercase tracking-widest mb-2 block">Clearance Code</label>
            <input 
              type="password" 
              name="passcode" 
              required
              disabled={isPending}
              autoFocus
              placeholder="••••••••"
              className="w-full bg-black border border-white/10 p-4 text-white font-mono text-center tracking-[0.5em] focus:outline-none focus:border-red-500 transition-colors disabled:opacity-50"
            />
          </div>
          <button 
            type="submit"
            disabled={isPending}
            className="w-full bg-red-600 hover:bg-red-500 text-white py-4 font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:bg-zinc-800 disabled:text-zinc-500"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying Telemetry...
              </>
            ) : (
              "Authorize Override"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}