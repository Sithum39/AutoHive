"use client";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Parts", path: "/browse-parts" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact Us", path: "/contact-us" },
    { name: "Inquiry", path: "/inquiry" },
  ];

  const categories = [
    { name: "Engine Parts", path: "/browse-parts?category=engine-parts" },
    { name: "Body Parts", path: "/browse-parts?category=body-parts" },
    { name: "Accessories", path: "/browse-parts?category=accessories" },
    { name: "Filters", path: "/browse-parts?category=filters" },
    { name: "Tyres & Wheels", path: "/browse-parts?category=tyres" },
  ];

  const customerSupport = [
    { name: "Shipping & Delivery", path: "/shipping" },
    { name: "Returns & Refunds", path: "/returns" },
    { name: "FAQ", path: "/faq" },
    { name: "Track Order", path: "/track-order" },
    { name: "Privacy Policy", path: "/privacy-policy" },
  ];

  return (
    <footer className="w-full bg-brand-deep border-t-4 border-brand-teal font-sans pt-12 md:pt-16">
      {/* --- TOP SECTION: NEWSLETTER --- */}
      <div className="container mx-auto px-4 pb-12 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">
              Join the <span className="text-brand-teal">AutoHive</span>{" "}
              Community
            </h3>
            <p className="text-slate-300 text-sm md:text-base">
              Subscribe to our newsletter and get 10% off your first order, plus
              exclusive access to new parts and tuning guides.
            </p>
          </div>
          <form
            className="w-full md:w-auto flex-1 max-w-md flex relative"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              className="w-full bg-white rounded-full h-12 md:h-14 pl-6 pr-32 text-slate-800 focus:outline-none placeholder-slate-400"
              required
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 bg-brand-teal hover:bg-[#00b388] text-brand-deep font-bold px-6 rounded-full transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* --- MAIN FOOTER LINKS --- */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 text-center md:text-left">
          {/* Column 1: Brand & Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left pr-0 md:pr-10">
            <Link href="/" className="mb-6 inline-block">
              <Image
                src="/AutoHive-for-dark.png"
                alt="AutoHive Logo"
                width={180}
                height={45}
                className="object-contain w-auto h-8 md:h-10"
              />
            </Link>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Your ultimate destination for premium automotive parts,
              accessories, and tuning upgrades. Unleash your ride's true
              potential today.
            </p>
            <ul className="flex flex-col gap-3 text-sm text-slate-300 items-center md:items-start">
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <svg
                  className="w-5 h-5 text-brand-teal flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>123 Performance Way, Motor City, UK</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <svg
                  className="w-5 h-5 text-brand-teal flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:support@autohive.com"
                  className="hover:text-brand-teal transition-colors"
                >
                  support@autohive.com
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <svg
                  className="w-5 h-5 text-brand-teal flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+44123456789"
                  className="hover:text-brand-teal transition-colors"
                >
                  +44 (0) 123 456 789
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 items-center md:items-start">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-slate-300 text-sm hover:text-brand-teal transition-all duration-200 hover:translate-x-1 inline-block flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal/50"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
              Top Categories
            </h4>
            <ul className="flex flex-col gap-3 items-center md:items-start">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.path}
                    className="text-slate-300 text-sm hover:text-brand-teal transition-all duration-200 hover:translate-x-1 inline-block flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal/50"></span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Customer Support */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
              Customer Support
            </h4>
            <ul className="flex flex-col gap-3 items-center md:items-start">
              {customerSupport.map((support) => (
                <li key={support.name}>
                  <Link
                    href={support.path}
                    className="text-slate-300 text-sm hover:text-brand-teal transition-all duration-200 hover:translate-x-1 inline-block flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal/50"></span>
                    {support.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- BOTTOM BAR: COPYRIGHT & SOCIALS --- */}
      <div className="bg-black/20 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-slate-400 text-xs md:text-sm text-center md:text-left">
            &copy; {currentYear} AutoHive. All rights reserved. Designed by
            Autoparts.
          </p>

          
         

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-brand-teal hover:text-brand-deep transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-brand-teal hover:text-brand-deep transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-brand-teal hover:text-brand-deep transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
