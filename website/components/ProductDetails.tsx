"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";


interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
  product.images?.[0] || product.image
);


  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  );


  function handleAddToCart() {
  if (product.stock === 0) {
    toast.error("This product is out of stock.");
    return;
  }

  if (quantity > product.stock) {
    toast.error(`Only ${product.stock} item(s) available.`);
    return;
  }

  addToCart({
    ...product,
    quantity,
  });

  toast.success("Added to cart successfully!");
}


  return (

    <div className="grid lg:grid-cols-2 gap-12">


{/* Product Gallery */}

<div>

  <div className="sticky top-24">

    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">

      <Image
        src={selectedImage}
        alt={product.name}
        width={700}
        height={700}
        className="h-[550px] w-full object-contain transition duration-500 hover:scale-110"
      />

    </div>


    {/* Thumbnails */}

    <div className="mt-5 flex gap-4 overflow-x-auto">

      {(product.images || [product.image]).map(
        (img, index) => (

        <div
          key={index}
          onClick={() => setSelectedImage(img)}
          className={`cursor-pointer rounded-xl border p-2 transition ${
            selectedImage === img
              ? "border-pink-600 shadow-md"
              : "border-gray-200"
          }`}
        >

          <Image
            src={img}
            alt={product.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-lg object-cover"
          />

        </div>

      ))}

    </div>

  </div>

</div>



      {/* Details */}

      <div>


        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
          {product.name}
        </h1>



        <div className="mt-5 flex items-center gap-3">
          <div className="rounded-full bg-yellow-100 px-3 py-1 font-semibold text-yellow-700">
            ⭐ {product.rating}
          </div>

          <span className="text-gray-500">
            Trusted by customers
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
              className="flex h-11 w-11 items-center justify-center rounded-full border bg-white text-xl shadow hover:bg-pink-50"
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
              className={`flex-1 rounded-2xl py-4 text-lg font-semibold text-white transition-all duration-300 ${
                  product.stock === 0
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-pink-600 hover:-translate-y-1 hover:bg-pink-700 hover:shadow-xl"
                }`}
                            >
              {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
          </button>



          <button
            className="flex-1 rounded-2xl bg-black py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl"
          >
            Buy Now

          </button>
          <div className="mt-10 grid grid-cols-3 gap-4">

            <div className="rounded-2xl border p-4 text-center">
              <div className="text-2xl">🚚</div>
              <p className="mt-2 text-sm font-medium">
                Free Shipping
              </p>
            </div>

            <div className="rounded-2xl border p-4 text-center">
              <div className="text-2xl">🔒</div>
              <p className="mt-2 text-sm font-medium">
                Secure Payment
              </p>
            </div>

            <div className="rounded-2xl border p-4 text-center">
              <div className="text-2xl">↩️</div>
              <p className="mt-2 text-sm font-medium">
                Easy Returns
              </p>
            </div>

          </div>


        </div>


      </div>


    </div>

  );
}