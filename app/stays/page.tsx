"use client";

import { useState, useMemo } from "react";
import PropertyCard from "@/components/PropertyCard";
import { locations } from "@/data/locations";
import Link from "next/link";
import Image from "next/image";

export default function StaysPage() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "couple" | "mountain"
  >("all");

  const [sortOption, setSortOption] = useState<
    "default" | "low-high" | "high-low"
  >("default");

  const processedProperties = useMemo(() => {
    let allProperties = locations.flatMap((location) => location.properties);

    let filtered = allProperties.filter((stay) => {
      if (activeFilter === "couple") return stay.coupleFriendly;
      if (activeFilter === "mountain") return stay.mountainView;
      return true;
    });

    if (sortOption === "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortOption === "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [activeFilter, sortOption]);

  return (
    <section className="bg-[var(--color-soft)] min-h-screen py-20">
      {/* HERO SECTION */}
      <div className="relative h-[460px] md:h-[420px]">
        <Image
          fill
          priority
          sizes="100vw"
          quality={90}
          src="/images/Hero/stays.webp"
          alt="Mountain view stays"
          className="absolute object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent
          flex flex-col items-center justify-center text-center px-6">
          {/* HERO TEXT */}
          <div className="max-w-2xl text-white mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold mb-3">
              Discover Your Perfect Mountain Stay
            </h1>

            <p className="text-sm md:text-base text-gray-200">
              Cozy village homes, scenic Himalayan viewpoints, and peaceful
              nature escapes. Browse our curated collection of stays designed
              for comfort and unforgettable mountain experiences.
            </p>
          </div>

          {/* EXPLORE BY LOCATION */}
          <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
            {locations.map((location) => (
              <Link
                key={location.slug}
                href={`/stays/${location.slug}`}
                className="bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="h-24">
                  <img
                    src="/images/locations/munsiyari.webp"
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                  {/* <Image
                    src="/images/locations/munsiyari.webp"
                    alt={location.name}
                    fill
                    priority
                    sizes="90vw"
                    quality={90}
                    className="object-cover"
                  /> */}
                </div>
                <div className="p-2 text-center">
                  <h3 className="text-sm font-medium text-[var(--color-primary)]">
                    {location.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {location.properties.length} stays
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6">
        {/* FILTER BAR (OVERLAPPING HERO) */}
        <div className="sticky top-4 z-30 bg-white rounded-xl shadow-xl p-4 -mt-10 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* FILTER BUTTONS */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap flex-1">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer
          ${activeFilter === "all"
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              🏠 All
            </button>

            <button
              onClick={() => setActiveFilter("mountain")}
              className={`px-4 py-2 rounded-full text-sm cursor-pointer font-medium transition
          ${activeFilter === "mountain"
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              🏔 Mountain View
            </button>

            <button
              onClick={() => setActiveFilter("couple")}
              className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition
          ${activeFilter === "couple"
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              💑 Couple Friendly
            </button>

          </div>

          {/* SORT + RESULT COUNT */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {processedProperties.length} stays found
            </span>

            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(
                  e.target.value as "default" | "low-high" | "high-low"
                )
              }
              className="border cursor-pointer border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="default">Sort</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
            </select>
          </div>
        </div>
        {/* PROPERTY GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {processedProperties.length > 0 ? (
            processedProperties.map((stay) => (
              <PropertyCard key={stay.slug} property={stay} />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No stays match this selection.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}