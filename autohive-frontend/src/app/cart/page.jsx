// src/app/cart/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import { getCart, removeFromCart } from "@/utils/cart";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Page එක load වෙද්දී Cart එකේ තියෙන බඩු ටික ගන්නවා
    setCart(getCart());
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart()); // UI එක update කරන්න
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-brand-deep">
            Your Shopping Cart
          </h1>
          <p className="text-slate-500">Review your selected spare parts.</p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-700 mb-4">
              Cart is empty
            </h2>
            <button
              onClick={() => router.push("/products")}
              className="text-brand-teal font-bold hover:underline"
            >
              Go to Catalog →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {item.brand} | Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-brand-deep">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 text-xs font-bold hover:underline mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-brand-deep p-8 rounded-3xl text-white shadow-lg">
                <h3 className="text-lg font-bold mb-6 text-slate-300">
                  Order Summary
                </h3>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm">Total</span>
                  <span className="text-2xl font-black">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-brand-teal hover:bg-white hover:text-brand-deep text-white font-black py-4 rounded-xl transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
