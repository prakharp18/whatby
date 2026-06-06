'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from './Sidebar';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { HelpCircle } from 'lucide-react';

export default function ProductListing() {
  const searchParams = useSearchParams();

  const categoryFilter = searchParams.get('category') || 'all';
  const priceFilter = parseInt(searchParams.get('price') || '5000', 10);
  const searchQuery = searchParams.get('q') || '';

  const filteredProducts = products.filter((product) => {
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      const nameMatch = product.name.toLowerCase().includes(query);
      const descMatch = product.description.toLowerCase().includes(query);
      if (!nameMatch && !descMatch) return false;
    }

    if (categoryFilter.toLowerCase() !== 'all') {
      if (product.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }
    }

    if (product.price > priceFilter) {
      return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 flex-1">
      <Sidebar />

      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Product Listing
          </h1>
          {filteredProducts.length > 0 && (
            <span className="text-sm text-slate-500 font-medium">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
            <HelpCircle className="h-12 w-12 text-slate-300 mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Products Found</h3>
            <p className="text-slate-500 max-w-md text-sm">
              We couldn't find any products matching your current combination of search query, category, and price. Try clearing or relaxing your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
