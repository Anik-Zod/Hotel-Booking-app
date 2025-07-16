import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full backdrop-blur-sm bg-opacity-90">
          <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Sign in to continue your journey with us and explore the best hotel
            deals around the world.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Display the error message if there's an error */}
          {error && (
            <div className="mt-4 text-center">
              <span className="text-red-500 text-sm">{error}</span>
            </div>
          )}

          {/* Display a success message if the user is logged in */}
          {user && (
            <div className="mt-4 text-center">
              <span className="text-green-500 text-sm">{user.message}</span>
            </div>
          )}

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}