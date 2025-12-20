import stripe from "../utils/stripe.js";

//create payment intent
export const createPaymentIntent = async (req, res) => {
  try {
    const {
      amount=10,
      currency = "usd",
      customer_email = "",
      userId= "",
      selectedRooms ="",
      dates="",
    } = req.body;

    

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      receipt_email: customer_email,
      payment_method_types: ["card"],

      metadata: {
        userId,
        roomIds: selectedRooms.join(","),
        checkIn: dates[0].startDate,
        checkOut: dates[0].endDate,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Create PaymentIntent error:", error);
    res.status(500).json({ error: error.message });
  }
};

// check Payment status
export const getPaymentStatus = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.status(200).json({
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      created: paymentIntent.created,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//check Payment success or not
export const checkPaymentSuccess = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      res
        .status(400)
        .json({ success: false, message: "Payment not succeeded" });
    }

    res.status(200).json({ success: true, message: "Payment succeeded" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
