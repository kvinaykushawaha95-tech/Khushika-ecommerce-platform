export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-pink-100 via-white to-purple-100">
      <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">

        {/* Left Side */}
        <div className="max-w-xl">

          <span className="bg-pink-600 text-white px-4 py-2 rounded-full">
            New Collection 2026
          </span>

          <h1 className="text-6xl font-bold mt-8 leading-tight">
            Glow With
            <span className="text-pink-600"> Beauty </span>
            &
            <span className="text-purple-600"> Fashion</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Discover premium cosmetics and fashionable outfits
            at affordable prices.
          </p>

          <div className="flex gap-4 mt-10">

            <button className="bg-pink-600 text-white px-8 py-4 rounded-xl hover:bg-pink-700">
              Shop Beauty
            </button>

            <button className="border border-pink-600 text-pink-600 px-8 py-4 rounded-xl hover:bg-pink-50">
              Shop Fashion
            </button>

          </div>

        </div>

        {/* Right Side */}

        <div className="mt-16 md:mt-0 translate-x-18">

          <img
            src="/banners/banner.png"
            alt="Banner"
            className="w-[700px] rounded-3xl"
          />

        </div>

      </div>
    </section>
  );
}