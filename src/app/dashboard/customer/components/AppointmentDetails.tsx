"use client";

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
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
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
            <p className="text-sm text-[#8A786B]">{appointment.category}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[#8A786B]">Price</p>
              <p className="font-medium">৳{appointment.price}</p>
            </div>

            <div>
              <p className="text-[#8A786B]">Duration</p>
              <p className="font-medium">{appointment.duration} minutes</p>
            </div>

            <div>
              <p className="text-[#8A786B]">Appointment Date</p>
              <p className="font-medium">{appointment.date}</p>
            </div>

            <div>
              <p className="text-[#8A786B]">Appointment Time</p>
              <p className="font-medium">{appointment.timeSlot}</p>
            </div>

            <div>
              <p className="text-[#8A786B]">Request Date</p>
              <p className="font-medium">
                {new Date(appointment.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t pt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#8A786B]">Appointment:</span>
              <Badge variant="outline">{appointment.status}</Badge>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-[#8A786B]">Payment:</span>
              <Badge variant="secondary">{appointment.paymentStatus}</Badge>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetails;
