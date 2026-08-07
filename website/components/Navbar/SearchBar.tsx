"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "products")
        );

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));

        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Close with Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSuggestions(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const suggestions = products
    .filter((product) =>
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase().trim())
    )
    .slice(0, 5);

  const handleClear = () => {
    setSearch("");
    setShowSuggestions(false);
  };

  return (
    <div
      ref={searchRef}
      className="relative w-full max-w-xl"
    >
      {/* Search Input */}
      <div className="flex h-11 items-center rounded-full border border-gray-200 bg-gray-100 px-4 transition focus-within:border-pink-500 focus-within:bg-white focus-within:shadow-sm">
        <Search
          size={19}
          className="shrink-0 text-gray-500"
        />

        <input
          type="text"
          value={search}
          onFocus={() => {
            if (search.trim()) {
              setShowSuggestions(true);
            }
          }}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Search Beauty & Fashion..."
          className="ml-3 w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-500"
        />

        {search && (
          <button
            type="button"
            onClick={handleClear}
            className="ml-2 rounded-full p-1 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && search.trim() && (
        <div className="absolute left-0 right-0 top-14 z-[100] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
          
          {suggestions.length > 0 ? (
            <div className="py-2">
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={handleClear}
                  className="flex items-center gap-3 px-4 py-3 transition hover:bg-pink-50"
                >
                  {/* Product Image */}
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <Image
                      src={
                        product.image ||
                        "/logo/logo.png"
                      }
                      alt={product.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-semibold text-gray-900">
                      {product.name}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-pink-600">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-5 py-6 text-center">
              <Search
                size={28}
                className="mx-auto mb-2 text-gray-300"
              />

              <p className="text-sm font-medium text-gray-700">
                No products found
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Try another search
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}