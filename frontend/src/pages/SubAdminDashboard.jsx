import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/navbar";

function SubAdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    API.get("/users").then((res) => {
      const onlyUsers = res.data.users.filter((u) => u.role === "USER");
      setUsers(onlyUsers);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await API.put(`/user/${editUserId}`, editedUserData);
      const updatedUser = res.data;

      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === editUserId ? updatedUser : u))
      );

      setEditUserId(null);
      setEditedUserData({ name: "", email: "" });
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/user/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error(
        "Failed to delete user:",
        error.response?.data || error.message
      );
    }
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditedUserData({ name: user.name, email: user.email });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 backdrop-blur-sm">
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Sub-Admin Dashboard
        </h1>

        <div className="overflow-x-auto shadow-xl rounded-2xl bg-white/30 backdrop-blur-md border border-white/50">
          <table className="w-full text-sm text-left text-gray-800">
            <thead className="bg-white/40 backdrop-blur-lg border-b border-white/30">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-white/30 transition duration-200"
                >
                  <td className="px-6 py-4">{u.id}</td>
                  <td className="px-6 py-4">
                    {editUserId === u.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedUserData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1 rounded-md bg-white/70 text-black outline-none"
                      />
                    ) : (
                      u.name
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editUserId === u.id ? (
                      <input
                        type="email"
                        name="email"
                        value={editedUserData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-1 rounded-md bg-white/70 text-black outline-none"
                      />
                    ) : (
                      u.email
                    )}
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    {editUserId === u.id ? (
                      <>
                        <button
                          onClick={handleUpdate}
                          className="bg-green-400 hover:bg-green-500 text-white px-4 py-1 rounded-xl shadow-md backdrop-blur-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditUserId(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded-xl shadow-md backdrop-blur-sm"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(u)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-xl shadow-md backdrop-blur-sm"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-xl shadow-md backdrop-blur-sm"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-6">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SubAdminDashboard;
