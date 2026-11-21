import api from "@/lib/api";

// Create Stripe Checkout Session
export const createCheckoutSession = async (appointmentId: string) => {
  const response = await api.post("/payments/create-checkout-session", {
    appointmentId,
  });

  return response.data as {
    message?: string;
    url: string;
  };
};

// Verify Stripe Payment Status
export const verifyPaymentSession = async (sessionId: string) => {
  const response = await api.get("/payments/verify-session", {
    params: {
      session_id: sessionId,
    },
  });

  return response.data as {
    paymentStatus: "Unpaid" | "Paid";
    appointmentStatus: "Pending" | "Confirmed" | "Cancelled";
    serviceName: string;
  };
};
