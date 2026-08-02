"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, Heart, ShoppingCart, User } from "lucide-react";
import Image from "next/image";

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { cart } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
  const fetchProducts = async () => {
    const snapshot = await getDocs(
      collection(db, "products")
    );

    const data = snapshot.docs.map((doc) => ({
  ...doc.data(),
  id: doc.id,
}));

    console.log("Navbar products:", data);

    setProducts(data);
  };

  fetchProducts();
}, []);
const suggestions = products.filter((product)=> 
  product.name
    .toLowerCase()
    .includes(search.toLowerCase())
).slice(0,5);


  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b">

      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">


        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Khushika
          <span className="text-pink-600">
            .
          </span>
        </Link>



        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

          <Link 
            href="/"
            className="hover:text-pink-600 transition"
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="hover:text-pink-600 transition"
          >
            Shop
          </Link>

          <Link 
            href="/category/cosmetics"
            className="hover:text-pink-600 transition"
          >
            Beauty
          </Link>

          <Link 
            href="/category/fashion"
            className="hover:text-pink-600 transition"
          >
            Fashion
          </Link>

        </nav>



        {/* Search */}
        <div className="relative hidden lg:block">

          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-72">

            <Search size={18} className="text-gray-500"/>

            <input
              value={search}
              onFocus={()=>setShowSuggestions(true)}
              onChange={(e)=>{
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              placeholder="Search Beauty & Fashion..."
              className="bg-transparent outline-none px-3 text-sm w-full"
            />

          </div>


          {showSuggestions && search && suggestions.length > 0 && (

            <div className="absolute top-14 left-0 w-80 rounded-2xl bg-white shadow-xl border overflow-hidden">

              {suggestions.map((product)=>(

                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={()=>{
                    setSearch("");
                    setShowSuggestions(false);
                  }}
                  className="flex items-center gap-3 p-3 hover:bg-pink-50"
                >

                  <Image
                    src={product.image || "/logo/logo.png"}
                    alt={product.name}
                    width={45}
                    height={45}
                    className="rounded-lg object-cover"
                  />

                  <div>

                    <p className="font-semibold text-sm">
                      {product.name}
                    </p>

                    <p className="text-pink-600 text-sm">
                      ₹{product.price}
                    </p>

                  </div>


                </Link>

              ))}

            </div>

          )}

        </div>



        {/* Icons */}
        <div className="flex items-center gap-5">


          <Link href="/wishlist" className="relative">
            <Heart size={22}/>

            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-1.5">
                {wishlist.length}
              </span>
            )}

          </Link>



          <Link href="/cart" className="relative">

            <ShoppingCart size={22}/>

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full px-1.5">
                {cart.length}
              </span>
            )}

          </Link>



          <Link href="/profile">
            <User size={22}/>
          </Link>



          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={()=>setOpen(!open)}
          >
            {open ? <X/> : <Menu/>}
          </button>


        </div>

      </div>



      {/* Mobile Menu */}

      {
        open && (
          <div className="md:hidden border-t bg-white px-6 py-5">

            <div className="flex flex-col gap-5 font-medium">

              <Link href="/">
                Home
              </Link>

              <Link href="/products">
                Shop
              </Link>

              <Link href="/category/cosmetics">
                Beauty
              </Link>

              <Link href="/category/fashion">
                Fashion
              </Link>

            </div>

          </div>
        )
      }


    </header>
  );
}