"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";


interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);


  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  );


  function handleAddToCart() {
  if (product.stock === 0) {
    alert("This product is out of stock.");
    return;
  }

  if (quantity > product.stock) {
    alert(`Only ${product.stock} item(s) available.`);
    return;
  }

  addToCart({
    ...product,
    quantity,
  });

  alert("✅ Added To Cart");
}


  return (

    <div className="grid lg:grid-cols-2 gap-12">


      {/* Image */}

      <div>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-[500px] object-contain"
          />

        </div>


      </div>



      {/* Details */}

      <div>


        <h1 className="text-4xl font-bold">
          {product.name}
        </h1>



        <div className="flex items-center gap-2 mt-4">

          <span className="text-yellow-500 text-xl">
            ⭐⭐⭐⭐⭐
          </span>

          <span>
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


          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
            {discount}% OFF
          </span>


        </div>




        <p className="mt-6 text-gray-600">
          Premium quality beauty product designed for everyday use.
        </p>
        <div className="mt-4">
          {product.stock > 10 && (
            <span className="text-green-600 font-semibold">
              🟢 In Stock ({product.stock} available)
            </span>
          )}

          {product.stock > 0 && product.stock <= 10 && (
            <span className="text-yellow-600 font-semibold">
              🟡 Only {product.stock} left
            </span>
          )}

          {product.stock === 0 && (
            <span className="text-red-600 font-bold text-lg">
              🔴 Out of Stock
            </span>
          )}
        </div>



        {/* Quantity */}

        <div className="mt-10">


          <h3 className="font-semibold mb-3">
            Quantity
          </h3>


          <div className="flex items-center gap-4">


            <button
              type="button"
              onClick={() =>
                setQuantity((prev) =>
                  prev > 1 ? prev - 1 : 1
                )
              }
              className="w-10 h-10 rounded-full bg-gray-200"
            >
              -
            </button>



            <span className="text-xl font-bold">
              {quantity}
            </span>



            <button
              type="button"
              onClick={() =>
                setQuantity((prev) => prev + 1)
              }
              className="w-10 h-10 rounded-full bg-gray-200"
            >
              +
            </button>


          </div>


        </div>




        {/* Buttons */}

        <div className="flex gap-4 mt-10">


          <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-4 rounded-xl font-semibold text-white ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}
            >
              {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
          </button>



          <button
            className="flex-1 bg-black hover:bg-gray-800 text-white py-4 rounded-xl font-semibold"
          >
            Buy Now
          </button>


        </div>


      </div>


    </div>

  );
}