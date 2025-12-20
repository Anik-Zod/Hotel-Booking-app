import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({
  amount,
  items,
  onError,
  userId,
  dates,
  selectedRooms = [],
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!stripe || !elements) return;

  setLoading(true);
  setErrorMessage(null);

  try {
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // handle 3D Secure manually
      confirmParams: {
        // don't set return_url at all
      },
    });

    if (error) {
      console.warn("Payment confirmation error:", error);
      setErrorMessage(error.message || "Payment failed");
      return;
    }

    if (paymentIntent) {
      console.log("PaymentIntent status:", paymentIntent.status);

      if (paymentIntent.status === "requires_action") {
        // Handle additional auth manually
        setErrorMessage("Authentication required. Please complete it in the popup.");
        return;
      }

      if (paymentIntent.status === "succeeded") {
        try {
          await axiosInstance.put(
            `http://localhost:8800/api/rooms/availability`,
            { roomIds:selectedRooms, dates }
          );

          toast.success("Payment successful & order placed!");
          navigate("/success");

        } catch (err) {
          console.error("Failed to save order:", err);
          toast.error("Payment succeeded but order was not saved");
        }
      }
    }
  } catch (err) {
    console.error("Stripe payment error:", err);
    setErrorMessage(err?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full  max-w-md mx-auto max-h-[400px] flex flex-col justify-between bg-white overflow-x-clip  "
    >
      {/* Top Section: Header & Payment Input */}
      <div className="flex-grow px-3">
        <div className="mb-3 px-3 pt-5">
          <h2 className="text-xl font-bold text-slate-800 flex justify-between">
            {" "}
            <span>Complete Payment</span>{" "}
            <span>$.{(amount / 100).toFixed(2)}</span>
          </h2>
          <p className="text-sm text-slate-500">
            Enter your card details below
          </p>
        </div>

        <div className="space-y-6 ">
          <div className="min-h-[100px] w-full ">
            {" "}
            {/* Prevents layout jump while Stripe loads */}
            <PaymentElement id="payment-element" />
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 animate-in fade-in slide-in-from-top-1">
              {errorMessage}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: Action Button */}
      <div className="fixed bottom-3 left-0 pt-6 w-full px-4 ">
        <button
          type="submit"
          disabled={!stripe || !elements || loading}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all active:scale-[0.99] shadow-lg hover:shadow-indigo-200 ${
            loading || !stripe
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-blue hover:bg-yellow-500"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            `Pay Now • $ ${(amount / 100).toFixed(2)}`
          )}
        </button>
      </div>
    </form>
  );
}
