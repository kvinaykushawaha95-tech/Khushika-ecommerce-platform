"use client";

import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";


export default function ProductReviews({
  productId
}:{
  productId:string
}){


const {user}=useAuth();


const [reviews,setReviews]=useState<any[]>([]);

const [rating,setRating]=useState(5);

const [comment,setComment]=useState("");



useEffect(()=>{


const q=query(

collection(db,"reviews"),

where("productId","==",productId),

orderBy("createdAt","desc")

);



const unsubscribe=onSnapshot(q,(snapshot)=>{


setReviews(

snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}))

);


});


return ()=>unsubscribe();


},[productId]);





const submitReview=async()=>{


if(!user){

alert("Please login first");

return;

}


if(!comment){

alert("Write a review");

return;

}



await addDoc(collection(db,"reviews"),{


productId,

userId:user.uid,

userName:user.displayName || "Customer",

rating,

comment,

createdAt:serverTimestamp()


});



setComment("");

alert("Review added");


};



return (

<div className="mt-10">


<h2 className="text-2xl font-bold mb-5">
Customer Reviews
</h2>



<div className="bg-gray-100 p-5 rounded-xl">


<div className="flex gap-2 mb-3">


{
[1,2,3,4,5].map(num=>(

<button

key={num}

onClick={()=>setRating(num)}

className="text-2xl"

>

{num<=rating ? "⭐":"☆"}

</button>

))

}


</div>



<textarea

value={comment}

onChange={(e)=>setComment(e.target.value)}

placeholder="Write your review"

className="w-full border p-3 rounded-lg"

/>


<button

onClick={submitReview}

className="mt-3 bg-pink-600 text-white px-5 py-3 rounded-lg"

>

Submit Review

</button>


</div>




<div className="mt-6 space-y-4">


{
reviews.map(review=>(

<div

key={review.id}

className="border rounded-xl p-4"

>


<div>

{"⭐".repeat(review.rating)}

</div>


<p className="font-semibold">
{review.userName}
</p>


<p>
{review.comment}
</p>


</div>


))

}


</div>


</div>

);


}