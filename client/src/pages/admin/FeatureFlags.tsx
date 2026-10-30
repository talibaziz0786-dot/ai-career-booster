import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { ToggleLeft, ToggleRight, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  status: boolean;
}

export default function FeatureFlags() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFlags = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/feature-flags");
      if (res.data.success) setFlags(res.data.data);
    } catch {
      toast.error("Failed to load feature flags");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  const toggleFlag = async (id: string, currentStatus: boolean) => {
    try {
      const res = await api.put(`/api/admin/feature-flags/${id}`, { status: !currentStatus });
      if (res.data.success) {
        toast.success("Feature flag updated successfully");
        fetchFlags();
      }
    } catch {
      toast.error("Failed to update feature flag");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Feature Flags</h1>
        <button onClick={fetchFlags} className="border p-2 rounded-xl"><RefreshCw size={16} /></button>
      </div>

      <div className="border rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b dark:bg-slate-800">
            <tr>
              <th className="p-4">Feature</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="p-4 text-center">Loading...</td></tr>
            ) : (
              flags.map((flag) => (
                <tr key={flag.id} className="border-b">
                  <td className="p-4">{flag.name}</td>
                  <td className="p-4">{flag.description}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleFlag(flag.id, flag.status)}
                      className={`p-2 border rounded ${flag.status ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
                    >
                      {flag.status ? <ToggleLeft size={16} /> : <ToggleRight size={16} />}
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