"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  image: string;
  title: string;
  excerpt: string;
  href: string;
  category: string;
};

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;
  const normalizedIndex = activeIndex % slides.length;
  const slide = slides[normalizedIndex];
  return (
    <section className="relative -mt-[76px] isolate min-h-[760px] overflow-hidden bg-[#7e3314] pt-[76px] text-white sm:-mt-[88px] sm:pt-[88px] lg:min-h-[min(860px,100vh)]">
      <div className="absolute inset-0 -z-20">
        {slides.map((item, index) => (
          <Image
            key={`${item.href}-${item.image}`}
            src={item.image}
            alt={index === normalizedIndex ? item.title : ""}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover object-[60%_center] transition-opacity duration-700 ease-out ${
              index === normalizedIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#351307]/95 via-[#5b260f]/72 to-[#5b260f]/20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#361506]/60 to-transparent" />

      <div className="mx-auto flex min-h-[684px] max-w-7xl items-center px-4 py-20 sm:min-h-[772px] sm:px-6 lg:py-24">
        <div className="w-full">
          <div className="relative z-10 max-w-3xl">
            <p
              key={`category-${normalizedIndex}`}
              className="inline-flex rounded-full border border-[#ffd48b]/55 bg-[#592511]/45 px-3.5 py-1.5 text-xs font-bold text-[#fff1d4] shadow-lg backdrop-blur-md"
            >
              {slide.category}
            </p>
            <h1
              key={`title-${normalizedIndex}`}
              className="mt-5 text-4xl font-black leading-[1.16] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-[3.75rem]"
            >
              {slide.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#fff0d4] drop-shadow sm:text-lg">
              {slide.excerpt}
            </p>
            <Link
              key={`link-${normalizedIndex}`}
              href={slide.href}
              className="mt-8 inline-flex items-center rounded-full bg-[#f4b14b] px-6 py-3.5 text-sm font-bold text-[#44200d] shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#ffd173]"
            >
              पूरा लेख पढ़ें <span className="ml-2" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
