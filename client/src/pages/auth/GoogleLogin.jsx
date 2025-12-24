import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearError } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { authClient } from "../../../lib/auth-client";
import { useState } from "react";

export default function GoogleLoginButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    dispatch(clearError());

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: import.meta.env.VITE_FRONTEND_URL,
      });
    } catch (err) {
      console.error('Google login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleGoogleLogin} 
      disabled={loading} 
      className="flex gap-3 hover:bg-gray-300 cursor-pointer py-1 rounded-xl w-full items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <GoogleIcon/>
      {loading ? "Signing in..." : "Continue with Google"}
    </button>
  );
}






export const GoogleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 533.5 544.3"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M533.5 278.4c0-17.4-1.4-34.2-4-50.4H272v95.4h146.9c-6.4 34.7-25.2 64-53.8 83.6v69.2h86.8c50.9-46.9 80.6-115.7 80.6-198.8z"
      fill="#4285F4"
    />
    <path
      d="M272 544.3c72.8 0 133.9-24.1 178.5-65.3l-86.8-69.2c-24.1 16.2-55 25.7-91.7 25.7-70.7 0-130.6-47.7-152.1-111.5H30.2v70.4C74.6 481.2 166 544.3 272 544.3z"
      fill="#34A853"
    />
    <path
      d="M119.9 325.9c-11.4-33.7-11.4-69.9 0-103.6V152H30.2c-39 76-39 166.3 0 242.3l89.7-68.4z"
      fill="#FBBC05"
    />
    <path
      d="M272 107.7c38.6 0 73.2 13.3 100.5 39.3l75.4-75.4C405.9 24.5 344.8 0 272 0 166 0 74.6 63.1 30.2 152l89.7 70.4c21.5-63.8 81.4-111.5 152.1-111.5z"
      fill="#EA4335"
    />
  </svg>
);