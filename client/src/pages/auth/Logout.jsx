
import { useContext } from "react";
import { authClient } from "../../../lib/auth-client";
import { AuthContext } from "../../context/AuthContext";

function Logout() {
  
  const {dispatch} = useContext(AuthContext)

  const handleLogout = async () => {
    await authClient.signOut();
    dispatch({type:"LOGOUT"})
  };
  return (
    <div>
      <button
        className="bg-blue-800 rounded-lg cursor-pointer hover:bg-blue/40 text-white py-2 px-3 ring-2 ring-gray-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
