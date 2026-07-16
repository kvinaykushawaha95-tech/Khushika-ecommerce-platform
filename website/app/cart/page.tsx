"use client";

import Image from "next/image";
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
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        🛒 Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            Your cart is empty
          </h2>

          <p className="text-gray-500 mt-3">
            Add some products to continue shopping.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white rounded-2xl shadow-md p-5"
              >
                <div className="flex items-center gap-5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-xl"
                  />

                  <div>
                    <h2 className="text-xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-pink-600 font-semibold">
                      ₹{item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-200 w-9 h-9 rounded-full"
                  >
                    -
                  </button>

                  <span className="font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-200 w-9 h-9 rounded-full"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gray-100 rounded-2xl p-6">
            <h2 className="text-2xl font-bold">
              Total: ₹{total}
            </h2>

            <button className="mt-5 w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-semibold">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}