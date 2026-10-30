import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { Shield, ShieldAlert, ShieldCheck, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface SecuritySetting {
  id: string;
  name: string;
  description: string;
  status: boolean;
}

export default function Security() {
  const [settings, setSettings] = useState<SecuritySetting[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/security");
      if (res.data.success) setSettings(res.data.data);
    } catch {
      toast.error("Failed to load security settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const toggleSetting = async (id: string, currentStatus: boolean) => {
    try {
      const res = await api.put(`/api/admin/security/settings/${id}`, { status: !currentStatus });
      if (res.data.success) {
        toast.success("Setting updated successfully");
        fetchSettings();
      }
    } catch {
      toast.error("Failed to update setting");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Security Center</h1>
        <button onClick={fetchSettings} className="border p-2 rounded-xl"><RefreshCw size={16} /></button>
      </div>

      <div className="border rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b dark:bg-slate-800">
            <tr>
              <th className="p-4">Setting</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="p-4 text-center">Loading...</td></tr>
            ) : (
              settings.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Shield size={16} />
                      <span className="font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{s.description}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleSetting(s.id, s.status)}
                      className={`p-2 border rounded ${s.status ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
                    >
                      {s.status ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
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