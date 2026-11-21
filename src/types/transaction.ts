export interface Transaction {
  _id: string;
  stripeSessionId: string;
  appointmentId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  appointmentDate: string;
  amount: number;
  currency: string;
  paymentStatus: "Paid";
  transactionDate: string;
}
