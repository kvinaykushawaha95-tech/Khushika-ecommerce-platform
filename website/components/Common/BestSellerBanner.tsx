"use client";

import Image from "next/image";
import Link from "next/link";

export default function BestSellerBanner() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 shadow-2xl">

          <div className="grid items-center gap-10 px-10 py-12 lg:grid-cols-2">

            {/* Left */}

            <div className="text-white">

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">
                ⭐ Best Seller Collection
              </span>

              <h2 className="mt-6 text-5xl font-extrabold leading-tight">
                Beauty That
                <br />
                Speaks Confidence
              </h2>

              <p className="mt-6 max-w-lg text-pink-100 text-lg">
                Discover premium cosmetics and elegant fashion with exclusive
                offers available only at Khushika.
              </p>

              <Link
                href="/category/cosmetics"
                className="inline-block mt-6 rounded-full bg-black px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl"
              >
                Shop Best Sellers
              </Link>

            </div>

            {/* Right */}

            <div className="flex justify-center">

              <Image
                src="/banners/bestseller.png"
                alt="Best Seller"
                width={600}
                height={600}
                className="rounded-3xl"
              />

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}