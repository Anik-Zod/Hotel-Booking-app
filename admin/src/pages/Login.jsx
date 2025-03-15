import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios';

export default function Login() {
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
  
    try {
      const res = await axios.post("/api/auth/login", {
        username: credentials.username,
        password: credentials.password,
      });
      //if login Successful check admin or not 
      if(res.data.isAdmin){
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      }else{
        dispatch({ type: "LOGIN_FAILURE", payload: {message:"You are not Admin"}});
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response?.data?.message || "Login failed" });
    }
  };

  return (
    <div>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
      {/* Display the error message if there's an error */}
      {error && <span className="text-red-500 text-center text-4xl mt-4 block">{error}</span>}
      {user && <span className="text-green-500 text-4xl text-center mt-4 block">{user.message}</span>}
    </div>
  );
}
