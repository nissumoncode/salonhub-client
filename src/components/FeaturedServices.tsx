"use client";
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
    return <p className="py-10 text-center text-red-500">{error}</p>;
  }
  if (services.length === 0) {
    return (
      <p className="py-10 text-center text-[#6B5B50]">
        No services available yet.
      </p>
    );
  }

  return (
    <section className="bg-background px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Our Featured Services
          </h2>

          <p className="mt-3 text-[#6B5B50]">
            Discover our most popular salon services.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service._id}
              className="overflow-hidden rounded-xl border border-[#E8D8C3] bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={service.image}
                  alt={service.serviceName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-5">
                <span className="text-sm font-medium text-[#B8955A]">
                  {service.category}
                </span>

                <h3 className="mt-2 text-xl font-bold text-foreground">
                  {service.serviceName}
                </h3>

                <p className="mt-2 text-sm text-[#6B5B50]">
                  {service.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#E8D8C3] pt-4">
                  <div>
                    <p className="text-lg font-bold text-foreground">
                      ${service.price}
                    </p>
                    <p className="text-sm text-[#6B5B50]">
                      {service.duration} min
                    </p>
                  </div>

                  <Link
                    href={`/services/${service._id}`}
                    className="rounded-md bg-[#B8955A] px-4 py-2 text-sm text-white"
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
