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

    loadAppointments();

    return () => {
      ignore = true;
    };
  }, []);

  const handleCancel = async (id: string) => {
    try {
      const response = await cancelAppointment(id);
      toast.success(response.message);
      await fetchAppointments();
    } catch {
      toast.error("Failed to cancel appointment.");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <BackToHome />
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Appointments</h1>

        <p className="text-muted-foreground">
          View and manage your appointment requests.
        </p>
      </div>

      <MyAppointments
        appointments={appointments}
        loading={loading}
        error={error}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CustomerAppointmentsPage;
