import { prisma } from "../../../lib/prisma";

export default async function AdminCustomersPage() {
  // FIX: Removed the orderBy: { createdAt: 'desc' } since it doesn't exist in your DB yet
  const users = await prisma.user.findMany({
    include: { orders: true }
  });

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Client Roster</h2>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-1">Authenticated user database</p>
        </div>
        <div className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
          Total Users: {users.length}
        </div>
      </div>

      <div className="bg-zinc-950 border border-white/10 overflow-x-auto">
        <table className="w-full text-left text-sm font-mono whitespace-nowrap">
          <thead className="bg-black text-zinc-500 border-b border-white/10 text-[10px] uppercase tracking-widest">
            <tr>
              <th className="p-4">User ID</th>
              <th className="p-4">Email Contact</th>
              <th className="p-4">Total Orders</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-white/[0.02]">
                {/* FIX: Safely handling the ID display in case it's shorter than 12 chars */}
                <td className="p-4 text-zinc-500 text-[10px]">{String(user.id).substring(0, 12)}...</td>
                <td className="p-4 text-white uppercase text-xs font-bold">{user.email}</td>
                <td className="p-4 text-[#f0c808] font-bold">{user.orders.length} Deployments</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-zinc-600 text-xs uppercase tracking-widest">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}