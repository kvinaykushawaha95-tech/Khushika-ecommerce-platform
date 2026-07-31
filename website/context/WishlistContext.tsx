"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { useEffect } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const { user } = useAuth();
  useEffect(() => {
  if (!user) return;

  const loadWishlist = async () => {
    try {
      const docRef = doc(db, "wishlists", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.items) {
          setWishlist(data.items);
        }
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  };

  loadWishlist();
}, [user]);
useEffect(() => {
  if (!user) return;

  const saveWishlist = async () => {
  try {
    console.log("Saving wishlist...");
    console.log("User UID:", user?.uid);
    console.log("Wishlist:", wishlist);

    await setDoc(
      doc(db, "wishlists", user.uid),
      {
        items: wishlist,
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error saving wishlist:", error);
  }
};

  saveWishlist();
}, [wishlist, user]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}