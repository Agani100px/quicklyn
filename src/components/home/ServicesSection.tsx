"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type React from "react";
import type { CounterItem, WPImage } from "@/types/wordpress";
import type { WPService } from "@/lib/wordpress";

interface ServicesSectionProps {
  background?: WPImage;
  counters?: CounterItem[];
  services: WPService[];
}

export function ServicesSection({
  background,
  counters = [],
  services,
}: ServicesSectionProps) {
  const bgUrl = background?.url;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

  // Sync active index when user scrolls / drags the carousel
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.children[0] as HTMLElement | undefined;
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth;
    const gap = 20; // gap between cards in px
    const approxIndex = track.scrollLeft / (cardWidth + gap);
    setActiveIndex(Math.round(approxIndex));
  };

  // Auto-slide the services carousel
  useEffect(() => {
    if (!services.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % services.length;
        const track = trackRef.current;
        const target = track?.children[nextIndex] as HTMLElement | undefined;
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [services.length]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = track.scrollLeft;
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    event.preventDefault();
    const deltaX = event.clientX - dragStartXRef.current;
    track.scrollLeft = dragStartScrollLeftRef.current - deltaX;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (track) {
      try {
        track.releasePointerCapture(event.pointerId);
      } catch {
        // ignore if not captured
      }
    }
    isDraggingRef.current = false;

    // After dragging ends, snap to the nearest card so one card stays centered
    const firstCard = track?.children[0] as HTMLElement | undefined;
    if (track && firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const gap = 20; // gap between cards in px
      const approxIndex = track.scrollLeft / (cardWidth + gap);
      const nearestIndex = Math.max(
        0,
        Math.min(services.length - 1, Math.round(approxIndex)),
      );
      const target = track.children[nearestIndex] as HTMLElement | undefined;
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
      setActiveIndex(nearestIndex);
    }
  };

  return (
    <section className="relative z-20 -mt-[120px] w-full overflow-hidden bg-transparent pb-24 pt-[100px]">
      {/* Background texture for section 2 */}
      {bgUrl && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={bgUrl}
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: "center top" }}
            sizes="100vw"
            priority={false}
            unoptimized={bgUrl.includes("quicklyn-headless.local")}
          />
        </div>
      )}

      <div className="relative z-10 mx-auto flex w-full flex-col items-center px-6 text-center">
        {/* Counters stacked vertically with line between rows */}
        <div className="mb-10 flex w-full flex-col gap-4 text-left px-6">
          {(counters ?? []).map((item, index) => (
            <div key={`${item.counter_text}-${index}`} className="w-full">
              {index > 0 && (
                <div className="my-4 h-px w-full bg-white/25" aria-hidden />
              )}
              <div className="hero-text-shadow flex w-full items-center justify-between gap-4">
                <div className="flex items-baseline gap-1 text-[74px] font-normal leading-none text-white">
                  <span>{item.counter_number}</span>
                  <span>{item.counter_suffix}</span>
                </div>
                <div className="max-w-[55%] text-left text-[24px] font-normal leading-snug text-white">
                  {item.counter_text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section heading (two lines: Our / Services) */}
        <h2 className="hero-text-shadow mt-10 mb-[30px] text-[68px] leading-[58px] font-medium text-white">
          <span className="block">Our</span>
          <span className="block">Services</span>
        </h2>

        {/* Services cards carousel */}
        <div
          ref={trackRef}
          className="no-scrollbar mt-[10px] flex w-screen -ml-[calc((100vw-100%)/2)] pl-6 pr-6 overflow-x-auto pb-2 pt-1 cursor-grab"
          style={{
            scrollSnapType: "x mandatory",
            scrollSnapStop: "always",
            touchAction: "pan-y",
            columnGap: "20px", // 20px gap between cards
          }}
          onScroll={handleScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          {services.map((service, index) => (
            <article
              key={service.id}
              className="group my-[20px] flex-shrink-0 snap-center rounded-3xl bg-[#175c5e] p-[30px] text-left text-white transition-transform hover:-translate-y-1"
              style={{
                minWidth: "60%",
                maxWidth: "60%",
                minHeight: "240px",
                marginLeft: index === 0 ? "20px" : undefined,
              }} // card ~50% of viewport width, taller height
            >
              <div className="mb-3 flex items-start justify-between">
                <h3 className="text-[23px] font-semibold">
                  {service.acf?.service_heading || service.title.rendered}
                </h3>
                {/* Only the circle is clickable */}
                <Link
                  href={service.acf?.link?.url || "#"}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFDA00] text-[#1B5B5D] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Arrow up-right icon */}
                    <path d="M8 16L16 8" />
                    <path d="M9 8H16V15" />
                  </svg>
                </Link>
              </div>

              <p className="mb-4 text-[14px] leading-relaxed text-white/80">
                {service.acf?.service_description}
              </p>
            </article>
          ))}
        </div>

        {/* Carousel bullets + Learn more link */}
        {services.length > 1 && (
          <div className="mt-4 flex w-full items-center justify-between px-6">
            <div className="flex items-center gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2 w-2 rounded-full transition ${
                    index === activeIndex ? "bg-white" : "bg-white/30"
                  }`}
                  onClick={() => {
                    const track = trackRef.current;
                    const target = track?.children[index] as HTMLElement | undefined;
                    if (target) {
                      target.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                      });
                    }
                    setActiveIndex(index);
                  }}
                />
              ))}
            </div>

            {/* Learn more text + arrow, aligned right */}
            <Link
              href={services[0]?.acf?.link?.url || "#"}
              className="flex items-center gap-2 text-sm font-medium text-white"
            >
              <span>Learn more</span>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 16L16 8" />
                <path d="M9 8H16V15" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

