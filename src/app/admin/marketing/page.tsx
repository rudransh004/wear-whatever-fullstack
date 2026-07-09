import React from 'react';
import { prisma } from "../../../lib/prisma";
import { Mail, Users, Download } from "lucide-react";

// Force dynamic fetch so it updates instantly when a new user subscribes
export const dynamic = 'force-dynamic';

export default async function MarketingDashboard() {
  const subscribers = await (prisma as any).Subscriber.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Syndicate Roster</h2>
          <p className="font-mono text-zinc-500 text-xs tracking-widest mt-1">First-Party Marketing Data</p>
        </div>
        {/* Placeholder button for future CSV export functionality */}
        <button className="flex items-center gap-2 bg-white text-black px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#f0c808] transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-950 border border-white/10 p-6 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Total Subscribers</p>
            <h3 className="text-4xl font-mono font-bold text-white">{subscribers.length}</h3>
          </div>
          <Users className="w-8 h-8 text-[#f0c808] opacity-50" />
        </div>
      </div>

      {/* Data Table */}
      <div>
        <h3 className="text-lg font-black uppercase tracking-widest text-white mb-4 border-b border-white/10 pb-4">Secured Emails</h3>
        
        {subscribers.length === 0 ? (
          <div className="bg-zinc-950 border border-white/10 p-12 text-center">
            <Mail className="w-8 h-8 text-zinc-600 mx-auto mb-4" />
            <p className="font-mono text-zinc-500 text-xs uppercase tracking-widest">No subscribers located in the void.</p>
          </div>
        ) : (
          <div className="bg-zinc-950 border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-sm font-mono whitespace-nowrap">
              <thead className="bg-black text-zinc-500 border-b border-white/10 text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="p-4">Email Target</th>
                  <th className="p-4">Timestamp (UTC)</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {subscribers.map((sub: any) => (
                  <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-white font-bold">{sub.email}</td>
                    <td className="p-4 text-zinc-500 text-xs">{sub.createdAt.toLocaleString()}</td>
                    <td className="p-4">
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 border border-green-500/30 bg-green-500/10 text-green-500">
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}