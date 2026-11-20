"use client";

import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import AppointmentDetails from "./AppointmentDetails";

export interface Appointment {
  _id: string;
  serviceName: string;
  image?: string;
  category: string;
  createdAt: string;
  price: number;
  duration: number;
  date: string;
  timeSlot: string;
  status: string;
  paymentStatus: string;
}

interface MyAppointmentsProps {
  appointments: Appointment[];
  loading: boolean;
  error: string;
  onCancel: (id: string) => void;
}

const MyAppointments = ({
  appointments,
  loading,
  error,
  onCancel,
}: MyAppointmentsProps) => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <section className="space-y-5">
      {loading && (
        <p className="py-8 text-center text-sm text-gray-500">
          Loading appointments...
        </p>
      )}

      {error && (
        <p className="py-4 text-center text-sm text-red-500">{error}</p>
      )}

      {!loading && !error && appointments.length === 0 && (
        <Card className="border-dashed border-[#E8DCCB]">
          <CardContent className="py-12 text-center">
            <p className="font-medium text-foreground">No appointments yet</p>
            <p className="mt-1 text-sm text-[#8A786B]">
              Your appointment requests will appear here.
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && appointments.length > 0 && (
        <div className="grid gap-5">
          {appointments.map((appointment) => (
            <Card
              key={appointment._id}
              className="overflow-hidden border-[#E8DCCB] shadow-sm"
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row">
                  {appointment.image ? (
                    <Image
                      src={appointment.image}
                      alt={appointment.serviceName}
                      width={160}
                      height={160}
                      unoptimized
                      className="h-44 w-full rounded-lg object-cover sm:h-36 sm:w-36"
                    />
                  ) : (
                    <div className="flex h-44 w-full items-center justify-center rounded-lg bg-[#F5EFE8] text-sm text-[#8A786B] sm:h-36 sm:w-36">
                      No Image
                    </div>
                  )}

                  <div className="min-w-0 flex-1 space-y-4">
                    <div>
                      <CardTitle className="text-lg text-foreground">
                        {appointment.serviceName}
                      </CardTitle>
                      <p className="mt-1 text-sm text-[#8A786B]">
                        {appointment.category}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div>
                        <p className="text-xs text-[#8A786B]">Price</p>
                        <p className="mt-1 font-semibold text-foreground">
                          ৳{appointment.price}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#8A786B]">Duration</p>
                        <p className="mt-1 font-medium text-foreground">
                          {appointment.duration} min
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#8A786B]">Date</p>
                        <p className="mt-1 font-medium text-foreground">
                          {appointment.date}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#8A786B]">Time</p>
                        <p className="mt-1 font-medium text-foreground">
                          {appointment.timeSlot}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[#8A786B]">Request Date</p>
                      <p className="mt-1 font-medium text-foreground">
                        {new Date(appointment.createdAt).toLocaleDateString(
                          "en-GB",
                        )}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 border-t border-[#F0E7DD] pt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#8A786B]">
                          Appointment:
                        </span>
                        <Badge variant="outline">{appointment.status}</Badge>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#8A786B]">Payment:</span>
                        <Badge variant="secondary">
                          {appointment.paymentStatus}
                        </Badge>
                      </div>

                      {appointment.status === "Pending" && (
                        <Button
                          variant="destructive"
                          size="sm"
                          className="ml-auto"
                          onClick={() => onCancel(appointment._id)}
                        >
                          Cancel Appointment
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setDetailsOpen(true);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AppointmentDetails
        appointment={selectedAppointment}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </section>
  );
};

export default MyAppointments;
