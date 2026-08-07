
"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      toast.success("Login successful");

      router.push("/profile");
    } catch (error: any) {
      toast.error(
        error?.message || "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-10 sm:px-6 lg:py-16">

      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

        {/* ================= LEFT BRAND SECTION ================= */}

        <div className="relative hidden overflow-hidden bg-gradient-to-br from-pink-600 via-pink-700 to-rose-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">

          {/* Decorative circles */}

          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10" />

          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/10" />

          <div className="relative z-10">

            <div className="flex items-center gap-2">
              <Sparkles size={22} />
              <span className="text-sm font-semibold tracking-widest">
                KHUSHIKA
              </span>
            </div>

            <h1 className="mt-12 max-w-md text-5xl font-extrabold leading-tight">
              Your beauty.
              <br />
              Your style.
              <br />
              Your confidence.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-pink-100">
              Discover beauty and fashion essentials curated
              especially for you.
            </p>

          </div>

          <div className="relative z-10">
            <p className="text-sm text-pink-100">
              Beauty & Fashion
            </p>

            <p className="mt-1 text-sm text-white/70">
              Shop your favorite products with Khushika.
            </p>
          </div>

        </div>

        {/* ================= LOGIN SECTION ================= */}

        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">

          <div className="w-full max-w-md">

            {/* Mobile Brand */}

            <div className="mb-8 text-center lg:hidden">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-600 text-white shadow-lg">
                <Sparkles size={26} />
              </div>

              <h1 className="mt-4 text-2xl font-extrabold text-gray-900">
                Khushika
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Beauty & Fashion
              </p>

            </div>

            {/* Heading */}

            <div className="text-center lg:text-left">

              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Welcome Back
              </h2>

              <p className="mt-2 text-gray-500">
                Sign in to continue shopping with us.
              </p>

            </div>

            {/* ================= FORM ================= */}

            <div className="mt-8 space-y-5">

              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    autoComplete="email"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                </div>
              </div>

              {/* Password */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-pink-600 transition hover:text-pink-700"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 transition hover:bg-pink-50 hover:text-pink-600 disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>
              </div>

              {/* Login Button */}

              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-pink-600 py-3.5 font-semibold text-white shadow-lg shadow-pink-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-pink-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-pink-400 disabled:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Signing in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>

            </div>

            {/* Register */}

            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-pink-600 transition hover:text-pink-700"
              >
                Create an account
              </Link>
            </p>

            {/* Security */}

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
              <Lock size={14} />
              Secure login powered by Firebase
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
