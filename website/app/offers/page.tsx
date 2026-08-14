"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Tag } from "lucide-react";

const offers = [
  {
    title: "Beauty Collection",
    discount: "Up to 50% OFF",
    description:
      "Discover amazing deals on cosmetics and beauty essentials.",
    emoji: "💄",
    link: "/category/cosmetics",
  },
  {
    title: "Fashion Collection",
    discount: "Special Prices",
    description:
      "Refresh your wardrobe with our latest fashion collection.",
    emoji: "👗",
    link: "/category/clothes",
  },
];

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-pink-50 via-white to-purple-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-pink-600">
            <Sparkles size={28} />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-pink-600">
            Limited Time Deals
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Special Offers
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            Shop your favorite beauty and fashion products at
            amazing prices.
          </p>

        </div>
      </section>

      {/* Offers */}

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">

          {offers.map((offer) => (
            <div
              key={offer.title}
              className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="bg-gradient-to-br from-pink-100 via-white to-purple-100 p-8 sm:p-10">

                <div className="flex items-start justify-between">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm">
                    {offer.emoji}
                  </div>

                  <div className="rounded-full bg-pink-600 px-4 py-2 text-sm font-bold text-white">
                    <Tag
                      size={15}
                      className="mr-1 inline"
                    />
                    OFFER
                  </div>

                </div>

                <h2 className="mt-8 text-2xl font-bold text-gray-900 sm:text-3xl">
                  {offer.title}
                </h2>

                <p className="mt-3 text-3xl font-extrabold text-pink-600">
                  {offer.discount}
                </p>

                <p className="mt-4 max-w-md text-gray-600">
                  {offer.description}
                </p>

                <Link
                  href={offer.link}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
                >
                  Shop Now
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Bottom CTA */}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-black px-6 py-12 text-center text-white sm:px-10">

          <h2 className="text-3xl font-bold">
            Don't Miss Our Latest Deals
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-300">
            Explore our collections and discover something
            beautiful for yourself.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex rounded-full bg-pink-600 px-7 py-3.5 font-semibold transition hover:bg-pink-700"
          >
            Explore Store
          </Link>

        </div>
      </section>

    </main>
  );
}