"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductRating from "@/components/ProductRating";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}

      <div className="relative overflow-hidden">

        {discount > 0 && (
          <span className="absolute left-4 top-4 z-20 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}

        <button
          onClick={() => {
            if (isInWishlist(product.id)) {
              removeFromWishlist(product.id);
            } else {
              addToWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                category: product.category,
                image: product.image,
                rating: product.rating,
                stock: product.stock,
              });
            }
          }}
          className="absolute right-4 top-4 z-20 rounded-full bg-white p-2 shadow-lg transition hover:scale-110"
        >
          <Heart
            size={20}
            className={
              isInWishlist(product.id)
                ? "fill-pink-600 text-pink-600"
                : "text-gray-500"
            }
          />
        </button>

        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image || "/logo/logo.png"}
            alt={product.name}
            width={500}
            height={500}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </Link>

      </div>

      {/* Content */}

      <div className="p-5">

        <Link href={`/product/${product.id}`}>
          <h3 className="line-clamp-2 text-xl font-semibold text-gray-900 transition hover:text-pink-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2">
          <ProductRating productId={String(product.id)} />
        </div>

        <div className="mt-4 flex items-end gap-2">

          <span className="text-2xl font-bold text-pink-600">
            ₹{product.price}
          </span>

          {product.originalPrice > product.price && (
            <span className="text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}

        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
  {product.stock > 0 ? (
    <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700">
      ✓ In Stock
    </span>
  ) : (
    <span className="rounded-full bg-red-100 px-3 py-1 font-medium text-red-600">
      Out of Stock
    </span>
  )}
</div>

        <button
          disabled={product.stock <= 0}
          onClick={() =>
            addToCart({
              ...product,
              quantity: 1,
            })
          }
          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white transition ${
            product.stock > 0
              ? "bg-pink-600 hover:bg-pink-700"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          <ShoppingCart size={20} />
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>

      </div>

    </div>
  );
}