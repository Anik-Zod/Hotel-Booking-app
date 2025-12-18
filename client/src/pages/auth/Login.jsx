import React, { useState } from "react";
import GoogleLoginButton from "./GoogleLogin";
import { authClient } from "../../../lib/auth-client";

function Login({ onClick }) {
  const[email,setEmail] = useState()
  const[password,setPassword] = useState()
  const [error,setError] = useState()
  const [loading,setLoading] = useState()


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email(
        {
          email: email,
          password: password,
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
    <div>
      <div className="w-full min-w-[400px] bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Log in
          </h1>
          {error&&<div className="text-red-700 text-sm">{error}</div>}
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Join to Our Community with all time access and free{" "}
          </h1>
          <div className="mt-4 w-full  items-center j">
            <div className="">
              <GoogleLoginButton />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>or with email</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
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
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
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
                onChange={(e)=>setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >{loading?"loading...":"Login"}
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Dont have an account?{" "}
              <a
                onClick={onClick}
                href="#"
                className=" text-black hover:underline"
              >
                Sign-up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
