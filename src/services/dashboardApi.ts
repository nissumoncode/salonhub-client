import api from "@/lib/api";

export interface DashboardStats {
  totalCustomers: number;
  activeServices: number;
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  successfulPayments: number;
  pendingPayments: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};
