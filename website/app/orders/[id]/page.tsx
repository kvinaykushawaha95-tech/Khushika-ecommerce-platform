"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { db } from "@/lib/firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;

  paymentMethod: string;
  status: string;

  subtotal: number;
  shipping: number;
  total: number;

  items: OrderItem[];
}

const steps = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
];

export default function OrderDetailsPage() {
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const snap = await getDoc(doc(db, "orders", id as string));

        if (snap.exists()) {
          setOrder(snap.data() as Order);
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Order not found.
      </div>
    );
  }

  const currentStep = steps.indexOf(order.status);

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between gap-4">

          <div>

            <h1 className="text-3xl font-bold">
              Order #{order.orderId}
            </h1>

            <p className="mt-3">
              <span className="font-semibold">
                Status :
              </span>

              <span className="ml-2 bg-pink-100 text-pink-700 px-4 py-1 rounded-full">
                {order.status}
              </span>
            </p>

          </div>

        </div>

        {/* Timeline */}

        <div className="mt-10">

          <h2 className="text-xl font-bold mb-6">
            Order Timeline
          </h2>

          <div className="flex justify-between">

            {steps.map((step, index) => (

              <div
                key={step}
                className="flex flex-col items-center flex-1"
              >

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    index <= currentStep
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                >
                  ✓
                </div>

                <p className="mt-2 text-sm text-center">
                  {step}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Customer */}

        <div className="grid md:grid-cols-2 gap-10 mt-12">

          <div>

            <h2 className="text-xl font-bold mb-4">
              Customer
            </h2>

            <p>
              <strong>Name:</strong> {order.customerName}
            </p>

            <p className="mt-2">
              <strong>Phone:</strong> {order.phone}
            </p>

          </div>

          <div>

            <h2 className="text-xl font-bold mb-4">
              Shipping Address
            </h2>

            <p>{order.address}</p>
            <p>{order.city}</p>
            <p>{order.pincode}</p>

          </div>

        </div>

        {/* Products */}

        <div className="mt-12">

          <h2 className="text-xl font-bold mb-5">
            Ordered Products
          </h2>

          <div className="space-y-5">

            {order.items.map((item) => (

              <div
                key={item.id}
                className="flex gap-5 border rounded-xl p-4"
              >

                <img
                  src={item.image || "/logo.png"}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                <div className="flex-1">

                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-gray-600 mt-1">
                    Quantity : {item.quantity}
                  </p>

                  <p className="font-bold text-pink-600 mt-2">
                    ₹{item.price}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Payment */}

        <div className="mt-12 border-t pt-8">

          <h2 className="text-xl font-bold mb-5">
            Payment Details
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Payment Method</span>
              <span>{order.paymentMethod}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{order.shipping}</span>
            </div>

            <div className="flex justify-between text-2xl font-bold border-t pt-4">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}