"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { auth } from "@/lib/firebase";


interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }
    );


    return unsubscribe;

  }, []);



  const register = (
    email: string,
    password: string
  ) => {

    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  };



  const login = (
    email: string,
    password: string
  ) => {

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  };



  const logout = () => {

    return signOut(auth);

  };



  return (

    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        loading,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}



export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}