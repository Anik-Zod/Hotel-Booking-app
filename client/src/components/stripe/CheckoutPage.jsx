import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axios";
import { loadStripe } from "@stripe/stripe-js";


 const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage({amount,items,dates ,selectedRooms}){
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  // 🔐 prevents duplicate intent creation
  const intentCreated = useRef(false);

  useEffect(() => {
    if (!user?.email || !amount) return;
    if (intentCreated.current) return;

    intentCreated.current = true;

    const createIntent = async () => {
      try {
        // Validate dates array
        if (!dates || !Array.isArray(dates) || dates.length === 0) {
          console.error("Invalid dates array");
          setLoading(false);
          return;
        }

        // Validate date values
        const startDate = new Date(dates[0]);
        const endDate = new Date(dates[dates.length - 1]);
        
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error("Invalid date values");
          setLoading(false);
          return;
        }

        const res = await axiosInstance.post("/stripe/create-payment-intent", {
          amount: amount,
          currency: "usd",
          dates: [{
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
          }],
          selectedRooms: selectedRooms,
          customer_email: user.email,
          userId: user.id,
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
          items={items}
          dates={dates}
          selectedRooms={selectedRooms}
        />
    </Elements>
  );
}

