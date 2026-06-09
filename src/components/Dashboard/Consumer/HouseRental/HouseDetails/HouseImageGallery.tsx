"use client";

import Image from "next/image";

interface HouseImageGalleryProps {
  images: string[];
  title: string;
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const HouseImageGallery = ({
  images,
  title,
  currentIndex,
  onIndexChange,
}: HouseImageGalleryProps) => {
  if (!images.length) return null;

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative aspect-[16/10] overflow-hidden md:aspect-[21/9]">
        <Image
          src={images[currentIndex]}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 80vw"
          className="object-cover"
        />
      </div>

      {/* Image Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            aria-label={`Image ${index + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              index === currentIndex
                ? "w-6 bg-primary-foreground"
                : "w-2.5 bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>

      {/* Thumbnail Strip (Desktop) */}
      <div className="hidden gap-2 overflow-x-auto p-4 md:flex">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => onIndexChange(index)}
            className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
              index === currentIndex
                ? "border-primary"
                : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt={`${title} thumbnail ${index + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HouseImageGallery;
