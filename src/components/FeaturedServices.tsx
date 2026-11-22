"use client";
import { formatDuration } from "@/lib/formatDuration";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Service } from "@/types/service";
import { getServices } from "@/services/serviceApi";

const FeaturedServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data.filter((service) => service.status === "active"));
      } catch {
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <p className="py-10 text-center">Loading services...</p>;
  }

  if (error) {
    return <p className="py-10 text-center text-destructive">{error}</p>;
  }
  if (services.length === 0) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        No services available yet.
      </p>
    );
  }

  return (
    <section className="bg-background px-4 py-10 sm:px-6 sm:py-14 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center sm:mb-10">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Our Featured Services
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Discover our most popular salon services.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:gap-7 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service._id}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-48 w-full sm:h-52">
                <Image
                  src={service.image}
                  alt={service.serviceName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-4 sm:p-5">
                <span className="text-sm font-medium text-gold-text">
                  {service.category}
                </span>

                <h3 className="mt-2 break-words text-lg font-bold text-foreground sm:text-xl">
                  {service.serviceName}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <div>
                    <p className="text-lg font-bold text-foreground">
                      ${service.price}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDuration(service.duration)}
                    </p>
                  </div>

                  <Link
                    href={`/services/${service._id}`}
                    className="rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground sm:px-4 sm:text-sm hover:bg-primary-hover"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;


