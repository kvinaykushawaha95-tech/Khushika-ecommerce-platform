import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import ProductCard from "@/components/Product/ProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  rating: number;
  category: string;
  stock: number;
}

export default async function ClothesPage() {
  const productsQuery = query(
    collection(db, "products"),
    where("category", "==", "clothes")
  );

  const snapshot = await getDocs(productsQuery);

  const products: Product[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,

      name: String(data.name || ""),

      price: Number(data.price || 0),

      originalPrice: Number(
        data.originalPrice || 0
      ),

      image: String(data.image || ""),

      images: Array.isArray(data.images)
        ? data.images.map(String)
        : data.image
          ? [String(data.image)]
          : [],

      rating: Number(data.rating || 0),

      category: String(data.category || ""),

      stock: Number(data.stock || 0),
    };
  });

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Clothes
          </h1>

          <p className="mt-3 text-gray-500">
            Explore the latest fashion collection.
          </p>
        </div>

        {/* ================= PRODUCTS ================= */}

        {products.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-medium text-gray-700">
              No clothes products available yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}