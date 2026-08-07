"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
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

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-8 sm:px-6 sm:py-12">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-pink-600" size={30} />

            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Shopping Cart
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Review your items before checkout
              </p>
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-md">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-100">
              <ShoppingBag
                size={38}
                className="text-pink-600"
              />
            </div>

            <h2 className="mt-6 text-2xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-3 text-gray-500">
              Add some products to continue shopping.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
            >
              Continue Shopping
            </Link>

          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

            {/* Cart Items */}
            <div className="space-y-5">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white p-4 shadow-md sm:p-5"
                >

                  <div className="flex gap-4">

                    {/* Product Image */}
                    <Image
                      src={item.image || "/logo/logo.png"}
                      alt={item.name}
                      width={110}
                      height={110}
                      className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28"
                    />

                    {/* Product Info */}
                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <div>
                          <h2 className="line-clamp-2 text-base font-bold text-gray-900 sm:text-xl">
                            {item.name}
                          </h2>

                          <p className="mt-2 font-semibold text-pink-600">
                            ₹{item.price}
                          </p>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="rounded-full p-2 text-red-500 transition hover:bg-red-50"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={19} />
                        </button>

                      </div>

                      {/* Quantity */}
                      <div className="mt-5 flex items-center justify-between">

                        <div className="flex items-center gap-3">

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-pink-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="min-w-[24px] text-center font-bold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 transition hover:bg-pink-100"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>

                        </div>

                        {/* Item Total */}
                        <p className="font-bold text-gray-900">
                          ₹{item.price * item.quantity}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-3xl bg-white p-6 shadow-lg lg:sticky lg:top-24">

              <h2 className="text-2xl font-bold">
                Order Summary
              </h2>

              <div className="mt-6 flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>

              <div className="mt-3 flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>
                  {total > 999 ? "FREE" : "₹99"}
                </span>
              </div>

              <div className="my-5 border-t" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span className="text-pink-600">
                  ₹{total > 999 ? total : total + 99}
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block w-full rounded-xl bg-pink-600 py-4 text-center font-semibold text-white transition hover:-translate-y-1 hover:bg-pink-700 hover:shadow-lg"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/"
                className="mt-3 block w-full rounded-xl border border-gray-200 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Continue Shopping
              </Link>

            </div>

          </div>
        )}

      </div>

    </main>
  );
}