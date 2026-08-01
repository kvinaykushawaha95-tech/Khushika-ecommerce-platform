export default function TopBar() {
  return (
    <div className="hidden md:block bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-700 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm">

        <div className="flex items-center gap-6">
          <span>🚚 Free Shipping on Orders Above ₹999</span>
          <span>💄 Flat 20% OFF on Beauty Collection</span>
        </div>

        <div>
          📞 Customer Support: +91 98765 43210
        </div>

      </div>
    </div>
  );
}