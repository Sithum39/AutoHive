// src/app/customer-dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/common/Navbar";
import api from "@/utils/api";

export default function CustomerDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [inquiryCount, setInquiryCount] = useState(0);
  const [activeOrdersCount, setActiveOrdersCount] = useState(0);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

    if (!role || role.toUpperCase() !== "CUSTOMER") {
      router.push("/login");
    } else {
      setUserName(localStorage.getItem("userName") || "Customer");

      const fetchMyInquiries = async () => {
        try {
          const response = await api.get(`/inquiries/my-inquiries/${userId}`);
          setInquiryCount(response.data.length);
        } catch (error) {
          console.error("Error fetching inquiries:", error);
        }
      };

      // අලුත්ම Unified API එකෙන් Orders ටික ගන්නවා
      const fetchMyOrders = async () => {
        try {
          // මෙතන අනිවාර්යයෙන්ම unified endpoint එක පාවිච්චි කරන්න
          const response = await api.get(`/orders/history/${userId}`);

          // Status එක 'pending' හෝ 'shipped' වෙන ඒවා Filter කරනවා (Case insensitive)
          const activeOrders = response.data.filter(
            (order) =>
              order.status.toLowerCase() === "pending" ||
              order.status.toLowerCase() === "shipped",
          );
          setActiveOrdersCount(activeOrders.length);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      if (userId) {
        fetchMyInquiries();
        fetchMyOrders();
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-brand-deep tracking-tight">
            My <span className="text-brand-teal">Profile</span>
          </h1>
          <p className="text-slate-500 mt-1">
            Welcome back, {userName}. Manage your account here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
              <div className="flex items-center space-x-4 mb-6 border-b border-slate-100 pb-6">
                <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal font-black text-2xl">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">
                    {userName}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    Customer Account
                  </p>
                </div>
              </div>

              <nav className="space-y-2">
                <Link
                  href="/customer-dashboard"
                  className="block px-4 py-3 bg-brand-teal/10 text-brand-teal rounded-xl font-semibold"
                >
                  Dashboard Overview
                </Link>
                <Link
                  href="/my-orders"
                  className="block px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-semibold"
                >
                  My Orders
                </Link>
                <Link
                  href="/my-inquiries"
                  className="block px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-semibold"
                >
                  My Inquiries
                </Link>
              </nav>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center items-center">
                <span className="text-3xl font-black text-brand-deep">
                  {activeOrdersCount}
                </span>
                <span className="text-sm font-semibold text-slate-500 mt-1">
                  Active Orders
                </span>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center items-center">
                <span className="text-3xl font-black text-brand-teal">
                  {inquiryCount}
                </span>
                <span className="text-sm font-semibold text-slate-500 mt-1">
                  Open Inquiries
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-deep to-slate-900 rounded-3xl p-8 shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-2xl font-bold mb-2">
                    Want to sell on AutoHive?
                  </h2>
                  <p className="text-slate-300 text-sm max-w-md">
                    Turn your automotive business into a digital powerhouse.
                    Become a seller today.
                  </p>
                </div>
                <Link
                  href="/seller-setup"
                  className="bg-brand-teal hover:bg-white hover:text-brand-deep text-white font-bold py-3.5 px-8 rounded-xl transition-all"
                >
                  Become a Seller
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
