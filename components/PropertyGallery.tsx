"use client";

import { useState, useEffect, useRef } from "react";

type ImageType = {
  src: string;
  label: string;
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

  /* Swipe support */
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
    <div className="max-w-6xl mx-auto px-6 pt-10">
      <div className="flex flex-col md:flex-row gap-4">
        {/* MAIN IMAGE */}
        <div
          className="relative md:w-[78%] w-full group"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={images[activeIndex].src}
            loading="lazy"
            onClick={() => setLightbox(true)}
            className="w-full h-[450px] md:h-[78vh] object-cover rounded-xl 
            cursor-pointer transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {/* Counter */}
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
            {activeIndex + 1} / {images.length}
          </div>
          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow"
          >
            ›
          </button>
        </div>
        {/* THUMBNAILS */}
        <div className="md:w-[22%] md:h-[78vh] overflow-y-auto space-y-4 pr-1">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`cursor-pointer rounded-lg overflow-hidden border transition ${
                activeIndex === i
                  ? "border-[var(--color-primary)]"
                  : "border-gray-200"
              }`}
            >
              <img
                src={img.src}
                loading="lazy"
                className="h-[120px] w-full object-cover hover:scale-105 transition"
              />
              <p className="text-xs text-center py-1 bg-white text-gray-600">
                {img.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-6 cursor-pointer right-6 text-white text-3xl"
          >
            ✕
          </button>
          <button
            onClick={prev}
            className="absolute left-6 cursor-pointer text-white text-5xl"
          >
            ‹
          </button>
          <img
            src={images[activeIndex].src}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
          />
          <button
            onClick={next}
            className="absolute right-6 cursor-pointer text-white text-5xl"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}