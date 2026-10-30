import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { Trash2, UserX, UserCheck, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  isProUser?: boolean;
  createdAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/admin/users?search=${search}`);
      if (res.data.success) setUsers(res.data.data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleStatusToggle = async (id: string, currentStatus?: string) => {
    const newStatus = currentStatus === "suspended" ? "active" : "suspended";
    try {
      const res = await api.put(`/api/admin/users/${id}/status`, { status: newStatus });
      if (res.data.success) {
        toast.success(`User ${newStatus} successfully`);
        fetchUsers();
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const res = await api.delete(`/api/admin/users/${id}`);
      if (res.data.success) {
        toast.success("User deleted successfully");
        fetchUsers();
      }
    } catch {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-xl text-sm"
          />
          <button onClick={fetchUsers} className="border p-2 rounded-xl"><RefreshCw size={16} /></button>
        </div>
      </div>
      <div className="border rounded-2xl bg-white dark:bg-slate-900 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b dark:bg-slate-800">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Plan</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-center">Loading...</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u._id} className="border-b">
                  <td className="p-4"><div>{u.name}</div><div className="text-xs text-slate-500">{u.email}</div></td>
                  <td className="p-4">{u.role}</td>
                  <td className="p-4">{u.status || "active"}</td>
                  <td className="p-4">{u.isProUser ? "Pro" : "Free"}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button onClick={() => handleStatusToggle(u._id, u.status)} className="p-2 border rounded">
                      {u.status === "suspended" ? <UserCheck size={16} /> : <UserX size={16} />}
                    </button>
                    <button onClick={() => handleDelete(u._id)} className="p-2 border text-red-500 rounded"><Trash2 size={16} /></button>
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