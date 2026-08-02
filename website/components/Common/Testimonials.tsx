import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Delhi",
    review:
      "Amazing quality! The lipstick shade is exactly as shown and delivery was super fast.",
  },
  {
    name: "Ananya Verma",
    city: "Mumbai",
    review:
      "I loved the dress I ordered. The fabric is soft and the fitting is perfect. Will definitely shop again!",
  },
  {
    name: "Sneha Gupta",
    city: "Bengaluru",
    review:
      "Beautiful packaging, genuine products, and excellent customer support. Highly recommended!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-600">
            Happy Customers
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-4 flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="leading-7 text-gray-600">
                "{item.review}"
              </p>

              <div className="mt-8">
                <h3 className="font-semibold text-gray-900">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {item.city}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}