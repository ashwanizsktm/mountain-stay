"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "lucide-react";

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

  const remainingCount = images.length - 5;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6">
      {/* 📱 MOBILE HYBRID (Carousel + Grid) */}
      <div className="md:hidden mt-4 space-y-3">

        {/* 🔄 CAROUSEL */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-[380px] rounded-xl overflow-hidden">
            <Image
              src={images[activeIndex].src}
              alt="Property Image"
              fill
              priority={activeIndex === 0}
              className="object-cover"
              sizes="100vw"
              onClick={() => setLightbox(true)}
            />
          </div>

          {/* Counter */}
          <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Dots */}
          <div className="absolute bottom-3 w-full flex justify-center gap-1">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${activeIndex === i ? "w-4 bg-white" : "w-2 bg-white/50"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* 🧱 GRID BELOW */}
        <div className="grid grid-cols-2 gap-2">
          {images.slice(1, 5).map((img, i) => {
            const isLast = i === 3;
            const remainingCount = images.length - 5;

            return (
              <div
                key={i}
                className="relative h-[120px] rounded-xl overflow-hidden"
                onClick={() => {
                  setActiveIndex(i + 1);
                  setLightbox(true);
                }}
              >
                <Image
                  src={img.src}
                  alt={`Image ${i}`}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                {/* +COUNT OVERLAY */}
                {isLast && remainingCount > 0 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-semibold">
                    +{remainingCount}
                  </div>
                )}
                {/* GRID ICON */}
                {isLast && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox(true);
                    }}
                    className="absolute bottom-2 right-2 bg-white/90 backdrop-blur p-2 rounded-lg shadow hover:scale-105 transition"
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* 💻 DESKTOP */}
      <div className="hidden mt-3 md:grid grid-cols-4 grid-rows-2 gap-2 h-[460px] rounded-xl overflow-hidden">
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
        {images.slice(1, 5).map((img, i) => {
          const isLast = i === 3;

          return (
            <div
              key={i}
              className="relative group"
              onClick={() => {
                setActiveIndex(i + 1);
                setLightbox(true);
              }}
            >
              <Image
                src={img.src}
                alt={`Image ${i}`}
                fill
                className="object-cover cursor-pointer group-hover:brightness-95 transition"
                sizes="25vw"
              />

              {/* +COUNT OVERLAY */}
              {isLast && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-semibold">
                  +{remainingCount}
                </div>
              )}

              {/* GRID ICON */}
              {isLast && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox(true);
                  }}
                  className="absolute cursor-pointer bottom-3 right-3 bg-white p-2 rounded-lg shadow hover:scale-105 transition"
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* 🔍 LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black z-50 flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex justify-between items-center  p-4 text-white">
            <span>{activeIndex + 1} / {images.length}</span>
            <button className="cursor-pointer" onClick={() => setLightbox(false)}>✕</button>
          </div>

          <div className="flex-1 flex items-center justify-center relative">
            <button onClick={prev} className="absolute hidden md:block cursor-pointer left-6 text-white text-4xl">
              ‹
            </button>
            <div className="relative w-[96vw] h-[75vh]">
              <Image
                src={images[activeIndex].src}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>

            <button onClick={next} className="absolute hidden md:block cursor-pointer right-6 text-white text-4xl">
              ›
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto p-4 bg-black">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden cursor-pointer ${activeIndex === i ? "ring-2 ring-white" : "opacity-60"
                  }`}
              >
                <Image src={img.src} alt={`Thumb ${i}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}