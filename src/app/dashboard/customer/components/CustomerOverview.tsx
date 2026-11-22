"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomerOverviewProps {
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  cancelledAppointments: number;
}

const CustomerOverview = ({
  totalAppointments,
  pendingAppointments,
  confirmedAppointments,
  cancelledAppointments,
}: CustomerOverviewProps) => {
  const stats = [
    {
      title: "Total Appointment Requests",
      value: totalAppointments,
    },
    {
      title: "Pending Appointments",
      value: pendingAppointments,
    },
    {
      title: "Confirmed Appointments",
      value: confirmedAppointments,
    },
    {
      title: "Cancelled Appointments",
      value: cancelledAppointments,
    },
  ];

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="min-w-0 border-border">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
            <p className="text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomerOverview;

