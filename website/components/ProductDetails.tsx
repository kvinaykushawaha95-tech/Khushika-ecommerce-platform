
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [showLightbox, setShowLightbox] = useState(false);
  const [imageChanging, setImageChanging] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  /*
   * Make sure images is always a string[].
   * If product.images doesn't exist, use product.image.
   */
  const images: string[] =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const currentIndex = Math.max(
    0,
    images.findIndex((img) => img === selectedImage)
  );

  const discount =
    product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  /* ===================================================== */
  /* IMAGE HELPERS */
  /* ===================================================== */

  function changeImage(image: string) {
    if (image === selectedImage) return;

    setImageChanging(true);
    setSelectedImage(image);

    window.setTimeout(() => {
      setImageChanging(false);
    }, 250);
  }

  function nextImage() {
    if (images.length <= 1) return;

    const nextIndex =
      (currentIndex + 1) % images.length;

    changeImage(images[nextIndex]);
  }

  function prevImage() {
    if (images.length <= 1) return;

    const prevIndex =
      (currentIndex - 1 + images.length) %
      images.length;

    changeImage(images[prevIndex]);
  }

  /* ===================================================== */
  /* KEYBOARD CONTROLS */
  /* ===================================================== */

  useEffect(() => {
    if (!showLightbox) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowLightbox(false);
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        prevImage();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [showLightbox, currentIndex]);

  /* ===================================================== */
  /* MOBILE SWIPE */
  /* ===================================================== */

  function handleTouchStart(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    setTouchStartX(
      event.touches[0].clientX
    );
  }

  function handleTouchEnd(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    if (touchStartX === null) return;

    const touchEndX =
      event.changedTouches[0].clientX;

    const difference =
      touchStartX - touchEndX;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }

    setTouchStartX(null);
  }

  /* ===================================================== */
  /* ADD TO CART */
  /* ===================================================== */

  function handleAddToCart() {
    if (product.stock === 0) {
      toast.error(
        "This product is out of stock."
      );
      return;
    }

    if (quantity > product.stock) {
      toast.error(
        `Only ${product.stock} item(s) available.`
      );
      return;
    }

    addToCart({
      ...product,
      quantity,
    });

    toast.success(
      "Added to cart successfully!"
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

      {/* ===================================================== */}
      {/* PRODUCT GALLERY */}
      {/* ===================================================== */}

      <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-xl sm:p-6 lg:p-8">

        {/* Main Image */}

        <div
          className="relative overflow-hidden rounded-2xl bg-gray-50"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          {/* Image Counter */}

          {images.length > 1 && (
            <div className="absolute left-4 top-4 z-10 rounded-full bg-black/70 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Zoom Hint */}

          <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
            Click to zoom
          </div>

          {/* Main Product Image */}

          <button
            type="button"
            onClick={() =>
              setShowLightbox(true)
            }
            className="group block h-[380px] w-full cursor-zoom-in sm:h-[500px] lg:h-[550px]"
            aria-label="View product image"
          >
            <Image
              src={selectedImage}
              alt={product.name}
              width={700}
              height={700}
              priority
              className={`h-full w-full object-contain p-4 transition-all duration-300 sm:p-6 ${
                imageChanging
                  ? "scale-95 opacity-50"
                  : "scale-100 opacity-100 group-hover:scale-105"
              }`}
            />
          </button>

          {/* Previous Image */}

          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                prevImage();
              }}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg transition hover:scale-110 hover:bg-white sm:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Next Image */}

          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-800 shadow-lg transition hover:scale-110 hover:bg-white sm:right-8"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* ================================================= */}
        {/* THUMBNAILS */}
        {/* ================================================= */}

        {images.length > 1 && (
          <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
            {images.map((img, index) => {
              const isSelected =
                selectedImage === img;

              return (
                <button
                  key={`${img}-${index}`}
                  type="button"
                  onClick={() =>
                    changeImage(img)
                  }
                  className={`group shrink-0 rounded-xl border-2 p-1.5 transition-all duration-200 ${
                    isSelected
                      ? "border-pink-600 bg-pink-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-pink-300 hover:shadow-sm"
                  }`}
                  aria-label={`View product image ${
                    index + 1
                  }`}
                  aria-current={
                    isSelected
                      ? "true"
                      : undefined
                  }
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${
                      index + 1
                    }`}
                    width={80}
                    height={80}
                    className={`h-16 w-16 rounded-lg object-cover transition sm:h-20 sm:w-20 ${
                      isSelected
                        ? "scale-95"
                        : "group-hover:scale-105"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Mobile Swipe Hint */}

        {images.length > 1 && (
          <p className="mt-2 text-center text-xs text-gray-400 sm:hidden">
            Swipe left or right to view images
          </p>
        )}
      </div>

      {/* ===================================================== */}
      {/* PRODUCT DETAILS */}
      {/* ===================================================== */}

      <div>

        {/* Product Name */}

        <h1 className="text-3xl font-extrabold leading-tight text-gray-900 md:text-5xl">
          {product.name}
        </h1>

        {/* Rating */}

        <div className="mt-5 flex flex-wrap items-center gap-3">
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

          {product.originalPrice >
            product.price && (
            <span className="text-2xl text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}

          {discount > 0 && (
            <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Description */}

        <p className="mt-6 leading-7 text-gray-600">
          Premium quality beauty product
          designed for everyday use.
        </p>

        {/* Stock */}

        <div className="mt-4">
          {product.stock > 10 && (
            <span className="font-semibold text-green-600">
              🟢 In Stock ({product.stock} available)
            </span>
          )}

          {product.stock > 0 &&
            product.stock <= 10 && (
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

        {/* ================================================= */}
        {/* QUANTITY */}
        {/* ================================================= */}

        <div className="mt-10">
          <h3 className="mb-3 font-semibold">
            Quantity
          </h3>

          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={() =>
                setQuantity((prev) =>
                  prev > 1
                    ? prev - 1
                    : 1
                )
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border bg-white text-xl shadow transition hover:bg-pink-50"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span className="min-w-6 text-center text-xl font-bold">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                setQuantity((prev) =>
                  prev < product.stock
                    ? prev + 1
                    : prev
                )
              }
              disabled={product.stock === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-xl transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* ================================================= */}
        {/* ACTION BUTTONS */}
        {/* ================================================= */}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

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

          <button
            type="button"
            disabled={product.stock === 0}
            className="flex-1 rounded-2xl bg-black py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Buy Now
          </button>
        </div>

        {/* ================================================= */}
        {/* FEATURES */}
        {/* ================================================= */}

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-md">
            <div className="text-2xl">
              🚚
            </div>

            <p className="mt-2 text-sm font-medium">
              Free Shipping
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-md">
            <div className="text-2xl">
              🔒
            </div>

            <p className="mt-2 text-sm font-medium">
              Secure Payment
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-4 text-center transition hover:-translate-y-1 hover:shadow-md">
            <div className="text-2xl">
              ↩️
            </div>

            <p className="mt-2 text-sm font-medium">
              Easy Returns
            </p>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* FULLSCREEN LIGHTBOX */}
      {/* ===================================================== */}

      {showLightbox && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          onClick={() =>
            setShowLightbox(false)
          }
          role="dialog"
          aria-modal="true"
          aria-label="Product image viewer"
        >

          {/* Close */}

          <button
            type="button"
            onClick={() =>
              setShowLightbox(false)
            }
            className="absolute right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-lg transition hover:scale-110 hover:bg-white sm:right-6 sm:top-6"
            aria-label="Close image viewer"
          >
            <X size={25} />
          </button>

          {/* Counter */}

          {images.length > 1 && (
            <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              {currentIndex + 1} /{" "}
              {images.length}
            </div>
          )}

          {/* Previous */}

          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                prevImage();
              }}
              className="absolute left-3 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-lg transition hover:scale-110 hover:bg-white sm:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Image */}

          <div
            className="relative h-[75vh] w-full max-w-6xl"
            onClick={(event) =>
              event.stopPropagation()
            }
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next */}

          {images.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              className="absolute right-3 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-lg transition hover:scale-110 hover:bg-white sm:right-8"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Keyboard Hint */}

          {images.length > 1 && (
            <div className="absolute bottom-5 hidden rounded-full bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur-md sm:block">
              ← → Navigate &nbsp; • &nbsp; ESC Close
            </div>
          )}
        </div>
      )}
    </div>
  );
}