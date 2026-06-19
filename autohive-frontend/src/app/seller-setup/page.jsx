// src/app/seller-setup/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Navbar from "@/components/common/Navbar";

export default function SellerSetup() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Role එක CUSTOMER හරි SELLER හරි නම් විතරක් මේ page එකට එන්න දෙනවා
    const role = localStorage.getItem("userRole")?.toUpperCase();
    if (!role || (role !== "SELLER" && role !== "CUSTOMER")) {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userId = localStorage.getItem("userId");

      // අලුත් Seller Profile එක හදන්න Backend එකට යවනවා
      await api.post("/business/seller", {
        userId: userId,
        businessName: businessName,
      });

      // සාර්ථකව හැදුවට පස්සේ Auto-Logout Logic එක
      alert(
        "You are now a Seller! Please login again to access your new dashboard.",
      );

      // Local storage එකේ තියෙන පරණ දේවල් ඔක්කොම මකනවා
      localStorage.clear();

      // අලුතින් Login වෙන්න Login page එකට යවනවා
      router.push("/login");
    } catch (err) {
      // Backend එකෙන් එන error එක අල්ලගන්නවා
      if (err.response && err.response.data) {
        setError(
          typeof err.response.data === "string"
            ? err.response.data
            : "Failed to create business profile.",
        );
      } else {
        setError("Network error. Is the server running?");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full border border-slate-100">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-brand-deep">
              Setup Your Business
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Before adding products, please complete your seller profile.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none"
                placeholder="e.g. AutoMart Motors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-brand-teal hover:bg-brand-deep text-white font-bold py-3.5 rounded-xl transition-all ${isLoading ? "opacity-70 cursor-not-allowed" : "active:scale-[0.98]"}`}
            >
              {isLoading ? "Saving..." : "Complete Setup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
