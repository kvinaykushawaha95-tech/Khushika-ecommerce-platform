"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">❤️ My Wishlist</h1>
        <p className="text-gray-500">Your wishlist is empty.</p>

        <Link
          href="/"
          className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <h1 className="text-3xl font-bold mb-8">
        ❤️ My Wishlist
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {wishlist.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >

            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-60 object-cover"
            />

            <div className="p-4">

              <h2 className="font-semibold text-lg">
                {product.name}
              </h2>

              <p className="text-pink-600 font-bold mt-2">
                ₹{product.price}
              </p>

              <div className="flex gap-3 mt-5">

                <button
                    onClick={() =>
                      addToCart({
                        ...product,
                        quantity: 1,
                        stock: 1,
                        originalPrice: product.price,
                        rating: 0,
                        category: "uncategorized",
                      })
                    }
                    className="flex-1 bg-pink-600 text-white py-2 rounded-lg"
                  >
                    Add to Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="bg-red-500 text-white px-4 rounded-lg"
                >
                  ✕
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}