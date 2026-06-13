import Navbar from "../../components/NavBar";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-zinc-400 selection:bg-[#f0c808] selection:text-black pt-32 pb-24">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="w-8 h-[1px] bg-[#f0c808] mb-6"></div>
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-12">
          Terms & Conditions
        </h1>
        
        <div className="space-y-8 font-mono text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="text-[#f0c808] uppercase tracking-widest mb-3">1. General Overview</h2>
            <p>Welcome to WEAR WHATEVER. By accessing our website and purchasing our products, you engage in our "Service" and agree to be bound by the following terms and conditions. These Terms apply to all users of the site.</p>
          </section>

          <section>
            <h2 className="text-[#f0c808] uppercase tracking-widest mb-3">2. Products & Accuracy</h2>
            <p>We have made every effort to display as accurately as possible the colors and images of our products. All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion. We reserve the right to discontinue any product at any time.</p>
          </section>

          <section>
            <h2 className="text-[#f0c808] uppercase tracking-widest mb-3">3. Billing & Account Information</h2>
            <p>We reserve the right to refuse any order you place with us. You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.</p>
          </section>
        </div>
      </div>
    </main>
  );
}