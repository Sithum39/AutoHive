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
  // මෙන්න මේක තමයි අඩුවෙලා තිබුණේ
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Reset error state before new request

    try {
      // Backend URL එකට v1 එක ඇඩ් කරලා තියෙන්නේ
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email: email,
          password: password,
        },
      );

      const data = response.data;

      // Token එකයි User Details ටිකයි LocalStorage එකේ save කරගමු
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userId", data.userId);

      // Role එක අනුව යන්න ඕන page එක වෙනස් කරමු
      if (data.role?.toUpperCase() === "SELLER") {
        router.push("/seller-dashboard");
      } else if (data.role?.toUpperCase() === "CUSTOMER") {
        router.push("/");
        console.log("Customer logged in successfully");
      } else {
        router.push("/");
      }
    } catch (err) {
      // Error handling එක backend එකෙන් එන විදියට හදලා තියෙන්නේ
      if (err.response && err.response.data) {
        // Backend එකෙන් කෙලින්ම String එකක් එවන නිසා
        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : "Invalid email or password",
        );
      } else {
        setError("Network error. Is the Spring Boot server running?");
      }
    } finally {
      setIsLoading(false);
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
        <div className="flex justify-center mb-6 py-3 rounded-2xl">
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

            {/* Password Input එක Eye Icon එකත් එක්ක */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all text-sm pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error Message Display */}
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
