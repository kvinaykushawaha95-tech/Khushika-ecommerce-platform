import { products } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    notFound();
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/"
          className="text-pink-600 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">

        {/* Left Side */}
        <div>

          {/* Main Image */}
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-[500px] object-contain"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-4 mt-5">

            {[1,2,3,4].map((item)=>(
              <div
                key={item}
                className="border rounded-xl p-2 cursor-pointer hover:border-pink-500"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={90}
                  height={90}
                  className="w-20 h-20 object-cover"
                />
              </div>
            ))}

          </div>

        </div>

        {/* Right Side */}

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mt-4">

            <span className="text-yellow-500 text-xl">
              ⭐⭐⭐⭐⭐
            </span>

            <span className="text-gray-600">
              ({product.rating} Ratings)
            </span>

          </div>

          <div className="mt-8 flex items-center gap-4">

            <span className="text-4xl font-bold text-pink-600">
              ₹{product.price}
            </span>

            <span className="text-2xl line-through text-gray-400">
              ₹{product.originalPrice}
            </span>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
              {discount}% OFF
            </span>

          </div>

          <div className="mt-6">

            <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg">
              ✔ In Stock
            </span>

          </div>

          <p className="mt-8 text-gray-600 leading-8">
            Premium quality beauty product designed for everyday use.
            Long lasting, lightweight, waterproof and skin friendly.
            Suitable for all skin types.
          </p>

          {/* Quantity */}

          <div className="mt-10">

            <h3 className="font-semibold mb-3">
              Quantity
            </h3>

            <div className="flex items-center gap-4">

              <button className="w-10 h-10 rounded-full bg-gray-200">
                -
              </button>

              <span className="text-xl font-bold">
                1
              </span>

              <button className="w-10 h-10 rounded-full bg-gray-200">
                +
              </button>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex gap-4 mt-10">

            <button className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-semibold">
              Add To Cart
            </button>

            <button className="flex-1 bg-black hover:bg-gray-800 text-white py-4 rounded-xl font-semibold">
              Buy Now
            </button>

          </div>

          {/* Delivery */}

          <div className="mt-10 border rounded-2xl p-6">

            <h3 className="font-bold text-lg">
              Delivery Information
            </h3>

            <ul className="mt-4 space-y-3 text-gray-600">
              <li>🚚 Free Delivery on orders above ₹999</li>
              <li>🔄 7 Days Easy Return</li>
              <li>💳 Cash on Delivery Available</li>
              <li>🔒 100% Secure Payment</li>
            </ul>

          </div>

        </div>

      </div>

      {/* Description */}

      <div className="mt-16 bg-white rounded-3xl shadow-lg p-8">

        <h2 className="text-3xl font-bold">
          Product Description
        </h2>

        <p className="mt-6 text-gray-600 leading-8">
          This premium cosmetic product is specially crafted for users
          who want long-lasting quality with a beautiful finish. It is
          lightweight, waterproof, easy to apply, and suitable for daily
          use.
        </p>

      </div>

    </div>
  );
}