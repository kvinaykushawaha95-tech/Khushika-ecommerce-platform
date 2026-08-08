"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Glow Like Never Before",
    subtitle: "Luxury Beauty Collection",
    description: "Discover premium skincare, makeup and fashion.",
    image: "/banners/banner1.png",
    button: "Shop Now",
  },
  {
    id: 2,
    title: "Flat 50% OFF",
    subtitle: "Fashion Sale",
    description: "Trendy outfits at amazing prices.",
    image: "/banners/banner2.png",
    button: "Explore",
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Beauty Essentials",
    description: "Fresh products added every week.",
    image: "/banners/banner3.png",
    button: "View Collection",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative mx-auto mt-6 max-w-7xl overflow-hidden rounded-3xl">
      <div className="relative h-[700px]">

        <Image
          src={slides[current].image}
          alt={slides[current].title}
          fill
          priority
          className="object-cover transition-all duration-700"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-xl px-10 text-white">
            <p className="mb-3 text-lg font-semibold">
              {slides[current].subtitle}
            </p>

            <h1 className="mb-5 text-5xl font-bold">
              {slides[current].title}
            </h1>

            <p className="mb-8 text-lg">
              {slides[current].description}
            </p>

            <button className="rounded-full bg-pink-600 px-8 py-4 font-semibold transition hover:bg-pink-700">
              {slides[current].button}
            </button>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3"
        >
          <ChevronRight />
        </button>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full transition ${
                current === index
                  ? "bg-white"
                  : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}