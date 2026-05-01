import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { logoutAPI } from "../features/auth/authAPI";
import { useState } from "react";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logoutAPI();
    } catch (err) {
      console.log("Logout API failed");
    }

    // 🔥 Reset state
    dispatch(logout());

    // 🔥 Clear everything (optional but professional)
    localStorage.clear();

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* 🔥 HEADER */}
      <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>

        <button
          onClick={handleLogout}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition
            ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-white text-blue-600 hover:bg-gray-100 cursor-pointer"
            }
          `}
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Logging out..." : "Logout"}
        </button>
      </header>

      {/* 🔥 MAIN CONTENT */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Welcome Admin 👋</h2>
          <p className="text-gray-600">
            This is your admin panel. You can manage users, data, and settings here.
          </p>
        </div>
      </main>

    </div>
  );
}