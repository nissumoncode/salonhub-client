"use client";

import BackToHome from "@/components/BackToHome";
import { useEffect, useState } from "react";
import { getAdminServices } from "@/services/serviceApi";
import type { Service } from "@/types/service";
import Image from "next/image";

import AddService from "../components/AddService";
import EditService from "../components/EditService";
import DeleteService from "../components/DeleteService";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Convert total minutes into hours and minutes
const formatDuration = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} minutes`;
  if (minutes === 0) return `${hours} hours`;

  return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minutes`;
};

const ManageServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      const data = await getAdminServices();
      setServices(data);
      setError("");
    } catch {
      setError("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadServices = async () => {
      try {
        const data = await getAdminServices();

        if (!ignore) {
          setServices(data);
          setError("");
        }
      } catch {
        if (!ignore) {
          setError("Failed to load services.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadServices();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <p className="p-3 sm:p-5 md:p-6">Loading services...</p>;
  }

  if (error) {
    return <p className="p-6 text-destructive">{error}</p>;
  }

  return (
    <div className="min-w-0 space-y-5 p-3 sm:space-y-6 sm:p-5 md:p-6">
      <BackToHome />

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            Manage Services
          </h1>
          <p className="mt-1 text-muted-foreground">
            View and manage all salon services.
          </p>
        </div>

        <AddService onAdded={fetchServices} />
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="py-6 text-muted-foreground">
            No services found.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-foreground">All Services</CardTitle>
          </CardHeader>

          <CardContent className="p-3 sm:p-6">
            <div className="w-full overflow-x-auto">
              <Table className="min-w-187.5">
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service._id}>
                      <TableCell>
                        {service.image ? (
                          <Image
                            src={service.image}
                            alt={service.serviceName}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-md object-cover"
                          />
                        ) : (
                          <span className="text-muted-foreground">
                            No Image
                          </span>
                        )}
                      </TableCell>

                      <TableCell className="font-medium">
                        {service.serviceName}
                      </TableCell>

                      <TableCell>{service.category}</TableCell>
                      <TableCell>${service.price}</TableCell>

                      <TableCell>{formatDuration(service.duration)}</TableCell>

                      <TableCell>
                        <span
                          className={
                            service.status === "active"
                              ? "rounded-full bg-green-500/15 px-3 py-1 text-sm text-green-600 dark:text-green-400"
                              : "rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                          }
                        >
                          {service.status}
                        </span>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <EditService
                            service={service}
                            onUpdated={fetchServices}
                          />

                          <DeleteService
                            serviceId={service._id}
                            onDeleted={fetchServices}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManageServicesPage;
