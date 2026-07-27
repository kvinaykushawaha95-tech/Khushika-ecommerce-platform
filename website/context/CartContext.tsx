"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { Product } from "@/types/product";


export interface CartItem extends Product {
  quantity: number;
}


interface CartContextType {

  cart: CartItem[];

  addToCart: (product: CartItem) => void;

  removeFromCart: (id: string) => void;

  increaseQuantity: (id: string) => void;

  decreaseQuantity: (id: string) => void;

  clearCart: () => void;

}



const CartContext = createContext<CartContextType | undefined>(
  undefined
);



export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {


  const [cart, setCart] = useState<CartItem[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);



  // Load cart from browser storage

  useEffect(() => {

    const savedCart = localStorage.getItem("cart");


    if (savedCart) {

      setCart(JSON.parse(savedCart));

    }


    setIsLoaded(true);


  }, []);





  // Save cart

  useEffect(() => {

    if (isLoaded) {

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

    }

  }, [cart, isLoaded]);






  // Add product

  const addToCart = (product: CartItem) => {


    setCart((prev) => {


      const existingProduct = prev.find(
        (item) => item.id === product.id
      );



      if (existingProduct) {


        return prev.map((item) =>

          item.id === product.id

            ? {

                ...item,

                quantity:
                  item.quantity + product.quantity,

              }

            : item

        );


      }



      return [

        ...prev,

        {

          ...product,

          quantity: product.quantity || 1,

        },

      ];


    });


  };







  // Remove product

  const removeFromCart = (id: string) => {


    setCart((prev) =>

      prev.filter(
        (item) => item.id !== id
      )

    );


  };







  // Increase quantity

  const increaseQuantity = (id: string) => {


    setCart((prev) =>

      prev.map((item) =>


        item.id === id

          ? {

              ...item,

              quantity:
                item.quantity + 1,

            }

          : item


      )

    );


  };








  // Decrease quantity

  const decreaseQuantity = (id: string) => {


    setCart((prev) =>


      prev

        .map((item) =>


          item.id === id

            ? {

                ...item,

                quantity:
                  item.quantity - 1,

              }

            : item


        )

        .filter(
          (item) => item.quantity > 0
        )


    );


  };








  // Clear cart

  const clearCart = () => {

    setCart([]);

    localStorage.removeItem("cart");

  };







  return (

    <CartContext.Provider

      value={{

        cart,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

      }}

    >

      {children}

    </CartContext.Provider>

  );


}








export function useCart() {


  const context = useContext(CartContext);



  if (!context) {


    throw new Error(
      "useCart must be used within CartProvider"
    );


  }



  return context;


}