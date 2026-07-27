import Link from "next/link";
import { notFound } from "next/navigation";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import ProductDetails from "@/components/ProductDetails";
import ProductReviews from "@/components/ProductReviews";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const docRef = doc(db, "products", id);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    notFound();
  }

  const product = {
    id: snap.id,
    ...snap.data(),
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-6">
        <Link
          href="/"
          className="text-pink-600 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>

      <ProductDetails product={product as any} />

      <div className="mt-10 border rounded-2xl p-6">
        <h3 className="font-bold text-lg">
          Delivery Information
        </h3>

        <ul className="mt-4 space-y-3 text-gray-600">
          <li>🚚 Free Delivery on orders above ₹999</li>
          <li>🔄 7 Days Easy Return</li>
          <li>💳 Cash on Delivery Available</li>
          <li>🔒 100% Secure Payment</li>
        </ul>
      </div>

      <div className="mt-16 bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-3xl font-bold">
          Product Description
        </h2>

        <p className="mt-6 text-gray-600 leading-8">
          Premium quality beauty product designed for everyday use.
        </p>
      </div>
      <ProductReviews 
       productId={id}
       />
    </div>
  );
}