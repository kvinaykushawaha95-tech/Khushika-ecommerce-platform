"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Glow Like Never Before",
    subtitle: "Luxury Beauty Collection",
    description:
      "Discover premium skincare, makeup and fashion.",
    image: "/banners/banner1.png",
    button: "Shop Now",
    link: "/category/cosmetics",
  },
  {
    id: 2,
    title: "Flat 50% OFF",
    subtitle: "Fashion Sale",
    description:
      "Trendy outfits at amazing prices.",
    image: "/banners/banner2.png",
    button: "Explore",
    link: "/category/clothes",
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Beauty Essentials",
    description:
      "Fresh products added every week.",
    image: "/banners/banner3.png",
    button: "View Collection",
    link: "/category/cosmetics",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(
        (prev) => (prev + 1) % slides.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent(
      (prev) => (prev + 1) % slides.length
    );
  };

  const prevSlide = () => {
    setCurrent(
      (prev) =>
        (prev - 1 + slides.length) % slides.length
    );
  };

  const slide = slides[current];

  return (
    <section className="relative mx-auto mt-6 max-w-7xl overflow-hidden rounded-3xl px-2 sm:px-4 lg:px-0">

      {/* ================= HERO ================= */}

      <div className="relative h-[500px] overflow-hidden rounded-3xl sm:h-[600px] lg:h-[650px]">

        {/* Background Image */}

        <Image
          src={slide.image}
          alt={slide.title}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-all duration-700"
        />

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

        {/* ================= CONTENT ================= */}

        <div className="absolute inset-0 flex items-center">

          <div className="max-w-xl px-7 text-white sm:px-10 lg:px-14">

            {/* Subtitle */}

            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-pink-200 sm:text-lg">
              {slide.subtitle}
            </p>

            {/* Title */}

            <h1 className="mb-5 text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              {slide.title}
            </h1>

            {/* Description */}

            <p className="mb-8 max-w-lg text-sm leading-6 text-gray-100 sm:text-lg sm:leading-7">
              {slide.description}
            </p>

            {/* CTA BUTTON */}

            <Link
              href={slide.link}
              className="inline-flex items-center justify-center rounded-full bg-pink-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-pink-700 hover:shadow-2xl sm:px-9 sm:py-4 sm:text-base"
            >
              {slide.button}
              <span className="ml-2 text-lg">
                →
              </span>
            </Link>

          </div>
        </div>

        {/* ================= PREVIOUS ================= */}

        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white sm:left-5 sm:h-12 sm:w-12"
        >
          <ChevronLeft size={25} />
        </button>

        {/* ================= NEXT ================= */}

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white sm:right-5 sm:h-12 sm:w-12"
        >
          <ChevronRight size={25} />
        </button>

        {/* ================= DOTS ================= */}

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">

          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}

        </div>

      </div>
    </section>
  );
}