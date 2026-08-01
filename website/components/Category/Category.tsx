"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Category() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-600">
            Shop by Category
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900 md:text-5xl">
            Beauty & Fashion Collections
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Discover premium beauty essentials and stylish fashion, carefully
            selected for every occasion.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Cosmetics */}
          <div className="group relative overflow-hidden rounded-3xl">

            <Image
              src="/categories/cosmetics.jpg"
              alt="Cosmetics"
              width={900}
              height={600}
              className="h-[450px] w-full object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

            <div className="absolute left-8 top-1/2 -translate-y-1/2">

              <p className="text-lg font-medium text-pink-300">
                Premium Collection
              </p>

              <h3 className="mt-2 text-5xl font-bold text-white">
                Cosmetics
              </h3>

              <p className="mt-4 max-w-xs text-gray-200">
                Makeup, skincare, lipstick, perfume, beauty essentials and much
                more.
              </p>

              <Link
                href="/category/cosmetics"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-pink-600 transition hover:scale-105"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

          {/* Clothes */}
          <div className="group relative overflow-hidden rounded-3xl">

            <Image
              src="/categories/clothes.jpg"
              alt="Clothes"
              width={900}
              height={600}
              className="h-[450px] w-full object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

            <div className="absolute left-8 top-1/2 -translate-y-1/2">

              <p className="text-lg font-medium text-pink-300">
                Trending Collection
              </p>

              <h3 className="mt-2 text-5xl font-bold text-white">
                Fashion
              </h3>

              <p className="mt-4 max-w-xs text-gray-200">
                Dresses, kurtis, shirts, jeans, ethnic wear and stylish outfits.
              </p>

              <Link
                href="/category/clothes"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-pink-600 transition hover:scale-105"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
