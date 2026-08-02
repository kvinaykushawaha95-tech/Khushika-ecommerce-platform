import {
  Truck,
  ShieldCheck,
  Star,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders above ₹999",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% Safe Checkout",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Trusted Beauty Products",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help",
  },
];

export default function Features() {
  return (
    <section className="bg-pink-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-600">
            Why Choose Us
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Shopping Made Beautiful
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                  <Icon className="h-8 w-8 text-pink-600" />
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}