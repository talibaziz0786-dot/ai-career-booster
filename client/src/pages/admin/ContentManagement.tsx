import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { Upload, Trash2, Eye, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface ContentTemplate {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export default function ContentManagement() {
  const [templates, setTemplates] = useState<ContentTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/content/templates");
      if (res.data.success) setTemplates(res.data.data);
    } catch {
      toast.error("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file first");

    const formData = new FormData();
    formData.append("template", file);

    try {
      const res = await api.post("/api/admin/content/templates", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        toast.success("Template uploaded successfully");
        fetchTemplates();
        setFile(null);
      }
    } catch {
      toast.error("Failed to upload template");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this template?")) return;
    try {
      const res = await api.delete(`/admin/content/templates/${id}`);
      if (res.data.success) {
        toast.success("Template deleted successfully");
        fetchTemplates();
      }
    } catch {
      toast.error("Failed to delete template");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <button onClick={fetchTemplates} className="border p-2 rounded-xl"><RefreshCw size={16} /></button>
      </div>

      <div className="border rounded-2xl bg-white dark:bg-slate-900 p-6">
        <div className="flex items-center gap-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="border px-4 py-2 rounded-xl text-sm"
          />
          <button
            onClick={handleUpload}
            className="bg-cyan-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-cyan-600 transition-colors"
          >
            <Upload size={16} /> Upload Template
          </button>
        </div>
      </div>

      <div className="border rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b dark:bg-slate-800">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Created</th>
              <th className="p-4">Updated</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-center">Loading...</td></tr>
            ) : (
              templates.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="p-4">{t.name}</td>
                  <td className="p-4">{t.type}</td>
                  <td className="p-4">{new Date(t.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">{new Date(t.updatedAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button className="p-2 border rounded text-blue-500"><Eye size={16} /></button>
                    <button onClick={() => handleDelete(t.id)} className="p-2 border text-red-500 rounded"><Trash2 size={16} /></button>
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