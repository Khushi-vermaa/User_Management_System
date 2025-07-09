import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", form);
      alert("User registered! Now login.");
      navigate("/login");
    } catch (err) {
      alert(
        "Registration failed: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center">
      <div className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-lg rounded-3xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 drop-shadow">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/60 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-200"
            >
              <option value="USER">User</option>
              <option value="SUB_ADMIN">Sub Admin</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
