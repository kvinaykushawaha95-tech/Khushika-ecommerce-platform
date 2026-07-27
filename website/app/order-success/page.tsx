import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">

        <div className="text-6xl mb-5">
          ✅
        </div>

        <h1 className="text-3xl font-bold text-gray-800">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-500 mt-3">
          Thank you for shopping with Khushika Beauty & Fashion.
          Your order has been confirmed.
        </p>

        <div className="bg-pink-50 rounded-lg p-4 mt-6">
          <p className="font-semibold">
            Order ID
          </p>

          <p className="text-pink-600">
            #KH123456
          </p>
        </div>


        <Link
          href="/orders"
          className="block mt-6 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700"
        >
          View My Orders
        </Link>


        <Link
          href="/"
          className="block mt-3 border py-3 rounded-lg hover:bg-gray-100"
        >
          Continue Shopping
        </Link>

      </div>

    </div>
  );
}