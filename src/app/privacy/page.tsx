import Navbar from "../../components/NavBar";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-zinc-400 selection:bg-[#f0c808] selection:text-black pt-32 pb-24">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="w-8 h-[1px] bg-[#f0c808] mb-6"></div>
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-12">
          Privacy Policy
        </h1>
        
        <div className="space-y-8 font-mono text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="text-[#f0c808] uppercase tracking-widest mb-3">1. Information Collection</h2>
            <p>When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address, and email address. We do not store your credit card or payment details directly; these are securely processed by our payment gateway (Razorpay).</p>
          </section>

          <section>
            <h2 className="text-[#f0c808] uppercase tracking-widest mb-3">2. Consent</h2>
            <p>When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.</p>
          </section>

          <section>
            <h2 className="text-[#f0c808] uppercase tracking-widest mb-3">3. Security</h2>
            <p>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed. Our databases are secured via Supabase encrypted environments.</p>
          </section>
        </div>
      </div>
    </main>
  );
}