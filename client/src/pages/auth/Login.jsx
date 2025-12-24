import { useState, useEffect } from "react";
import GoogleLoginButton from "./GoogleLogin";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../store/authSlice";
import { validateForm } from "../../utils/validation";

function Login({ onClick }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const validation = validateForm(formData.email, formData.password);
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }

    dispatch(loginUser(formData));
  };
  return (
    <div>
      <div className="w-full min-w-[400px] bg-gray-100 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Log in
          </h1>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm mb-4">
              {error}
            </div>
          )}
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
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign In"}
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
