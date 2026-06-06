'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  const isSmartphone = product.name === 'Smartphone';

  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= floorRating
              ? 'text-brand-primary fill-brand-primary'
              : i - rating < 1 && i - rating > 0
              ? 'text-brand-primary fill-brand-primary opacity-50'
              : 'text-slate-300'
          }`}
        />
      );
    }
    return <div className="flex items-center gap-0.5">{stars}</div>;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  if (isSmartphone) {
    return (
      <Link 
        href={`/product/${product.id}`}
        className="col-span-1 md:col-span-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200/80 p-6 flex flex-col sm:flex-row items-center gap-6 group"
      >
        <div className="w-full sm:w-1/3 flex items-center justify-center bg-slate-50 rounded-lg p-4 h-64 relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>

        <div className="flex-1 flex flex-col justify-between h-full w-full">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-bold text-slate-950 group-hover:text-brand-primary transition-colors">
                {product.name}
              </h3>
              <span className="text-2xl font-bold text-slate-900">${product.price}</span>
            </div>

            <div className="mb-4">
              {renderStars(product.rating)}
            </div>

            <p className="text-slate-500 text-sm mb-4 leading-relaxed font-normal">
              {product.description}
            </p>

            <div className="text-sm mb-4">
              <span className="text-slate-400 block mb-0.5">Category</span>
              <span className="font-semibold text-brand-primary uppercase text-xs tracking-wider">
                {product.category}
              </span>
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <button
              onClick={handleAddToCart}
              className="bg-brand-primary hover:bg-brand-hover text-white px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all transform active:scale-95 shadow-sm hover:shadow"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200/80 p-5 flex flex-col justify-between group"
    >
      <div>
        <div className="relative aspect-square w-full bg-slate-50 rounded-lg p-4 mb-4 flex items-center justify-center overflow-hidden h-48">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-primary transition-colors mb-1 truncate">
            {product.name}
          </h3>
          <span className="text-lg font-bold text-slate-950">${product.price}</span>
        </div>
      </div>

      <div>
        <button
          onClick={handleAddToCart}
          className="bg-brand-primary hover:bg-brand-hover text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-sm w-max"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
