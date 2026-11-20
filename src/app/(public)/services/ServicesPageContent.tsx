"use client";

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
    <main className="min-h-screen bg-background px-4 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-2 font-medium uppercase tracking-[0.2em] text-[#B8955A]">
            Discover Our Services
          </p>

          <h1 className="text-3xl font-bold text-foreground md:text-5xl">
            Explore Salon Services
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[#6B5B50]">
            Find the perfect salon service to refresh your look and feel your
            best.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-10 grid gap-4 rounded-xl border border-[#E8D8C3] bg-card p-5 md:grid-cols-3">
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border border-[#E8D8C3] px-4 py-3 outline-none focus:border-[#B8955A]"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-[#E8D8C3] px-4 py-3 outline-none focus:border-[#B8955A]"
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
            className="rounded-lg border border-[#E8D8C3] px-4 py-3 outline-none focus:border-[#B8955A]"
          >
            <option value="default">Default Sorting</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* Loading */}
        {loading && (
          <p className="py-16 text-center text-[#6B5B50]">
            Loading services...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="py-16 text-center text-red-600">{error}</p>
        )}

        {/* Services */}
        {!loading && !error && (
          <>
            <p className="mb-5 text-sm text-[#6B5B50]">
              Showing {filteredServices.length} services
            </p>

            {filteredServices.length === 0 ? (
              <p className="py-16 text-center text-[#6B5B50]">
                No services found.
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => (
                  <div
                    key={service._id}
                    className="overflow-hidden rounded-xl border border-[#E8D8C3] bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative h-56 w-full bg-[#E8D8C3]">
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

                    <div className="p-5">
                      <p className="mb-2 text-sm font-medium text-[#B8955A]">
                        {service.category}
                      </p>

                      <h2 className="text-xl font-semibold text-foreground">
                        {service.serviceName}
                      </h2>

                      <p className="mt-2 line-clamp-2 text-sm text-[#6B5B50]">
                        {service.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="font-semibold text-foreground">
                          ৳{service.price}
                        </span>

                        <span className="text-[#6B5B50]">
                          {service.duration} min
                        </span>
                      </div>

                      <Link
                        href={`/services/${service._id}`}
                        className="mt-5 block rounded-lg bg-[#4A382E] px-4 py-3 text-center font-medium text-white transition hover:bg-[#6B5B50]"
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
