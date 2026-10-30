import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { RefreshCw, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

interface PaymentItem {
  id: string;
  user?: { name: string; email: string };
  amount: number;
  currency: string;
  status: string;
  razorpayPaymentId: string;
  createdAt: string;
}

export default function PaymentManagement() {
  const [payments, setPayments] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/payments");
      if (res.data.success) setPayments(res.data.data);
    } catch {
      toast.error("Failed to load payment transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPayments(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Payment Management</h1>
          <p className="text-sm text-slate-500">Track financial transactions, Razorpay payments, and invoices.</p>
        </div>
        <button onClick={fetchPayments} className="border p-2 rounded-xl bg-white dark:bg-slate-800"><RefreshCw size={16} /></button>
      </div>

      <div className="border rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b dark:bg-slate-800">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Payment ID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-6 text-center text-slate-500">Loading payments...</td></tr>
            ) : payments.length === 0 ? (
              <tr><td colSpan={5} className="p-6 text-center text-slate-500">No payment transactions found.</td></tr>
            ) : (
              payments.map((p) => (
                <tr key={p.id} className="border-b hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-4 font-medium">{p.user?.name || "Customer"} <span className="block text-xs text-slate-400">{p.user?.email}</span></td>
                  <td className="p-4 text-xs font-mono text-slate-600 dark:text-slate-300 flex items-center gap-1.5"><CreditCard size={14} /> {p.razorpayPaymentId}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">₹{p.amount} {p.currency}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium capitalize">
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-right text-xs text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
