"use client";

import { useEffect, useState } from "react";
import { Sparkles, Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  category: string;
  stock: number;
}

export default function FeaturedProducts() {

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));

      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      setProducts(productList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);

  useEffect(() => {
    let result = [...products];

    if (search) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, search, category, sort]);

  
  return (
    <section className="bg-pink-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="mb-12 text-center">

          <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            <Sparkles size={16} />
            New Arrivals
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900 md:text-5xl">
            Featured Products
          </h2>

          <p className="mt-4 text-gray-500">
            Explore our latest Beauty & Fashion collection.
          </p>

        </div>

        {/* Filters */}

        <div className="mb-10 rounded-3xl bg-white p-6 shadow-md">

          <div className="grid gap-5 md:grid-cols-3">

            <div className="relative">

              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 outline-none focus:border-pink-500"
              />

            </div>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
            >
              <option value="All">All Categories</option>
              <option value="Cosmetics">Cosmetics</option>
              <option value="Clothes">Clothes</option>
            </select>

            <div className="relative">

              <SlidersHorizontal
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 outline-none focus:border-pink-500"
              >
                <option value="">Sort By Price</option>
                <option value="low">
                  Price Low to High
                </option>
                <option value="high">
                  Price High to Low
                </option>
              </select>

            </div>

          </div>

        </div>

        {/* Products */}

        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-3xl bg-white py-20 text-center shadow-md">
            <h3 className="text-2xl font-semibold">
              No Products Found
            </h3>

            <p className="mt-2 text-gray-500">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}