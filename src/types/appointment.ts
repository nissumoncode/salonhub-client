export interface Appointment {
  _id: string;
  serviceId: string;
  serviceName: string;
  category: string;
  price: number;
  duration: number;
  customerId: string;
  customerName: string;
  customerEmail: string;
  date: string;
  timeSlot: string;
  message: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  paymentStatus: "Unpaid" | "Paid";
  createdAt: string;
}
