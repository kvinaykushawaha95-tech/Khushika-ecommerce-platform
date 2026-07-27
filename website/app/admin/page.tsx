"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { db } from "@/lib/firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";


interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
}


export default function ProductsPage() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchProducts = async () => {

    try {

      const snapshot = await getDocs(
        collection(db,"products")
      );


      const data = snapshot.docs.map((item)=>({
        id:item.id,
        ...item.data()
      })) as Product[];


      setProducts(data);


    } catch(error){

      console.error(error);

    }

    setLoading(false);
  };


  useEffect(()=>{

    fetchProducts();

  },[]);



  const deleteProduct = async(id:string)=>{

    const confirmDelete = confirm(
      "Delete this product?"
    );


    if(!confirmDelete) return;


    try{

      await deleteDoc(
        doc(db,"products",id)
      );


      alert("Product deleted");

      fetchProducts();


    }catch(error){

      console.error(error);

    }

  };



  const updateStock = async(
    id:string,
    oldStock:number
  )=>{


    const newStock = prompt(
      "Enter new stock",
      String(oldStock)
    );


    if(!newStock) return;


    await updateDoc(
      doc(db,"products",id),
      {
        stock:Number(newStock)
      }
    );


    fetchProducts();

  };



  const updatePrice = async(
    id:string,
    oldPrice:number
  )=>{


    const newPrice = prompt(
      "Enter new price",
      String(oldPrice)
    );


    if(!newPrice) return;


    await updateDoc(
      doc(db,"products",id),
      {
        price:Number(newPrice)
      }
    );


    fetchProducts();

  };



  if(loading){

    return(
      <div className="p-10 text-center">
        Loading Products...
      </div>
    );

  }



  return (

    <div className="min-h-screen bg-gray-100 p-8">


      <h1 className="text-4xl font-bold mb-8">
        Manage Products
      </h1>



      <div className="bg-white rounded-2xl shadow overflow-x-auto">


        <table className="w-full">


          <thead className="border-b bg-gray-50">

            <tr>

              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Stock
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>



          <tbody>


          {products.map((product)=>(


            <tr
              key={product.id}
              className="border-b"
            >


              <td className="p-4">


                <Image

                  src={
                    product.image ||
                    "/logo.png"
                  }

                  alt={product.name}

                  width={70}

                  height={70}

                  className="rounded-lg object-cover"

                />


              </td>



              <td className="p-4 font-semibold">

                {product.name}

              </td>



              <td className="p-4">

                {product.category}

              </td>



              <td className="p-4">

                ₹{product.price}

              </td>



              <td className="p-4">

                {product.stock}

              </td>



              <td className="p-4">


                <div className="flex gap-2">


                  <button

                    onClick={()=>
                      updatePrice(
                        product.id,
                        product.price
                      )
                    }

                    className="bg-blue-600 text-white px-3 py-2 rounded-lg"

                  >

                    Price

                  </button>



                  <button

                    onClick={()=>
                      updateStock(
                        product.id,
                        product.stock
                      )
                    }

                    className="bg-green-600 text-white px-3 py-2 rounded-lg"

                  >

                    Stock

                  </button>



                  <button

                    onClick={()=>
                      deleteProduct(
                        product.id
                      )
                    }

                    className="bg-red-600 text-white px-3 py-2 rounded-lg"

                  >

                    Delete

                  </button>


                </div>


              </td>


            </tr>


          ))}



          </tbody>


        </table>


      </div>


    </div>

  );

}