"use client";

import Script from "next/script";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 0;//subtotal > 999 ? 0 : 99;

  const total = subtotal + shipping - discount;

  const applyCoupon = async () => {
    if (!couponCode) {
      toast.error("Enter coupon code.");
      return;
    }

    try {
      const q = query(
        collection(db, "coupons"),
        where("code", "==", couponCode.toUpperCase()),
        where("active", "==", true)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        toast.error("Invalid coupon.");
        return;
      }

      const coupon = snapshot.docs[0].data();

      if (subtotal < coupon.minimumOrder) {
        toast.error(`Minimum order should be ₹${coupon.minimumOrder}`);
        return;
      }

      setDiscount(coupon.discount);

      toast.success("Coupon Applied Successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const validateFields = () => {
    if (!user) {
      toast.error("Please login first.");
      return false;
    }

    if (!fullName || !email || !phone || !address || !city || !pincode) {
      toast.error("Please fill all fields.");
      return false;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateFields()) return;

    setLoading(true);

    try {
      const orderId = "KH" + Date.now();

      // Check stock availability
      for (const item of cart) {
        const productRef = doc(db, "products", item.id);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          toast.error(`${item.name} not found.`);
          setLoading(false);
          return;
        }

        const product = productSnap.data();

        if ((product.stock || 0) < item.quantity) {
          toast.error(`Only ${product.stock} item(s) of ${item.name} are available.`);
          setLoading(false);
          return;
        }
      }

      await addDoc(collection(db, "orders"), {
        orderId,
        userId: user?.uid,

        customerName: fullName,
        email,
        phone,
        address,
        city,
        state,
        pincode,

        items: cart,

        subtotal,
        discount,
        shipping,
        total,

        paymentMethod: "Cash on Delivery",

        status: "Pending",

        createdAt: serverTimestamp(),
      });

      // Reduce stock after successful order
      for (const item of cart) {
        const productRef = doc(db, "products", item.id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const product = productSnap.data();

          await updateDoc(productRef, {
            stock: (product.stock || 0) - item.quantity,
          });
        }
      }

      clearCart();

      router.push("/order-success");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order.");
    }

    setLoading(false);
  };

  const handleOnlinePayment = async () => {
    if (!validateFields()) return;

    setPaymentLoading(true);

    if (!user) {
      toast.error("Please login first.");
      setPaymentLoading(false);
      return;
    }

    const currentUser = user;

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error("Payment order creation failed");
        setPaymentLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: "INR",

        name: "Khushika Beauty & Fashion",

        description: "Order Payment",

        order_id: data.order.id,

        handler: async function (paymentResponse: any) {
          const orderId = "KH" + Date.now();

          await addDoc(collection(db, "orders"), {
            orderId,

            userId: currentUser.uid,

            customerName: fullName,

            email,

            phone,

            address,

            city,

            state,

            pincode,

            items: cart,

            subtotal,

            discount,

            shipping,

            total,

            paymentMethod: "Online Payment",

            paymentId: paymentResponse.razorpay_payment_id,

            razorpayOrderId: paymentResponse.razorpay_order_id,

            status: "Pending",

            createdAt: serverTimestamp(),
          });

          clearCart();

          router.push("/order-success");
        },

        prefill: {
          name: fullName,
          email,
          contact: phone,
        },

        theme: {
          color: "#ec4899",
        },
      };

      const razorpay = new (window as any).Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }

    setPaymentLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Shipping Address */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-5">Shipping Address</h2>

          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Mobile Number"
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
            className="w-full border rounded-lg p-3 mb-4"
          />

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Complete Address"
            className="w-full border rounded-lg p-3 mb-4 h-32"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="PIN Code"
              className="border rounded-lg p-3"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-4">
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-5" />

          <div className="mb-5">
            <h3 className="font-semibold mb-2">Coupon Code</h3>

            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter Coupon"
                className="flex-1 border rounded-lg p-3"
              />

              <button
                onClick={applyCoupon}
                className="bg-green-600 text-white px-5 rounded-lg hover:bg-green-700"
              >
                Apply
              </button>
            </div>
          </div>

          {discount > 0 && (
            <div className="flex justify-between mt-3 text-green-600 font-semibold">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mt-3">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
          </div>

          <div className="flex justify-between text-2xl font-bold mt-6">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handleOnlinePayment}
            disabled={paymentLoading}
            className="w-full mt-8 bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-xl font-semibold disabled:opacity-50"
          >
            {paymentLoading ? "Opening Payment..." : "Pay Now"}
          </button>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full mt-3 bg-gray-800 hover:bg-gray-900 text-white py-4 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Cash on Delivery"}
          </button>

          <Link href="/cart">
            <button className="w-full mt-3 border border-pink-600 text-pink-600 py-4 rounded-xl font-semibold hover:bg-pink-50">
              Back to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}