"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/1.jpeg",
    "/images/2.jpeg",
    "/images/3.jpeg",
    "/images/4.jpeg",
    "/images/5.jpeg",
    "/images/6.jpeg",
    "/images/7.jpeg",
    "/images/8.jpeg",
    "/images/9.jpeg",
    "/images/10.jpeg",
    "/images/11.jpeg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3 सेकंड बाद स्लाइड बदल जाएगी
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-1000"
        />
      </div>

      {/* ओवरले डार्क इफेक्ट */}
      <div className="absolute inset-0 bg-black/40"></div>
    </section>
  );
}
