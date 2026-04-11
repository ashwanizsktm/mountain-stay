"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "lucide-react";

type ImageType = {
  src: string;
  blurDataURL?: string; // optional for blur placeholder
};

export default function PropertyGallery({ images }: { images: ImageType[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = () =>
    setActiveIndex((prev) => (prev + 1) % images.length);

  const prev = () =>
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  /* Keyboard navigation */
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
    <div className="max-w-6xl mx-auto px-4 pt-6">

      {/* 📱 MOBILE CAROUSEL */}
      <div
        className="md:hidden relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative mt-3 w-full h-[300px] rounded-xl overflow-hidden">
          <Image
            src={images[activeIndex].src}
            alt="Property Image"
            fill
            priority={activeIndex === 0}
            placeholder={images[activeIndex].blurDataURL ? "blur" : "empty"}
            blurDataURL={images[activeIndex].blurDataURL}
            className="object-cover"
            sizes="100vw"
            onClick={() => setLightbox(true)}
          />
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 w-full flex justify-center gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                activeIndex === i ? "w-4 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
      {/* 💻 DESKTOP GRID */}
      <div className="hidden mt-3 md:grid grid-cols-4 grid-rows-2 gap-2 h-[460px] rounded-xl overflow-hidden relative">

        {/* BIG IMAGE */}
        <div className="col-span-2 row-span-2 relative group">
          <Image
            src={images[0]?.src}
            alt="Main Image"
            fill
            priority
            className="object-cover cursor-pointer transition duration-300 group-hover:brightness-95"
            sizes="(min-width: 768px) 50vw"
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
              className="object-cover cursor-pointer transition duration-300 group-hover:brightness-95"
              sizes="(min-width: 768px) 25vw"
              onClick={() => {
                setActiveIndex(i + 1);
                setLightbox(true);
              }}
            />
          </div>
        ))}

        {/* SHOW ALL BUTTON */}
        <button
          onClick={() => setLightbox(true)}
          className="absolute cursor-pointer bottom-4 right-4 bg-white text-sm font-medium px-4 py-2 rounded-lg shadow hover:shadow-md transition"
        >
          <LayoutGrid />
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
            <span className="text-sm">
              {activeIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => setLightbox(false)}
              className="text-2xl cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* IMAGE VIEW */}
          <div className="flex-1 flex items-center justify-center relative">
            <button
              onClick={prev}
              className="absolute cursor-pointer left-6 text-white text-4xl opacity-70 hover:opacity-100"
            >
              ‹
            </button>

            <div className="relative w-[90vw] h-[80vh]">
              <Image
                src={images[activeIndex].src}
                alt="Preview"
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>

            <button
              onClick={next}
              className="absolute cursor-pointer right-6 text-white text-4xl opacity-70 hover:opacity-100"
            >
              ›
            </button>
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-2 overflow-x-auto p-4 bg-black">
            {images.map((img, i) => (
              <div
                key={i}
                className={`relative h-16 w-24 flex-shrink-0 cursor-pointer rounded-md overflow-hidden ${
                  activeIndex === i
                    ? "ring-2 ring-white"
                    : "opacity-60"
                }`}
                onClick={() => setActiveIndex(i)}
              >
                <Image
                  src={img.src}
                  alt={`Thumb ${i}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}