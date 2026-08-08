"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-100">
      {/* Background Blur */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl"></div>
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl"></div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-20 lg:flex-row">

        {/* Left Side */}
        <div className="max-w-xl">

          <span className="inline-flex rounded-full bg-pink-600 px-5 py-2 text-sm font-semibold text-white shadow-lg">
            ✨ New Collection 2026
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-gray-900 lg:text-6xl">
            Glow With
            <span className="text-pink-600"> Beauty </span>
            &
            <span className="text-purple-600"> Fashion</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover premium cosmetics and fashionable outfits
            specially selected to make every day beautiful.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/category/cosmetics"
              className="rounded-xl bg-pink-600 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-pink-700"
            >
              Shop Cosmetics
            </Link>

            <Link
              href="/category/clothes"
              className="flex items-center gap-2 rounded-xl border border-pink-600 px-8 py-4 font-semibold text-pink-600 transition hover:bg-pink-50"
            >
              Shop Fashion
              <ArrowRight size={18} />
            </Link>

          </div>

          {/* Trust Features */}

          <div className="mt-12 grid grid-cols-3 gap-6">

            <div className="text-center">
              <Truck className="mx-auto text-pink-600" />
              <p className="mt-2 text-sm font-medium">
                Free Delivery
              </p>
            </div>

            <div className="text-center">
              <ShieldCheck className="mx-auto text-pink-600" />
              <p className="mt-2 text-sm font-medium">
                Genuine Products
              </p>
            </div>

            <div className="text-center">
              <RotateCcw className="mx-auto text-pink-600" />
              <p className="mt-2 text-sm font-medium">
                Easy Returns
              </p>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="relative mt-16 lg:mt-0">

          {/* Floating Offer */}

          <div className="absolute -left-6 top-10 z-10 rounded-2xl bg-white p-5 shadow-xl">

            <p className="text-sm text-gray-500">
              Beauty Sale
            </p>

            <h2 className="text-2xl font-bold text-pink-600">
              20% OFF
            </h2>

          </div>

          <Image
            src="/banners/banner.png"
            alt="Khushika Beauty & Fashion"
            width={650}
            height={600}
            priority
            className="rounded-3xl shadow-2xl"
          />

          {/* Floating Customer Card */}

          <div className="absolute -bottom-6 right-0 rounded-2xl bg-white p-5 shadow-xl">

            <p className="text-sm text-gray-500">
              Happy Customers
            </p>

            <h2 className="text-xl font-bold">
              ⭐ 10K+
            </h2>

          </div>

        </div>

      </div>
    </section>
  );
}