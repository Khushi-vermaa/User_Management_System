import { useEffect, useState } from "react";
import API from "../services/api";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/navbar";

function UserProfile() {
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { id } = jwtDecode(token);

  useEffect(() => {
    API.get(`/profile/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const user = res.data.data;
        console.log(user);
        if (user) {
          setProfile(user);
          setEditedProfile({ name: user.name || "", email: user.email || "" });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Profile fetch failed:",
          err.response?.data || err.message
        );
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await API.put(
        `/user/${id}`,
        { ...editedProfile },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data.data);
      setEditedProfile({
        name: res.data.user.name,
        email: res.data.user.email,
      });
      setEditMode(false);
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
    }
  };
  console.log("profile ", profile);

  return (
    <>
      <Navbar />
      {loading ? (
        <p className="text-center text-gray-600">Loading profile...</p>
      ) : (
        <div className="min-h-screen bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 flex items-center justify-center px-4 py-10">
          <div className="bg-white/40 backdrop-blur-md shadow-lg border border-white/30 rounded-3xl p-8 w-full max-w-lg">
            <div className="text-center mb-6">
              <img
                src={`https://ui-avatars.com/api/?name=${profile.name}&background=random`}
                alt="Avatar"
                className="mx-auto h-20 w-20 rounded-full border-4 border-white shadow-md"
              />
              <h1 className="text-3xl font-bold text-gray-800 mt-4">
                Welcome, {profile.name?.split(" ")[0] || "User"} 👋
              </h1>
              <p className="text-sm text-gray-600">
                Manage your account info below
              </p>
            </div>

            {editMode ? (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleUpdate}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-gray-800 text-base">
                <p>
                  <span className="font-semibold">👤 Name:</span> {profile.name}
                </p>
                <p>
                  <span className="font-semibold">📧 Email:</span>{" "}
                  {profile.email}
                </p>
                <p>
                  <span className="font-semibold">🔐 Role:</span> {profile.role}
                </p>
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
