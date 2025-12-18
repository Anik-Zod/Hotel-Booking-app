import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authClient } from "../../../lib/auth-client";
import { AuthContext } from "../../context/AuthContext";
import GoogleLoginButton from "./GoogleLogin";

export default function Signup({ onClick }) {
  const [info, setInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email(
        {
          email: info.email,
          password: info.password,
          name: info.username,
          callbackURL: "/",
        },
        {
          onError: (ctx) => {
            setError(ctx.error?.message || "Signup failed");
          },
        }
      );
      setLoading(false);
      if (error) return;
    } catch (err) {
      setLoading(false);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="w-full min-w-[400px] bg-gray-100 lg:w-1/2 flex items-center justify-center">
      <div className="max-w-md w-full p-6">
        <h1 className="text-3xl font-semibold mb-6 text-black text-center">
          Sign Up
        </h1>
        {loading && <>Loading..</>}
        <h2 className="text-sm font-semibold mb-6 text-gray-500 text-center">
          Join our community for free access
        </h2>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
        )}

        {/* OAuth Buttons */}
        <div className="">
            <GoogleLoginButton/>
        </div>

        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>or with email</p>
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={info.username}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={info.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
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
              name="password"
              value={info.password}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded-md text-white ${
              loading ? "bg-gray-500" : "bg-black hover:bg-gray-800"
            } transition-colors duration-300`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>
            Already have an account?{" "}
            <span
              onClick={onClick}
              className="text-black hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}


