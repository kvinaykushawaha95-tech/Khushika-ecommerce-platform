import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">
            Khushika
          </h2>

          <p className="mt-4 text-gray-400 text-sm leading-6">
            Beauty and fashion products crafted to make you feel confident
            every day.
          </p>
        </div>


        {/* Shop */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            Shop
          </h3>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link href="/products">
                All Products
              </Link>
            </li>

            <li>
              <Link href="/category/cosmetics">
                Cosmetics
              </Link>
            </li>

            <li>
              <Link href="/category/fashion">
                Fashion
              </Link>
            </li>

            <li>
              <Link href="/wishlist">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>


        {/* Customer */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            Customer Care
          </h3>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li>Contact Us</li>
            <li>Shipping Policy</li>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>


        {/* Social */}
        <div>
          <h3 className="font-semibold text-lg mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 text-xl">
            <span>📸</span>
            <span>📘</span>
            <span>▶️</span>
          </div>

          <p className="mt-5 text-gray-400 text-sm">
            © {new Date().getFullYear()} Khushika Beauty & Fashion
          </p>
        </div>

      </div>


      <div className="border-t border-gray-800 text-center py-5 text-gray-500 text-sm">
        Made with ❤️ for Beauty & Fashion
      </div>

    </footer>
  );
}