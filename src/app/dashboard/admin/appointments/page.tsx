"use client";
import BackToHome from "@/components/BackToHome";
import { useCallback, useEffect, useState } from "react";
import {
  getAllAppointments,
  updateAppointmentStatus,
} from "@/services/appointmentApi";
import type { Appointment } from "@/types/appointment";
import AppointmentForm from "../components/AppointmentForm";

const ManageAppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    try {
      const data = await getAllAppointments();
      setAppointments(data);
      setError("");
    } catch {
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadAppointments = async () => {
      try {
        const data = await getAllAppointments();

        if (isMounted) {
          setAppointments(data);
          setError("");
        }
      } catch {
        if (isMounted) {
          setError("Failed to load appointments.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadAppointments();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleStatusChange = async (
    id: string,
    status: "Confirmed" | "Cancelled",
  ) => {
    try {
      setUpdatingId(id);
      await updateAppointmentStatus(id, status);
      await fetchAppointments();
    } catch {
      setError("Failed to update appointment status.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <p className="p-3 sm:p-5 md:p-6">Loading appointments...</p>;
  }

  return (
    <div className="min-w-0 space-y-5 p-3 sm:space-y-6 sm:p-5 md:p-6">
      <BackToHome />
      <div>
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Manage Appointments
        </h1>
        <p className="mt-1 text-muted-foreground">
          View and manage customer appointment requests.
        </p>
      </div>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <AppointmentForm
        appointments={appointments}
        onStatusChange={handleStatusChange}
        updatingId={updatingId}
      />
    </div>
  );
};

export default ManageAppointmentsPage;
