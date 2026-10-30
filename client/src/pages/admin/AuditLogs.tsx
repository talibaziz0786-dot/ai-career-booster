import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface LogItem {
  _id: string;
  adminId?: { name: string; email: string };
  action: string;
  target: string;
  details: string;
  ip: string;
  createdAt: string;
}

export default function AuditLogs() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/logs");
      if (res.data.success) setLogs(res.data.data);
    } catch {
      toast.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Audit Logs</h1>
          <p className="text-sm text-slate-500">Track all administrative actions and system security events.</p>
        </div>
        <button onClick={fetchLogs} className="border p-2 rounded-xl bg-white dark:bg-slate-800"><RefreshCw size={16} /></button>
      </div>

      <div className="border rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b dark:bg-slate-800">
            <tr>
              <th className="p-4">Admin</th>
              <th className="p-4">Action</th>
              <th className="p-4">Target</th>
              <th className="p-4">Details</th>
              <th className="p-4">IP Address</th>
              <th className="p-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-6 text-center text-slate-500">Loading audit logs...</td></tr>
            ) : logs.length === 0 ? (
              <tr><td colSpan={6} className="p-6 text-center text-slate-500">No audit logs recorded yet.</td></tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id} className="border-b hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-4 font-medium">{log.adminId?.name || "System Admin"} <span className="block text-xs text-slate-400">{log.adminId?.email}</span></td>
                  <td className="p-4"><span className="px-2 py-1 bg-cyan-50 text-cyan-700 rounded-md text-xs font-semibold">{log.action}</span></td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{log.target}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300">{log.details}</td>
                  <td className="p-4 text-xs text-slate-500 font-mono">{log.ip}</td>
                  <td className="p-4 text-right text-xs text-slate-500">{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
