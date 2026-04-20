import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { logoutAPI } from "../features/auth/authAPI";
import { useState } from "react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await logoutAPI(); // backend logout
    } catch (err) {
      console.log("Logout API failed");
    }

    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-red-500 text-white p-5 min-h-screen flex flex-col justify-between">
      
      {/* TOP SECTION */}
      <div>
        <h3 className="text-2xl font-bold">Home Page</h3>
      </div>

      {/* LOGOUT BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          disabled={loading}
          className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2
            ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-white text-red-500 hover:bg-gray-100 cursor-pointer"
            }
          `}
        >
          {/* 🔄 Spinner */}
          {loading && (
            <span className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></span>
          )}

          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>

    </div>
  );
}