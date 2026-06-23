import { prisma } from "../../lib/prisma";
import StatusUpdateButton from "../../components/StatusUpdateButton";
import DeleteOrderButton from "../../components/DeleteOrderButton";
import { DollarSign, PackageOpen, Truck, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
    take: 10 // Only show recent 10 on the overview
  });

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status.toLowerCase().includes("processing")).length;

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      <div>
        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">System Overview</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-zinc-950 border border-white/10 p-6">
          <div className="flex justify-between items-start mb-4">
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Gross Revenue</p>
            <DollarSign className="w-5 h-5 text-[#f0c808]" />
          </div>
          <h3 className="text-3xl font-mono font-bold text-white">₹{totalRevenue.toLocaleString()}</h3>
        </div>
        <div className="bg-zinc-950 border border-white/10 p-6">
          <div className="flex justify-between items-start mb-4">
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Total Deployments</p>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-3xl font-mono font-bold text-white">{totalOrders}</h3>
        </div>
        <div className="bg-zinc-950 border border-white/10 p-6">
          <div className="flex justify-between items-start mb-4">
            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Awaiting Action</p>
            <PackageOpen className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="text-3xl font-mono font-bold text-white">{pendingOrders}</h3>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-black uppercase tracking-widest text-white mb-4 border-b border-white/10 pb-4">Recent Logistics Stream</h3>
        <div className="bg-zinc-950 border border-white/10 overflow-x-auto">
          <table className="w-full text-left text-sm font-mono whitespace-nowrap">
            <thead className="bg-black text-zinc-500 border-b border-white/10 text-[10px] uppercase tracking-widest">
              <tr>
                <th className="p-4">Order Ref</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Value</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 text-zinc-500 text-[10px]">{order.id.substring(0, 8)}...</td>
                  <td className="p-4 text-white uppercase text-xs font-bold">{order.customerName}</td>
                  <td className="p-4 text-[#f0c808] font-bold">₹{order.totalAmount.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 border border-zinc-700 bg-zinc-900 text-white">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-3 opacity-50 group-hover:opacity-100">
                    <StatusUpdateButton orderId={order.id} currentStatus={order.status} />
                    <DeleteOrderButton orderId={order.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}