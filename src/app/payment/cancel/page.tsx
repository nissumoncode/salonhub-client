import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

const PaymentCancelPage = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center p-6">
      <Card className="w-full max-w-lg border-border shadow-sm">
        <CardContent className="space-y-5 p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Payment Cancelled
          </h1>

          <p className="text-muted-foreground">
            Your payment process was cancelled. No payment confirmation has been
            received. You can try again from My Appointments.
          </p>

          <Link
            href="/dashboard/customer/appointments"
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Go to My Appointments
          </Link>
        </CardContent>
      </Card>
    </main>
  );
};

export default PaymentCancelPage;
