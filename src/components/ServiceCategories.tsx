"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getServices } from "@/services/serviceApi";
import type { Service } from "@/types/service";

const ServiceCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    let ignore = false;

    const loadCategories = async () => {
      try {
        const services: Service[] = await getServices();

        if (!ignore) {
          const uniqueCategories = Array.from(
            new Set(
              services
                .map((service) => service.category.trim())
                .filter(Boolean),
            ),
          );

          setCategories(uniqueCategories);
        }
      } catch {
        if (!ignore) {
          setCategories([]);
        }
      }
    };

    void loadCategories();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="bg-card px-4 py-10 sm:px-6 sm:py-14 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center sm:mb-10">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Explore Our Categories
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Find the perfect service for your beauty and wellness needs.
          </p>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/services?category=${encodeURIComponent(category)}`}
                className="rounded-xl border border-border bg-background p-5 text-center transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
              >
                <span className="text-4xl">✨</span>
                <h3 className="mt-4 text-lg font-bold text-foreground">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-muted-foreground">
            No service categories available.
          </p>
        )}
      </div>
    </section>
  );
};

export default ServiceCategories;
