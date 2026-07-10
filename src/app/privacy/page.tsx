export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#020202] text-white pt-32 pb-20 px-6 font-sans relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="w-16 h-1 bg-[#f0c808] mb-8"></div>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4">
            Privacy <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)]">Policy</span>
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
            <p className="text-zinc-400">
              This Privacy Policy describes how WearWhatever.in (the "Site" or "we") collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">1. Collecting Personal Information</h2>
            <div className="space-y-4 text-zinc-400">
              <p>When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.</p>
              
              <h3 className="text-white font-bold mt-4">Device Information</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Purpose of collection:</strong> to load the Site accurately for you, and to perform analytics on Site usage to optimize our platform.</li>
                <li><strong>Source of collection:</strong> Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels.</li>
                <li><strong>Personal Information collected:</strong> version of web browser, IP address, time zone, cookie information, what sites or products you view, and how you interact with the Site.</li>
              </ul>

              <h3 className="text-white font-bold mt-4">Order & Account Information</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Purpose of collection:</strong> to provide products or services to you, to process your payment information, arrange for shipping, and provide you with invoices and/or order confirmations, screen our orders for potential risk or fraud, and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
                <li><strong>Source of collection:</strong> collected directly from you via Secure Magic Links or third-party OAuth providers (Google, GitHub).</li>
                <li><strong>Personal Information collected:</strong> name, billing address, shipping address, payment confirmation details (we do not store raw credit card data), email address, and phone number.</li>
              </ul>

              <h3 className="text-white font-bold mt-4">AI Studio Interaction Data</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Purpose of collection:</strong> to generate custom 1-of-1 artwork based on your text input and map it to physical garments for manufacturing.</li>
                <li><strong>Personal Information collected:</strong> specific text prompts inputted into the AI generator, and the resulting digital image files associated with your User ID.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">2. Sharing Personal Information</h2>
            <div className="space-y-4 text-zinc-400">
              <p>We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>We use Supabase and PostgreSQL to securely store your data. Their cloud infrastructure operates on enterprise-grade encryption.</li>
                <li>We use strictly vetted payment processors (e.g., Razorpay) to handle financial transactions securely.</li>
                <li>We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</li>
              </ul>
              <p className="text-white font-bold">Zero Sale Guarantee: We strictly do not sell your personal data, nor do we feed your private AI text prompts back into foundational AI models for public training without explicit, opt-in consent.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">3. Behavioral Advertising</h2>
            <div className="space-y-4 text-zinc-400">
              <p>As described above, we may use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>We use Google Analytics to help us understand how our customers use the Site. You can read more about how Google uses your Personal Information here: <a href="https://policies.google.com/privacy" className="text-[#f0c808] hover:underline" target="_blank" rel="noreferrer">https://policies.google.com/privacy</a>.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">4. Using Personal Information</h2>
            <div className="space-y-4 text-zinc-400">
              <p>We use your personal Information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your custom AI-generated order, and keeping you up to date on new products, services, and offers.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">5. Retention & Your Rights</h2>
            <div className="space-y-4 text-zinc-400">
              <p>When you place an order through the Site, we will retain your Personal Information for our records unless and until you ask us to erase this information. Due to tax and compliance laws in India, certain transactional records must be maintained for a specified duration.</p>
              <p>Under applicable data protection laws (including the Digital Personal Data Protection Act), you have the right to access the personal information we hold about you, to port it to a new service, and to ask that your personal information be corrected, updated, or erased. If you would like to exercise these rights, please contact us through the contact information below.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">6. Minors</h2>
            <div className="space-y-4 text-zinc-400">
              <p>The Site is not intended for individuals under the age of 18. We do not intentionally collect Personal Information from children. If you are the parent or guardian and believe your child has provided us with Personal Information, please contact us at the address below to request deletion.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">7. Contact & Compliance</h2>
            <div className="space-y-4 text-zinc-400">
              <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at:</p>
              <div className="bg-zinc-950 border border-white/10 p-4 inline-block mt-2">
                <p className="font-bold text-white">Wear Whatever Security & Privacy Uplink</p>
                <p>Email: support.wearwhatever@gmail.com</p>
                <p>Support: support.wearwhatever@gmail.com</p>
                <p>Phone:+91 8755980102</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}