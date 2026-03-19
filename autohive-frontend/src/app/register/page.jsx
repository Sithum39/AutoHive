// src/app/register/page.jsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Register() {
  const [isSeller, setIsSeller] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      
      {/* Left Side: Branding & Value Prop (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-brand-deep text-white flex-col justify-center items-center p-12 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none"></div>
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-lg text-center relative z-10">
          <Link href="/">
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
             <div  className="flex-shrink-0 flex justify-center items-center">
            <Image
              src="/AutoHive-for-dark.png"
              alt="AutoHive Logo"
              width={300}
              height={50}
              priority
            />
          </div>
              
            </h1>
          </Link>
          <p className="text-xl text-slate-300 mb-8">
            Join the ultimate vehicle spare parts marketplace.
          </p>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-left backdrop-blur-sm">
            <ul className="space-y-4 text-slate-200">
              <li className="flex items-center">
                <span className="text-brand-teal mr-3 font-bold">✓</span> Find genuine parts instantly
              </li>
              <li className="flex items-center">
                <span className="text-brand-teal mr-3 font-bold">✓</span> Compare quotes from top vendors
              </li>
              <li className="flex items-center">
                <span className="text-brand-teal mr-3 font-bold">✓</span> Manage your fleet seamlessly
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Side: Interactive Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-slate-100">
          
          <h2 className="text-3xl font-bold text-brand-deep text-center mb-6 tracking-tight">
            {isSeller ? 'Register your Business' : 'Create an Account'}
          </h2>

          {/* User Type Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
            <button
              onClick={() => setIsSeller(false)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                !isSeller ? 'bg-white shadow-sm text-brand-deep' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => setIsSeller(true)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                isSeller ? 'bg-white shadow-sm text-brand-deep' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Seller 
            </button>
          </div>

          {/* Registration Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {!isSeller ? (
              /* --- CUSTOMER--- */
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all text-sm" placeholder="John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all text-sm" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input type="tel" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all text-sm" placeholder="+1 234 567 890" />
                  </div>
                </div>
              </>
            ) : (
              /* --- SELLER  */
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all text-sm" placeholder="Auto Parts Co." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all text-sm" placeholder="Jane Smith" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Business Email</label>
                    <input type="email" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all text-sm" placeholder="contact@shop.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Business Phone</label>
                    <input type="tel" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all text-sm" placeholder="+1 234 567 890" />
                  </div>
                </div>

                {/* KYC Upload Zone */}
                <div className="mt-4 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                  <svg className="mx-auto h-10 w-10 text-slate-400 group-hover:text-brand-teal transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="mt-2 text-sm text-slate-600">
                    <span className="font-semibold text-brand-teal">Upload KYC Docs</span> or drag and drop
                  </div>
                  <p className="text-xs text-slate-500 mt-1">PDF, PNG, JPG up to 10MB</p>
                </div>
              </>
            )}

            {/* Common Password Fields */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input type="password" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all text-sm" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                <input type="password" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal outline-none transition-all text-sm" placeholder="••••••••" />
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-brand-teal hover:bg-[#00b388] text-brand-deep font-bold py-3 rounded-xl transition-all mt-6 shadow-md hover:shadow-lg active:scale-[0.98]">
              {isSeller ? 'Submit for Approval' : 'Create Account'}
            </button>
            
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Already have an account? <Link href="/login" className="font-bold text-brand-deep hover:text-brand-teal transition-colors">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}