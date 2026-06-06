'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get('category') || 'all';
  const priceParam = parseInt(searchParams.get('price') || '5000', 10);

  const [category, setCategory] = useState(categoryParam);
  const [price, setPrice] = useState(priceParam);

  useEffect(() => {
    setCategory(searchParams.get('category') || 'all');
    setPrice(parseInt(searchParams.get('price') || '5000', 10));
  }, [searchParams]);

  const updateFilters = (newCategory, newPrice) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newCategory && newCategory !== 'all') {
      params.set('category', newCategory.toLowerCase());
    } else {
      params.delete('category');
    }

    if (newPrice !== 5000) {
      params.set('price', newPrice.toString());
    } else {
      params.delete('price');
    }

    router.push(`/?${params.toString()}`);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    updateFilters(cat, price);
  };

  const handlePriceSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setPrice(val);
    updateFilters(category, val);
  };

  const handlePriceInputChange = (e) => {
    const val = parseInt(e.target.value, 10) || 0;
    setPrice(val);
    updateFilters(category, val);
  };

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Home', value: 'home' }
  ];

  return (
    <div className="w-full md:w-64 flex flex-col gap-6 flex-shrink-0">
      <div className="bg-brand-primary text-white rounded-xl p-6 shadow-md border border-blue-600">
        <h2 className="text-xl font-bold mb-4 tracking-wide">Filters</h2>
        <div className="mb-6">
          <span className="block text-sm font-semibold mb-3 tracking-wider text-blue-100 uppercase">Category</span>
          <div className="space-y-3">
            {categories.map((cat) => (
              <label key={cat.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category_card1"
                  value={cat.value}
                  checked={category.toLowerCase() === cat.value}
                  onChange={() => handleCategoryChange(cat.value)}
                  className="w-4 h-4 border border-blue-300 rounded-full bg-transparent checked:bg-white checked:border-white focus:outline-none transition-all cursor-pointer accent-blue-900"
                />
                <span className="text-sm font-medium group-hover:text-blue-200 transition-colors">
                  {cat.label}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <span className="block text-sm font-semibold mb-3 tracking-wider text-blue-100 uppercase">Price</span>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={price > 1000 ? 1000 : price}
            onChange={handlePriceSliderChange}
            className="w-full h-1 bg-blue-300 rounded-lg appearance-none cursor-pointer focus:outline-none"
          />
          <div className="flex justify-between text-xs font-semibold mt-2 text-blue-200">
            <span>0</span>
            <span>{price > 1000 ? '1000+' : price}</span>
            <span>1000</span>
          </div>
        </div>
      </div>

      <div className="bg-white text-slate-800 rounded-xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4 text-slate-900 tracking-wide">Cacyroy</h2>
        <div className="mb-6">
          <div className="space-y-3">
            {categories.map((cat) => (
              <label key={cat.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category_card2"
                  value={cat.value}
                  checked={category.toLowerCase() === cat.value}
                  onChange={() => handleCategoryChange(cat.value)}
                  className="w-4 h-4 border border-slate-300 rounded-full checked:bg-brand-primary checked:border-brand-primary focus:ring-brand-primary cursor-pointer accent-brand-primary"
                />
                <span className="text-sm font-medium group-hover:text-slate-600 transition-colors">
                  {cat.label}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <span className="block text-sm font-semibold mb-2 text-slate-700">Price</span>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              min="0"
              max="10000"
              value={price}
              onChange={handlePriceInputChange}
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary sm:text-sm"
            />
            <div className="absolute inset-y-0 right-0 flex flex-col justify-center pr-2 pointer-events-none">
              <span className="text-xs text-slate-400 select-none">USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
