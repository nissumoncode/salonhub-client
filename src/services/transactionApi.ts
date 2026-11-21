import api from "@/lib/api";

// Get all payment transactions (Admin)
export const getAllTransactions = async () => {
  const response = await api.get("/payments/transactions");
  return response.data;
};
