import Navbar from "../../components/NavBar";
import { Truck, MapPin, PackageX, Clock } from "lucide-react";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-[#f0c808] selection:text-black pt-32 pb-24 relative overflow-hidden font-sans">
      
      {/* Brutalist Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="w-16 h-1 bg-[#f0c808] mb-8"></div>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4 text-white">
            Shipping <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)]">Logistics</span>
          </h1>
          <div className="flex gap-4 items-center font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            <span>Network: PAN-INDIA</span>
            <span className="w-1 h-1 rounded-full bg-zinc-500"></span>
            <span>WearWhatever.in</span>
          </div>
        </div>
        
        {/* Logistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 font-mono text-sm">
          <div className="border border-white/10 bg-zinc-950/50 p-6 flex items-start gap-4">
            <Clock className="w-6 h-6 text-[#f0c808] shrink-0" />
            <div>
              <h3 className="text-white font-bold uppercase tracking-widest mb-1">Standard Drops</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">Dispatched within 24-48 hours from our primary fulfillment center.</p>
            </div>
          </div>
          <div className="border border-white/10 bg-zinc-950/50 p-6 flex items-start gap-4">
            <Truck className="w-6 h-6 text-[#f0c808] shrink-0" />
            <div>
              <h3 className="text-white font-bold uppercase tracking-widest mb-1">1-of-1 Custom Mints</h3>
              <p className="text-zinc-500 text-xs leading-relaxed">Requires proprietary AI printing. Dispatched within 4-6 business days.</p>
            </div>
          </div>
        </div>

        {/* Legal Content */}
        <div className="space-y-12 text-zinc-300 text-sm md:text-base leading-relaxed font-mono">
          
          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-zinc-500" /> Transit & Delivery Timelines
            </h2>
            <div className="space-y-4 text-zinc-400">
              <p>We partner with Tier-1 Indian logistics networks (Delhivery, BlueDart, XpressBees) to ensure secure transit. Estimated delivery times post-dispatch:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white">Tier 1 Metro Cities:</strong> 2 to 4 business days.</li>
                <li><strong className="text-white">Tier 2 & 3 Cities:</strong> 4 to 7 business days.</li>
                <li><strong className="text-white">Remote Pin Codes:</strong> 7 to 10 business days.</li>
              </ul>
              <p>You will receive a live tracking uplink via SMS and Email the moment your parcel is handed to our delivery partners.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">Shipping Tariffs</h2>
            <div className="space-y-4 text-zinc-400">
              <p>We believe in transparent pricing. </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Standard Shipping is <strong className="text-[#f0c808]">100% FREE</strong> on all prepaid orders exceeding ₹1,999.</li>
                <li>For orders under ₹1,999, a flat-rate shipping fee of ₹99 is applied at checkout.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4 flex items-center gap-2">
              <PackageX className="w-5 h-5 text-zinc-500" /> RTO (Return to Origin) & Address Faults
            </h2>
            <div className="space-y-4 text-zinc-400">
              <p>The logistics partner will attempt delivery 3 times. If the customer is unavailable, rejects the delivery, or if the provided address/phone number is structurally invalid, the package will be Returned to Origin (RTO).</p>
              <p>If an RTO occurs due to customer negligence, <strong className="text-white">a reshipping fee of ₹150 will be charged</strong> to re-dispatch the item. For 1-of-1 custom pieces, no refunds are provided for RTOs; you must pay the reshipping fee to claim your custom garment.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">Delays & Force Majeure</h2>
            <div className="space-y-4 text-zinc-400">
              <p>While 95% of our orders arrive on schedule, transit times may be affected by extreme weather, state holidays, or logistical network strikes. WearWhatever is not financially liable for delays caused by external courier constraints, but our support team will aggressively coordinate with the carrier on your behalf.</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}