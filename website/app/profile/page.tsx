
"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

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
  const router = useRouter();

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
        } else {
          const defaultProfile: UserProfile = {
            name: "",
            email: user.email || "",
            phone: "",
            address: "",
            role: "customer",
          };

          setProfile(defaultProfile);
        }
      } catch (error) {
        console.error(error);
        toast.error("Unable to load your profile.");
      } finally {
        setPageLoading(false);
      }
    }

    fetchProfile();
  }, [user, loading]);

  const handleSave = async () => {
    if (!user) return;

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    setSaving(true);

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          name: name.trim(),
          email: user.email,
          phone: phone.trim(),
          address: address.trim(),
          role: "customer",
        },
        { merge: true }
      );

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              name: name.trim(),
              phone: phone.trim(),
              address: address.trim(),
            }
          : {
              name: name.trim(),
              email: user.email || "",
              phone: phone.trim(),
              address: address.trim(),
              role: "customer",
            }
      );

      setEditing(false);

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || pageLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-5xl">

          <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-200" />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">

            <div className="h-72 animate-pulse rounded-3xl bg-white shadow-sm" />

            <div className="h-96 animate-pulse rounded-3xl bg-white shadow-sm lg:col-span-2" />

          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
            <User className="text-pink-600" size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Login Required
          </h1>

          <p className="mt-2 text-gray-500">
            Please login to view and manage your profile.
          </p>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="mt-6 w-full rounded-xl bg-pink-600 py-3.5 font-semibold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-xl"
          >
            Login
          </button>

        </div>
      </main>
    );
  }

  const displayName =
    profile?.name?.trim() || "Khushika Customer";

  const initial =
    profile?.name?.trim()?.charAt(0).toUpperCase() || "K";

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8 sm:px-6 lg:py-12">

      <div className="mx-auto max-w-6xl">

        {/* ================= PAGE HEADER ================= */}

        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-widest text-pink-600">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your personal information and account details.
          </p>

        </div>

        {/* ================= PROFILE GRID ================= */}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* ================= PROFILE CARD ================= */}

          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg">

            {/* Pink Header */}

            <div className="relative h-32 bg-gradient-to-br from-pink-500 via-pink-600 to-rose-700">

              <div className="absolute -bottom-10 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-pink-100 text-2xl font-bold text-pink-600 shadow-lg">
                {initial}
              </div>

            </div>

            {/* Profile Info */}

            <div className="px-6 pb-7 pt-14 text-center">

              <h2 className="text-xl font-bold text-gray-900">
                {displayName}
              </h2>

              <p className="mt-1 break-all text-sm text-gray-500">
                {user.email}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                <ShieldCheck size={15} />
                Verified Account
              </div>

              <div className="mt-6 border-t border-gray-100 pt-5 text-left">

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="rounded-lg bg-pink-50 p-2">
                    <Mail
                      size={16}
                      className="text-pink-600"
                    />
                  </div>

                  <span className="truncate">
                    {user.email}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3 text-sm text-gray-600">
                  <div className="rounded-lg bg-pink-50 p-2">
                    <Phone
                      size={16}
                      className="text-pink-600"
                    />
                  </div>

                  <span>
                    {profile?.phone || "Phone not added"}
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* ================= DETAILS CARD ================= */}

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8 lg:col-span-2">

            {/* Card Header */}

            <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Keep your account information up to date.
                </p>
              </div>

              {!editing && (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-pink-200 bg-pink-50 px-5 py-2.5 text-sm font-semibold text-pink-600 transition hover:bg-pink-100"
                >
                  <Pencil size={16} />
                  Edit Profile
                </button>
              )}

            </div>

            {/* ================= INFORMATION ================= */}

            <div className="mt-7 grid gap-6 sm:grid-cols-2">

              {/* Name */}

              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                {editing ? (
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="profile-name"
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
                      placeholder="Enter your name"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-[52px] items-center gap-3 rounded-xl bg-gray-50 px-4">
                    <User
                      size={18}
                      className="text-pink-600"
                    />

                    <span className="text-gray-700">
                      {profile?.name || "Not added"}
                    </span>
                  </div>
                )}
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <div className="flex min-h-[52px] items-center gap-3 rounded-xl bg-gray-100 px-4">
                  <Mail
                    size={18}
                    className="text-gray-400"
                  />

                  <span className="truncate text-gray-600">
                    {user.email}
                  </span>
                </div>

                <p className="mt-1.5 text-xs text-gray-400">
                  Email is managed through your account.
                </p>
              </div>

              {/* Phone */}

              <div>
                <label
                  htmlFor="profile-phone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Phone Number
                </label>

                {editing ? (
                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="profile-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
                      placeholder="Enter your phone number"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-[52px] items-center gap-3 rounded-xl bg-gray-50 px-4">
                    <Phone
                      size={18}
                      className="text-pink-600"
                    />

                    <span className="text-gray-700">
                      {profile?.phone || "Not added"}
                    </span>
                  </div>
                )}
              </div>

              {/* Role */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Account Type
                </label>

                <div className="flex min-h-[52px] items-center gap-3 rounded-xl bg-gray-50 px-4">
                  <ShieldCheck
                    size={18}
                    className="text-green-600"
                  />

                  <span className="font-medium capitalize text-gray-700">
                    {profile?.role || "customer"}
                  </span>
                </div>
              </div>

              {/* Address */}

              <div className="sm:col-span-2">

                <label
                  htmlFor="profile-address"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Address
                </label>

                {editing ? (
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-4 text-gray-400"
                    />

                    <textarea
                      id="profile-address"
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                      rows={4}
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100"
                      placeholder="Enter your delivery address"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-[90px] gap-3 rounded-xl bg-gray-50 px-4 py-4">
                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-pink-600"
                    />

                    <span className="text-gray-700">
                      {profile?.address || "No address added yet."}
                    </span>
                  </div>
                )}

              </div>

            </div>

            {/* ================= EDIT ACTIONS ================= */}

            {editing && (
              <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => {
                    setName(profile?.name || "");
                    setPhone(profile?.phone || "");
                    setAddress(profile?.address || "");
                    setEditing(false);
                  }}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X size={18} />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-7 py-3 font-semibold text-white shadow-lg shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-pink-400 disabled:shadow-none"
                >
                  {saving ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Profile
                    </>
                  )}
                </button>

              </div>
            )}

          </div>
        </div>

        {/* ================= ACCOUNT FEATURES ================= */}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50">
              <ShieldCheck
                size={21}
                className="text-pink-600"
              />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Secure Account
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Your account information is securely protected.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50">
              <MapPin
                size={21}
                className="text-pink-600"
              />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Easy Delivery
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Keep your address updated for faster checkout.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50">
              <User
                size={21}
                className="text-pink-600"
              />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              Personal Details
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Manage your information whenever you need.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}

