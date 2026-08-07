"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || product.image
  );

  const [showLightbox, setShowLightbox] = useState(false);

  const images = product.images?.length
    ? product.images
    : [product.image];

  const currentIndex = images.findIndex(
    (img) => img === selectedImage
  );

  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  );

  function nextImage() {
    const next = (currentIndex + 1) % images.length;
    setSelectedImage(images[next]);
  }

  function prevImage() {
    const prev =
      (currentIndex - 1 + images.length) % images.length;

    setSelectedImage(images[prev]);
  }

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
    <div className="grid gap-12 lg:grid-cols-2">

      {/* ================= PRODUCT GALLERY ================= */}

      <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-xl sm:p-6 lg:p-8">

        {/* Main Product Image */}

        <div className="cursor-zoom-in">
          <button
            type="button"
            onClick={() => setShowLightbox(true)}
            className="group block w-full cursor-zoom-in"
            aria-label="View product image"
          >
            <Image
              src={selectedImage}
              alt={product.name}
              width={700}
              height={700}
              className="h-[550px] w-full object-contain transition duration-500 group-hover:scale-105"
            />
          </button>
        </div>

        {/* Thumbnails */}

        <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`shrink-0 rounded-xl border p-2 transition ${
                selectedImage === img
                  ? "border-pink-600 shadow-md"
                  : "border-gray-200 hover:border-pink-300"
              }`}
              aria-label={`View product image ${index + 1}`}
            >
              <Image
                src={img}
                alt={`${product.name} ${index + 1}`}
                width={80}
                height={80}
                className="h-20 w-20 rounded-lg object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ================= PRODUCT DETAILS ================= */}

      <div>

        {/* Product Name */}

        <h1 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-5xl">
          {product.name}
        </h1>

        {/* Rating */}

        <div className="mt-5 flex items-center gap-3">
          <div className="rounded-full bg-yellow-100 px-3 py-1 font-semibold text-yellow-700">
            ⭐ {product.rating}
          </div>

          <span className="text-gray-500">
            Trusted by customers
          </span>
        </div>

        {/* Price */}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="text-4xl font-bold text-pink-600">
            ₹{product.price}
          </span>

          <span className="text-2xl text-gray-400 line-through">
            ₹{product.originalPrice}
          </span>

          <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
            {discount}% OFF
          </span>
        </div>

        {/* Description */}

        <p className="mt-6 text-gray-600">
          Premium quality beauty product designed for everyday use.
        </p>

        {/* Stock Status */}

        <div className="mt-4">
          {product.stock > 10 && (
            <span className="font-semibold text-green-600">
              🟢 In Stock ({product.stock} available)
            </span>
          )}

          {product.stock > 0 && product.stock <= 10 && (
            <span className="font-semibold text-yellow-600">
              🟡 Only {product.stock} left
            </span>
          )}

          {product.stock === 0 && (
            <span className="text-lg font-bold text-red-600">
              🔴 Out of Stock
            </span>
          )}
        </div>

        {/* ================= QUANTITY ================= */}

        <div className="mt-10">
          <h3 className="mb-3 font-semibold">
            Quantity
          </h3>

          <div className="flex items-center gap-4">

            {/* Decrease */}

            <button
              type="button"
              onClick={() =>
                setQuantity((prev) =>
                  prev > 1 ? prev - 1 : 1
                )
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border bg-white text-xl shadow transition hover:bg-pink-50"
            >
              -
            </button>

            {/* Quantity */}

            <span className="text-xl font-bold">
              {quantity}
            </span>

            {/* Increase */}

            <button
              type="button"
              onClick={() =>
                setQuantity((prev) =>
                  prev < product.stock ? prev + 1 : prev
                )
              }
              disabled={product.stock === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        {/* ================= ACTION BUTTONS ================= */}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          {/* Add To Cart */}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 rounded-2xl py-4 text-lg font-semibold text-white transition-all duration-300 ${
              product.stock === 0
                ? "cursor-not-allowed bg-gray-400"
                : "bg-pink-600 hover:-translate-y-1 hover:bg-pink-700 hover:shadow-xl"
            }`}
          >
            {product.stock === 0
              ? "Out of Stock"
              : "Add To Cart"}
          </button>

          {/* Buy Now */}

          <button
            type="button"
            disabled={product.stock === 0}
            className="flex-1 rounded-2xl bg-black py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Buy Now
          </button>
        </div>

        {/* ================= FEATURES ================= */}

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Free Shipping */}

          <div className="rounded-2xl border p-4 text-center">
            <div className="text-2xl">
              🚚
            </div>

            <p className="mt-2 text-sm font-medium">
              Free Shipping
            </p>
          </div>

          {/* Secure Payment */}

          <div className="rounded-2xl border p-4 text-center">
            <div className="text-2xl">
              🔒
            </div>

            <p className="mt-2 text-sm font-medium">
              Secure Payment
            </p>
          </div>

          {/* Easy Returns */}

          <div className="rounded-2xl border p-4 text-center">
            <div className="text-2xl">
              ↩️
            </div>

            <p className="mt-2 text-sm font-medium">
              Easy Returns
            </p>
          </div>
        </div>
      </div>

      {/* ================= FULLSCREEN LIGHTBOX ================= */}

      {showLightbox && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setShowLightbox(false)}
        >

          {/* Close Button */}

          <button
            type="button"
            onClick={() => setShowLightbox(false)}
            className="absolute right-5 top-5 z-50 rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition hover:bg-white"
            aria-label="Close image viewer"
          >
            <X size={28} />
          </button>

          {/* Previous Button */}

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-5 z-50 rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition hover:bg-white md:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft size={30} />
            </button>
          )}

          {/* Image */}

          <div
            className="relative flex h-[80vh] w-full max-w-5xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Next Button */}

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-5 z-50 rounded-full bg-white/90 p-3 text-gray-900 shadow-lg transition hover:bg-white md:right-8"
              aria-label="Next image"
            >
              <ChevronRight size={30} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}