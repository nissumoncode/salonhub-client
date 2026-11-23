"use client";

import BackToHome from "@/components/BackToHome";
import { useCallback, useEffect, useState } from "react";
import MyAppointments, { type Appointment } from "../components/MyAppointments";
import {
  getMyAppointments,
  cancelAppointment,
} from "@/services/appointmentApi";
import { toast } from "sonner";

const CustomerAppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingAppointmentId, setCancellingAppointmentId] = useState<
    string | null
  >(null);

  const fetchAppointments = useCallback(async () => {
    try {
      setError("");
      const data = await getMyAppointments();
      setAppointments(data);
    } catch {
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    const loadAppointments = async () => {
      try {
        const data = await getMyAppointments();

        if (!ignore) {
          setAppointments(data);
          setError("");
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

    void loadAppointments();

    return () => {
      ignore = true;
    };
  }, []);

  const handleCancel = async (id: string) => {
    if (cancellingAppointmentId !== null) return;

    try {
      setCancellingAppointmentId(id);

      const response = await cancelAppointment(id);
      toast.success(response.message);

      await fetchAppointments();
    } catch {
      toast.error("Failed to cancel appointment.");
    } finally {
      setCancellingAppointmentId(null);
    }
  };

  return (
    <div className="min-w-0 space-y-5 p-3 sm:space-y-6 sm:p-5 md:p-6">
      <BackToHome />

      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          My Appointments
        </h1>

        <p className="text-muted-foreground">
          View and manage your appointment requests.
        </p>
      </div>

      <MyAppointments
        appointments={appointments}
        loading={loading}
        error={error}
        onCancel={handleCancel}
        cancellingAppointmentId={cancellingAppointmentId}
      />
    </div>
  );
};

export default CustomerAppointmentsPage;
