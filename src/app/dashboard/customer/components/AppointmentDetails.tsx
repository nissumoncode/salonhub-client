"use client";
import { formatDuration } from "@/lib/formatDuration";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Appointment } from "./MyAppointments";

interface AppointmentDetailsProps {
  appointment: Appointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AppointmentDetails = ({
  appointment,
  open,
  onOpenChange,
}: AppointmentDetailsProps) => {
  if (!appointment) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-1rem)] overflow-y-auto p-4 sm:w-full sm:max-w-lg sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Appointment Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {appointment.image && (
            <Image
              src={appointment.image}
              alt={appointment.serviceName}
              width={500}
              height={300}
              unoptimized
              className="h-48 w-full rounded-lg object-cover"
            />
          )}

          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {appointment.serviceName}
            </h3>
            <p className="text-sm text-muted-foreground">
              {appointment.category}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 text-sm min-[380px]:grid-cols-2 sm:gap-4">
            <div>
              <p className="text-muted-foreground">Price</p>
              <p className="font-medium">${appointment.price}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium">{formatDuration(appointment.duration)}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Appointment Date</p>
              <p className="font-medium">{appointment.date}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Appointment Time</p>
              <p className="font-medium">{appointment.timeSlot}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Request Date</p>
              <p className="font-medium">
                {new Date(appointment.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t pt-4 sm:gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Appointment:
              </span>
              <Badge variant="outline">{appointment.status}</Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Payment:</span>
              <Badge variant="secondary">{appointment.paymentStatus}</Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetails;


