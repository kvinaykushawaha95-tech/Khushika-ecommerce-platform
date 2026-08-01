import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-700 text-xl font-bold text-white shadow-lg">
          K
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Khushika
          </h1>

          <p className="text-xs uppercase tracking-widest text-pink-600">
            Beauty & Fashion
          </p>
        </div>
      </div>
    </Link>
  );
}