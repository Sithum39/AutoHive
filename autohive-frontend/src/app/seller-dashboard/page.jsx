// src/app/seller-dashboard/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Navbar from "@/components/common/Navbar";

export default function SellerDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [userName, setUserName] = useState("");
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeOrdersCount, setActiveOrdersCount] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
  });

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

    if (!role || role.toUpperCase() !== "SELLER") {
      router.push("/login");
      return;
    } else {
      setUserName(localStorage.getItem("userName") || "Seller");
    }

    // එකපාරම function දෙකක් ලියන්නේ නැතුව එක function එකක් ඇතුලේ පිළිවෙලට කරමු
    const initDashboard = async () => {
      // 1. Profile එක Check කරලා Seller ID එක ගන්න
      try {
        const response = await api.get(`/business/seller/user/${userId}`);
        const sellerId = response.data.sellerId;
        localStorage.setItem("sellerId", sellerId);

        // 2. ID එක ලැබුණට පස්සේ විතරක් Reviews ටික Fetch කරන්න
        await fetchSellerReviews(sellerId);
      } catch (error) {
        if (error.response?.status === 404) {
          router.push("/seller-setup");
        } else {
          console.error("Error initializing dashboard:", error);
        }
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories/all");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    initDashboard();
    fetchCategories();
  }, [router]);

  const fetchSellerReviews = async (sellerId) => {
    try {
      const res = await api.get(`/ratings/seller/${sellerId}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const sellerId = localStorage.getItem("sellerId");
      await api.post("/business/product", {
        ...formData,
        sellerId,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });
      setMessage({ type: "success", text: "Product added!" });
      setFormData({
        name: "",
        brand: "",
        price: "",
        stock: "",
        categoryId: "",
        imageUrl: "",
      });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to add product." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-brand-deep">Seller Hub</h1>
            <p className="text-slate-500">
              Welcome back,{" "}
              <span className="font-bold text-brand-teal">{userName}</span>
            </p>
          </div>
          <button
            onClick={() => router.push("/seller-orders")}
            className="bg-brand-deep hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-brand-deep/20 transition-all active:scale-95 flex items-center gap-2"
          >
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Manage Orders ({activeOrdersCount})
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Product Form (2/3 width) */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            <h2 className="text-2xl font-black text-brand-deep mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-brand-teal rounded-full"></span> Add
              New Part
            </h2>

            {message.text && (
              <div
                className={`p-4 rounded-xl mb-6 text-sm font-bold ${message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-teal outline-none"
                />
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Brand"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-teal outline-none"
                />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price (Rs)"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-teal outline-none"
                />
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Stock Qty"
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-teal outline-none"
                />
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-teal outline-none"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-teal outline-none"
                />
              </div>
              <button
                disabled={isLoading}
                className="w-full bg-brand-teal hover:bg-brand-deep text-white font-black py-4 rounded-2xl transition-all shadow-lg hover:shadow-brand-teal/20 active:scale-[0.98]"
              >
                {isLoading ? "Adding..." : "Add Product to Inventory"}
              </button>
            </form>
          </div>

          {/* Right: Reviews Card (1/3 width) */}
          <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 h-fit">
            <h2 className="text-xl font-black text-brand-deep mb-6">
              Recent Reviews
            </h2>
            {reviews.length === 0 ? (
              <div className="text-center py-8 text-slate-400 italic">
                No reviews yet
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((r, i) => (
                  <div
                    key={i}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-700 text-sm">
                        {r.buyer?.name || "Customer"}
                      </span>
                      <span className="text-amber-500 text-xs font-black bg-amber-50 px-2 py-1 rounded-md">
                        {r.ratingValue} ★
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {r.review}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
