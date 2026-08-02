"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { Product } from "@/types/product";

import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";


interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}


export default function RelatedProducts({
  currentProductId,
  category,
}: RelatedProductsProps) {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchRelatedProducts = async () => {

      try {

        const q = query(
          collection(db, "products"),
          where("category", "==", category)
        );


        const snapshot = await getDocs(q);


        const productList = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Product[];


        const filteredProducts = productList
          .filter(
            (product) =>
              product.id !== currentProductId
          )
          .slice(0, 4);


        setProducts(filteredProducts);


      } catch (error) {

        console.error(
          "Error loading related products:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    if (category) {
      fetchRelatedProducts();
    }

  }, [category, currentProductId]);



  if (!loading && products.length === 0) {
    return null;
  }



  return (

    <section className="mt-20">

      {/* Header */}

      <div className="mb-10 text-center">

        <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">

          <Sparkles size={16} />

          Recommended

        </span>


        <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">

          You May Also Like

        </h2>


        <p className="mt-3 text-gray-500">

          Discover more products from this collection.

        </p>


      </div>




      {/* Products Grid */}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">


        {loading ? (

          <>
            {[1,2,3,4].map((item) => (
              <ProductSkeleton key={item} />
            ))}
          </>


        ) : (

          products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))

        )}


      </div>


    </section>

  );
}