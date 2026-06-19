"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/utils/api";
import Navbar from "@/components/common/Navbar";

export default function InquiriesFeed() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState([]);
  const [myQuotes, setMyQuotes] = useState([]); // මගේ quotes තියාගන්න state එක
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [quotePrice, setQuotePrice] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [submittingQuote, setSubmittingQuote] = useState(false);
  const [quoteMessage, setQuoteMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role || role.toUpperCase() !== "SELLER") {
      router.push("/login");
      return;
    }
    fetchInquiriesAndQuotes();
  }, [router]);

  const fetchInquiriesAndQuotes = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");

      // හරියටම Seller ID එක ගන්නවා (Seller name එක සමාන වෙන ප්‍රශ්නෙට විසඳුම)
      const sellerRes = await api.get(`/business/seller/user/${userId}`);
      const exactSellerId = sellerRes.data.sellerId;
      localStorage.setItem("sellerId", exactSellerId);

      // Inquiries සහ Quotes එකපාර ගන්නවා
      const [feedRes, quotesRes] = await Promise.all([
        api.get("/inquiries/open-feed"),
        api.get(`/inquiries/seller-quotes/${exactSellerId}`),
      ]);

      setInquiries(feedRes.data);
      setMyQuotes(quotesRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load inquiries. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const openQuoteModal = (inquiry, existingQuote = null) => {
    setSelectedInquiry(inquiry);
    setQuoteMessage({ type: "", text: "" });
    if (existingQuote) {
      // Edit කරනවා නම් පරණ ගණන් form එකට දානවා
      setQuotePrice(existingQuote.price);
      setDeliveryDays(existingQuote.deliveryTimeDays);
    } else {
      setQuotePrice("");
      setDeliveryDays("");
    }
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setSubmittingQuote(true);
    setQuoteMessage({ type: "", text: "" });

    try {
      const sellerId = localStorage.getItem("sellerId");
      const payload = {
        inquiryId: selectedInquiry.id,
        sellerId: sellerId,
        price: parseFloat(quotePrice),
        deliveryTimeDays: parseInt(deliveryDays),
      };

      await api.post("/inquiries/quote", payload);
      setQuoteMessage({ type: "success", text: "Quote saved successfully!" });

      setTimeout(() => {
        setSelectedInquiry(null);
        fetchInquiriesAndQuotes(); // Refresh කරනවා
      }, 1500);
    } catch (err) {
      setQuoteMessage({
        type: "error",
        text: err.response?.data || "Failed to save quote.",
      });
    } finally {
      setSubmittingQuote(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl relative">
        <div className="mb-8 flex justify-between items-end border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-3xl font-black text-brand-deep tracking-tight">
              Open <span className="text-brand-teal">Inquiries</span>
            </h1>
            <p className="text-slate-500 mt-2">
              Browse requests and manage your quotes.
            </p>
          </div>
          <button
            onClick={fetchInquiriesAndQuotes}
            className="text-brand-teal hover:text-brand-deep font-semibold text-sm flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal"></div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-20 text-slate-500 bg-white rounded-3xl shadow-sm border border-slate-100">
            No Open Inquiries
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inquiries.map((inquiry) => {
              // මේ inquiry එකට මම Quote කරලා තියෙනවද කියලා බලනවා
              const myExistingQuote = myQuotes.find(
                (q) => q.inquiryId === inquiry.id,
              );

              return (
                <div
                  key={inquiry.id}
                  className={`bg-white rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-all flex flex-col h-full ${myExistingQuote ? "border-brand-teal/50" : "border-slate-100"}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-brand-teal/10 text-brand-teal text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                      {inquiry.category || "General"}
                    </span>
                    {myExistingQuote && (
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Quoted: Rs.{myExistingQuote.price}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-lg text-slate-800 mb-1">
                    {inquiry.vehicle}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-grow">
                    {inquiry.partDescription}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <span className="text-xs font-semibold text-slate-500">
                      From: {inquiry.userName}
                    </span>

                    <button
                      onClick={() => openQuoteModal(inquiry, myExistingQuote)}
                      className={`text-xs font-bold py-2 px-4 rounded-lg transition-colors ${myExistingQuote ? "bg-slate-100 hover:bg-slate-200 text-slate-700" : "bg-brand-deep hover:bg-brand-teal text-white"}`}
                    >
                      {myExistingQuote ? "Edit Quote" : "Send Quote"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quote Modal */}
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-md p-6 md:p-8 shadow-2xl relative">
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

              <h2 className="text-2xl font-black text-brand-deep mb-2">
                {quotePrice ? "Update Quote" : "Submit a Quote"}
              </h2>
              <p className="text-sm text-slate-500 mb-6 border-b border-slate-100 pb-4">
                For:{" "}
                <span className="font-semibold text-slate-700">
                  {selectedInquiry.vehicle}
                </span>
              </p>

              {quoteMessage.text && (
                <div
                  className={`p-3 rounded-xl mb-4 text-xs font-bold ${quoteMessage.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
                >
                  {quoteMessage.text}
                </div>
              )}

              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Your Price (Rs.) *
                  </label>
                  <input
                    type="number"
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(e.target.value)}
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    placeholder="e.g. 15000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Delivery Time (Days) *
                  </label>
                  <input
                    type="number"
                    value={deliveryDays}
                    onChange={(e) => setDeliveryDays(e.target.value)}
                    required
                    min="1"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    placeholder="e.g. 2"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="submit"
                    disabled={submittingQuote}
                    className={`flex-1 bg-brand-teal hover:bg-brand-deep text-white font-bold py-3 rounded-xl transition-all shadow-md ${submittingQuote ? "opacity-70" : ""}`}
                  >
                    {submittingQuote ? "Saving..." : "Save Quote"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
