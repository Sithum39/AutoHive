"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/utils/api";

export default function TrendingParts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Backend එකේ product search endpoint එකට empty keyword එකක් යවලා ඔක්කොම products ගන්නවා
        const response = await api.get("/business/product/search?keyword=");
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold bg-slate-50">
        {error}
      </div>
    );
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-brand-deep uppercase tracking-tight">
              Trending <span className="text-brand-teal">Parts</span>
            </h2>
            <p className="text-slate-500 mt-2">
              Explore our latest automotive parts and accessories added by
              verified sellers.
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 text-slate-500 bg-white rounded-2xl shadow-sm border border-slate-100">
            No products found right now. Sellers are yet to add products.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="aspect-square relative mb-4 bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <svg
                      className="w-16 h-16 text-slate-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-brand-teal uppercase tracking-wider">
                    {product.categoryName || "General"}
                  </p>
                  <h3 className="font-bold text-brand-deep text-lg leading-tight group-hover:text-brand-teal transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    By: {product.sellerBusinessName}
                  </p>
                  <p className="text-xs text-slate-400">
                    Brand: {product.brand || "N/A"}
                  </p>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                    <span className="font-black text-xl text-brand-deep">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded-md text-slate-600">
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
