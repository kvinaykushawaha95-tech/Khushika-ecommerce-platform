"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}

export default function ProfilePage() {
  const { user, loading } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (loading) return;

    async function fetchProfile() {
      if (!user) {
        setPageLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;

          setProfile(data);
          setName(data.name || "");
          setPhone(data.phone || "");
          setAddress(data.address || "");
        }
      } catch (error) {
        console.error(error);
      }

      setPageLoading(false);
    }

    fetchProfile();
  }, [user, loading]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);

    try {
      await setDoc(
      doc(db, "users", user.uid),
      {
        name,
        email: user.email,
        phone,
        address,
        role: "customer",
      },
      { merge: true }
   );
    

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              name,
              phone,
              address,
            }
          : null
      );

      setEditing(false);

      alert("✅ Profile Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to update profile");
    }

    setSaving(false);
  };

  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Please login first.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <div className="flex items-center gap-5 mb-8">

          <div className="w-20 h-20 rounded-full bg-pink-600 text-white flex items-center justify-center text-3xl font-bold">
            {(profile?.email || "U").charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              My Profile
            </h1>

            <p className="text-gray-500">
              Manage your account information
            </p>
          </div>

        </div>

        <div className="space-y-6">

          <div>
            <label className="font-semibold">Name</label>

            {editing ? (
              <input
                className="w-full mt-2 border rounded-lg p-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <p className="mt-2 text-gray-700">
                {profile?.name || "Not Added"}
              </p>
            )}
          </div>

          <div>
            <label className="font-semibold">Email</label>

            <p className="mt-2 text-gray-700">
              {profile?.email}
            </p>
          </div>

          <div>
            <label className="font-semibold">Phone</label>

            {editing ? (
              <input
                className="w-full mt-2 border rounded-lg p-3"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            ) : (
              <p className="mt-2 text-gray-700">
                {profile?.phone || "Not Added"}
              </p>
            )}
          </div>

          <div>
            <label className="font-semibold">Address</label>

            {editing ? (
              <textarea
                rows={4}
                className="w-full mt-2 border rounded-lg p-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            ) : (
              <p className="mt-2 text-gray-700 whitespace-pre-line">
                {profile?.address || "Not Added"}
              </p>
            )}
          </div>

        </div>

        <div className="flex gap-4 mt-10">

          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>

              <button
                onClick={() => setEditing(false)}
                className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-100"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="w-full bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700"
            >
              Edit Profile
            </button>
          )}

        </div>

      </div>

    </div>
  );
}