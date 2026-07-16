"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      {/* Clickable Image */}
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-64 object-cover cursor-pointer"
        />
      </Link>

      <div className="p-4">

        {/* Clickable Product Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold hover:text-pink-600 cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mt-2">
          ⭐
          <span className="ml-1 text-gray-600">
            {product.rating}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-pink-600 text-xl font-bold">
            ₹{product.price}
          </span>

          <span className="line-through text-gray-400">
            ₹{product.originalPrice}
          </span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-4 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}