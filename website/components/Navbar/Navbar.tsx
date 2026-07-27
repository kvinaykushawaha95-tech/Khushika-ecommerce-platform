"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Package,
  MapPin,
  Settings,
  LogOut,
} from "lucide-react";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const totalWishlist = wishlist.length;

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">

        {/* Logo */}
        <Link href="/">
          <h1 className="cursor-pointer text-3xl font-bold text-pink-600">
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
          <Link href="/wishlist">
            <button className="relative">
              <Heart className="cursor-pointer transition hover:text-pink-600" />

              {totalWishlist > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white">
                  {totalWishlist}
                </span>
              )}
            </button>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <button className="relative">
              <ShoppingCart className="cursor-pointer transition hover:text-pink-600" />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>

            <button onClick={() => setOpen(!open)}>
              <User className="cursor-pointer transition hover:text-pink-600" />
            </button>

            {open && (
              <div className="absolute right-0 z-50 mt-3 w-64 rounded-xl border bg-white shadow-xl">

                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-pink-50"
                >
                  <User size={18} />
                  My Profile
                </Link>

                <Link
                  href="/orders"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-pink-50"
                >
                  <Package size={18} />
                  My Orders
                </Link>

                <Link
                  href="/wishlist"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-pink-50"
                >
                  <Heart size={18} />
                  Wishlist
                </Link>

                <Link
                  href="/addresses"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-pink-50"
                >
                  <MapPin size={18} />
                  Addresses
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-pink-50"
                >
                  <Settings size={18} />
                  Settings
                </Link>

                <hr />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}