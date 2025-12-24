import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authClient } from "../../../lib/auth-client";
import { clearError } from "../../store/authSlice";
import GoogleLoginButton from "./GoogleLogin";
import { validateForm, validateEmail } from "../../utils/validation";

export default function Signup({ onClick }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateSignupForm = () => {
    const errors = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 2) {
      errors.username = 'Username must be at least 2 characters';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateSignupForm();
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }

    setLoading(true);
    setFieldErrors({});

    try {
      const { error } = await authClient.signUp.email(
        {
          email: formData.email,
          password: formData.password,
          name: formData.username,
          callbackURL: "/",
        },
        {
          onError: (ctx) => {
            setFieldErrors({ general: ctx.error?.message || "Signup failed" });
          },
        }
      );
      
      if (!error) {
        navigate('/');
      }
    } catch (err) {
      setFieldErrors({ general: "An unexpected error occurred" });
    } finally {
      setLoading(false);
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
        {(error || fieldErrors.general) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4">
            {error || fieldErrors.general}
          </div>
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
              value={formData.username}
              onChange={handleChange}
              required
              className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${
                fieldErrors.username ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-gray-300'
              }`}
            />
            {fieldErrors.username && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.username}</p>
            )}
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
              value={formData.email}
              onChange={handleChange}
              required
              className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${
                fieldErrors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-gray-300'
              }`}
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
            )}
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
              value={formData.password}
              onChange={handleChange}
              required
              className={`mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${
                fieldErrors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-gray-300'
              }`}
            />
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded-md text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              loading ? "bg-gray-500" : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Creating Account..." : "Create Account"}
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


