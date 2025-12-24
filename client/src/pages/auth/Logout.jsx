
import { useDispatch, useSelector } from "react-redux";
import { authClient } from "../../../lib/auth-client";
import { logoutUser } from "../../store/authSlice";

function Logout() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div>
      <button
        className="bg-blue-800 rounded-lg cursor-pointer hover:bg-blue/40 text-white py-2 px-3 ring-2 ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleLogout}
        disabled={loading}
      >
        {loading ? "Signing out..." : "Logout"}
      </button>
    </div>
  );
}

export default Logout;
