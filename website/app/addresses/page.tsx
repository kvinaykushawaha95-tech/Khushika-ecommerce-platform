"use client";

import { useState } from "react";
import { MapPin, Plus, Pencil, Trash2, Home } from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";

interface Address {
  id: number;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      fullName: "Vinay Kumar",
      phone: "9876543210",
      address: "123 Main Road",
      city: "Patna",
      state: "Bihar",
      pincode: "800001",
    },
  ]);

const [deleteId, setDeleteId] = useState<number | null>(null);

const handleDelete = (id: number) => {
  setDeleteId(id);
};


const confirmDelete = () => {
  if (deleteId !== null) {
    setAddresses(addresses.filter((item) => item.id !== deleteId));
    setDeleteId(null);
  }
};

const cancelDelete = () => {
  setDeleteId(null);
};

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="text-pink-600" size={32} />
            <div>
              <h1 className="text-3xl font-bold">My Addresses</h1>
              <p className="text-gray-500">
                Manage your delivery addresses
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-pink-600 px-5 py-3 text-white hover:bg-pink-700">
            <Plus size={18} />
            Add New Address
          </button>
        </div>

        {/* Address List */}
        <div className="space-y-6">
          {addresses.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center shadow">
              <MapPin
                size={50}
                className="mx-auto mb-4 text-gray-400"
              />
              <h2 className="text-xl font-semibold">
                No Address Found
              </h2>
              <p className="mt-2 text-gray-500">
                Add your first delivery address.
              </p>
            </div>
          ) : (
            addresses.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <div className="flex items-start justify-between">

                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Home
                        size={20}
                        className="text-pink-600"
                      />
                      <h2 className="text-xl font-bold">
                        {item.fullName}
                      </h2>
                    </div>

                    <p className="text-gray-700">
                      {item.address}
                    </p>

                    <p className="text-gray-700">
                      {item.city}, {item.state}
                    </p>

                    <p className="text-gray-700">
                      PIN: {item.pincode}
                    </p>

                    <p className="mt-2 font-medium">
                      📞 {item.phone}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button className="rounded-lg border p-2 hover:bg-gray-100">
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-lg border border-red-300 p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

            </div>

          <ConfirmModal
            open={deleteId !== null}
            title="Delete Address"
            message="Are you sure you want to delete this address?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />

    </div>
  );
}
