import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { ToggleLeft, ToggleRight, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface AIProvider {
  id: string;
  name: string;
  status: "active" | "inactive";
  usage: number;
}

export default function AIControlCenter() {
  const [providers, setProviders] = useState<AIProvider[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/ai/providers");
      if (res.data.success) setProviders(res.data.data);
    } catch {
      toast.error("Failed to load AI providers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const toggleProviderStatus = async (id: string, currentStatus: "active" | "inactive") => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      const res = await api.put(`/api/admin/ai/providers/${id}/status`, { status: newStatus });
      if (res.data.success) {
        toast.success(`Provider ${newStatus} successfully`);
        fetchProviders();
      }
    } catch {
      toast.error("Failed to update provider status");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">AI Control Center</h1>
        <button onClick={fetchProviders} className="border p-2 rounded-xl"><RefreshCw size={16} /></button>
      </div>
      <div className="border rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b dark:bg-slate-800">
            <tr>
              <th className="p-4">Provider</th>
              <th className="p-4">Status</th>
              <th className="p-4">Usage</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-4 text-center">Loading...</td></tr>
            ) : (
              providers.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="p-4">{p.name}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${p.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4">{p.usage} requests</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleProviderStatus(p.id, p.status)}
                      className={`p-2 border rounded ${p.status === "active" ? "text-amber-600 hover:bg-amber-50" : "text-emerald-600 hover:bg-emerald-50"}`}
                    >
                      {p.status === "active" ? <ToggleLeft size={16} /> : <ToggleRight size={16} />}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}