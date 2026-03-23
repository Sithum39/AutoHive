// src/app/login/page.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        {
          email: email,
          password: password,
        },
      );
      const data = response.data;
      localStorage.setItem("token", data.token);
      if (data.user.role === "SELLER") {
        router.push("/"); // ✅ Fixed
        console.log("Seller logged in successfully");
      }
    } catch (err) {
      // 2. Set the error message based on the response
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Invalid email or password");
      } else {
        setError("Network error. Is the server running?");
      }
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-deep font-sans p-4 relative overflow-hidden text-white">
      {/* Background decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.15)] p-8 md:p-10 border border-slate-200 backdrop-blur-sm relative z-10 text-slate-800">
        {/* Logo */}
        <div className="flex justify-center mb-6  py-3 rounded-2xl">
          <Image
            src="/AutoHive-for-light.png"
            alt="AutoHive Logo"
            width={180}
            height={52}
            className="w-auto h-12 md:h-14 block dark:hidden"
            priority
          />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 text-center mb-2 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-center text-slate-700 text-sm mb-8">
          Please enter your details to sign in.
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all text-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-slate-900">
                Password
              </label>
              <a
                href="#"
                className="text-xs font-semibold text-brand-teal hover:text-brand-deep transition-colors"
              >
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all text-sm"
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-md mb-4">
              <p className="text-xs text-red-600 font-semibold">{error}</p>
            </div>
          )}

          <button
            disabled={isLoading}
            className={`w-full bg-brand-teal hover:bg-brand-deep text-white font-bold py-3.5 rounded-xl transition-all mt-2 shadow-md ${isLoading ? "opacity-50 cursor-not-allowed" : "active:scale-[0.98]"}`}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-900 mt-8">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-brand-teal hover:text-brand-deep transition-colors"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
