"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  User,
  Package,
  MapPin,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

import TopBar from "./TopBar";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalWishlist = wishlist.length;

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

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

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await signOut(auth);
    setOpen(false);
  }

  return (
    <>
      <TopBar />

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <Logo />

          <SearchBar />

          <div className="flex items-center gap-3">

            {/* Wishlist */}
            <Link href="/wishlist">
              <div className="relative rounded-full p-3 hover:bg-pink-50 transition">
                <Heart size={22} />

                {totalWishlist > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center">
                    {totalWishlist}
                  </span>
                )}
              </div>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <div className="relative rounded-full p-3 hover:bg-pink-50 transition">
                <ShoppingCart size={22} />

                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>

            {/* Profile */}
            <div className="relative" ref={dropdownRef}>

              <button
                onClick={() => setOpen(!open)}
                className="rounded-full p-3 hover:bg-pink-50 transition"
              >
                <User size={22} />
              </button>

              {open && (
                <div className="absolute right-0 mt-4 w-64 rounded-2xl border bg-white shadow-xl overflow-hidden">

                  <div className="border-b bg-pink-50 p-5">

                    <div className="h-14 w-14 rounded-full bg-pink-600 flex items-center justify-center text-white text-xl font-bold">
                      K
                    </div>

                    <h3 className="mt-3 font-semibold">
                      Welcome
                    </h3>

                    <p className="text-sm text-gray-500">
                      Manage your account
                    </p>

                  </div>

                  <Link href="/profile" className="flex items-center gap-3 px-5 py-3 hover:bg-pink-50">
                    <User size={18}/> Profile
                  </Link>

                  <Link href="/orders" className="flex items-center gap-3 px-5 py-3 hover:bg-pink-50">
                    <Package size={18}/> Orders
                  </Link>

                  <Link href="/wishlist" className="flex items-center gap-3 px-5 py-3 hover:bg-pink-50">
                    <Heart size={18}/> Wishlist
                  </Link>

                  <Link href="/addresses" className="flex items-center gap-3 px-5 py-3 hover:bg-pink-50">
                    <MapPin size={18}/> Addresses
                  </Link>

                  <Link href="/settings" className="flex items-center gap-3 px-5 py-3 hover:bg-pink-50">
                    <Settings size={18}/> Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18}/> Logout
                  </button>

                </div>
              )}

            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden rounded-full p-2 hover:bg-pink-50"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>

          </div>

        </div>

        {/* Navigation */}
        <nav className="hidden lg:block border-t bg-white">
          <div className="mx-auto flex max-w-7xl gap-10 px-5 py-4 font-medium">

            <Link href="/" className="hover:text-pink-600">
              Home
            </Link>

            <Link href="/category/cosmetics" className="hover:text-pink-600">
              Cosmetics
            </Link>

            <Link href="/category/clothes" className="hover:text-pink-600">
              Clothes
            </Link>

            <Link href="/offers" className="hover:text-pink-600">
              Offers
            </Link>

            <Link href="/contact" className="hover:text-pink-600">
              Contact
            </Link>

          </div>
        </nav>

      </header>
    </>
  );
}