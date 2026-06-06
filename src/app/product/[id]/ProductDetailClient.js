'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ChevronLeft, ShoppingCart, Check, Heart, Shield, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../../../context/CartContext';

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const productImages = [
    { src: product.image, label: 'Front View' },
    { src: product.image, label: 'Angle View', style: 'rotate-12 scale-90' },
    { src: product.image, label: 'Close Up', style: 'scale-125' },
  ];

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, quantity);
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    }, 600);
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${
            i <= floorRating
              ? 'text-brand-primary fill-brand-primary'
              : i - rating < 1 && i - rating > 0
              ? 'text-brand-primary fill-brand-primary opacity-50'
              : 'text-slate-300'
          }`}
        />
      );
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  const specifications = {
    Electronics: [
      { name: 'Model Year', value: '2024' },
      { name: 'Connectivity', value: 'Bluetooth 5.2 & Wi-Fi' },
      { name: 'Power Source', value: 'Rechargeable Battery' },
      { name: 'Color', value: 'Midnight Black' },
      { name: 'Warranty', value: '1 Year Warranty' }
    ],
    Clothing: [
      { name: 'Material', value: '100% Cotton' },
      { name: 'Fit Type', value: 'Regular Fit' },
      { name: 'Wash Care', value: 'Machine Wash Cold' },
      { name: 'Available Colors', value: 'Black, Blue, Light Blue' },
      { name: 'Sizes Available', value: 'S, M, L, XL' }
    ],
    Home: [
      { name: 'Material', value: 'Alloy & Plastic' },
      { name: 'Weight', value: '1.2 lbs' },
      { name: 'Dimensions', value: '12" x 6" x 6"' },
      { name: 'Eco-friendly', value: 'Yes' },
      { name: 'Warranty', value: '6 Months Warranty' }
    ]
  };

  const currentSpecs = specifications[product.category] || specifications['Electronics'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Product Listing
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 mb-12">
        <div className="flex flex-col gap-6">
          <div className="relative aspect-square w-full bg-slate-50 rounded-xl p-8 border border-slate-100 flex items-center justify-center overflow-hidden h-[350px] sm:h-[450px]">
            <div className={`relative w-full h-full transition-all duration-300 ${productImages[selectedImageIndex].style || ''}`}>
              <Image
                src={productImages[selectedImageIndex].src}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative h-20 w-20 bg-slate-50 rounded-lg p-2 border-2 transition-all flex items-center justify-center overflow-hidden ${
                  selectedImageIndex === index
                    ? 'border-brand-primary ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`relative w-full h-full ${img.style || ''}`}>
                  <Image
                    src={img.src}
                    alt={`${product.name} - ${img.label}`}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="inline-block bg-blue-50 text-brand-primary text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-blue-100">
              {product.category}
            </span>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-6">
              <span className="text-3xl font-extrabold text-slate-950">${product.price}</span>
              <div className="h-6 w-px bg-slate-200"></div>
              <div className="flex items-center gap-2">
                {renderStars(product.rating)}
                <span className="text-sm text-slate-500 font-medium">
                  {product.rating} ({product.reviewsCount || 100} reviews)
                </span>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6 font-normal">
              {product.description}
            </p>

            <div className="border-t border-slate-200 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Truck className="h-5 w-5 text-brand-primary shrink-0" />
                  <span className="text-sm font-medium">Free Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <RotateCcw className="h-5 w-5 text-brand-primary shrink-0" />
                  <span className="text-sm font-medium">30 Days Returns</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Shield className="h-5 w-5 text-brand-primary shrink-0" />
                  <span className="text-sm font-medium">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-700">Quantity:</span>
              <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 overflow-hidden shadow-sm">
                <button
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="px-3 py-1.5 hover:bg-slate-200 disabled:opacity-50 text-slate-600 font-bold transition-colors text-lg"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-bold text-slate-900 select-none">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="px-3 py-1.5 hover:bg-slate-200 text-slate-600 font-bold transition-colors text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.98] ${
                  addedSuccess
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-brand-primary text-white hover:bg-brand-hover'
                }`}
              >
                {isAdding ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : addedSuccess ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </button>
              
              <button className="p-4 rounded-xl border border-slate-300 hover:border-red-400 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all shadow-sm">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'details'
                ? 'border-brand-primary text-brand-primary bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Product Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'reviews'
                ? 'border-brand-primary text-brand-primary bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Customer Reviews ({product.reviewsCount || 100})
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === 'details' && (
            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Technical Details</h3>
              <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-200">
                {currentSpecs.map((spec, index) => (
                  <div key={index} className="grid grid-cols-3 p-4 text-sm hover:bg-slate-50/50 transition-colors">
                    <span className="font-bold text-slate-500 col-span-1">{spec.name}</span>
                    <span className="text-slate-900 font-medium col-span-2">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100 min-w-[150px]">
                  <span className="text-4xl font-extrabold text-slate-950 block mb-1">
                    {product.rating}
                  </span>
                  <div className="flex justify-center mb-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    Average Rating
                  </span>
                </div>
                
                <div className="flex-1 space-y-2.5 w-full">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const percentages = { 5: 75, 4: 15, 3: 6, 2: 3, 1: 1 };
                    const pct = percentages[stars] || 0;
                    return (
                      <div key={stars} className="flex items-center gap-3 text-sm">
                        <span className="font-bold text-slate-600 w-3">{stars}</span>
                        <Star className="h-4 w-4 text-brand-primary fill-brand-primary" />
                        <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="bg-brand-primary h-full rounded-full"
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-slate-400 w-8 text-right">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-8 divide-y divide-slate-200">
                {[
                  {
                    name: 'Alex Johnson',
                    date: 'June 3, 2026',
                    rating: 5,
                    comment: 'Absolutely exceeded my expectations. Built quality is superior, feels premium and is highly functional. Definitely worth every penny!'
                  },
                  {
                    name: 'Sarah M.',
                    date: 'May 28, 2026',
                    rating: 4,
                    comment: 'Very pleased with my purchase. Shipping was extremely fast and the product works as advertised. Simple and easy-to-use.'
                  }
                ].map((rev, idx) => (
                  <div key={idx} className={`py-6 ${idx === 0 ? 'pt-0' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-slate-900">{rev.name}</h4>
                        <span className="text-xs text-slate-400 font-semibold">{rev.date}</span>
                      </div>
                      {renderStars(rev.rating)}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
