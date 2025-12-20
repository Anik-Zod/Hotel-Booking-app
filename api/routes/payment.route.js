import express from "express"
import { checkPaymentSuccess, createPaymentIntent, getPaymentStatus } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-payment-intent",createPaymentIntent );
paymentRouter.post("check-payment-status",getPaymentStatus );
paymentRouter.post("confirm-payment",checkPaymentSuccess );

export default paymentRouter;