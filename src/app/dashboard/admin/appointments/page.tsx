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

    getAllAppointments()
      .then((data) => {
        if (isMounted) {
          setAppointments(data);
          setError("");
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Failed to load appointments.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

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
    return <p className="p-6">Loading appointments...</p>;
  }

  return (
    <div className="space-y-6 p-6">
      <BackToHome />
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Manage Appointments
        </h1>
        <p className="mt-1 text-gray-500">
          View and manage customer appointment requests.
        </p>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">{error}</p>
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
