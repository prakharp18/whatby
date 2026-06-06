'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, totalAmount, totalItemsCount } = useCart();

  const shipping = totalAmount > 200 || totalAmount === 0 ? 0 : 15;
  const tax = Math.round(totalAmount * 0.08);
  const orderTotal = totalAmount + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex flex-col">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex-1 bg-white rounded-2xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="h-16 w-16 bg-blue-50 text-brand-primary rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 mb-8 max-w-sm">
            Looks like you haven't added anything to your cart yet. Head back to the store to check out our products.
          </p>
          <Link
            href="/"
            className="bg-brand-primary hover:bg-brand-hover text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-98"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-sm"
              >
                <div className="relative h-24 w-24 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-2 flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-contain p-1"
                  />
                </div>

                <div className="flex-1 w-full text-center sm:text-left">
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5 truncate">{item.name}</h3>
                  <span className="text-base font-extrabold text-slate-950 block mt-1">
                    ${item.price}
                  </span>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1.5 hover:bg-slate-200 text-slate-500 font-bold transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1.5 hover:bg-slate-200 text-slate-500 font-bold transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded-lg transition-all"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Order Summary</h2>

            <div className="divide-y divide-slate-100 text-sm space-y-4">
              <div className="flex justify-between font-medium text-slate-600 pb-4">
                <span>Subtotal ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})</span>
                <span className="font-semibold text-slate-900">${totalAmount}</span>
              </div>

              <div className="flex justify-between font-medium text-slate-600 py-4">
                <span>Shipping</span>
                <span className="font-semibold text-slate-900">
                  {shipping === 0 ? 'Free' : `$${shipping}`}
                </span>
              </div>

              <div className="flex justify-between font-medium text-slate-600 py-4">
                <span>Estimated Tax</span>
                <span className="font-semibold text-slate-900">${tax}</span>
              </div>

              <div className="flex justify-between text-base font-bold text-slate-900 pt-4">
                <span>Order Total</span>
                <span className="text-lg font-extrabold text-slate-950">${orderTotal}</span>
              </div>
            </div>

            <button className="w-full bg-brand-primary hover:bg-brand-hover text-white py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98">
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
