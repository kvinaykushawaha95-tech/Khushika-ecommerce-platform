
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = total > 999 ? 0 : 99;
  const grandTotal = total + shipping;

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8 sm:px-6 lg:py-12">

      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-widest text-pink-600">
            Your Shopping Bag
          </p>

          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
                Shopping Cart
              </h1>

              <p className="mt-2 text-gray-500">
                Review your items before checkout.
              </p>
            </div>

            {cart.length > 0 && (
              <p className="text-sm font-medium text-gray-500">
                {cart.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}{" "}
                item(s)
              </p>
            )}

          </div>

        </div>

        {/* ================= EMPTY CART ================= */}

        {cart.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-lg sm:px-10">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-pink-50">
              <ShoppingBag
                size={42}
                className="text-pink-600"
              />
            </div>

            <h2 className="mt-7 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              Looks like you haven't added anything to your
              shopping bag yet. Discover something you love.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-xl"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </Link>

          </div>
        ) : (

          /* ================= CART CONTENT ================= */

          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

            {/* ================= CART ITEMS ================= */}

            <div className="space-y-4">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="rounded-3xl border border-gray-100 bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg sm:p-5"
                >

                  <div className="flex gap-4 sm:gap-6">

                    {/* Product Image */}

                    <Link
                      href={`/product/${item.id}`}
                      className="shrink-0"
                    >
                      <div className="overflow-hidden rounded-2xl bg-gray-50">

                        <Image
                          src={
                            item.image ||
                            "/logo/logo.png"
                          }
                          alt={item.name}
                          width={140}
                          height={140}
                          className="h-24 w-24 object-cover transition duration-300 hover:scale-105 sm:h-32 sm:w-32"
                        />

                      </div>
                    </Link>

                    {/* Product Information */}

                    <div className="flex min-w-0 flex-1 flex-col">

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <Link
                            href={`/product/${item.id}`}
                            className="line-clamp-2 text-base font-bold text-gray-900 transition hover:text-pink-600 sm:text-lg"
                          >
                            {item.name}
                          </Link>

                          <p className="mt-2 text-lg font-bold text-pink-600">
                            ₹{item.price}
                          </p>

                        </div>

                        {/* Remove */}

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="shrink-0 rounded-full p-2.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                      {/* Bottom Row */}

                      <div className="mt-auto flex items-end justify-between gap-3 pt-4">

                        {/* Quantity */}

                        <div>

                          <p className="mb-2 text-xs font-medium text-gray-400">
                            Quantity
                          </p>

                          <div className="flex items-center rounded-full border border-gray-200 bg-gray-50 p-1">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm transition hover:bg-pink-100 hover:text-pink-600"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={15} />
                            </button>

                            <span className="w-9 text-center text-sm font-bold text-gray-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white shadow-sm transition hover:bg-pink-700"
                              aria-label="Increase quantity"
                            >
                              <Plus size={15} />
                            </button>

                          </div>

                        </div>

                        {/* Item Total */}

                        <div className="text-right">

                          <p className="text-xs text-gray-400">
                            Item Total
                          </p>

                          <p className="mt-1 text-lg font-bold text-gray-900">
                            ₹{item.price * item.quantity}
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

              {/* Continue Shopping */}

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl px-2 py-3 font-semibold text-gray-600 transition hover:text-pink-600"
              >
                ← Continue Shopping
              </Link>

            </div>

            {/* ================= ORDER SUMMARY ================= */}

            <div className="lg:sticky lg:top-28 lg:self-start">

              <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-7">

                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                {/* Summary */}

                <div className="mt-6 space-y-4">

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ₹{total}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600">
                    <span>Shipping</span>

                    {shipping === 0 ? (
                      <span className="font-semibold text-green-600">
                        FREE
                      </span>
                    ) : (
                      <span className="font-semibold text-gray-900">
                        ₹{shipping}
                      </span>
                    )}
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-4">

                    <div className="flex items-center justify-between">

                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>

                      <span className="text-2xl font-extrabold text-pink-600">
                        ₹{grandTotal}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Free Shipping Message */}

                {total < 999 && (
                  <div className="mt-5 rounded-xl bg-pink-50 p-3 text-sm text-pink-700">
                    Add{" "}
                    <span className="font-bold">
                      ₹{999 - total}
                    </span>{" "}
                    more to get free shipping.
                  </div>
                )}

                {total >= 999 && (
                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700">
                    <Truck size={17} />
                    You unlocked free shipping!
                  </div>
                )}

                {/* Checkout */}

                <Link
                  href="/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 py-4 font-semibold text-white shadow-lg shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-xl"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </Link>

                {/* Security */}

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <ShieldCheck size={15} />
                  Secure checkout & protected payment
                </div>

              </div>

              {/* Benefits */}

              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">

                  <Truck
                    size={21}
                    className="mx-auto text-pink-600"
                  />

                  <p className="mt-2 text-xs font-semibold text-gray-700">
                    Fast Delivery
                  </p>

                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-sm">

                  <ShieldCheck
                    size={21}
                    className="mx-auto text-pink-600"
                  />

                  <p className="mt-2 text-xs font-semibold text-gray-700">
                    Secure Payment
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}

