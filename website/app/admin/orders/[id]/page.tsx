"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { db } from "@/lib/firebase";
import toast from "react-hot-toast";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  orderId: string;
  customerName: string;
  email: string;
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

export default function AdminOrderDetailsPage() {
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const docRef = doc(db, "orders", id as string);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data() as Order;
          setOrder(data);
          setStatus(data.status);
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }

    loadOrder();
  }, [id]);

  const updateStatus = async () => {
    try {
      await updateDoc(doc(db, "orders", id as string), {
        status,
      });

      toast.success("Order status updated successfully.");

    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Order Details
        </h1>

        {/* Customer */}

        <div className="grid md:grid-cols-2 gap-8">

          <div>

            <h2 className="font-bold text-xl mb-4">
              Customer
            </h2>

            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Phone:</strong> {order.phone}</p>

          </div>

          <div>

            <h2 className="font-bold text-xl mb-4">
              Address
            </h2>

            <p>{order.address}</p>
            <p>{order.city}</p>
            <p>{order.pincode}</p>

          </div>

        </div>

        {/* Products */}

        <div className="mt-10">

          <h2 className="font-bold text-xl mb-4">
            Ordered Products
          </h2>

          {order.items.map((item, index) => (

            <div
              key={index}
              className="flex justify-between border-b py-3"
            >
              <div>
                {item.name}
              </div>

              <div>
                Qty {item.quantity}
              </div>

              <div>
                ₹{item.price * item.quantity}
              </div>

            </div>

          ))}

        </div>

        {/* Total */}

        <div className="mt-8 border-t pt-6">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>

          <div className="flex justify-between mt-2">
            <span>Shipping</span>
            <span>₹{order.shipping}</span>
          </div>

          <div className="flex justify-between mt-2 text-2xl font-bold">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>

        </div>

        {/* Payment */}

        <div className="mt-8">

          <h2 className="font-bold text-xl mb-3">
            Payment
          </h2>

          <p>{order.paymentMethod}</p>

        </div>

        {/* Status */}

        <div className="mt-8">

          <h2 className="font-bold text-xl mb-3">
            Update Status
          </h2>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg p-3 w-64"
          >
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          <br />

          <button
            onClick={updateStatus}
            className="mt-5 bg-pink-600 text-white px-8 py-3 rounded-xl hover:bg-pink-700"
          >
            Update Status
          </button>

        </div>

      </div>

    </div>
  );
}