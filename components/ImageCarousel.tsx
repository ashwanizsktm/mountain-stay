"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import Image from "next/image";

type ImageCarouselProps = {
  images: string[];
  autoPlayDelay?: number; // optional
};

export default function ImageCarousel({
  images,
  autoPlayDelay = 3000,
}: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto play
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [emblaApi, autoPlayDelay]);

  // Track active slide
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Carousel */}
      <div className="overflow-hidden rounded-xl shadow-md" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div key={index} className="min-w-full h-80 relative">
              <Image
                src={src}
                alt={`carousel-${index}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 w-2 rounded-full transition ${
              index === selectedIndex
                ? "bg-[var(--color-primary)]"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}