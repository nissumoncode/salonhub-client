"use client";
import { formatDuration } from "@/lib/formatDuration";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getServices } from "@/services/serviceApi";
import type { Service } from "@/types/service";

const ServicesPageContent = () => {
  const searchParams = useSearchParams();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const selectedCategory = searchParams.get("category") || "all";
  const [category, setCategory] = useState(selectedCategory);

  const [sort, setSort] = useState("default");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data.filter((service) => service.status === "active"));
      } catch {
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const categories = useMemo(
    () => [...new Set(services.map((service) => service.category))],
    [services],
  );

  const filteredServices = useMemo(() => {
    let result = services.filter((service) =>
      service.serviceName.toLowerCase().includes(search.toLowerCase()),
    );

    if (category !== "all") {
      result = result.filter((service) => service.category === category);
    }

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [services, search, category, sort]);

  return (
    <main className="min-h-screen bg-background px-3 py-8 sm:px-4 sm:py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center sm:mb-10">
          <p className="mb-2 font-medium uppercase tracking-[0.2em] text-gold-text">
            Discover Our Services
          </p>

          <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-5xl">
            Explore Salon Services
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-base">
            Find the perfect salon service to refresh your look and feel your
            best.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-7 grid min-w-0 gap-3 rounded-xl border border-border bg-card p-3 sm:mb-10 sm:gap-4 sm:p-5 md:grid-cols-3">
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full min-w-0 rounded-lg border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-primary sm:px-4 sm:text-base"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full min-w-0 rounded-lg border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-primary sm:px-4 sm:text-base"
          >
            <option value="all">All Categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full min-w-0 rounded-lg border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-primary sm:px-4 sm:text-base"
          >
            <option value="default">Default Sorting</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <p className="py-16 text-center text-muted-foreground">
            Loading services...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="py-16 text-center text-destructive">{error}</p>
        )}

        {/* Services */}
        {!loading && !error && (
          <>
            <p className="mb-5 text-sm text-muted-foreground">
              Showing {filteredServices.length} services
            </p>

            {filteredServices.length === 0 ? (
              <p className="py-16 text-center text-muted-foreground">
                No services found.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {filteredServices.map((service) => (
                  <div
                    key={service._id}
                    className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative h-48 w-full bg-secondary sm:h-56">
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

                    <div className="p-4 sm:p-5">
                      <p className="mb-2 text-sm font-medium text-gold-text">
                        {service.category}
                      </p>

                      <h2 className="break-words text-lg font-semibold text-foreground sm:text-xl">
                        {service.serviceName}
                      </h2>

                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {service.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span className="font-semibold text-foreground">
                          ${service.price}
                        </span>

                        <span className="text-muted-foreground">
                          {formatDuration(service.duration)}
                        </span>
                      </div>

                      <Link
                        href={`/services/${service._id}`}
                        className="mt-5 block w-full rounded-lg bg-[#4A382E] px-3 py-3 text-center text-sm font-medium sm:px-4 sm:text-base text-white transition hover:bg-[#6B5B50]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default ServicesPageContent;


