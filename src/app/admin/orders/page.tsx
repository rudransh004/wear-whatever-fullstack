import { prisma } from "../../../lib/prisma";
import StatusUpdateButton from "../../../components/StatusUpdateButton";
import DeleteOrderButton from "../../../components/DeleteOrderButton";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">All Deployments</h2>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-1">Complete Logistics History</p>
        </div>
        <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
          Total Records: {orders.length}
        </div>
      </div>

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
            {orders.map((order : any) => (
              <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-4 text-zinc-500 text-[10px]">{order.id.substring(0, 8)}...</td>
                <td className="p-4 text-white uppercase text-xs font-bold">{order.customerName}</td>
                <td className="p-4 text-[#f0c808] font-bold">₹{order.totalAmount.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 border ${
                    order.status.toLowerCase().includes('processing') 
                      ? 'border-orange-500/30 bg-orange-500/10 text-orange-500' 
                      : 'border-green-500/30 bg-green-500/10 text-green-500'
                  }`}>
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
  );
}