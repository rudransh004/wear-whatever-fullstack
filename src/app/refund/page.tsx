import Navbar from "../../components/NavBar";

export default function RefundPage() {
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
            Refund <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)]">Policy</span>
          </h1>
          <div className="flex gap-4 items-center font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            <span>Effective Date: {new Date().toLocaleDateString()}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-500"></span>
            <span>WearWhatever.in</span>
          </div>
        </div>
        
        {/* Legal Content */}
        <div className="space-y-12 text-zinc-300 text-sm md:text-base leading-relaxed font-mono">
          
          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">1. Return Eligibility (Standard Drops)</h2>
            <div className="space-y-4 text-zinc-400">
              <p>For our standard "Ready-to-Wear" catalog, we offer a <strong>7-day return and exchange policy</strong> from the date of delivery. To be eligible for a return, the garment must be:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Unworn, unwashed, and completely free of stains, odors, or pet hair.</li>
                <li>In its original packaging with all brand tags and labels completely intact.</li>
              </ul>
              <p>If the item fails our quality inspection upon return, it will be shipped back to you at your expense, and the refund will be denied.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">2. The 1-of-1 Custom Exception</h2>
            <div className="space-y-4 text-zinc-400 bg-zinc-950/50 border-l-2 border-[#f0c808] p-4">
              <p><strong className="text-white">Strict Non-Returnable Clause:</strong> Any garment generated via our AI Studio ("1-of-1 Custom Pieces") is manufactured exclusively based on your subjective parameters. Because there is zero back-catalog inventory for your specific design, <strong>all custom sales are final.</strong></p>
              <p>We do not accept returns or exchanges for sizing issues or "change of mind" on custom prints. Please consult our sizing matrix prior to minting.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">3. Defective or Damaged Anomalies (Unboxing Policy)</h2>
            <div className="space-y-4 text-zinc-400">
              <p>If your package arrives physically damaged or the print is misaligned, we take full financial responsibility. However, to prevent return fraud, we strictly require an <strong>uncut, unedited unboxing video</strong>.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You must record the package opening showing the original shipping label.</li>
                <li>Email the video to <strong className="text-white">support.wearwhatever@gmail.com</strong> within 48 hours of delivery.</li>
                <li>Once verified, we will dispatch a free replacement or initiate a full refund.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">4. Cancellation Protocol</h2>
            <div className="space-y-4 text-zinc-400">
              <p>Our manufacturing pipeline is highly automated. You may cancel your order for a full 100% refund <strong>strictly within 2 hours</strong> of placement. Once an order enters the "Processing" or "Printed" stage, structural cancellations are no longer possible as the fabric has already been cut and inked.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">5. Refund Processing</h2>
            <div className="space-y-4 text-zinc-400">
              <p>Once a return is received at our facility and passes the quality audit (allow 24-48 hours), your refund will be pushed to our payment gateway (Razorpay). </p>
              <p>Please allow <strong>5-7 business days</strong> for the funds to officially reflect in your original bank account, UPI wallet, or credit card. We do not provide cash refunds for prepaid orders.</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}