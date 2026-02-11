import { prisma } from "../../lib/prisma";
import StatusUpdateButton from "../../components/StatusUpdateButton";
import DeleteOrderButton from "../../components/DeleteOrderButton"; // Import the new button
import { redirect } from "next/navigation";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const adminPass = params.pass;

  if (adminPass !== "wearwhatever2026") {
    redirect("/");
  }

  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  return (
    <main className="max-w-7xl mx-auto">
      {/* ... existing stats summary code ... */}

      <h2 className="text-2xl font-black mb-6 uppercase italic tracking-tighter">Recent Order Stream</h2>
      
      <div className="overflow-x-auto border border-white/10 bg-zinc-950/50 backdrop-blur-sm">
        <table className="w-full text-left text-sm font-mono">
          <thead className="bg-zinc-950 text-zinc-500 border-b border-white/10">
            {/* ... existing table head code ... */}
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
                  <span className="text-zinc-500 text-[10px]">{order.items.length} units</span>
                  
                  <div className="flex items-center gap-4">
                    <StatusUpdateButton orderId={order.id} currentStatus={order.status} />
                    
                    {/* Use the new Client Component here */}
                    <DeleteOrderButton orderId={order.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}