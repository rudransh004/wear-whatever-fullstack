import { prisma } from "../../../lib/prisma";
import { Tag, Trash2, Power, PowerOff } from "lucide-react";
import { createCoupon, deleteCoupon, toggleCouponStatus } from "./actions";

export const dynamic = 'force-dynamic';

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      <div>
        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Promo Engine</h2>
        <p className="font-mono text-zinc-500 text-xs tracking-widest mt-1">Discount Code Management</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: Create Coupon Form */}
        <div className="lg:col-span-1 bg-zinc-950 border border-white/10 p-6 h-fit">
          <h3 className="text-lg font-black uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">Generate Code</h3>
          <form action={createCoupon} className="space-y-4 font-mono text-xs">
            <div className="flex flex-col gap-2">
              <label className="text-zinc-500 uppercase">Coupon Code</label>
              <input type="text" name="code" required placeholder="e.g. WELCOME10" className="bg-black border border-white/10 p-3 text-white uppercase outline-none focus:border-[#f0c808]" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-zinc-500 uppercase">Discount Type</label>
              <select name="discountType" className="bg-black border border-white/10 p-3 text-white uppercase outline-none focus:border-[#f0c808]">
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FLAT">Flat Amount (₹)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-zinc-500 uppercase">Discount Value</label>
              <input type="number" name="discountValue" required min="1" placeholder="10" className="bg-black border border-white/10 p-3 text-white outline-none focus:border-[#f0c808]" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-zinc-500 uppercase">Minimum Cart Value (₹)</label>
              <input type="number" name="minCartValue" defaultValue="0" min="0" className="bg-black border border-white/10 p-3 text-white outline-none focus:border-[#f0c808]" />
            </div>

            <button type="submit" className="w-full bg-[#f0c808] text-black py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors mt-4">
              Create Coupon
            </button>
          </form>
        </div>

        {/* RIGHT: Active Coupons List */}
        <div className="lg:col-span-2">
           <div className="bg-zinc-950 border border-white/10 overflow-x-auto">
            <table className="w-full text-left text-sm font-mono whitespace-nowrap">
              <thead className="bg-black text-zinc-500 border-b border-white/10 text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="p-4">Code</th>
                  <th className="p-4">Value</th>
                  <th className="p-4">Min. Cart</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {coupons.length === 0 ? (
                  <tr><td colSpan={5} className="p-8 text-center text-zinc-600 uppercase">No active codes.</td></tr>
                ) : coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="p-4 text-white font-bold flex items-center gap-2">
                      <Tag size={14} className="text-[#f0c808]"/> {coupon.code}
                    </td>
                    <td className="p-4 text-zinc-300">
                      {coupon.discountType === "PERCENTAGE" ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} FLAT`}
                    </td>
                    <td className="p-4 text-zinc-500">₹{coupon.minCartValue}</td>
                    <td className="p-4">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 border ${coupon.isActive ? 'border-green-500/30 bg-green-500/10 text-green-500' : 'border-red-500/30 bg-red-500/10 text-red-500'}`}>
                        {coupon.isActive ? "ACTIVE" : "PAUSED"}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-4">
                      {/* Toggle Button */}
                      <form action={toggleCouponStatus.bind(null, coupon.id, coupon.isActive)}>
                        <button type="submit" className="text-zinc-500 hover:text-white transition-colors" title={coupon.isActive ? "Pause Code" : "Activate Code"}>
                          {coupon.isActive ? <PowerOff size={16} /> : <Power size={16} />}
                        </button>
                      </form>
                      {/* Delete Button */}
                      <form action={deleteCoupon.bind(null, coupon.id)}>
                        <button type="submit" className="text-zinc-600 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}