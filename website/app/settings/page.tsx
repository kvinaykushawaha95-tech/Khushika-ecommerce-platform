"use client";

import { useState } from "react";
import {
  Settings,
  Bell,
  Lock,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Logout failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="flex items-center gap-4 mb-8">
          <Settings size={34} className="text-pink-600" />
          <div>
            <h1 className="text-3xl font-bold">
              Account Settings
            </h1>

            <p className="text-gray-500">
              Manage your preferences
            </p>
          </div>
        </div>

        <div className="space-y-5">

          {/* Change Password */}
          <button className="w-full flex items-center justify-between rounded-xl border p-5 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Lock className="text-pink-600" />
              <span className="font-semibold">
                Change Password
              </span>
            </div>

            →
          </button>

          {/* Notifications */}
          <div className="flex items-center justify-between rounded-xl border p-5">
            <div className="flex items-center gap-3">
              <Bell className="text-pink-600" />
              <span className="font-semibold">
                Notifications
              </span>
            </div>

            <button
              onClick={() =>
                setNotifications(!notifications)
              }
              className={`px-4 py-2 rounded-full text-white ${
                notifications
                  ? "bg-green-600"
                  : "bg-gray-400"
              }`}
            >
              {notifications ? "ON" : "OFF"}
            </button>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between rounded-xl border p-5">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="text-pink-600" />
              ) : (
                <Sun className="text-pink-600" />
              )}

              <span className="font-semibold">
                Dark Mode
              </span>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-full text-white ${
                darkMode
                  ? "bg-green-600"
                  : "bg-gray-400"
              }`}
            >
              {darkMode ? "ON" : "OFF"}
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-red-600 py-4 text-white hover:bg-red-700"
          >
            <LogOut />
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}