"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/salon-1.jpg",
  "/images/salon-2.jpg",
  "/images/salon-3.jpg",
  "/images/salon-4.jpg",
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  const slides = [images[images.length - 1], ...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex === images.length + 1) {
      setTransition(false);
      setCurrentIndex(1);
    }

    if (currentIndex === 0) {
      setTransition(false);
      setCurrentIndex(images.length);
    }
  };

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransition(true));
      });
    }
  }, [transition]);

  const nextSlide = () => setCurrentIndex((prev) => prev + 1);
  const prevSlide = () => setCurrentIndex((prev) => prev - 1);

  return (
    <section className="relative h-137.5 w-full overflow-hidden">
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`flex h-full ${
          transition ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((image, index) => (
          <div key={index} className="relative h-full min-w-full">
            <Image
              src={image}
              alt="Salon background"
              fill
              priority={index === 1}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h1 className="mb-5 text-4xl font-bold text-white md:text-6xl">
            Discover Your Beauty
          </h1>

          <p className="mb-8 text-lg text-white/90">
            Experience premium salon services and enjoy the beauty care you
            deserve.
          </p>

          <Link
            href="/services"
            className="inline-block rounded-md bg-primary px-8 py-3 text-primary-foreground hover:bg-primary-hover"
          >
            Explore Salon Services
          </Link>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-3 text-foreground transition hover:bg-card focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-3 text-foreground transition hover:bg-card focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>
    </section>
  );
};

export default HeroSection;
