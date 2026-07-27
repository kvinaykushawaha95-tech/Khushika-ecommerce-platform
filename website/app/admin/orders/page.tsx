"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";


interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}


interface Order {

  id: string;

  orderId: string;

  customerName: string;

  email: string;

  phone: string;

  address: string;

  city: string;

  state: string;

  pincode: string;

  total: number;

  paymentMethod: string;

  paymentId?: string;

  razorpayOrderId?: string;

  status: string;

  createdAt: any;

  items: OrderItem[];

}



const statusSteps = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];



export default function AdminOrdersPage() {


  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {


    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );


    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {


        const data = snapshot.docs.map((docSnap)=>({

          id: docSnap.id,

          ...docSnap.data(),

        })) as Order[];



        setOrders(data);

        setLoading(false);


      }
    );


    return ()=>unsubscribe();


  }, []);





  const updateStatus = async(
    id:string,
    status:string
  )=>{


    try{


      await updateDoc(
        doc(db,"orders",id),
        {
          status,
        }
      );


    }
    catch(error){

      console.error(error);

      alert(
        "Failed to update status"
      );

    }


  };






  if(loading){

    return(

      <div className="p-10 text-xl">

        Loading Orders...

      </div>

    );

  }





  return (

    <div className="min-h-screen bg-gray-100 p-6">


      <div className="max-w-7xl mx-auto">


        <h1 className="text-4xl font-bold mb-8">

          Admin Orders

        </h1>





        {orders.length === 0 && (

          <div className="bg-white rounded-xl shadow p-8 text-center">

            No Orders Found

          </div>

        )}






        {orders.map((order)=>(



          <div

            key={order.id}

            className="bg-white rounded-2xl shadow-lg p-6 mb-8"

          >




            {/* Order Header */}


            <div className="flex flex-col md:flex-row justify-between gap-6">



              <div>


                <h2 className="text-2xl font-bold">

                  Order #{order.orderId}

                </h2>



                <p className="mt-2">

                  Customer: {order.customerName}

                </p>



                <p>

                  Email: {order.email}

                </p>



                <p>

                  Phone: {order.phone}

                </p>



                <p className="mt-3 font-semibold">

                  Address:

                </p>



                <p className="text-gray-600">

                  {order.address}

                </p>



                <p className="text-gray-600">

                  {order.city}, {order.state} - {order.pincode}

                </p>




                <p className="font-bold mt-4 text-lg">

                  Total: ₹{order.total}

                </p>




                <p>

                  Payment: {order.paymentMethod}

                </p>




                {order.paymentId && (

                  <p className="text-sm text-gray-500">

                    Payment ID: {order.paymentId}

                  </p>

                )}





                <p className="text-sm text-gray-500 mt-2">

                  Date:{" "}

                  {
                    order.createdAt?.toDate

                    ?

                    order.createdAt
                    .toDate()
                    .toLocaleDateString()

                    :

                    "N/A"
                  }

                </p>



              </div>






              {/* Status Update */}


              <div>


                <label className="font-semibold">

                  Update Status

                </label>



                <select

                  value={order.status}

                  onChange={(e)=>

                    updateStatus(
                      order.id,
                      e.target.value
                    )

                  }

                  className="block mt-3 border rounded-lg p-3"

                >


                  {
                    statusSteps.map((status)=>(

                      <option
                        key={status}
                        value={status}
                      >

                        {status}

                      </option>

                    ))
                  }


                </select>



              </div>




            </div>






            <hr className="my-6"/>






            {/* Products */}



            <h3 className="text-xl font-bold mb-4">

              Products

            </h3>





            <div className="space-y-3">



              {

                order.items?.map((item,index)=>(



                  <div

                    key={index}

                    className="border rounded-xl p-4 flex justify-between"

                  >



                    <div>


                      <p className="font-semibold">

                        {item.name}

                      </p>



                      <p>

                        Quantity: {item.quantity}

                      </p>


                    </div>




                    <p className="font-bold">

                      ₹{item.price * item.quantity}

                    </p>




                  </div>



                ))

              }



            </div>




          </div>



        ))}



      </div>


    </div>


  );

}