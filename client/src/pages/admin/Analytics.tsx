import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { RefreshCw, Users, BarChart2, PieChart } from "lucide-react";
import toast from "react-hot-toast";

interface AnalyticsData {
  users: {
    total: number;
    active: number;
    inactive: number;
  };
  aiUsage: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
  };
  subscriptions: {
    active: number;
    expired: number;
    cancelled: number;
  };
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/analytics");
      if (res.data.success) setData(res.data.data);
    } catch {
      toast.error("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <button onClick={fetchAnalytics} className="border p-2 rounded-xl"><RefreshCw size={16} /></button>
      </div>

      {loading ? (
        <div className="border rounded-2xl bg-white dark:bg-slate-900 p-6 text-center">Loading...</div>
      ) : data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Users Card */}
          <div className="border rounded-2xl bg-white dark:bg-slate-900 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="text-cyan-500" size={20} />
              <h2 className="text-lg font-medium">Users</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Users</span>
                <span className="font-medium">{data.users.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Active Users</span>
                <span className="font-medium">{data.users.active}</span>
              </div>
              <div className="flex justify-between">
                <span>Inactive Users</span>
                <span className="font-medium">{data.users.inactive}</span>
              </div>
            </div>
          </div>

          {/* AI Usage Card */}
          <div className="border rounded-2xl bg-white dark:bg-slate-900 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="text-cyan-500" size={20} />
              <h2 className="text-lg font-medium">AI Usage</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Today</span>
                <span className="font-medium">{data.aiUsage.today}</span>
              </div>
              <div className="flex justify-between">
                <span>This Week</span>
                <span className="font-medium">{data.aiUsage.thisWeek}</span>
              </div>
              <div className="flex justify-between">
                <span>This Month</span>
                <span className="font-medium">{data.aiUsage.thisMonth}</span>
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-medium">{data.aiUsage.total}</span>
              </div>
            </div>
          </div>

          {/* Subscriptions Card */}
          <div className="border rounded-2xl bg-white dark:bg-slate-900 p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="text-cyan-500" size={20} />
              <h2 className="text-lg font-medium">Subscriptions</h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Active</span>
                <span className="font-medium">{data.subscriptions.active}</span>
              </div>
              <div className="flex justify-between">
                <span>Expired</span>
                <span className="font-medium">{data.subscriptions.expired}</span>
              </div>
              <div className="flex justify-between">
                <span>Cancelled</span>
                <span className="font-medium">{data.subscriptions.cancelled}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-2xl bg-white dark:bg-slate-900 p-6 text-center">No data available</div>
      )}
    </div>
  );
}