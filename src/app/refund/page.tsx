import Navbar from "../../components/NavBar";

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-zinc-400 selection:bg-[#f0c808] selection:text-black pt-32 pb-24">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="w-8 h-[1px] bg-[#f0c808] mb-6"></div>
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-12">
          Refund Policy
        </h1>
        
        <div className="space-y-8 font-mono text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="text-[#f0c808] uppercase tracking-widest mb-3">1. Returns</h2>
            <p>Our standard return policy lasts 7 days. If 7 days have gone by since your purchase was delivered, unfortunately, we can’t offer you a refund or exchange. To be eligible for a return, your item must be unused, unwashed, and in the same condition that you received it.</p>
          </section>

          <section>
            <h2 className="text-[#f0c808] uppercase tracking-widest mb-3">2. 1-of-1 Custom Pieces</h2>
            <p>Please note: All AI-generated or "1-of-1" custom pieces created in the Studio are final sale. Because these items are manufactured specifically for your unique algorithmic design, they cannot be returned or exchanged unless there is a manufacturing defect.</p>
          </section>

          <section>
            <h2 className="text-[#f0c808] uppercase tracking-widest mb-3">3. Refunds Process</h2>
            <p>Once your return is received and inspected, we will send you an email to notify you. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment via Razorpay within 5-7 business days.</p>
          </section>
        </div>
      </div>
    </main>
  );
}