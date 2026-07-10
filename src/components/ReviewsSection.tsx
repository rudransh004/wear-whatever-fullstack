"use client";

import { useState, FormEvent } from "react";
import { Star } from "lucide-react";
import { submitReview } from "../app/product/[id]/actions";

interface ReviewsSectionProps {
  productId: string;
  reviews: any[];
  canReview: boolean;
}

export default function ReviewsSection({ productId, reviews, canReview }: ReviewsSectionProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1) 
    : 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const res = await submitReview(productId, rating, comment);
    
    if (res.success) {
      setMessage({ text: "Review authenticated and logged.", type: "success" });
      setComment(""); // Clear form
    } else {
      setMessage({ text: res.error || "Error", type: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="mt-20 border-t border-white/10 pt-16">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-4">
            User <span className="text-[#f0c808]">Telemetry</span>
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mt-2">Verified Purchase Reviews Only</p>
        </div>
        
        {reviews.length > 0 && (
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1 justify-end text-[#f0c808]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < Math.round(Number(averageRating)) ? "fill-[#f0c808]" : "text-zinc-700"} />
              ))}
            </div>
            <p className="font-mono text-2xl text-white font-bold">{averageRating} <span className="text-zinc-500 text-sm">/ 5.0</span></p>
            <p className="font-mono text-[10px] uppercase text-zinc-500 tracking-widest">{reviews.length} Records</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT: Submission Form (Only visible if they bought it) */}
        <div>
          {!canReview ? (
             <div className="bg-zinc-950 border border-white/5 p-8 text-center h-full flex flex-col justify-center">
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-2">Access Denied</p>
                <p className="text-zinc-600 font-mono text-[10px] uppercase">
                  Our system indicates you have not acquired this asset. Reviews are locked to verified owners only.
                </p>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-zinc-950 border border-white/10 p-6 md:p-8 space-y-6">
              <h3 className="text-lg font-black uppercase tracking-widest text-white border-b border-white/10 pb-4">Submit Evaluation</h3>
              
              {message && (
                <div className={`p-4 font-mono text-[10px] uppercase tracking-widest text-center border ${message.type === "success" ? "bg-green-500/10 border-green-500/30 text-green-500" : "bg-red-500/10 border-red-500/30 text-red-500"}`}>
                  {message.text}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Rating Override</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button type="button" key={star} onClick={() => setRating(star)} className="focus:outline-none transition-transform hover:scale-110">
                      <Star size={24} className={star <= rating ? "fill-[#f0c808] text-[#f0c808]" : "text-zinc-700"} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Field Notes (Optional)</label>
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="DETAIL YOUR EXPERIENCE WITH THIS ASSET..."
                  className="w-full bg-black border border-white/10 p-4 text-white font-mono text-xs focus:border-[#f0c808] outline-none h-24 uppercase resize-none placeholder-zinc-700"
                />
              </div>

              <button type="submit" disabled={loading} className="w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-[#f0c808] transition-colors disabled:opacity-50 text-xs">
                {loading ? "TRANSMITTING..." : "AUTHORIZE REVIEW"}
              </button>
            </form>
          )}
        </div>

        {/* RIGHT: Display Existing Reviews */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {reviews.length === 0 ? (
            <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest italic py-10">No telemetry data recorded yet.</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="bg-black border border-white/5 p-6 hover:border-white/20 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-white font-bold text-sm uppercase tracking-wide">
                      {rev.user?.email?.split('@')[0] || "Anonymous Entity"}
                    </p>
                    <p className="text-green-500 font-mono text-[8px] uppercase tracking-widest mt-1 border border-green-500/20 bg-green-500/10 inline-block px-2 py-0.5">
                      Verified Acquisition
                    </p>
                  </div>
                  <div className="flex text-[#f0c808]">
                     {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < rev.rating ? "fill-[#f0c808]" : "text-zinc-700"} />
                    ))}
                  </div>
                </div>
                {rev.comment && (
                  <p className="text-zinc-400 font-mono text-xs leading-relaxed uppercase">"{rev.comment}"</p>
                )}
                <p className="text-zinc-600 font-mono text-[10px] mt-4 uppercase">{rev.displayDate}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}