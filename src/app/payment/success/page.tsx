"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { verifyPaymentSession } from "@/services/paymentApi";
import { Card, CardContent } from "@/components/ui/card";

type PaymentStatus = "loading" | "Paid" | "Unpaid" | "error";

const PaymentSuccessContent = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [serviceName, setServiceName] = useState("");

  const missingSessionToastShown = useRef(false);

  const displayStatus = !sessionId ? "error" : status;

  useEffect(() => {
    if (!sessionId) {
      if (!missingSessionToastShown.current) {
        toast.error("Payment session ID is missing.");
        missingSessionToastShown.current = true;
      }
      return;
    }

    let cancelled = false;
    let attempts = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const checkPayment = async () => {
      try {
        const data = await verifyPaymentSession(sessionId);

        if (cancelled) return;

        setServiceName(data.serviceName);

        // Handle both "Paid" and "paid".
        if (String(data.paymentStatus).toLowerCase() === "paid") {
          setStatus("Paid");
          return;
        }

        if (attempts < 14) {
          attempts += 1;
          timeoutId = setTimeout(checkPayment, 2000);
        } else {
          setStatus("Unpaid");
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Payment Verification Error:", error);
          setStatus("error");
          toast.error("Unable to verify payment. Please try again later.");
        }
      }
    };

    checkPayment();

    return () => {
      cancelled = true;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [sessionId]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center p-3 sm:p-6">
      <Card className="w-full max-w-lg border-border shadow-sm">
        <CardContent className="space-y-4 p-4 text-center sm:space-y-5 sm:p-8">
          {displayStatus === "loading" && (
            <>
              <h1 className="text-xl font-bold sm:text-2xl text-foreground">
                Verifying Payment
              </h1>
              <p className="text-muted-foreground">
                Please wait while we confirm your payment.
              </p>
            </>
          )}

          {displayStatus === "Paid" && (
            <>
              <h1 className="text-xl font-bold sm:text-2xl text-green-600">
                Payment Successful!
              </h1>
              <p className="text-muted-foreground">
                Your payment for {serviceName} has been confirmed.
              </p>
            </>
          )}

          {displayStatus === "Unpaid" && (
            <>
              <h1 className="text-xl font-bold sm:text-2xl text-foreground">
                Payment Processing
              </h1>
              <p className="text-muted-foreground">
                Payment confirmation has not arrived yet. Please check your My
                Appointments page shortly.
              </p>
            </>
          )}

          {displayStatus === "error" && (
            <>
              <h1 className="text-xl font-bold sm:text-2xl text-foreground">
                Payment Status Unavailable
              </h1>
              <p className="text-muted-foreground">
                Please visit My Appointments to check your payment status.
              </p>
            </>
          )}

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

const PaymentSuccessPage = () => {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-[70vh] items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </main>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;

