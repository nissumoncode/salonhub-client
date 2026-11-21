"use client";
import BackToHome from "@/components/BackToHome";
import CustomerOverview from "./components/CustomerOverview";
import { useEffect, useState } from "react";
import type { Appointment } from "./components/MyAppointments";
import { getMyAppointments } from "@/services/appointmentApi";

const CustomerDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadAppointments = async () => {
      try {
        const data = await getMyAppointments();

        if (!ignore) {
          setAppointments(data);
        }
      } catch {
        if (!ignore) {
          setError("Failed to load appointments.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadAppointments();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="space-y-6 p-6">
      <BackToHome />
      <div>
        <h1 className="text-2xl font-bold">Customer Dashboard</h1>
        <p className="text-muted-foreground">Welcome to SalonHub!</p>
      </div>

      {loading && <p>Loading dashboard...</p>}

      {error && <p className="text-destructive">{error}</p>}

      {!loading && !error && (
        <CustomerOverview
          totalAppointments={appointments.length}
          pendingAppointments={
            appointments.filter((item) => item.status === "Pending").length
          }
          confirmedAppointments={
            appointments.filter((item) => item.status === "Confirmed").length
          }
          cancelledAppointments={
            appointments.filter((item) => item.status === "Cancelled").length
          }
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
