"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

type ImageType = {
  src: string;
  blurDataURL?: string;
};

export default function PropertyGallery({ images }: { images: ImageType[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = () =>
    setActiveIndex((prev) => (prev + 1) % images.length);

  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  /* Keyboard */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  /* Swipe */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (diff > 50) next();
    if (diff < -50) prev();

    touchStartX.current = null;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-20 md:pt-6">
      {/* 📱 MOBILE (Airbnb-style slider with peek) */}
      <div
        className="md:hidden relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${activeIndex * 85}%)`,
            }}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="min-w-[85%] mr-2 relative h-[320px] rounded-xl overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={`Image ${i}`}
                  fill
                  className="object-cover"
                  sizes="85vw"
                  priority={i === 0}
                  onClick={() => {
                    setActiveIndex(i);
                    setLightbox(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Top Right Counter (Airbnb style) */}
        <div className="absolute top-3 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* 💻 DESKTOP GRID */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[460px] rounded-xl overflow-hidden relative">
        {/* BIG IMAGE */}
        <div className="col-span-2 row-span-2 relative group">
          <Image
            src={images[0]?.src}
            alt="Main Image"
            fill
            priority
            className="object-cover cursor-pointer group-hover:brightness-95 transition"
            sizes="50vw"
            onClick={() => {
              setActiveIndex(0);
              setLightbox(true);
            }}
          />
        </div>

        {/* SIDE IMAGES */}
        {images.slice(1, 5).map((img, i) => (
          <div key={i} className="relative group">
            <Image
              src={img.src}
              alt={`Image ${i}`}
              fill
              className="object-cover cursor-pointer group-hover:brightness-95 transition"
              sizes="25vw"
              onClick={() => {
                setActiveIndex(i + 1);
                setLightbox(true);
              }}
            />
          </div>
        ))}

        {/* Airbnb Grid Icon Button */}
        <button
          onClick={() => setLightbox(true)}
          className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow hover:shadow-md transition flex items-center gap-2"
        >
          {/* Grid Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </button>
      </div>

      {/* 🔍 LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black z-50 flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center p-4 text-white">
            <span>{activeIndex + 1} / {images.length}</span>
            <button onClick={() => setLightbox(false)}>✕</button>
          </div>

          {/* IMAGE */}
          <div className="flex-1 flex items-center justify-center relative">
            <button
              onClick={prev}
              className="absolute left-6 text-white text-4xl"
            >
              ‹
            </button>

            <div className="relative w-[90vw] h-[80vh]">
              <Image
                src={images[activeIndex].src}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>

            <button
              onClick={next}
              className="absolute right-6 text-white text-4xl"
            >
              ›
            </button>
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-2 overflow-x-auto p-4 bg-black">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden cursor-pointer ${
                  activeIndex === i ? "ring-2 ring-white" : "opacity-60"
                }`}
              >
                <Image
                  src={img.src}
                  alt={`Thumb ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}