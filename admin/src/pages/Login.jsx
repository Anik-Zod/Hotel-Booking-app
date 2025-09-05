import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from '../api/axios'

export default function Login() {
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "anikdas169@gmail.com",
    password: "123456",
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
      const res = await axiosInstance.post("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });

      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: { message: "You are not Admin" } });
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition 
              ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
              focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}

        {user && (
          <p className="text-green-600 text-sm text-center mt-4">
            {user.message}
          </p>
        )}
      </div>
    </div>
  );
}
