// src/app/seller-orders/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Navbar from "@/components/common/Navbar";

export default function SellerOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role || role.toUpperCase() !== "SELLER") {
      router.push("/login");
      return;
    }
    fetchSellerOrders();
  }, [router]);

  const fetchSellerOrders = async () => {
    try {
      setLoading(true);
      const sellerId = localStorage.getItem("sellerId");

      if (!sellerId) {
        setError("Seller Profile missing. Please setup your business.");
        return;
      }

      // 1. පරණ Inquiry Orders සහ 2. අලුත් Direct Orders දෙකම එකපාර ගන්නවා
      const [inquiryRes, directRes] = await Promise.all([
        api.get(`/orders/seller-orders/${sellerId}`),
        api.get(`/orders/seller-direct-orders/${sellerId}`),
      ]);

      // දෙකම එකතු කරලා Sort කරනවා
      const allOrders = [...inquiryRes.data, ...directRes.data];
      const sortedOrders = allOrders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setOrders(sortedOrders);
    } catch (err) {
      console.error("Error fetching seller orders:", err);
      setError("Failed to load your orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus, type) => {
    try {
      setUpdatingId(orderId);
      const sellerId = localStorage.getItem("sellerId");

      // පරණ Flow එක සහ අලුත් Flow එකට වෙන වෙනම endpoints (මේක Backend එකේ තියෙන විදියටම)
      const endpoint =
        type === "DIRECT"
          ? `/orders/update-direct-status/${orderId}`
          : `/orders/${orderId}/status`;

      await api.put(endpoint, {
        sellerId: sellerId,
        status: newStatus,
      });

      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert(err.response?.data || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      shipped: "bg-blue-100 text-blue-700 border-blue-200",
      delivered: "bg-green-100 text-green-700 border-green-200",
      default: "bg-slate-100 text-slate-700 border-slate-200",
    };
    return (
      <span
        className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase ${styles[status?.toLowerCase()] || styles.default}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-black text-brand-deep">
            Order Management
          </h1>
          <p className="text-slate-500">Manage all your customer orders.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-teal"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-slate-500 bg-white rounded-3xl shadow-sm border border-slate-100">
            No orders yet.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              // Direct order ද inquiry order ද කියලා අඳුනගන්න helper variables
              const isDirect = !!order.product;
              const title = isDirect
                ? order.product.name
                : order.inquiryDescription;
              const buyerName = isDirect ? order.buyer.name : order.buyerName;
              const typeLabel = isDirect ? "DIRECT" : "INQUIRY";

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6"
                >
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-black text-brand-teal uppercase tracking-wider bg-brand-teal/10 px-2 py-0.5 rounded">
                        {typeLabel}
                      </span>
                      {getStatusBadge(order.status)}
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">
                      {title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Customer:{" "}
                      <span className="font-bold text-slate-800">
                        {buyerName}
                      </span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-black text-brand-deep">
                      Rs. {order.totalAmount.toLocaleString()}
                    </p>
                    {order.status !== "delivered" && (
                      <div className="flex gap-2 mt-2">
                        {order.status === "pending" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(order.id, "shipped", typeLabel)
                            }
                            className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg"
                          >
                            Mark Shipped
                          </button>
                        )}
                        {order.status === "shipped" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(
                                order.id,
                                "delivered",
                                typeLabel,
                              )
                            }
                            className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg"
                          >
                            Mark Delivered
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
