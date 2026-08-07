"use client";

import Script from "next/script";
import Link from "next/link";
import { useState } from "react";
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

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  // Loading State
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Coupon State
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Price Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping - discount;

  // =========================
  // APPLY COUPON
  // =========================
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
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
      toast.success("Coupon applied successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to apply coupon.");
    }
  };

  // =========================
  // VALIDATE FORM
  // =========================
  const validateFields = () => {
    if (!user) {
      toast.error("Please login first.");
      return false;
    }

    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      toast.error("Please fill all fields.");
      return false;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return false;
    }

    return true;
  };

  // =========================
  // CASH ON DELIVERY
  // =========================
  const handlePlaceOrder = async () => {
    if (!validateFields()) return;

    setLoading(true);

    try {
      const orderId = "KH" + Date.now();

      // Check stock
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
          toast.error(
            `Only ${product.stock} item(s) of ${item.name} are available.`
          );
          setLoading(false);
          return;
        }
      }
      if (!validateFields()) return;

if (!user) {
  toast.error("Please login first.");
  return;
}

setLoading(true);

      // Create order
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

      // Reduce stock
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
      toast.success("Order placed successfully!");
      router.push("/order-success");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order.");
    }

    setLoading(false);
  };

  // =========================
  // RAZORPAY PAYMENT
  // =========================
  const handleOnlinePayment = async () => {
    if (!validateFields()) return;

    setPaymentLoading(true);

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
        toast.error("Payment order creation failed.");
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
          try {
            const orderId = "KH" + Date.now();

            // Save order
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
              paymentMethod: "Online Payment",
              paymentId: paymentResponse.razorpay_payment_id,
              razorpayOrderId: paymentResponse.razorpay_order_id,
              status: "Pending",
              createdAt: serverTimestamp(),
            });

            // Reduce stock
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
            toast.success("Payment successful! Order confirmed.");
            router.push("/order-success");
          } catch (error) {
            console.error(error);
            toast.error("Payment received but order saving failed.");
          }
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
      toast.error("Payment failed.");
    }

    setPaymentLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Razorpay Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 text-gray-500">Complete your order securely</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-8">
          {/* SHIPPING ADDRESS */}
          <div className="rounded-3xl bg-white p-5 shadow-md sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Shipping Address
            </h2>
            <p className="mb-6 mt-1 text-sm text-gray-500">
              Enter your delivery details
            </p>

            {/* Full Name */}
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="mb-4 w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-pink-500"
            />

            {/* Email */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="mb-4 w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-pink-500"
            />

            {/* Phone */}
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile Number"
              className="mb-4 w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-pink-500"
            />

            {/* State */}
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              className="mb-4 w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-pink-500"
            />

            {/* Address */}
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Complete Address"
              className="mb-4 h-32 w-full rounded-xl border border-gray-200 p-3 outline-none transition focus:border-pink-500"
            />

            {/* City + PIN */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="rounded-xl border border-gray-200 p-3 outline-none transition focus:border-pink-500"
              />

              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="PIN Code"
                className="rounded-xl border border-gray-200 p-3 outline-none transition focus:border-pink-500"
              />
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="h-fit rounded-3xl bg-white p-6 shadow-lg lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            {/* Cart Items */}
            <div className="mt-6 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="my-6 border-t" />

            {/* Coupon */}
            <h3 className="mb-2 font-semibold">Coupon Code</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter Coupon"
                className="min-w-0 flex-1 rounded-xl border border-gray-200 p-3 outline-none focus:border-pink-500"
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="rounded-xl bg-green-600 px-5 font-semibold text-white transition hover:bg-green-700"
              >
                Apply
              </button>
            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="mt-4 flex justify-between font-semibold text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}

            {/* Subtotal */}
            <div className="mt-6 flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            {/* Shipping */}
            <div className="mt-3 flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>

            <div className="my-5 border-t" />

            {/* Total */}
            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span className="text-pink-600">₹{total}</span>
            </div>

            {/* Pay Now */}
            <button
              type="button"
              onClick={handleOnlinePayment}
              disabled={paymentLoading}
              className="mt-7 w-full rounded-xl bg-pink-600 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-pink-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {paymentLoading ? "Opening Payment..." : "Pay Now"}
            </button>

            {/* COD */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={loading}
              className="mt-3 w-full rounded-xl bg-gray-900 py-4 font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Placing Order..." : "Cash on Delivery"}
            </button>

            {/* Back */}
            <Link
              href="/cart"
              className="mt-3 block w-full rounded-xl border border-pink-600 py-4 text-center font-semibold text-pink-600 transition hover:bg-pink-50"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}