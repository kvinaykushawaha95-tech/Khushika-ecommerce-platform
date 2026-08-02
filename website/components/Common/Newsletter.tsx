"use client";

import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto rounded-[32px] bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 p-10 md:p-16 text-white">

        <div className="max-w-3xl mx-auto text-center">

          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Mail size={30} />
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold">
            Join the Khushika Family 💖
          </h2>

          <p className="mt-5 text-pink-100 text-lg">
            Subscribe to receive exclusive offers, beauty tips,
            new arrivals and special discounts.
          </p>

          <form className="mt-10 flex flex-col md:flex-row gap-4">

            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-full px-6 py-4 text-black outline-none"
            />

            <button
              className="rounded-full bg-black px-10 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-gray-900 hover:shadow-2xl"
            >
              Subscribe
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}