"use client";

import { useState, useMemo } from "react";
import PropertyCard from "@/components/PropertyCard";
import { locations } from "@/data/locations";
import Link from "next/link";
import Image from "next/image";

export default function StaysPageClient() {
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
    <section className="bg-[var(--color-soft)] min-h-screen py-10">
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
                </div>

                <div className="p-3 text-center">
                  <p className="text-sm font-medium text-gray-800">
                    {location.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER & SORT */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* FILTER */}
          <div className="flex gap-2 flex-wrap">
            {(["all", "couple", "mountain"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeFilter === filter
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-white text-gray-800 border border-gray-300 hover:border-[var(--color-primary)]"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* SORT */}
          <select
            value={sortOption}
            onChange={(e) =>
              setSortOption(e.target.value as "default" | "low-high" | "high-low")
            }
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="default">Sort by default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* PROPERTIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {processedProperties.map((property) => (
            <PropertyCard
              key={property.slug}
              property={property}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
