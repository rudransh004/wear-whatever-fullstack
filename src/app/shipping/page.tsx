import Navbar from "../../components/NavBar";

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-zinc-400 selection:bg-[#f0c808] selection:text-black pt-32 pb-24">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="w-8 h-[1px] bg-[#f0c808] mb-6"></div>
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-12">
          Shipping Policy
        </h1>
        
        <div className="space-y-8 font-mono text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="text-[#f0c808] uppercase tracking-widest mb-3">1. Dispatch Timelines</h2>
            <p>All standard catalog orders are processed and dispatched within 2-3 business days. "1-of-1" custom algorithmic pieces require dedicated printing time and are dispatched within 5-7 business days.</p>
          </section>

          <section>
            <h2 className="text-[#f0c808] uppercase tracking-widest mb-3">2. Delivery Timelines (India)</h2>
            <p>Once dispatched, standard delivery within India takes approximately 3-5 business days depending on your location. You will receive a tracking link via email the moment your order leaves our facility.</p>
          </section>

          <section>
            <h2 className="text-[#f0c808] uppercase tracking-widest mb-3">3. Shipping Costs</h2>
            <p>We offer free standard shipping on all orders above ₹2000 within India. For orders below this amount, a standard flat-rate shipping fee will be calculated and displayed at checkout.</p>
          </section>
        </div>
      </div>
    </main>
  );
}