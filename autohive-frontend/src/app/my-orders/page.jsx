// src/app/my-orders/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Navbar from "@/components/common/Navbar";

export default function MyOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

    if (!role || role.toUpperCase() !== "CUSTOMER") {
      router.push("/login");
      return;
    }

    if (userId) {
      fetchUnifiedOrders(userId);
    }
  }, [router]);

  const fetchUnifiedOrders = async (userId) => {
    try {
      setLoading(true);
      // මෙතන තියෙන "/api/v1/" එක අයින් කරන්න!
      // මම හදලා තියෙන විදියට "/orders/history/${userId}" කියලා දාන්න.
      const response = await api.get(`/orders/history/${userId}`);

      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setOrders(sortedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load your orders.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      shipped: "bg-blue-100 text-blue-700 border-blue-200",
      delivered: "bg-green-100 text-green-700 border-green-200",
      default: "bg-slate-100 text-slate-700 border-slate-200",
    };
    const style = styles[status?.toLowerCase()] || styles.default;
    return (
      <span
        className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase ${style}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-black text-brand-deep">My Orders</h1>
          <p className="text-slate-500">
            Track all your inquiries and direct purchases here.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-teal"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-slate-500 bg-white rounded-3xl border border-slate-100">
            No orders found.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4"
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      {order.type} ORDER
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                  <h3 className="font-bold text-lg text-slate-800">
                    {order.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mb-2">
                    Seller: {order.sellerBusinessName || "N/A"}
                  </p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wide">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-slate-500 uppercase">
                    Total
                  </p>
                  <p className="text-xl font-black text-brand-teal">
                    Rs. {order.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
