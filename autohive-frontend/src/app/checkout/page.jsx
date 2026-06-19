// src/app/checkout/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Navbar from "@/components/common/Navbar";
import { getCart } from "@/utils/cart";

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role || role.toUpperCase() !== "CUSTOMER") {
      router.push("/login");
      return;
    }

    const cart = getCart();
    if (cart.length === 0) {
      router.push("/products"); // Cart එකේ බඩු නැත්නම් Catalog එකට යවනවා
    } else {
      setCartItems(cart);
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      setTotalPrice(total);
    }
  }, [router]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const buyerId = localStorage.getItem("userId");

      // Cart එකේ තියෙන එක එක බඩුවක් වෙන වෙනම Order එකක් විදියට යවනවා
      // (Backend එකේ /orders/place එකට quoteId අවශ්‍ය නිසා,
      // ඔයාගේ Product එකකටත් quoteId එකක් generate කරලා තියෙනවා නම් මේක පට්ට වැඩ)
      for (const item of cartItems) {
        await api.post("/orders/place-product", {
          quoteId: item.id, // මෙතන item.id එක quoteId එක විදියට යනවා
          buyerId: buyerId,
        });
      }

      setMessage({ type: "success", text: "All orders placed successfully!" });
      localStorage.removeItem("cart"); // Cart එක clear කරනවා

      setTimeout(() => {
        router.push("/customer-dashboard");
      }, 2000);
    } catch (err) {
      console.error("Order Error:", err);
      setMessage({
        type: "error",
        text: "Failed to place order. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-brand-deep tracking-tight">
            Checkout
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4">
            Order Summary
          </h3>

          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-slate-600">
                  {item.name} x {item.quantity}
                </span>
                <span className="font-semibold text-slate-800">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <span className="text-lg font-bold text-brand-deep">Total</span>
            <span className="text-2xl font-black text-brand-teal">
              Rs. {totalPrice.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full mt-8 bg-brand-deep hover:bg-brand-teal text-white font-bold py-4 rounded-xl transition-all"
          >
            {loading ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </main>
    </div>
  );
}
