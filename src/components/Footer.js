'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold tracking-wider text-slate-300">Filters</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/?category=all" className="hover:text-white transition-colors">
                All
              </Link>
            </li>
            <li>
              <Link href="/?category=electronics" className="hover:text-white transition-colors">
                elex-ronk
              </Link>
            </li>
          </ul>
          <p className="text-sm text-slate-400 mt-4">
            © 2024 American
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold tracking-wider text-slate-300">About Us</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold tracking-wider text-slate-300">Follow Us</h3>
          <div className="flex items-center gap-3 mt-1">
            <a
              href="#"
              aria-label="Facebook"
              className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-all transform hover:scale-105"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="h-10 w-10 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center text-white transition-all transform hover:scale-105"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="h-10 w-10 rounded-full bg-gradient-to-tr from-yellow-500 to-purple-600 hover:opacity-90 flex items-center justify-center text-white transition-all transform hover:scale-105"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
