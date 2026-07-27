"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      const snapshot = await getDocs(collection(db, "products"));

      const data: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));

      setProducts(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function deleteProduct(id: string) {
    const confirmDelete = confirm(
      "Delete this product permanently?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", id));

      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );

      alert("✅ Product Deleted");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete product");
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Manage Products
        </h1>

        <Link
          href="/admin/add-product"
          className="bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700"
        >
          + Add Product
        </Link>

      </div>

      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-xl p-3 mb-8"
      />

      <div className="overflow-x-auto rounded-xl shadow bg-white">

        <table className="w-full">

          <thead className="bg-pink-600 text-white">

            <tr>

              <th className="p-4">Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Rating</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr
                key={product.id}
                className="border-b text-center"
              >

                <td className="p-3">

                  <Image
                      src={product.image || "/placeholder.png"}
                      alt={product.name}
                      width={70}
                      height={70}
                      className="rounded-lg object-cover mx-auto"
                    />

                </td>

                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>

                  ₹{product.price}

                  <div className="text-sm text-gray-400 line-through">

                    ₹{product.originalPrice}

                  </div>

                </td>
                <td>

                  <div className="font-semibold">
                    {product.stock}
                  </div>

                  <div className="mt-1">

                    {product.stock > 10 && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        🟢 In Stock
                      </span>
                    )}

                    {product.stock > 0 && product.stock <= 10 && (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                        🟡 Low Stock
                      </span>
                    )}

                    {product.stock === 0 && (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                        🔴 Out of Stock
                      </span>
                    )}

                  </div>

                </td>
                

                <td>⭐ {product.rating}</td>

                <td>

                  <div className="flex justify-center gap-3">

                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}