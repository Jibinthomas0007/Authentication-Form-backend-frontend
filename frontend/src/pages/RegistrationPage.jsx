import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    login: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(registerUser(form));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        placeholder="Full Name"
        onChange={(e) => setForm({ ...form, fullname: e.target.value })}
      />

      <input
        placeholder="Email or Phone"
        onChange={(e) => setForm({ ...form, login: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) =>
          setForm({ ...form, password_confirmation: e.target.value })
        }
      />

      <button>Register</button>
    </form>
  );
}