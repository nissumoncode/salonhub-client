"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import api from "@/lib/api";

const timeSlots = [
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
];

const BookingPage = () => {
  const router = useRouter();
  const params = useParams();

  const serviceId = params.id as string;

  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Customer Authentication Check
  useEffect(() => {
    const checkCustomer = async () => {
      try {
        const { data: session } = await authClient.getSession();

        if (!session) {
          router.replace("/sign-in");
          return;
        }

        const user = session.user as {
          role?: string;
          isBlocked?: boolean;
        };

        if (user.isBlocked) {
          await authClient.signOut();
          router.replace("/sign-in");
          return;
        }

        if (user.role !== "customer") {
          router.replace("/dashboard/unauthorized");
          return;
        }

        setIsAuthorized(true);
      } catch {
        router.replace("/sign-in");
      } finally {
        setIsChecking(false);
      }
    };

    checkCustomer();
  }, [router]);

  // Submit Appointment
  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date || !timeSlot) {
      toast.error("Please select appointment date and time.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/appointments", {
        serviceId,
        date,
        timeSlot,
        message,
      });

      toast.success(response.data.message);
      router.push("/dashboard/customer/appointments");

      setDate("");
      setTimeSlot("");
      setMessage("");
    } catch (error) {
      const err = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      toast.error(err.response?.data?.message || "Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-[#6B5B50]">Checking access...</p>
      </div>
    );
  }

  if (!isAuthorized) return null;

  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-xl rounded-2xl bg-card p-6 shadow-sm md:p-8">
        <div className="mb-8 text-center">
          <p className="font-medium uppercase tracking-widest text-[#B8955A]">
            SalonBook
          </p>

          <h1 className="mt-2 text-3xl font-bold text-foreground">
            Book Your Appointment
          </h1>

          <p className="mt-2 text-sm text-[#6B5B50]">
            Choose your preferred date and time.
          </p>
        </div>

        <form onSubmit={handleBooking} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium text-foreground">
              Appointment Date
            </label>

            <input
              type="date"
              min={new Date().toLocaleDateString("en-CA")}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-[#E8D8C3] px-4 py-3 outline-none focus:border-[#B8955A]"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-foreground">
              Available Time Slot
            </label>

            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full rounded-lg border border-[#E8D8C3] px-4 py-3 outline-none focus:border-[#B8955A]"
              required
            >
              <option value="">Select a time slot</option>

              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium text-foreground">
              Additional Message (Optional)
            </label>

            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              className="w-full resize-none rounded-lg border border-[#E8D8C3] px-4 py-3 outline-none focus:border-[#B8955A]"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full bg-[#4A382E] text-white hover:bg-[#6B5B50]"
          >
            {loading ? "Processing..." : "Submit Appointment Request"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default BookingPage;
