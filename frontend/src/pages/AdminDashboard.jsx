import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/navbar";
import { jwtDecode } from "jwt-decode";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");
  const { id: adminId } = jwtDecode(token);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users", {
        params: {
          search: searchTerm,
          page,
          limit,
          role: roleFilter,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(
        "Failed to fetch users:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, roleFilter, page]);

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditedUserData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const handleCancel = () => {
    setEditUserId(null);
    setEditedUserData({ name: "", email: "", role: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await API.put(`/user/${editUserId}`, editedUserData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updated = res.data;
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      fetchUsers();
      handleCancel();
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (userId) => {
    if (userId === adminId) {
      alert("Admin apna aapko delete nahi kar sakta!");
      return;
    }

    if (window.confirm("Are you sure to delete this user?")) {
      try {
        await API.delete(`/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers((prev) => prev.filter((u) => u.id !== userId));
      } catch (err) {
        console.error("Delete failed:", err.response?.data || err.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded-md w-64"
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="">All Roles</option>
            <option value="ADMIN">ADMIN</option>
            <option value="SUB_ADMIN">SUB_ADMIN</option>
            <option value="USER">USER</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="p-2">{u.id}</td>
                  <td className="p-2">
                    {editUserId === u.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedUserData.name}
                        onChange={handleInputChange}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      u.name
                    )}
                  </td>
                  <td className="p-2">
                    {editUserId === u.id ? (
                      <input
                        type="email"
                        name="email"
                        value={editedUserData.email}
                        onChange={handleInputChange}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      u.email
                    )}
                  </td>
                  <td className="p-2">
                    {editUserId === u.id ? (
                      <select
                        name="role"
                        value={editedUserData.role}
                        onChange={handleInputChange}
                        className="border px-2 py-1 rounded"
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="SUB_ADMIN">SUB_ADMIN</option>
                        <option value="USER">USER</option>
                      </select>
                    ) : (
                      u.role
                    )}
                  </td>
                  <td className="p-2 space-x-2">
                    {editUserId === u.id ? (
                      <>
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(u)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-1 border rounded ${
                page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
