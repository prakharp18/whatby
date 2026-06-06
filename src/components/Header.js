'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShoppingCart, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { totalItemsCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchQuery(q);
    } else {
      setSearchQuery('');
    }
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }
    router.push(`/?${params.toString()}`);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val.trim()) {
      params.set('q', val.trim());
    } else {
      params.delete('q');
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <header className="bg-brand-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl sm:text-3xl font-bold tracking-tight hover:opacity-90 transition-opacity">
            Logo
          </Link>
        </div>

        <div className="flex-1 max-w-lg mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-blue-200" />
            </div>
            <input
              type="text"
              name="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for products..."
              className="block w-full pl-10 pr-3 py-2 border border-blue-400 rounded-md leading-5 bg-[#094095] text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-white sm:text-sm transition-all"
            />
          </form>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="flex items-center gap-2 bg-[#072146] hover:bg-brand-dark px-4 py-2 rounded-md font-medium text-sm transition-all border border-blue-900 shadow-sm relative group"
          >
            <ShoppingCart className="h-5 w-5 group-hover:scale-105 transition-transform" />
            <span className="hidden sm:inline">Cart</span>
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full text-xs font-bold w-5 h-5 flex items-center justify-center animate-pulse border border-white">
                {totalItemsCount}
              </span>
            )}
          </Link>

          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-brand-primary border-2 border-white cursor-pointer hover:bg-white hover:text-brand-hover transition-all shadow-sm">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
