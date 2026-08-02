"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("4.5");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("0");
  const handleSaveProduct = async () => {
  try {
    await addDoc(collection(db, "products"), {
      name,
      price: Number(price),
      originalPrice: Number(originalPrice),
      category,
      rating: Number(rating),
      image,
      stock: Number(stock),
      createdAt: new Date(),
    });

    toast.success("Product added successfully!");

    setName("");
    setPrice("");
    setOriginalPrice("");
    setCategory("");
    setRating("4.5");
    setImage("");
    setStock("0");
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to save product.");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6">Add Product</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            placeholder="Original Price"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Image URL"
            
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
              onClick={handleSaveProduct}
              className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700"
           >
              Save Product
          </button>
        </div>
      </div>
    </div>
  );
}