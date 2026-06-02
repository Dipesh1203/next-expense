"use client";

import { useState } from "react";

export default function ExpenseForm({ onExpenseAdded }: { onExpenseAdded: () => void }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food & Groceries");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, description, category, date }),
    });

    setLoading(false);
    if (res.ok) {
      setAmount("");
      setDescription("");
      onExpenseAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl space-y-4 max-w-md text-white">
      <h3 className="text-lg font-semibold tracking-tight text-zinc-200">Log New Expense</h3>

      <div>
        <label className="block text-xs text-zinc-400 mb-1">Description (e.g., Snacks, Bus Ticket)</label>
        <input
          type="text" value={description} onChange={(e) => setDescription(e.target.value)} required
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-400 mb-1">Amount (₹)</label>
          <input
            type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="block text-xs text-zinc-400 mb-1">Category</label>
          <select
            value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 text-zinc-300"
          >
            <option>Travel & Transit</option>
            <option>Food & Groceries</option>
            <option>Snacks & Refreshments</option>
            <option>Health & Diet</option>
            <option>Mobile & Utilities</option>
            <option>Academics & Career</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs text-zinc-400 mb-1">Date</label>
        <input
          type="date" value={date} onChange={(e) => setDate(e.target.value)} required
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
        />
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-medium py-2 rounded-lg text-sm transition-colors"
      >
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
}