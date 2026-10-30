import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { Users, Cpu, Activity, RefreshCw, DollarSign, ArrowUpRight } from "lucide-react";
import toast from "react-hot-toast";

interface DashboardData {
  users: { total: number; proUsers: number; admins: number; newThisWeek: number; };
  subscriptions: Array<{ _id: string; count: number }>;
  ai: { totalRequests: number; successfulRequests: number; failedRequests: number; };
  systemHealth: { status: string; uptime: number; };
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/dashboard");
      if (res.data.success) setData(res.data.data);
    } catch {
      toast.error("Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Control Center</h1>
          <p className="text-sm text-slate-500">Monitor SaaS health, users, AI operations, and revenue.</p>
        </div>
        <button onClick={fetchDashboard} className="border px-4 py-2 rounded-xl flex items-center gap-2 bg-white dark:bg-slate-800 shadow-xs hover:bg-slate-50">
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (<div key={i} className="border rounded-2xl p-6 bg-white dark:bg-slate-900 animate-pulse h-32" />))}
        </div>
      ) : data ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-slate-500">Total Users</span>
                <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600"><Users size={20} /></div>
              </div>
              <div className="text-3xl font-bold">{data.users.total}</div>
              <div className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1"><ArrowUpRight size={14} /> +{data.users.newThisWeek} new this week</div>
            </div>
            <div className="border rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-slate-500">Pro Subscribers</span>
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600"><DollarSign size={20} /></div>
              </div>
              <div className="text-3xl font-bold">{data.users.proUsers}</div>
              <div className="mt-2 text-xs text-slate-500">Active premium plans</div>
            </div>
            <div className="border rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-slate-500">AI Requests</span>
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600"><Cpu size={20} /></div>
              </div>
              <div className="text-3xl font-bold">{data.ai.totalRequests}</div>
              <div className="mt-2 text-xs text-slate-500">Total API calls processed</div>
            </div>
            <div className="border rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium text-slate-500">System Status</span>
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600"><Activity size={20} /></div>
              </div>
              <div className="text-3xl font-bold text-emerald-600 capitalize">{data.systemHealth.status}</div>
              <div className="mt-2 text-xs text-slate-500">Uptime: {data.systemHealth.uptime} hrs</div>
            </div>
          </div>
        </>
      ) : (
        <div className="border rounded-2xl bg-white dark:bg-slate-900 p-6 text-center">Failed to load dashboard metrics.</div>
      )}
    </div>
  );
}
