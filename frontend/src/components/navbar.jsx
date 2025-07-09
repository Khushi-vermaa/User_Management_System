import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[#1f2937] text-white px-10 py-4 shadow-lg flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold tracking-wider">
          🧑‍💼 User Management
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-[#ef4444] hover:bg-[#dc2626] px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
