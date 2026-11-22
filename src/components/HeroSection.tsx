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
    <section className="relative h-[420px] w-full sm:h-[500px] md:h-[550px] lg:h-[600px] overflow-hidden">
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

      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-2xl text-center">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:mb-5 sm:text-4xl md:text-6xl">
            Discover Your Beauty
          </h1>

          <p className="mx-auto mb-6 max-w-xl text-sm leading-6 text-white/90 sm:mb-8 sm:text-base md:text-lg">
            Experience premium salon services and enjoy the beauty care you
            deserve.
          </p>

          <Link
            href="/services"
            className="inline-block rounded-md bg-primary px-5 py-3 text-sm text-primary-foreground sm:px-8 sm:text-base hover:bg-primary-hover"
          >
            Explore Salon Services
          </Link>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 sm:left-5 -translate-y-1/2 rounded-full bg-card/80 p-2 text-foreground transition sm:p-3 hover:bg-card focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Previous slide"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 sm:right-5 -translate-y-1/2 rounded-full bg-card/80 p-2 text-foreground transition sm:p-3 hover:bg-card focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Next slide"
      >
        <ChevronRight />
      </button>
    </section>
  );
};

export default HeroSection;

