"use client";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast/headless";

export default function RegisterPage() {

  const { register } = useAuth();
  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

const handleRegister = async () => {
  try {
    const userCredential = await register(email, password);

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name: "",
      email: userCredential.user.email,
      phone: "",
      address: "",
      role: "customer",
      createdAt: serverTimestamp(),
    });

    toast.success("Account created successfully!");

    router.push("/profile");
  } catch (error: any) {
    toast.error(error.message);
  }
};


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">


        <h1 className="text-3xl font-bold text-center">
          Create Account
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
          onClick={handleRegister}
          className="w-full bg-pink-600 text-white py-3 rounded-lg mt-6"
        >
          Register
        </button>


      </div>

    </div>

  );
}