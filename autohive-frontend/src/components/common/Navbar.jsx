"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [newInquiriesCount, setNewInquiriesCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Cart count එක update කරන්න
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((sum, item) => sum + (item.quantity || 0), 0));
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("userName");

    if (token) {
      setIsLoggedIn(true);
      setUserName(name || "User");
      const currentRole = role ? role.toUpperCase() : null;
      setUserRole(currentRole);

      if (currentRole === "SELLER") {
        const fetchNotifications = async () => {
          try {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            const sellerRes = await api.get(`/business/seller/user/${userId}`);
            const exactSellerId = sellerRes.data.sellerId;
            localStorage.setItem("sellerId", exactSellerId);

            const feedRes = await api.get("/inquiries/open-feed");
            const openInquiries = feedRes.data;

            const quotesRes = await api.get(
              `/inquiries/seller-quotes/${exactSellerId}`,
            );
            const myQuotedInquiryIds = quotesRes.data.map((q) => q.inquiryId);

            const unquotedInquiries = openInquiries.filter(
              (inq) => !myQuotedInquiryIds.includes(inq.id),
            );
            setNewInquiriesCount(unquotedInquiries.length);
          } catch (error) {
            console.error("Failed to fetch notifications", error);
          }
        };
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 5000);
        return () => {
          clearInterval(interval);
          window.removeEventListener("cartUpdated", updateCartCount);
          window.removeEventListener("storage", updateCartCount);
        };
      }
    }
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName("");
    setIsDropdownOpen(false);
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-slate-100/50 shadow-sm">
      <div className="container mx-auto px-4 md:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <div className="overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/AutoHive-for-light.png"
              alt="AutoHive Logo"
              width={150}
              height={40}
              className="w-auto h-9 md:h-11 block dark:hidden"
              priority
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-slate-600 hover:text-brand-teal font-semibold transition-colors text-sm uppercase tracking-wider"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-slate-600 hover:text-brand-teal font-semibold transition-colors text-sm uppercase tracking-wider"
          >
            Categories
          </Link>
          {userRole !== "SELLER" && (
            <Link
              href="/post-inquiry"
              className="text-slate-600 hover:text-brand-teal font-semibold transition-colors text-sm uppercase tracking-wider"
            >
              Post Inquiry
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="hidden md:block text-brand-deep hover:text-brand-teal font-bold transition-colors text-sm"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-brand-deep hover:bg-brand-teal text-white font-bold py-2.5 px-6 rounded-full transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-lg active:scale-95 text-sm uppercase tracking-wide"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              <Link
                href="/cart"
                className="relative p-2 text-slate-600 hover:text-brand-teal transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-teal text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {userRole === "SELLER" && (
                <Link
                  href="/inquiries-feed"
                  className="relative p-2 text-slate-400 hover:text-brand-teal transition-colors group"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {newInquiriesCount > 0 && (
                    <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                      {newInquiriesCount}
                    </span>
                  )}
                </Link>
              )}

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 p-1 pr-3 bg-slate-50 border border-slate-100 rounded-full hover:bg-slate-100 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-teal to-brand-deep text-white flex items-center justify-center font-black text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                    {/* Dropdown content (User info, links) */}
                    <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                      <p className="text-sm font-bold text-brand-deep">
                        {userName}
                      </p>
                      <p className="text-xs text-slate-500">{userRole}</p>
                    </div>
                    {/* Links */}
                    <div className="p-2">
                      <Link
                        href={
                          userRole === "SELLER"
                            ? "/seller-dashboard"
                            : "/customer-dashboard"
                        }
                        className="block px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
