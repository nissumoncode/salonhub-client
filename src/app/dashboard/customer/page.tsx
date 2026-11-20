"use client";

import { useEffect, useState } from "react";
import {
  getMyAppointments,
  cancelAppointment,
} from "@/services/appointmentApi";
import { toast } from "sonner";

interface Appointment {
  _id: string;
  serviceName: string;
  category: string;
  price: number;
  duration: number;
  date: string;
  timeSlot: string;
  status: string;
  paymentStatus: string;
}

const CustomerDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      const data = await getMyAppointments();
      setAppointments(data);
    } catch {
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

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

  const handleCancel = async (id: string) => {
    try {
      const response = await cancelAppointment(id);

      toast.success(response.message);

      await fetchAppointments();
    } catch (error) {
      toast.error("Failed to cancel appointment.");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Customer Dashboard</h1>
        <p className="text-gray-500">Welcome to SalonHub!</p>
      </div>

      <h2 className="text-xl font-semibold">My Appointments</h2>

      {loading && <p>Loading appointments...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && appointments.length === 0 && (
        <p>You have no appointments yet.</p>
      )}

      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="rounded-lg border p-5 shadow-sm"
          >
            <h3 className="text-lg font-semibold">{appointment.serviceName}</h3>

            <p>Category: {appointment.category}</p>
            <p>Price: ৳{appointment.price}</p>
            <p>Duration: {appointment.duration} minutes</p>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.timeSlot}</p>
            <p>Status: {appointment.status}</p>
            <p>Payment: {appointment.paymentStatus}</p>

            {appointment.status === "Pending" && (
              <button
                onClick={() => handleCancel(appointment._id)}
                className="mt-3 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Cancel Appointment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
