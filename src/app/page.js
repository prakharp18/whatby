import React, { Suspense } from 'react';
import ProductListing from '../components/ProductListing';

export const metadata = {
  title: 'Product Listing | Whatbytes Store',
  description: 'Find the best electronics, clothing, and home products with our smart search and filter controls.',
};

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-slate-200 border-t-brand-primary animate-spin"></div>
          </div>
        </div>
      }
    >
      <ProductListing />
    </Suspense>
  );
}
