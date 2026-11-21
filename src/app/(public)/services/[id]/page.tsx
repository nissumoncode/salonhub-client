"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { getServiceById } from "@/services/serviceApi";
import type { Service } from "@/types/service";
import { Button } from "@/components/ui/button";

const ServiceDetailsPage = () => {
  const params = useParams();
  const router = useRouter();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const id = params.id as string;
        const data = await getServiceById(id);

        if (data.status !== "active") {
          toast.error("This service is currently unavailable.");
          router.replace("/services");
          return;
        }

        setService(data);
      } catch {
        toast.error("Service not found.");
        router.replace("/services");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params.id, router]);

  const handleBooking = () => {
    router.push(`/services/${service?._id}/book`);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading service details...</p>
      </div>
    );
  }

  if (!service) return null;

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 overflow-hidden rounded-2xl bg-card p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div className="relative min-h-[300px] overflow-hidden rounded-xl bg-secondary">
          {service.image && (
            <Image
              src={service.image}
              alt={service.serviceName}
              fill
              unoptimized
              className="object-cover"
            />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="mb-3 font-medium text-gold-text">{service.category}</p>

          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            {service.serviceName}
          </h1>

          <p className="mt-5 leading-7 text-muted-foreground">
            {service.description}
          </p>

          <div className="mt-8 flex gap-10">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                ${service.price}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {service.duration} min
              </p>
            </div>
          </div>

          <Button
            onClick={handleBooking}
            className="mt-10 h-12 bg-[#4A382E] text-white hover:bg-[#6B5B50]"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetailsPage;
