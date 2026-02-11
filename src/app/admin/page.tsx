import { prisma } from "../../lib/prisma";
import StatusUpdateButton from "../../components/StatusUpdateButton";
import { redirect } from "next/navigation";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // 1. Await searchParams and check for the secret pass
  const params = await searchParams;
  const adminPass = params.pass;

  // 2. Security Check: Redirect to home if the pass doesn't match your secret
  // Replace 'wearwhatever2026' with your own desired secret key
  if (adminPass !== "wearwhatever2026") {
    redirect("/");
  }

  // Fetching orders with the relation 'items'
  const orders = await prisma.order.findMany({
    include: { 
      items: true 
    },
    orderBy: { 
      createdAt: "desc" 
    },
  });

  // Calculate total using the field name defined in your schema
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  return (
    <main className="max-w-7xl mx-auto">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-lg shadow-xl">
          <p className="text-zinc-500 font-mono text-[10px] uppercase mb-1 tracking-widest">Revenue Status</p>
          <p className="text-3xl font-black text-purple-400 italic">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-zinc-900 border border-white/5 p-6 rounded-lg shadow-xl">
          <p className="text-zinc-500 font-mono text-[10px] uppercase mb-1 tracking-widest">Total Deployments</p>
          <p className="text-3xl font-black text-white italic">{orders.length}</p>
        </div>
      </div>

      <h2 className="text-2xl font-black mb-6 uppercase italic tracking-tighter">Recent Order Stream</h2>
      
      <div className="overflow-x-auto border border-white/10 bg-zinc-950/50 backdrop-blur-sm">
        <table className="w-full text-left text-sm font-mono">
          <thead className="bg-zinc-950 text-zinc-500 border-b border-white/10">
            <tr>
              <th className="p-4 uppercase text-[10px] tracking-widest">Ref ID</th>
              <th className="p-4 uppercase text-[10px] tracking-widest">Customer</th>
              <th className="p-4 uppercase text-[10px] tracking-widest">Amount</th>
              <th className="p-4 uppercase text-[10px] tracking-widest">Status</th>
              <th className="p-4 uppercase text-[10px] tracking-widest">Volume</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-white/5 hover:bg-zinc-900/50 transition-colors">
                <td className="p-4 text-zinc-400 text-[10px]">{order.id}</td>
                <td className="p-4">
                  <p className="text-white font-bold">{order.customerName}</p>
                  <p className="text-zinc-600 text-[10px]">{order.customerEmail}</p>
                </td>
                <td className="p-4 text-white">₹{order.totalAmount}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-sm ${
                    order.status === 'Processing' ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 flex gap-4 items-center">
                  <span className="text-zinc-500">{order.items.length} units</span>
                  <StatusUpdateButton orderId={order.id} currentStatus={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}