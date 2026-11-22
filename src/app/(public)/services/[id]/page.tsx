"use client";
import { formatDuration } from "@/lib/formatDuration";

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
    <main className="min-h-screen bg-background px-3 py-8 sm:px-4 sm:py-12 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-2xl bg-card p-4 shadow-sm sm:gap-8 sm:p-6 md:grid-cols-2 md:gap-10 md:p-10">
        <div className="relative min-h-[240px] overflow-hidden rounded-xl bg-secondary sm:min-h-[320px] md:min-h-[400px]">
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
          <p className="mb-2 font-medium text-gold-text sm:mb-3">{service.category}</p>

          <h1 className="break-words text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            {service.serviceName}
          </h1>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-base sm:leading-7">
            {service.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-6 sm:mt-8 sm:gap-10">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                ${service.price}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                {formatDuration(service.duration)}
              </p>
            </div>
          </div>

          <Button
            onClick={handleBooking}
            className="mt-8 h-12 w-full bg-[#4A382E] text-white hover:bg-[#6B5B50] sm:mt-10"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetailsPage;


