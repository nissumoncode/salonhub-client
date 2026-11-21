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
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CustomerOverview;
