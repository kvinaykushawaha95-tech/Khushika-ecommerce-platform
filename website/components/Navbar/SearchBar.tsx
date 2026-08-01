"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="hidden lg:flex flex-1 max-w-2xl mx-10">
      <div className="flex w-full items-center rounded-full border border-pink-100 bg-pink-50 px-5 py-3">
        <Search size={20} className="text-pink-600" />

        <input
          type="text"
          placeholder="Search Beauty & Fashion..."
          className="ml-3 w-full bg-transparent outline-none"
        />
      </div>
    </div>
  );
}