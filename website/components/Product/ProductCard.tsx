"use client";

import Image from "next/image";
import Link from "next/link";
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

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      {/* Clickable Image */}
      <div className="relative">

  <Link href={`/product/${product.id}`}>
  <Image
    src={product.image || "/products/no-image.png"}
    alt={product.name}
    width={300}
    height={300}
  className="w-full h-64 object-cover cursor-pointer"
  />
  </Link>

  <button
    onClick={() => {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        });
      }
    }}
    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition"
  >
    {isInWishlist(product.id) ? "❤️" : "🤍"}
  </button>

</div>

      <div className="p-4">

        {/* Clickable Product Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold hover:text-pink-600 cursor-pointer">
            {product.name}
          </h3>
        </Link>

       
        {/* Live Rating */}

        <ProductRating
          productId={String(product.id)}
        />

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
          onClick={() => addToCart({ ...product, quantity: 1 })}
          className="w-full mt-4 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}