import React, { Suspense } from 'react';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartProvider } from '../context/CartContext';

export const metadata = {
  title: 'Whatbytes E-commerce Store',
  description: 'A premium Next.js e-commerce store with dynamic filtering, search, and client-side cart management.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <CartProvider>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
