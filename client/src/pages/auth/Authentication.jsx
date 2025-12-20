import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Gift, Headphones } from "lucide-react";
import Navbar from "../../components/Navbar";
import Login from "./Login";
import Signup from "./Signup";

export default function Authentication() {
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const[login,setLogin] = useState(true)

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        {/* Left Marketing Section */}
        <div className="hidden lg:flex flex-1 bg-blue text-white flex-col justify-center p-16 space-y-8">
          <h1 className="text-4xl font-bold">Welcome to HotelBooking</h1>
          <p className="text-lg">
            Find the best deals on hotels, resorts, and stays. Enjoy exclusive offers and discounts.
          </p>

          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-white font-medium">
              <CheckCircle size={24} /> Best Price Guarantee
            </li>
            <li className="flex items-center gap-3 text-white font-medium">
              <Clock size={24} /> Easy Booking & Cancellation
            </li>
            <li className="flex items-center gap-3 text-white font-medium">
              <Gift size={24} /> Exclusive Member Offers
            </li>
            <li className="flex items-center gap-3 text-white font-medium">
              <Headphones size={24} /> 24/7 Customer Support
            </li>
          </ul>

          <p className="italic text-sm mt-4">Your comfort is our priority!</p>
        </div>

        {/* Right Login Section */}
        <div className="flex flex-1 items-center justify-center bg-gray-100">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-gray-100"
          >
           {login?
            <Login onClick={()=>setLogin(prev=>!prev)}/>:
            <Signup onClick={()=>setLogin(prev=>!prev)}/>
           }
          </motion.div>
        </div>
      </div>
    </>
  );
}
