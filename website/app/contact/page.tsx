"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    toast.success("Thank you! Your message has been received.");

    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-pink-50 via-white to-purple-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-pink-600">
            Get In Touch
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            Have a question about our products, orders, or anything
            else? We would love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">

          {/* Contact Information */}

          <div className="space-y-5">

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                  <Mail size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Email
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    support@khushika.com
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                  <Phone size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Phone
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    +91 XXXXX XXXXX
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                  <MapPin size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Location
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    India
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Form */}

          <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8 lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Send Us a Message
            </h2>

            <p className="mt-2 text-gray-500">
              Fill out the form and our team will get back to you.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Your Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                  />
                </div>

              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Message
                </label>

                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="How can we help you?"
                  rows={6}
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-7 py-3.5 font-semibold text-white transition hover:-translate-y-1 hover:bg-pink-700 hover:shadow-lg"
              >
                <Send size={18} />
                Send Message
              </button>

            </form>
          </div>

        </div>
      </section>
    </main>
  );
}