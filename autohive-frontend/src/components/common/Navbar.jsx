"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    "All Categories",
    "Engine Parts",
    "Body Parts",
    "Accessories",
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Parts", path: "/browse-parts" },
    { name: "Inquiry", path: "/inquiry" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full font-sans shadow-md relative z-50">
      {/* Top Section - Brand Deep */}
      <div className="bg-brand-deep w-full py-4 relative z-20">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4 md:gap-8">
          {/* Logo Area (Left) */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/AutoHive-for-dark.png"
              alt="AutoHive Logo"
              width={200}
              height={50}
              className="object-contain w-auto h-7 md:h-10"
              priority
            />
          </Link>

          {/* Search Bar - Premium Redesign */}
          <div className="flex-1 max-w-3xl hidden md:flex">
            <div className="flex w-full bg-white rounded-full h-12 items-center shadow-inner relative">
              {/* SATISFYING CATEGORY MENU */}
              <div className="relative h-full flex-shrink-0" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center justify-between w-40 md:w-48 bg-transparent px-5 h-full text-sm font-medium text-slate-700 hover:text-brand-teal transition-colors rounded-l-full focus:outline-none"
                >
                  <span className="truncate mr-2 select-none">
                    {selectedCategory}
                  </span>
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isCategoryOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Vertical Divider */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-[1px] bg-slate-200 pointer-events-none"></div>

                {/* Premium Dropdown List */}
                {isCategoryOpen && (
                  <div className="absolute top-[calc(100%+8px)] left-0 z-50 w-56 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-slate-100 overflow-hidden py-1.5 transition-all animate-in fade-in slide-in-from-top-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsCategoryOpen(false);
                        }}
                        className={`w-full text-left px-5 py-2.5 text-sm transition-colors flex items-center justify-between ${
                          selectedCategory === category
                            ? "bg-slate-50 text-brand-teal font-semibold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-brand-deep"
                        }`}
                      >
                        {category}
                        {/* Checkmark for active item */}
                        {selectedCategory === category && (
                          <svg
                            className="w-4 h-4 text-brand-teal flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search here..."
                className="flex-1 h-full px-5 text-slate-800 focus:outline-none text-sm placeholder-slate-400"
              />

              {/* Search Button */}
              <button className="bg-brand-teal hover:bg-[#00b388] text-brand-deep font-bold px-8 h-full transition-colors rounded-r-full">
                Search
              </button>
            </div>
          </div>

          {/* User, Favorites, Cart & Hamburger Actions (Right) */}
          <div className="flex items-center gap-2 md:gap-3 text-brand-teal flex-shrink-0">
            <button className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            <Link
              href="/favorites"
              className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 relative">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
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
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-teal text-[10px] font-bold text-brand-deep md:hidden">
                  0
                </span>
              </div>
              <div className="hidden lg:block text-sm">
                <p className="text-slate-300 text-xs tracking-wide">
                  Shopping Cart
                </p>
                <p className="font-bold text-brand-teal">0 PRODUCTS</p>
              </div>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors ml-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-deep border-t border-white/10 z-10 shadow-lg">
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-3 text-brand-teal font-bold text-sm uppercase hover:bg-white/5 transition-colors tracking-wider"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom Navigation Section - Desktop Only */}
      <nav className="hidden md:block bg-brand-teal w-full border-t border-[#00b388]">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-6 md:gap-10 py-3 overflow-x-auto whitespace-nowrap hide-scrollbar">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="flex items-center gap-1 text-brand-deep font-bold text-[13px] md:text-sm uppercase hover:opacity-70 transition-opacity tracking-wider"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
