"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// --- COMBINED DATA FOR CAROUSEL ---
// This syncs the background image, main text, and the bottom-right offer block
const heroSlides = [
  {
    id: 1,
    image: "/hero-car-1.jpg",
    title: "ACCESSORIZE YOUR DRIVE",
    subtitle:
      "Discover the perfect add-ons for style, comfort, and functionality.",
    ctaText: "BROWS PARTS",
    ctaLink: "/browse-parts?category=accessories",
    offerTop: "20%",
    offerBottom: "OFF",
    offerDesc:
      "On all Engine Parts. Limited time offer! Upgrade your ride today.",
    offerLink: "/browse-parts?category=engine-parts&discount=20",
  },
  {
    id: 2,
    image: "/hero-car-2.jpg",
    title: "UNLEASH YOUR POTENTIAL",
    subtitle:
      "Upgrade with premium performance parts for the ultimate experience.",
    ctaText: "NEW ARRIVALS",
    ctaLink: "/browse-parts?category=performance",
    offerTop: "SHOP",
    offerBottom: "& SAVE",
    offerDesc: "Free UK Delivery On Orders Over £150. Shop now and save.",
    offerLink: "/browse-parts",
  },
  {
    id: 3,
    image: "/hero-car-3.jpg",
    title: "KEEP IT RUNNING SMOOTH",
    subtitle: "Find essential maintenance parts and kits at unbeatable prices.",
    ctaText: "NEW ENQUIRY",
    ctaLink: "/browse-parts?category=maintenance",
    offerTop: "50%",
    offerBottom: "OFF",
    offerDesc: "Buy 1 Get 1 50% Off on select filters and motor oils.",
    offerLink: "/browse-parts?category=filters",
  },
];

// --- DATA FOR CATEGORY ICONS ---
const categories = [
  {
    name: "Engine Parts",
    icon: (
      <svg
        className="w-6 h-6 md:w-8 md:h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    name: "Body Parts",
    icon: (
      <svg
        className="w-6 h-6 md:w-8 md:h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
        />
      </svg>
    ),
  },
  {
    name: "Accessories",
    icon: (
      <svg
        className="w-6 h-6 md:w-8 md:h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    ),
  },
  {
    name: "Filters",
    icon: (
      <svg
        className="w-6 h-6 md:w-8 md:h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
    ),
  },
  {
    name: "Batteries",
    icon: (
      <svg
        className="w-6 h-6 md:w-8 md:h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    name: "Tyres",
    icon: (
      <svg
        className="w-6 h-6 md:w-8 md:h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    name: "Motor Oils",
    icon: (
      <svg
        className="w-6 h-6 md:w-8 md:h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    name: "Services",
    icon: (
      <svg
        className="w-6 h-6 md:w-8 md:h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);
  const SLIDE_DURATION = 6000; // 6 seconds per slide

  useEffect(() => {
    startSlideTimer();
    return () => stopSlideTimer();
  }, []);

  const startSlideTimer = () => {
    stopSlideTimer();
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);
  };

  const stopSlideTimer = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    startSlideTimer();
  };

  return (
    <section className="relative w-full h-[calc(100vh-125px)] min-h-[650px] bg-brand-deep overflow-hidden flex flex-col justify-between">
      {/* --- BACKGROUND CAROUSEL --- */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        >
          {/* Gradients: Left side for main text readability, Bottom side for dock readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/80 via-brand-deep/30 to-transparent z-10"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-deep via-brand-deep/60 to-transparent z-10 pointer-events-none"></div>

          <Image
            src={slide.image}
            alt="Hero Background"
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* --- MAIN HERO TEXT (Centered Vertically) --- */}
      <div className="relative z-20 flex-1 flex flex-col justify-center items-start container mx-auto px-4 md:px-12 pl-4 md:pl-16 pt-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg max-w-4xl uppercase">
          <span className="text-brand-teal">
            {heroSlides[currentSlide].title.split(" ")[0]}
          </span>{" "}
          {heroSlides[currentSlide].title.split(" ").slice(1).join(" ")}
        </h1>
        <p className="text-lg md:text-2xl text-slate-200 mb-8 max-w-xl drop-shadow-md">
          {heroSlides[currentSlide].subtitle}
        </p>
        <Link
          href={heroSlides[currentSlide].ctaLink}
          className="bg-brand-teal text-brand-deep hover:bg-[#00b388] py-3 px-8 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,208,158,0.3)]"
        >
          {heroSlides[currentSlide].ctaText}
        </Link>
      </div>

      {/* --- BOTTOM FLOATING DOCK (Categories & Offers) --- */}
      <div className="relative z-30 w-full container mx-auto px-4 md:px-12 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-8">
        {/* Left Side: Circular Categories with Text underneath */}
        <div className="flex items-center gap-3 md:gap-4 overflow-x-auto hide-scrollbar max-w-full lg:max-w-[55%] pb-2 lg:pb-0 pt-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/browse-parts?category=${category.name.toLowerCase().replace(" ", "-")}`}
              className="flex flex-col items-center flex-shrink-0 group cursor-pointer w-16 md:w-20"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/30 text-brand-teal flex items-center justify-center mb-3 transition-all duration-300 group-hover:bg-brand-teal group-hover:border-brand-teal group-hover:text-brand-deep group-hover:-translate-y-1 backdrop-blur-sm bg-white/5 shadow-lg">
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {category.icon}
                </div>
              </div>
              <span className="text-slate-200 text-xs md:text-sm font-medium text-center transition-colors group-hover:text-brand-teal leading-tight drop-shadow-md">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Side: Animated Offer Block & Sync'd Progress Bars */}
        <div className="flex flex-col items-start lg:items-end w-full lg:w-[40%] xl:w-auto">
          {/* Offer Content */}
          <div className="flex items-center gap-4 md:gap-6 mb-4">
            {/* Offer Bold Text (Stacked) */}
            <div className="flex flex-col text-right text-brand-teal font-black text-3xl md:text-5xl leading-[0.9] tracking-tighter drop-shadow-md">
              <span>{heroSlides[currentSlide].offerTop}</span>
              <span>{heroSlides[currentSlide].offerBottom}</span>
            </div>

            {/* Offer Description */}
            <p className="text-slate-200 text-sm md:text-base max-w-[180px] md:max-w-[220px] leading-snug drop-shadow-md">
              {heroSlides[currentSlide].offerDesc}
            </p>

            {/* Circular Arrow Button */}
            <Link
              href={heroSlides[currentSlide].offerLink}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white flex items-center justify-center text-white hover:bg-brand-teal hover:border-brand-teal hover:text-brand-deep transition-all duration-300 flex-shrink-0 group shadow-lg backdrop-blur-sm bg-white/5"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 19L19 5M19 5v10M19 5H9"
                />
              </svg>
            </Link>
          </div>

          {/* Line Progress Bars (Replaces dots, acts as carousel control) */}
          <div className="flex gap-2 w-full max-w-sm lg:max-w-md ml-auto">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className="relative h-1 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:bg-white/40 transition-colors"
                aria-label={`Go to slide ${index + 1}`}
              >
                {/* Active filling animation */}
                <div
                  className="absolute top-0 left-0 h-full bg-white"
                  style={{
                    width:
                      index === currentSlide
                        ? "100%"
                        : index < currentSlide
                          ? "100%"
                          : "0%",
                    transition:
                      index === currentSlide
                        ? `width ${SLIDE_DURATION}ms linear`
                        : "none",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
