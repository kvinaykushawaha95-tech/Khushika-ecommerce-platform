"use client";

import { useEffect, useState } from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";


export default function ProductRating({
  productId
}:{
  productId:string
}){


const [rating,setRating]=useState(0);
const [count,setCount]=useState(0);



useEffect(()=>{


const q=query(
collection(db,"reviews"),
where("productId","==",productId)
);



const unsubscribe=onSnapshot(q,(snapshot)=>{


let total=0;


snapshot.docs.forEach((doc)=>{

const data=doc.data();

total += data.rating || 0;

});


const totalReviews=snapshot.size;


setCount(totalReviews);


if(totalReviews>0){

setRating(
Number((total/totalReviews).toFixed(1))
);

}
else{

setRating(0);

}


});


return ()=>unsubscribe();


},[productId]);




return(

<div className="flex items-center mt-2 text-sm">

<span>
⭐
</span>

<span className="ml-1 text-gray-600">

{
rating > 0
?
`${rating} (${count})`
:
"No reviews"
}

</span>

</div>

);

}