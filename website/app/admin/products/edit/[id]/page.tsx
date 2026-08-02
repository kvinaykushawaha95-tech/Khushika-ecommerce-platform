"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export default function EditProductPage() {

  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  const [product, setProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    image: "",
    rating: "",
  });


  // Load Product
  useEffect(() => {

    async function fetchProduct() {

      try {

        const productRef = doc(db, "products", id);

        const snapshot = await getDoc(productRef);


        if (snapshot.exists()) {

          const data = snapshot.data();


          setProduct({

            name: data.name || "",
            price: data.price?.toString() || "",
            originalPrice:
              data.originalPrice?.toString() || "",
            category: data.category || "",
            image: data.image || "",
            rating:
              data.rating?.toString() || "",

          });

        }

      } catch (error) {

        console.error(error);

      }


      setLoading(false);

    }


    if (id) {
      fetchProduct();
    }


  }, [id]);



  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    setProduct({

      ...product,

      [e.target.name]: e.target.value,

    });

  }



  async function updateProduct() {


    setSaving(true);


    try {


      await updateDoc(
        doc(db, "products", id),
        {

          name: product.name,

          price: Number(product.price),

          originalPrice:
            Number(product.originalPrice),

          category: product.category,

          image: product.image,

          rating:
            Number(product.rating),

        }
      );


      toast.success("✅ Product Updated");


      router.push("/admin/products");


    } catch (error) {


      console.error(error);

      toast.error("❌ Update Failed");


    }


    setSaving(false);

  }



  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl">

        Loading Product...

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-gray-100 p-8">


      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">


        <h1 className="text-3xl font-bold mb-6">

          Edit Product

        </h1>



        <div className="space-y-4">


          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border p-3 rounded-lg"
          />



          <input
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-3 rounded-lg"
          />



          <input
            name="originalPrice"
            value={product.originalPrice}
            onChange={handleChange}
            placeholder="Original Price"
            className="w-full border p-3 rounded-lg"
          />



          <input
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border p-3 rounded-lg"
          />



          <input
            name="rating"
            value={product.rating}
            onChange={handleChange}
            placeholder="Rating"
            className="w-full border p-3 rounded-lg"
          />



          <input
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full border p-3 rounded-lg"
          />



          <button
            onClick={updateProduct}
            disabled={saving}
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700"
          >

            {saving
              ? "Updating..."
              : "Update Product"}

          </button>


        </div>


      </div>


    </div>

  );

}