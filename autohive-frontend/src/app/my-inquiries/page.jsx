// src/app/my-inquiries/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/utils/api";
import Navbar from "@/components/common/Navbar";

export default function MyInquiries() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Quotes Modal එකට අදාල States
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loadingQuotes, setLoadingQuotes] = useState(false);

  useEffect(() => {
    // CUSTOMER ට විතරයි මේකට එන්න පුළුවන්
    const role = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

    if (!role || role.toUpperCase() !== "CUSTOMER") {
      router.push("/login");
      return;
    }

    if (userId) {
      fetchMyInquiries(userId);
    }
  }, [router]);

  const fetchMyInquiries = async (userId) => {
    try {
      setLoading(true);
      // Backend එකෙන් Customer ගේ inquiries ටික ගන්නවා
      const response = await api.get(`/inquiries/my-inquiries/${userId}`);
      setInquiries(response.data);
    } catch (err) {
      console.error("Error fetching my inquiries:", err);
      setError("Failed to load your inquiries.");
    } finally {
      setLoading(false);
    }
  };

  // Quotes ටික බලන්න Modal එක Open කරන function එක
  const handleViewQuotes = async (inquiry) => {
    setSelectedInquiry(inquiry);
    setLoadingQuotes(true);
    try {
      // මේ inquiry එකට අදාල Quotes ටික Backend එකෙන් ගන්නවා
      const response = await api.get(`/inquiries/${inquiry.id}/quotes`);
      setQuotes(response.data);
    } catch (err) {
      console.error("Error fetching quotes:", err);
    } finally {
      setLoadingQuotes(false);
    }
  };

  // Quote එකක් තේරුවාම Order එක දාන්න යන function එක
  const handleAcceptQuote = (quote) => {
    localStorage.setItem("selectedQuoteId", quote.id);
    localStorage.setItem("checkoutPrice", quote.price);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl relative">
        <div className="mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-black text-brand-deep tracking-tight">
            My <span className="text-brand-teal">Inquiries</span>
          </h1>
          <p className="text-slate-500 mt-2">
            Manage your requests and review quotes from sellers.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-semibold bg-white rounded-2xl shadow-sm">
            {error}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-20 text-slate-500 bg-white rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-700">
              You haven't posted any inquiries yet.
            </h3>
            <button
              onClick={() => router.push("/post-inquiry")}
              className="mt-4 bg-brand-teal text-white font-bold py-2.5 px-6 rounded-xl"
            >
              Post an Inquiry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                    {inquiry.category || "General"}
                  </span>
                  {/* Status එක අනුව පාට වෙනස් කරනවා */}
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                      inquiry.status === "quoting"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {inquiry.status}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-800 mb-1">
                  {inquiry.vehicle}
                </h3>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {inquiry.partDescription}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleViewQuotes(inquiry)}
                    className="w-full bg-brand-deep hover:bg-brand-teal text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    View Received Quotes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quotes බලන Modal එක */}
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-2xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-full"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-black text-brand-deep">
                  Received Quotes
                </h2>
                <p className="text-sm text-slate-500">
                  For: {selectedInquiry.vehicle}
                </p>
              </div>

              <div className="overflow-y-auto flex-grow pr-2 space-y-4">
                {loadingQuotes ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal"></div>
                  </div>
                ) : quotes.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-xl">
                    No quotes received yet for this inquiry.
                  </div>
                ) : (
                  quotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-teal/50 transition-all"
                    >
                      <div>
                        <h4 className="font-bold text-slate-800 flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-brand-teal"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {quote.sellerBusinessName}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 font-medium">
                          Delivery:{" "}
                          <span className="text-slate-700 font-bold">
                            {quote.deliveryTimeDays} Days
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-none border-slate-200 pt-4 sm:pt-0">
                        <div className="text-right">
                          <p className="text-[10px] text-slate-500 font-bold uppercase">
                            Quoted Price
                          </p>
                          <p className="text-xl font-black text-brand-deep">
                            Rs. {quote.price.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAcceptQuote(quote)}
                          className="bg-brand-teal hover:bg-brand-deep text-white font-bold py-2 px-5 rounded-lg text-sm shadow-md transition-all active:scale-95"
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
