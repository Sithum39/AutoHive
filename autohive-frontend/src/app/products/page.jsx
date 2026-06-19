// src/app/products/page.jsx
"use client";

import { useState, useEffect } from "react";
import api from "@/utils/api";
import Navbar from "@/components/common/Navbar";
import Image from "next/image";
import { addToCart } from "@/utils/cart";

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        api.get("products/all"),
        api.get("categories/all"),
      ]);
      setProducts(prodRes.data);
      setFilteredProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.categoryId === categoryId));
    }
  };

  // Cart එකට දාන කොට User ට Message එකක් පෙන්වන්න
  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to your cart!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-brand-deep">
            Spare Parts Catalog
          </h1>
          <p className="text-slate-500">
            Find the perfect part for your vehicle.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Categories */}
          <aside className="w-full md:w-64 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
              <h3 className="font-bold text-slate-800 mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleFilter("all")}
                  className={`w-full text-left px-4 py-2 rounded-xl font-bold transition-all ${selectedCategory === "all" ? "bg-brand-teal text-white" : "hover:bg-slate-50 text-slate-600"}`}
                >
                  All Parts
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleFilter(cat.id)}
                    className={`w-full text-left px-4 py-2 rounded-xl font-bold transition-all ${selectedCategory === cat.id ? "bg-brand-teal text-white" : "hover:bg-slate-50 text-slate-600"}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <section className="flex-grow">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-teal"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group"
                  >
                    <div className="aspect-square bg-slate-100 rounded-2xl mb-4 overflow-hidden relative">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="px-2">
                      <span className="text-[10px] font-black text-brand-teal uppercase">
                        {product.brand}
                      </span>
                      <h3 className="font-bold text-slate-800 text-lg mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xl font-black text-brand-deep mb-4">
                        Rs. {product.price.toLocaleString()}
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-slate-900 hover:bg-brand-teal text-white font-bold py-3 rounded-xl transition-all active:scale-95"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
