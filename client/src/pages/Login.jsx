import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-800 border border-slate-700 outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-800 border border-slate-700 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 p-3 rounded font-bold"
        >
          Login
        </button>

        <p className="mt-4 text-center text-slate-300">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-400">Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;