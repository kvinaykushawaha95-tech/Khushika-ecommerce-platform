"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { generateInvoice } from "@/lib/invoice";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  total: number;
  status: string;
  paymentMethod: string;
  createdAt: any;
  items: {
    id?: string;
    name: string;
    quantity: number;
  }[];
}

const steps = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
];

export default function OrdersPage() {
  const { user, loading } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    async function loadOrders() {
      if (!user) {
        setPageLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[];

        setOrders(data);
      } catch (error) {
        console.error(error);
      }

      setPageLoading(false);
    }

    loadOrders();
  }, [user, loading]);

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Orders...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Please login first.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-8 text-center">
            No orders found.
          </div>

        ) : (

          <div className="space-y-8">

            {orders.map((order) => {

              const currentStep = steps.indexOf(order.status);

              return (

                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >

                  {/* Header */}

                  <div className="flex flex-col md:flex-row justify-between gap-4">

                    <div>

                      <h2 className="text-xl font-bold">
                        Order #{order.orderId}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        Payment: {order.paymentMethod}
                      </p>

                    </div>

                    <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-semibold h-fit">
                      {order.status}
                    </span>

                  </div>

                  {/* Timeline */}

                  {order.status !== "Cancelled" && (

                    <div className="mt-8">

                      <div className="flex justify-between">

                        {steps.map((step, index) => (

                          <div
                            key={step}
                            className="flex flex-col items-center flex-1"
                          >

                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                index <= currentStep
                                  ? "bg-green-600"
                                  : "bg-gray-300"
                              }`}
                            >
                              ✓
                            </div>

                            <p className="text-xs mt-2 text-center">
                              {step}
                            </p>

                          </div>

                        ))}

                      </div>

                    </div>

                  )}

                  {/* Products */}

                  <div className="mt-8">

                    <h3 className="font-bold mb-4">
                      Products
                    </h3>

                    <div className="space-y-3">

                      {order.items.map((item, index) => (

                        <div
                          key={index}
                          className="flex justify-between border rounded-lg p-3"
                        >

                          <span>
                            {item.name}
                          </span>

                          <span>
                            Qty : {item.quantity}
                          </span>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* Total */}

                  <div className="border-t mt-6 pt-6 flex justify-between text-lg font-bold">

                    <span>Total</span>

                    <span>
                      ₹{order.total}
                    </span>

                  </div>

                  {/* View Details */}

                  <div className="mt-6 text-right">

                    <Link
                      href={`/orders/${order.id}`}
                      className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg"
                    >
                      View Details
                    </Link>
                    <button

                      onClick={()=>generateInvoice(order)}

                      className="ml-3 bg-black text-white px-6 py-3 rounded-lg"

                      >
                      Download Invoice
                    </button>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>
  );
}