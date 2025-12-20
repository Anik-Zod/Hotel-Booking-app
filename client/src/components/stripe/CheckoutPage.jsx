import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axios";
import { loadStripe } from "@stripe/stripe-js";


 const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage({amount,items,dates ,selectedRooms}){
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, dispatch } = useContext(AuthContext);

  // 🔐 prevents duplicate intent creation
  const intentCreated = useRef(false);

  useEffect(() => {
    if (!user?.email || !amount) return;
    if (intentCreated.current) return;

    intentCreated.current = true;

    const createIntent = async () => {
      try {
        const res = await axiosInstance.post("/stripe/create-payment-intent", {
          amount: amount,
          currency: "usd",
          dates:dates,
          selectedRooms:selectedRooms,
          customer_email: user.email,
          userId:user._id
        });
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Stripe API error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    createIntent();
  }, [user?.email, amount]);

  if (loading) return <div>Loading payment...</div>;
  if (!clientSecret) return <div>Failed to initialize payment</div>;
  
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
       <CheckoutForm  
          amount={amount} 
          userId={user._id}
          items={items}
          dates={dates}
          selectedRooms={selectedRooms}
        />
    </Elements>
  );
}

