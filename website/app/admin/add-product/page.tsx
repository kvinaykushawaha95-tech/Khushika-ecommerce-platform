"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const { user, loading } = useAuth();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("4.5");
  const [stock, setStock] = useState("0");

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  // =====================================================
  // IMAGE SELECTION
  // =====================================================

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    // Maximum 6 images
    if (files.length > 6) {
      toast.error("You can select maximum 6 images.");
      return;
    }

    // Check file types
    const invalidFile = files.find(
      (file) => !file.type.startsWith("image/")
    );

    if (invalidFile) {
      toast.error("Please select only image files.");
      return;
    }

    // Check file size
    const largeFile = files.find(
      (file) => file.size > 5 * 1024 * 1024
    );

    if (largeFile) {
      toast.error("Each image must be smaller than 5MB.");
      return;
    }

    setSelectedImages(files);
  }

  // =====================================================
  // UPLOAD IMAGE TO CLOUDINARY
  // =====================================================

  async function uploadToCloudinary(file: File) {
    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const uploadPreset =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName) {
      throw new Error(
        "Cloudinary Cloud Name is missing."
      );
    }

    if (!uploadPreset) {
      throw new Error(
        "Cloudinary Upload Preset is missing."
      );
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    // Cloudinary folder
    formData.append(
      "folder",
      "khushika/products"
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Cloudinary error:",
        data
      );

      throw new Error(
        data?.error?.message ||
          "Cloudinary upload failed."
      );
    }

    return data.secure_url as string;
  }

  // =====================================================
  // SAVE PRODUCT
  // =====================================================

  async function handleSaveProduct() {
    // Authentication check
    if (loading) {
      toast.error(
        "Authentication is still loading. Please wait."
      );
      return;
    }

    if (!user) {
      toast.error(
        "Please login before adding a product."
      );
      return;
    }

    // Product validation
    if (!name.trim()) {
      toast.error("Please enter product name.");
      return;
    }

    if (!price || Number(price) <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    if (
      !originalPrice ||
      Number(originalPrice) <= 0
    ) {
      toast.error(
        "Please enter a valid original price."
      );
      return;
    }

    if (!category.trim()) {
      toast.error(
        "Please enter product category."
      );
      return;
    }

    if (
      Number(rating) < 0 ||
      Number(rating) > 5
    ) {
      toast.error(
        "Rating must be between 0 and 5."
      );
      return;
    }

    if (Number(stock) < 0) {
      toast.error(
        "Stock cannot be negative."
      );
      return;
    }

    if (selectedImages.length === 0) {
      toast.error(
        "Please select at least one product image."
      );
      return;
    }

    try {
      setUploading(true);

      // =================================================
      // UPLOAD IMAGES
      // =================================================

      toast.loading(
        "Uploading product images...",
        {
          id: "cloudinary-upload",
        }
      );

      const imageUrls = await Promise.all(
        selectedImages.map((file) =>
          uploadToCloudinary(file)
        )
      );

      toast.success(
        "Images uploaded successfully!",
        {
          id: "cloudinary-upload",
        }
      );

      // =================================================
      // SAVE PRODUCT TO FIRESTORE
      // =================================================

      await addDoc(
        collection(db, "products"),
        {
          name: name.trim(),

          price: Number(price),

          originalPrice:
            Number(originalPrice),

          category: category.trim(),

          rating: Number(rating),

          stock: Number(stock),

          // First image
          // Used by existing product components
          image: imageUrls[0],

          // All product images
          // Used by ProductDetails gallery
          images: imageUrls,

          createdAt: new Date(),
        }
      );

      // =================================================
      // SUCCESS
      // =================================================

      toast.success(
        "Product added successfully!"
      );

      // Reset form
      setName("");
      setPrice("");
      setOriginalPrice("");
      setCategory("");
      setRating("4.5");
      setStock("0");
      setSelectedImages([]);

      // Reset file input
      const fileInput =
        document.getElementById(
          "product-images"
        ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error(
        "Error adding product:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save product."
      );
    } finally {
      setUploading(false);
    }
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Add Product
          </h1>

          <p className="mt-2 text-gray-500">
            Add a new product to your Khushika
            Beauty & Fashion store.
          </p>
        </div>

        {/* Form Card */}

        <div className="rounded-2xl bg-white p-5 shadow-lg sm:p-8">
          <div className="space-y-5">

            {/* Product Name */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Product Name
              </label>

              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />
            </div>

            {/* Price */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Selling Price
              </label>

              <input
                type="number"
                min="0"
                placeholder="Price"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />
            </div>

            {/* Original Price */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Original Price
              </label>

              <input
                type="number"
                min="0"
                placeholder="Original Price"
                value={originalPrice}
                onChange={(e) =>
                  setOriginalPrice(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />
            </div>

            {/* Category */}

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white p-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              >
                <option value="">Select Category</option>
                <option value="cosmetics">Cosmetics</option>
                <option value="clothes">Clothes</option>
              </select>
            </div>

            {/* Rating */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Rating
              </label>

              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Rating"
                value={rating}
                onChange={(e) =>
                  setRating(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />
            </div>

            {/* ================================================= */}
            {/* CLOUDINARY IMAGE UPLOAD */}
            {/* ================================================= */}

            <div className="rounded-xl border-2 border-dashed border-gray-300 p-5">
              <label className="block">
                <span className="mb-2 block font-semibold text-gray-800">
                  Product Images
                </span>

                <span className="mb-3 block text-sm text-gray-500">
                  Select up to 6 images.
                  Maximum 5MB per image.
                </span>

                <input
                  id="product-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={
                    handleImageChange
                  }
                  disabled={uploading}
                  className="w-full cursor-pointer rounded-lg border bg-white p-3 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </label>

              {/* Selected Images */}

              {selectedImages.length > 0 && (
                <div className="mt-4">
                  <p className="mb-3 text-sm font-medium text-gray-700">
                    {selectedImages.length}{" "}
                    image(s) selected
                  </p>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {selectedImages.map(
                      (file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="rounded-lg border bg-gray-50 p-2"
                        >
                          <p className="truncate text-xs text-gray-600">
                            {file.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {(
                              file.size /
                              (1024 * 1024)
                            ).toFixed(2)}{" "}
                            MB
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              <p className="mt-3 text-xs text-gray-400">
                Images will be stored in
                Cloudinary:
                <br />

                <span className="font-medium text-gray-600">
                  khushika/products
                </span>
              </p>
            </div>

            {/* Stock */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Stock Quantity
              </label>

              <input
                type="number"
                min="0"
                placeholder="Stock Quantity"
                value={stock}
                onChange={(e) =>
                  setStock(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />
            </div>

            {/* Save Button */}

            <button
              type="button"
              onClick={
                handleSaveProduct
              }
              disabled={
                uploading || loading
              }
              className="w-full rounded-lg bg-pink-600 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading
                ? "Checking Authentication..."
                : uploading
                ? "Uploading & Saving..."
                : "Save Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}