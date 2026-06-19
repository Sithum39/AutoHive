// src/app/post-inquiry/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Navbar from "@/components/common/Navbar";

export default function PostInquiry() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [categories, setCategories] = useState([]);

  // Form එකේ State එක (Backend එකේ InquiryRequest එකට ගැලපෙන්න)
  const [formData, setFormData] = useState({
    vehicleId: "",
    categoryId: "",
    partDescription: "",
    imageUrl: "",
  });

  useEffect(() => {
    // මේ Page එකට එන්න පුළුවන් "CUSTOMER" කෙනෙක්ට විතරයි
    const role = localStorage.getItem("userRole");
    if (!role || role.toUpperCase() !== "CUSTOMER") {
      router.push("/login");
      return;
    }

    // Categories ටික ගන්නවා Dropdown එකට
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories/all");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setMessage({
          type: "error",
          text: "User session expired. Please login again.",
        });
        return;
      }

      // Backend එකට යවන Payload එක හරියටම InquiryRequest එකට ගැලපෙන්න හදනවා
      const payload = {
        userId: userId,
        vehicleId: formData.vehicleId, // දැනට type කරන id එක, පස්සේ dropdown එකක් කරමු
        categoryId: formData.categoryId,
        inquiryType: "open", // අනිවාර්යයෙන්ම "open" inquiry එකක්
        partDescription: formData.partDescription,
        imageUrl: formData.imageUrl,
      };

      console.log("Submitting Inquiry:", payload);

      // (මචං ඔයාගේ InquiryController එකේ endpoint එක මේක නෙවෙයි නම් මේක වෙනස් කරන්න)
      await api.post("/inquiries/create", payload);

      setMessage({
        type: "success",
        text: "Your inquiry has been published successfully!",
      });

      // Form එක clear කරනවා
      setFormData({
        vehicleId: "",
        categoryId: "",
        partDescription: "",
        imageUrl: "",
      });

      // තත්පර 2කින් Customer Dashboard එකට යවනවා
      setTimeout(() => {
        router.push("/customer-dashboard");
      }, 2000);
    } catch (error) {
      console.error("Inquiry Error:", error);
      const backendError = error.response?.data;
      let errorMessage = "Failed to post inquiry. Please try again.";

      if (typeof backendError === "string") {
        errorMessage = backendError;
      } else if (backendError?.message) {
        errorMessage = backendError.message;
      }

      setMessage({ type: "error", text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-brand-deep tracking-tight">
            Post an <span className="text-brand-teal">Inquiry</span>
          </h1>
          <p className="text-slate-500 mt-2">
            Describe the spare part you need and let sellers send you their best
            quotes.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          {message.text && (
            <div
              className={`p-4 rounded-xl mb-6 text-sm font-semibold ${message.type === "success" ? "bg-green-50 text-green-600 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Category *
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all"
              >
                <option value="" disabled>
                  Select part category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Details (For now a simple text input) */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Vehicle ID / Model Details *
              </label>
              <input
                type="text"
                name="vehicleId"
                value={formData.vehicleId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all"
                placeholder="e.g. Toyota Corolla 141 - 2008 (or Vehicle ID)"
              />
            </div>

            {/* Part Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Part Description *
              </label>
              <textarea
                name="partDescription"
                value={formData.partDescription}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all resize-none"
                placeholder="Describe exactly what you need. (e.g. Front left brake caliper, used or brand new...)"
              ></textarea>
            </div>

            {/* Image URL (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Sample Image URL (Optional)
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all"
                placeholder="https://example.com/broken-part.jpg"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-brand-deep hover:bg-brand-teal text-white font-bold py-3.5 rounded-xl transition-all shadow-md ${isLoading ? "opacity-70 cursor-not-allowed" : "active:scale-[0.98]"}`}
              >
                {isLoading
                  ? "Publishing Inquiry..."
                  : "Post Inquiry to Sellers"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
