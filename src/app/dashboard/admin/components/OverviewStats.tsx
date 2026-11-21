"use client";

import { useEffect, useState } from "react";
import {
  getDashboardStats,
  type DashboardStats,
} from "@/services/dashboardApi";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OverviewStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getDashboardStats()
      .then((data) => {
        if (isMounted) {
          setStats(data);
          setError("");
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Failed to load dashboard statistics.");
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

  const statItems = [
    { title: "Total Customers", value: stats?.totalCustomers },
    { title: "Active Services", value: stats?.activeServices },
    { title: "Total Appointments", value: stats?.totalAppointments },
    { title: "Pending Appointments", value: stats?.pendingAppointments },
    { title: "Confirmed Appointments", value: stats?.confirmedAppointments },
  ];

  if (loading) {
    return <p className="text-muted-foreground">Loading statistics...</p>;
  }

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {statItems.map((stat) => (
        <Card key={stat.title} className="border-border">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {stat.value ?? 0}
            </p>
          </CardContent>
        </Card>
      ))}

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Successful Payments
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-lg font-bold text-foreground">
            Payment system pending
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewStats;
