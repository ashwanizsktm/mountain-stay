"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-br from-[var(--color-primary)] to-[#1f2937] text-white shadow-sm fixed top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">
          Mountain Stays
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          <Link href="/">Home</Link>
          <Link href="/stays">Stays</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/faq">FAQ</Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gradient-to-br from-[var(--color-primary)] to-[#1f2937] text-white shadow-md px-4 pb-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/stays" onClick={() => setOpen(false)}>Stays</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/faq" onClick={() => setOpen(false)}>FAQs</Link>
        </div>
      )}
    </nav>
  );
}