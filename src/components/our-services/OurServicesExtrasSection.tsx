"use client";

import { useState } from "react";
import Image from "next/image";
import type { ExtrasListItem } from "@/types/wordpress";

interface OurServicesExtrasSectionProps {
  extras: ExtrasListItem[];
}

function hasContent(value: string | undefined | null): boolean {
  if (!value) return false;
  const stripped = value.replace(/<[^>]+>/g, "").trim();
  return stripped.length > 0;
}

export function OurServicesExtrasSection({
  extras,
}: OurServicesExtrasSectionProps) {
  if (!extras || extras.length === 0) return null;

  const validExtras = extras.filter(
    (item) => item && item.extras_heading?.trim().length,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const active = validExtras[activeIndex] ?? validExtras[0];
  if (!active) return null;

  const {
    extras_heading,
    extras_approximate_time,
    extras_icon,
    extras_description,
  } = active;

  const strippedDescription =
    extras_description?.replace(/<[^>]+>/g, "").trim() ?? "";
  const shouldShowReadMore = strippedDescription.length > 400;

  const goToIndex = (index: number) => {
    if (!validExtras.length) return;
    const normalizedIndex =
      ((index % validExtras.length) + validExtras.length) % validExtras.length;
    if (normalizedIndex === activeIndex) return;

    setIsTransitioning(true);
    // brief fade-out then swap content and fade back in
    setTimeout(() => {
      setActiveIndex(normalizedIndex);
      setIsExpanded(false);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <section className="bg-[#2a7a7c] pb-16 pt-10 text-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="mb-6 text-center text-[44px] font-semibold tracking-normal">
          The Extras
        </h2>

        {/* Extras tabs */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {validExtras.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${item.extras_heading}-${index}`}
                type="button"
                onClick={() => goToIndex(index)}
                className={`rounded-[8px] border border-[#7eafaf] bg-[rgba(255,255,255,0.11)] px-4 py-1.5 text-[13px] capitalize text-white transition-colors duration-200 ${
                  isActive
                    ? "bg-[#195b5d]"
                    : "text-white/85 hover:bg-white/10"
                }`}
              >
                {item.extras_heading}
              </button>
            );
          })}
        </div>

        {/* Active extra content */}
        <article
          className="relative rounded-3xl px-6 py-8 transition-opacity duration-300 ease-out"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          <div>
            <h3 className="mb-4 text-2xl font-semibold">{extras_heading}</h3>

            <div className="flex items-start justify-between gap-4">
              {hasContent(extras_approximate_time) && (
                <div className="mb-4 text-sm">
                  <p className="font-semibold">Approximate Time:</p>
                  <p className="mt-1 text-white/90">
                    {extras_approximate_time}
                  </p>
                </div>
              )}

              {extras_icon?.url && (
                <div className="shrink-0">
                  <Image
                    src={extras_icon.url}
                    alt={extras_icon.alt || extras_heading}
                    width={extras_icon.width || 60}
                    height={extras_icon.height || 60}
                    className="h-16 w-16 object-contain"
                    unoptimized={extras_icon.url.includes(
                      "quick.rootholdings.com.mv",
                    )}
                  />
                </div>
              )}
            </div>
          </div>

          <hr className="my-5 border-white/20" />

          {hasContent(extras_description) && (
            <div
              className={`max-w-none text-white/90 text-[12px] leading-[19px] space-y-2
              [&_p]:mt-0 [&_p]:mb-2
              [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:mb-2
              [&_li]:mb-1 ${
                !isExpanded && shouldShowReadMore ? " line-clamp-7" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: extras_description! }}
            />
          )}

          {shouldShowReadMore && (
            <button
              type="button"
              className="mt-3 text-[12px] font-medium text-white underline underline-offset-2"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? "Read less" : "Read more..."}
            </button>
          )}

          {/* Bottom navigation arrows (carousel style) */}
          {validExtras.length > 1 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous extra"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-white hover:bg-white/10"
                onClick={() => goToIndex(activeIndex - 1)}
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
                  <path d="M15 18L9 12L15 6" />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Next extra"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-white hover:bg-white/10"
                onClick={() => goToIndex(activeIndex + 1)}
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
                  <path d="M9 6L15 12L9 18" />
                </svg>
              </button>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}

