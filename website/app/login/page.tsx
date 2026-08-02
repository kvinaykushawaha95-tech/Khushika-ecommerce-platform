"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast/headless";


export default function LoginPage(){

const {login}=useAuth();

const router=useRouter();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");


const handleLogin=async()=>{

try{

await login(email,password);

toast.success("Login successful");

router.push("/profile");


}catch(error:any){

toast.error(error.message);

}

};



return(

<div className="min-h-screen flex items-center justify-center bg-gray-50">


<div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">


<h1 className="text-3xl font-bold text-center">
Login
</h1>


<input
type="email"
placeholder="Email"
className="w-full border p-3 rounded-lg mt-6"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>


<input
type="password"
placeholder="Password"
className="w-full border p-3 rounded-lg mt-4"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>


<button
onClick={handleLogin}
className="w-full bg-pink-600 text-white py-3 rounded-lg mt-6"
>
Login
</button>


</div>


</div>

);

}