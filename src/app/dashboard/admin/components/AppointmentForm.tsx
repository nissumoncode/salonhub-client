"use client";

import type { Appointment } from "@/types/appointment";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AppointmentFormProps {
  appointments: Appointment[];
  onStatusChange: (id: string, status: "Confirmed" | "Cancelled") => void;
  updatingId: string | null;
}

const AppointmentForm = ({
  appointments,
  onStatusChange,
  updatingId,
}: AppointmentFormProps) => {
  if (appointments.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-4 sm:p-6 text-center text-muted-foreground">
        No appointments found.
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 overflow-x-auto rounded-lg border bg-card">
      <Table className="min-w-237.5">
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            <TableHead className="text-foreground">Customer</TableHead>
            <TableHead className="text-foreground">Service</TableHead>
            <TableHead className="text-foreground">Date</TableHead>
            <TableHead className="text-foreground">Time</TableHead>
            <TableHead className="text-foreground">Price</TableHead>
            <TableHead className="text-foreground">Status</TableHead>
            <TableHead className="text-foreground">Payment</TableHead>
            <TableHead className="text-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment._id}>
              <TableCell>
                <p className="font-medium">{appointment.customerName}</p>
                <p className="text-xs text-muted-foreground">
                  {appointment.customerEmail}
                </p>
              </TableCell>

              <TableCell>{appointment.serviceName}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.timeSlot}</TableCell>
              <TableCell>${appointment.price}</TableCell>

              <TableCell>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">
                  {appointment.status}
                </span>
              </TableCell>

              <TableCell>{appointment.paymentStatus}</TableCell>

              <TableCell>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  {appointment.status === "Pending" && (
                    <Button
                      size="sm"
                      className="bg-green-700 text-white hover:bg-green-800"
                      disabled={updatingId === appointment._id}
                      onClick={() =>
                        onStatusChange(appointment._id, "Confirmed")
                      }
                    >
                      Confirm
                    </Button>
                  )}

                  {(appointment.status === "Pending" ||
                    appointment.status === "Confirmed") && (
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={updatingId === appointment._id}
                      onClick={() =>
                        onStatusChange(appointment._id, "Cancelled")
                      }
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppointmentForm;
