import api from "@/lib/api";

// Get logged-in customer's appointments
export const getMyAppointments = async () => {
  const response = await api.get("/appointments/my");
  return response.data;
};

// Cancel customer's own pending appointment
export const cancelAppointment = async (id: string) => {
  const response = await api.patch(`/appointments/${id}/cancel`);
  return response.data;
};

// Get all appointments (Admin)
export const getAllAppointments = async () => {
  const response = await api.get("/appointments");
  return response.data;
};

// Update appointment status (Admin)
export const updateAppointmentStatus = async (
  id: string,
  status: "Confirmed" | "Cancelled",
) => {
  const response = await api.patch(`/appointments/${id}/status`, {
    status,
  });

  return response.data;
};
