"use client";

import { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";

// Match this to your Prisma schema types
type Expense = {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
};

export default function DashboardClient() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const res = await fetch("/api/expenses");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      {/* Left Column: Stats & Form */}
      <div className="space-y-6">
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
          <h3 className="text-sm text-zinc-400 font-medium">Total Expenses</h3>
          <p className="text-4xl font-bold tracking-tight text-white mt-1">
            ₹{totalExpense.toLocaleString("en-IN")}
          </p>
        </div>

        <ExpenseForm onExpenseAdded={fetchExpenses} />
      </div>

      {/* Right Column: Expense List */}
      <div className="md:col-span-2">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-zinc-800 flex justify-between items-center">
            <h3 className="font-semibold text-zinc-200">Recent Transactions</h3>
            <span className="text-xs text-zinc-500">{expenses.length} entries</span>
          </div>

          {loading ? (
            <div className="p-10 text-center text-sm text-zinc-500 animate-pulse">
              Loading ledger...
            </div>
          ) : expenses.length === 0 ? (
            <div className="p-10 text-center text-sm text-zinc-500">
              No expenses logged yet.
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/50 max-h-[600px] overflow-y-auto">
              {expenses.map((expense) => (
                <div key={expense.id} className="p-4 flex justify-between items-center hover:bg-zinc-800/20 transition-colors">
                  <div>
                    <p className="font-medium text-sm text-zinc-200">{expense.description}</p>
                    <div className="flex gap-2 items-center mt-1.5">
                      <span className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full font-medium">
                        {expense.category}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {new Date(expense.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-zinc-100">₹{expense.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}