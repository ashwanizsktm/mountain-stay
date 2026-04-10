"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative top-8 z-10 text-center px-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
          Handpicked Homestays in <br />
          <span className="text-[var(--color-accent)]">
            Munsiyari
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Wake up to breathtaking Panchachuli views, peaceful mornings,
          and authentic mountain hospitality.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/stays"
            className="px-8 py-3 bg-[var(--color-accent)] text-black font-medium rounded-md hover:opacity-90 transition"
          >
            Explore Stays
          </Link>

          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            className="px-8 py-3 border border-white rounded-md hover:bg-white hover:text-black transition"
          >
            Book on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}