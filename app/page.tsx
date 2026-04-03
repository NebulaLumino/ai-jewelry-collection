"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: form }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || "No output received.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className={"text-3xl font-bold mb-2 text-green-400"}>AI Jewelry Collection Curator</h1>
        <p className="text-gray-400 mb-8">Generate jewelry collection curation and styling reports</p>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="space-y-3">
          <select value={form.metalPreference || ""} onChange={e => setForm(f => ({...f, metalPreference: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Preferred Metals</option><option value="yellow-gold">Yellow Gold</option><option value="white-gold">White Gold</option><option value="rose-gold">Rose Gold</option><option value="silver">Silver / Sterling Silver</option><option value="platinum">Platinum</option><option value="mixed">Mixed Metals</option></select>
          <select value={form.gemstonePreference || ""} onChange={e => setForm(f => ({...f, gemstonePreference: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Gemstone Preferences</option><option value="diamonds">Diamonds</option><option value="colored-stones">Colored Stones (sapphire, ruby, emerald)</option><option value="pearls">Pearls</option><option value="semi-precious">Semi-Precious</option><option value="no-preference">No Gemstone Preference</option></select>
          <textarea placeholder="List pieces you already own" value={form.existingCollection || ""} onChange={e => setForm(f => ({...f, existingCollection: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 h-20" />
          <textarea placeholder="work, formal events, casual, travel" value={form.occasions || ""} onChange={e => setForm(f => ({...f, occasions: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 h-20" />
          <select value={form.budgetRange || ""} onChange={e => setForm(f => ({...f, budgetRange: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Budget Range</option><option value="entry">Entry Level ($100-$500)</option><option value="midrange">Mid-Range ($500-$2,000)</option><option value="luxury">Luxury ($2,000-$10,000)</option><option value="investment">Investment Grade ($10,000+)</option></select>
          <select value={form.personalStyle || ""} onChange={e => setForm(f => ({...f, personalStyle: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Personal Style</option><option value="classic">Classic / Timeless</option><option value="modern">Modern / Minimalist</option><option value="bohemian">Bohemian / Artistic</option><option value="vintage">Vintage / Antique</option><option value="bold">Bold / Statement</option></select>
          <textarea placeholder="e.g. nickel sensitivity" value={form.metalAllergies || ""} onChange={e => setForm(f => ({...f, metalAllergies: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 h-20" />
          <select value={form.investmentVsFashion || ""} onChange={e => setForm(f => ({...f, investmentVsFashion: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Investment vs Fashion Priority</option><option value="investment">Primarily Investment Pieces</option><option value="fashion">Primarily Fashion Pieces</option><option value="balanced">Balanced Mix</option></select>
          </div>
          <button type="submit" disabled={loading}
            className={"w-full py-3 px-6 rounded-lg font-semibold bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white transition"}>
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
        {error && <div className="p-4 rounded-lg bg-red-900/50 text-red-300">{error}</div>}
        {output && <div className="p-6 rounded-lg bg-gray-800 whitespace-pre-wrap text-gray-200 font-mono text-sm border border-gray-700">{output}</div>}
      </div>
    </div>
  );
}
