"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface GetTheAppContentProps {
  headingDisplay: string;
  subHeading: string;
  discountCodeLabel: string;
  googlePlayUrl: string | undefined;
  appStoreUrl: string | undefined;
  link01: string;
  link02: string;
  link01Target: string;
  bookingUrl: string;
  bookingTarget: string;
  bookingText: string;
  description: string;
  phoneImageUrl: string | undefined;
  backImageUrl: string | undefined;
}

export function GetTheAppContent({
  headingDisplay,
  subHeading,
  discountCodeLabel,
  googlePlayUrl,
  appStoreUrl,
  link01,
  link02,
  link01Target,
  bookingUrl,
  bookingTarget,
  bookingText,
  description,
  phoneImageUrl,
  backImageUrl,
}: GetTheAppContentProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [sentinelOutOfView, setSentinelOutOfView] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const active = hasScrolled && sentinelOutOfView;

  useEffect(() => {
    const handleScroll = () => setHasScrolled(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSentinelOutOfView(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const renderSubHeading = () => {
    if (!subHeading) return null;
    const parts = subHeading.split(/(\d+%\s*off?|\d+%)/i);
    return (
      <p className="mt-3 text-sm text-white md:text-base">
        {parts.map((part, i) =>
          /\d+%/.test(part) ? (
            <span key={i} className="font-bold text-[#ffda00]">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#2a7a7c] text-white">
      {backImageUrl ? (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-85"
          style={{ backgroundImage: `url(${encodeURI(backImageUrl)})` }}
          aria-hidden
        />
      ) : (
        <div className="absolute inset-0 z-0 bg-[#2a7a7c]" aria-hidden />
      )}

      <div
        ref={sentinelRef}
        className="absolute left-0 right-0 top-20 h-px w-full pointer-events-none"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-screen flex-col items-center px-6 pt-[20%] pb-12 md:pt-[22%] md:pb-16">
        {phoneImageUrl && (
          <div
            className={`relative h-[320px] w-[230px] shrink-0 -mb-8 mt-32 transition-all duration-500 ease-out md:-mb-12 md:mt-40 md:h-[420px] md:w-[300px] ${
              active ? "-translate-y-[50px] opacity-100" : "translate-y-0 opacity-40"
            }`}
          >
            <Image
              src={phoneImageUrl}
              alt=""
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 200px, 260px"
              unoptimized={phoneImageUrl.includes("quicklyn-headless.local")}
            />
          </div>
        )}

        <h1
          className={`max-w-md text-center font-bold text-white transition-all duration-200 ease-out ${
            active ? "-translate-y-[50px] opacity-100" : "translate-y-0 opacity-45"
          }`}
          style={{ fontSize: "30px", lineHeight: "37px" }}
        >
          {headingDisplay}
        </h1>

        <div
          className={`-mt-8 flex flex-wrap items-center justify-center gap-4 transition-opacity duration-300 ease-out md:-mt-10 ${
            active ? "opacity-100" : "opacity-45"
          }`}
        >
          {googlePlayUrl && (
            <Link
              href={link01}
              target={link01Target}
              rel="noopener noreferrer"
              className="focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg"
            >
              <Image
                src={googlePlayUrl}
                alt="Get it on Google Play"
                width={180}
                height={60}
                className="h-11 w-auto object-contain md:h-12"
                unoptimized={googlePlayUrl.includes("quicklyn-headless.local")}
              />
            </Link>
          )}
          {appStoreUrl && (
            <Link
              href={link02}
              target="_blank"
              rel="noopener noreferrer"
              className="focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg"
            >
              <Image
                src={appStoreUrl}
                alt="Download on the App Store"
                width={180}
                height={60}
                className="h-11 w-auto object-contain md:h-12"
                unoptimized={appStoreUrl.includes("quicklyn-headless.local")}
              />
            </Link>
          )}
        </div>

        <div className="mt-4 text-center">{renderSubHeading()}</div>

        {discountCodeLabel && (
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center rounded-2xl border-2 border-dashed border-white bg-[#1f6b6d] px-6 py-3">
              <span className="text-sm font-medium text-white">
                USE CODE{" "}
                <span className="font-bold text-[#ffda00]">
                  {discountCodeLabel}
                </span>
              </span>
            </div>
          </div>
        )}

        {(bookingText || description) && (
          <div className="mt-12 flex w-full flex-col items-end text-right">
            <p className="text-sm font-medium uppercase tracking-wide text-white/90">
              OR
            </p>
            <Link
              href={bookingUrl}
              target={bookingTarget}
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-lg font-bold text-white hover:text-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
            >
              {bookingText}
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </Link>
            {description && (
              <p className="mt-2 text-sm text-white/80">{description}</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
