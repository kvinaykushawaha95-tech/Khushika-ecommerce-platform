"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-pink-50 via-white to-purple-50">

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-10">


        {/* Left Content */}
        <div>

          <p className="text-pink-600 font-semibold tracking-widest uppercase text-sm">
            Beauty • Fashion • Lifestyle
          </p>


          <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight text-gray-900">

            Feel Beautiful.
            <br />

            <span className="text-pink-600">
              Look Confident.
            </span>

          </h1>


          <p className="mt-6 text-gray-600 text-lg max-w-lg">
            Discover premium cosmetics and trendy fashion collections
            designed to make every moment special.
          </p>



          <div className="mt-8 flex flex-wrap gap-4">


            <Link
              href="/category/cosmetics"
             className="rounded-full bg-black px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl"
            >
              Shop Beauty
            </Link>


            <Link
              href="/category/fashion"
              className="rounded-full border border-black px-8 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-xl"
            >
              Explore Fashion
            </Link>


          </div>



          {/* Trust Features */}

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">

            <div>
              <p className="text-xl">
                🚚
              </p>
              <p className="text-xs text-gray-600">
                Free Shipping
              </p>
            </div>


            <div>
              <p className="text-xl">
                🔒
              </p>
              <p className="text-xs text-gray-600">
                Secure Payment
              </p>
            </div>


            <div>
              <p className="text-xl">
                ⭐
              </p>
              <p className="text-xs text-gray-600">
                Premium Quality
              </p>
            </div>

          </div>


        </div>



        {/* Right Image */}

        <div className="relative flex justify-center">


          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-pink-200 blur-3xl opacity-40">
          </div>


          <Image
            src="/hero.png"
            alt="Khushika Beauty & Fashion"
            width={550}
            height={700}
            className="w-full h-auto"
          />


        </div>


      </div>


    </section>
  );
}