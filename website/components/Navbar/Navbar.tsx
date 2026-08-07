
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    await signOut(auth);
    setOpen(false);
    setMobileOpen(false);
  }

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <>
      {/* ================= TOP BAR ================= */}

      <TopBar />

      {/* ================= MAIN NAVBAR ================= */}

      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-xl">

        {/* Main Row */}

        <div className="mx-auto flex h-[76px] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-[82px] lg:px-8">

          {/* Logo */}

          <div className="shrink-0">
            <Logo />
          </div>

          {/* Desktop Search */}

          <div className="hidden min-w-0 flex-1 lg:block lg:max-w-2xl lg:mx-auto">
            <SearchBar />
          </div>

          {/* Right Actions */}

          <div className="ml-auto flex items-center gap-1 sm:gap-2">

            {/* Wishlist */}

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="group relative rounded-full p-2.5 transition-all duration-200 hover:bg-pink-50 sm:p-3"
            >
              <Heart
                size={21}
                strokeWidth={1.8}
                className="transition-transform duration-200 group-hover:scale-110 group-hover:text-pink-600"
              />

              {totalWishlist > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-[10px] font-bold text-white shadow-sm">
                  {totalWishlist > 99 ? "99+" : totalWishlist}
                </span>
              )}
            </Link>

            {/* Cart */}

            <Link
              href="/cart"
              aria-label="Shopping cart"
              className="group relative rounded-full p-2.5 transition-all duration-200 hover:bg-pink-50 sm:p-3"
            >
              <ShoppingCart
                size={21}
                strokeWidth={1.8}
                className="transition-transform duration-200 group-hover:scale-110 group-hover:text-pink-600"
              />

              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-[10px] font-bold text-white shadow-sm">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Profile */}

            <div
              className="relative hidden sm:block"
              ref={dropdownRef}
            >
              <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-label="Account menu"
                aria-expanded={open}
                className="group rounded-full p-2.5 transition-all duration-200 hover:bg-pink-50 sm:p-3"
              >
                <User
                  size={21}
                  strokeWidth={1.8}
                  className="transition-transform duration-200 group-hover:scale-110 group-hover:text-pink-600"
                />
              </button>

              {/* Profile Dropdown */}

              {open && (
                <div className="absolute right-0 top-full mt-3 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">

                  {/* Account Header */}

                  <div className="border-b border-pink-100 bg-gradient-to-br from-pink-50 to-white p-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-600 text-lg font-bold text-white shadow-md">
                        K
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Welcome
                        </h3>

                        <p className="text-sm text-gray-500">
                          Manage your account
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Menu Items */}

                  <div className="p-2">

                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-pink-50 hover:text-pink-600"
                    >
                      <User size={18} />
                      Profile
                    </Link>

                    <Link
                      href="/orders"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-pink-50 hover:text-pink-600"
                    >
                      <Package size={18} />
                      Orders
                    </Link>

                    <Link
                      href="/wishlist"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-pink-50 hover:text-pink-600"
                    >
                      <Heart size={18} />
                      Wishlist
                    </Link>

                    <Link
                      href="/addresses"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-pink-50 hover:text-pink-600"
                    >
                      <MapPin size={18} />
                      Addresses
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-pink-50 hover:text-pink-600"
                    >
                      <Settings size={18} />
                      Settings
                    </Link>

                    <div className="my-2 border-t border-gray-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>

                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={
                mobileOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
              className="rounded-full p-2.5 transition hover:bg-pink-50 lg:hidden"
            >
              {mobileOpen ? (
                <X size={23} />
              ) : (
                <Menu size={23} />
              )}
            </button>

          </div>
        </div>

        {/* ================= MOBILE SEARCH ================= */}

        <div className="border-t border-gray-100 px-4 py-3 lg:hidden">
          <SearchBar />
        </div>

        {/* ================= DESKTOP NAVIGATION ================= */}

        <nav className="hidden border-t border-gray-100 bg-white lg:block">
          <div className="mx-auto flex max-w-7xl items-center gap-10 px-8 py-3.5">

            <Link
              href="/"
              className="relative py-1 text-sm font-semibold text-gray-800 transition hover:text-pink-600"
            >
              Home
            </Link>

            <Link
              href="/category/cosmetics"
              className="relative py-1 text-sm font-semibold text-gray-800 transition hover:text-pink-600"
            >
              Cosmetics
            </Link>

            <Link
              href="/category/clothes"
              className="relative py-1 text-sm font-semibold text-gray-800 transition hover:text-pink-600"
            >
              Clothes
            </Link>

            <Link
              href="/offers"
              className="relative py-1 text-sm font-semibold text-gray-800 transition hover:text-pink-600"
            >
              Offers
            </Link>

            <Link
              href="/contact"
              className="relative py-1 text-sm font-semibold text-gray-800 transition hover:text-pink-600"
            >
              Contact
            </Link>

          </div>
        </nav>

        {/* ================= MOBILE MENU ================= */}

        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white shadow-lg lg:hidden">

            <div className="space-y-1 p-4">

              {/* Home */}

              <Link
                href="/"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 font-medium text-gray-800 transition hover:bg-pink-50 hover:text-pink-600"
              >
                <span className="text-lg">🏠</span>
                Home
              </Link>

              {/* Cosmetics */}

              <Link
                href="/category/cosmetics"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 font-medium text-gray-800 transition hover:bg-pink-50 hover:text-pink-600"
              >
                <span className="text-lg">💄</span>
                Cosmetics
              </Link>

              {/* Clothes */}

              <Link
                href="/category/clothes"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 font-medium text-gray-800 transition hover:bg-pink-50 hover:text-pink-600"
              >
                <span className="text-lg">👗</span>
                Clothes
              </Link>

              {/* Offers */}

              <Link
                href="/offers"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 font-medium text-gray-800 transition hover:bg-pink-50 hover:text-pink-600"
              >
                <span className="text-lg">🎁</span>
                Offers
              </Link>

              {/* Contact */}

              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 font-medium text-gray-800 transition hover:bg-pink-50 hover:text-pink-600"
              >
                <span className="text-lg">📞</span>
                Contact
              </Link>

              {/* Divider */}

              <div className="my-3 border-t border-gray-100" />

              {/* Wishlist */}

              <Link
                href="/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 font-medium text-gray-700 transition hover:bg-pink-50 hover:text-pink-600"
              >
                <span className="flex items-center gap-3">
                  <Heart size={19} />
                  Wishlist
                </span>

                {totalWishlist > 0 && (
                  <span className="rounded-full bg-pink-100 px-2.5 py-1 text-xs font-bold text-pink-600">
                    {totalWishlist}
                  </span>
                )}
              </Link>

              {/* Cart */}

              <Link
                href="/cart"
                onClick={closeMobileMenu}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 font-medium text-gray-700 transition hover:bg-pink-50 hover:text-pink-600"
              >
                <span className="flex items-center gap-3">
                  <ShoppingCart size={19} />
                  Cart
                </span>

                {totalItems > 0 && (
                  <span className="rounded-full bg-pink-100 px-2.5 py-1 text-xs font-bold text-pink-600">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Profile */}

              <Link
                href="/profile"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 font-medium text-gray-700 transition hover:bg-pink-50 hover:text-pink-600"
              >
                <User size={19} />
                Profile
              </Link>

              {/* Orders */}

              <Link
                href="/orders"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 font-medium text-gray-700 transition hover:bg-pink-50 hover:text-pink-600"
              >
                <Package size={19} />
                Orders
              </Link>

            </div>
          </div>
        )}

      </header>
    </>
  );
}
