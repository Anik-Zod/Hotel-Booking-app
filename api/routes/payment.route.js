import express from "express"
import { checkPaymentSuccess, createPaymentIntent, getPaymentStatus, createBooking } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-payment-intent", createPaymentIntent);
paymentRouter.post("/check-payment-status", getPaymentStatus);
paymentRouter.post("/confirm-payment", checkPaymentSuccess);
paymentRouter.post("/create-booking", createBooking);

export default paymentRouter;