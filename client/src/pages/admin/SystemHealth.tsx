import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { RefreshCw, AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface SystemStatus {
  name: string;
  status: "healthy" | "warning" | "critical";
  message: string;
  lastChecked: string;
}

export default function SystemHealth() {
  const [statuses, setStatuses] = useState<SystemStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStatuses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/system/status");
      if (res.data.success) setStatuses(res.data.data);
    } catch {
      toast.error("Failed to load system status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle2 className="text-emerald-500" size={16} />;
      case "warning":
        return <AlertTriangle className="text-amber-500" size={16} />;
      case "critical":
        return <AlertCircle className="text-red-500" size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">System Health</h1>
        <button onClick={fetchStatuses} className="border p-2 rounded-xl"><RefreshCw size={16} /></button>
      </div>

      <div className="border rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b dark:bg-slate-800">
            <tr>
              <th className="p-4">Service</th>
              <th className="p-4">Status</th>
              <th className="p-4">Message</th>
              <th className="p-4">Last Checked</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-4 text-center">Loading...</td></tr>
            ) : (
              statuses.map((s, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">{s.name}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(s.status)}
                      <span className={`font-medium ${s.status === "healthy" ? "text-emerald-600" : s.status === "warning" ? "text-amber-600" : "text-red-600"}`}>
                        {s.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">{s.message}</td>
                  <td className="p-4">{new Date(s.lastChecked).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}