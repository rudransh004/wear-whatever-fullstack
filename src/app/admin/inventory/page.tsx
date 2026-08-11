import Image from "next/image";
import { prisma } from "../../../lib/prisma";

export default async function AdminInventoryPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Database Core</h2>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-1">Live Product Inventory</p>
        </div>
        <button className="bg-[#f0c808] text-black px-6 py-3 font-mono text-xs font-black uppercase tracking-widest hover:bg-white transition-colors">
          + Add Item
        </button>
      </div>

      <div className="bg-zinc-950 border border-white/10 overflow-x-auto">
        <table className="w-full text-left text-sm font-mono whitespace-nowrap">
          <thead className="bg-black text-zinc-500 border-b border-white/10 text-[10px] uppercase tracking-widest">
            <tr>
              <th className="p-4">SKU / Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-white/[0.02]">
                <td className="p-4">
                  <div className="w-10 h-12 bg-zinc-900 border border-white/10 overflow-hidden relative">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="40px"
                      className="object-cover opacity-80"
                    />
                  </div>
                </td>
                <td className="p-4 text-white uppercase text-xs font-bold">{product.name}</td>
                <td className="p-4 text-zinc-400 text-[10px]">{product.category}</td>
                <td className="p-4 text-[#f0c808] font-bold">₹{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}