"use client";

import Link from "next/link";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl font-bold text-pink-600 cursor-pointer">
            Khushika
          </h1>
        </Link>

        {/* Search */}
        <div className="hidden w-[450px] items-center rounded-full border bg-gray-50 px-4 py-2 md:flex">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search Beauty & Fashion..."
            className="ml-2 w-full bg-transparent outline-none"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {/* Wishlist */}
          <button className="relative">
            <Heart className="cursor-pointer hover:text-pink-600 transition" />
          </button>

          {/* Cart */}
          <Link href="/cart">
            <button className="relative">
              <ShoppingCart className="cursor-pointer hover:text-pink-600 transition" />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>

          {/* User */}
          <button>
            <User className="cursor-pointer hover:text-pink-600 transition" />
          </button>

        </div>
      </div>
    </nav>
  );
}