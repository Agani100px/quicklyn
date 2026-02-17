"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HomePageACF } from "@/types/wordpress";
import type { WPHeader } from "@/lib/wordpress";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80";

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    </svg>
  );
}

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

interface HeroSectionProps {
  data: HomePageACF;
  header?: WPHeader | null;
}

export function HeroSection({ data, header }: HeroSectionProps) {
  const bgUrl = data.background_image?.url || PLACEHOLDER_IMAGE;
  const appStoreUrl = data.appstore?.url ?? "";
  const googlePlayUrl = data.google_play?.url ?? "";
  const estimateLink = data.estimate_button_link?.url ?? "#";
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isLocalImage = bgUrl.includes("quicklyn-headless.local");
  const headerLogoUrl = header?.acf?.header_logo?.url;
  const isLocalLogo = headerLogoUrl?.includes("quicklyn-headless.local");

  // Detect mobile viewport
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll behavior - only on mobile
  useEffect(() => {
    if (typeof window === "undefined" || !isMobile) {
      setIsCollapsed(false);
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      // Normalized progress 0 → 1 for smooth heading animation
      const progress = Math.min(Math.max(y / 120, 0), 1);
      setScrollProgress(progress);
      // When user scrolls down a bit, collapse (zoom out + move up)
      setIsCollapsed(progress > 0.4);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const handleHeroClick = () => {
    if (!isMobile) return;
    // Toggle collapsed state on tap
    setIsCollapsed((prev) => !prev);
  };

  const bgTransform = isCollapsed
    ? "translateX(0%) scale(1.35) rotate(-10deg)"
    : "translateX(10%) scale(2.1) rotate(-4deg)";

  const bgMarginTop = isCollapsed ? "5%" : "45%";

  // Smooth heading animation based on scroll progress
  const headingProgress = isMobile ? scrollProgress : 0;
  const headingTop = "22vh";
  const headingTranslateY = -3 * headingProgress; // 0vh → -3vh (subtle lift)
  const headingOpacity = 0.9 + 0.1 * headingProgress; // 0.9 → 1
  const headingZIndex = headingProgress > 0.5 ? 6 : 2;

  // Teal gradient opacity fades out with scroll (1 → 0)
  const tealOpacity = 1 - headingProgress;

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      onClick={handleHeroClick}
    >
      {/* Background image — zoomed, rotated, shifted */}
      <div
        className="absolute inset-0 z-0 origin-center transition-[transform,margin-top] duration-500 ease-out"
        style={{
          transform: bgTransform,
          marginTop: bgMarginTop,
        }}
      >
        <Image
          src={bgUrl}
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "center top" }}
          sizes="100vw"
          priority
          unoptimized={isLocalImage}
        />
      </div>

      {/* Heading layer BELOW gradient (lower z than overlay) */}
      <div
        className="absolute left-0 right-0 flex justify-center px-6 text-center transition-[opacity,transform] duration-700 ease-in-out"
        style={{
          top: headingTop,
          zIndex: headingZIndex,
          opacity: headingOpacity,
          transform: `translateY(${headingTranslateY}vh)`,
        }}
      >
        <h1 className="hero-text-shadow max-w-[320px] text-[35px] font-semibold leading-[35px] text-white">
          {data.section_1_heading}
        </h1>
      </div>

      {/* Overlay: teal gradient (fades out on scroll) */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] transition-opacity duration-700 ease-in-out"
        style={{
          opacity: tealOpacity,
          background:
            "linear-gradient(to bottom, rgba(24, 91, 93, 1) 0%, rgba(24, 91, 93, 0.47) 47%, rgba(24, 91, 93, 0.2) 100%)",
        }}
        aria-hidden
      />

      {/* Overlay: black fade (always present, does NOT fade out) */}
      <div
        className="pointer-events-none absolute inset-0 z-[4]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)",
        }}
        aria-hidden
      />

      {/* Content */}
      <div
        className="relative z-10 flex min-h-screen flex-col pt-[100px]"
        style={{ paddingTop: "calc(100px + env(safe-area-inset-top, 0px))" }}
      >
        {/* Fixed top bar + header */}
        <div className="fixed left-0 right-0 top-0 z-[9999] flex w-full flex-col bg-transparent" style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
          {/* Top bar */}
          <div
            className="flex shrink-0 justify-center px-4 py-2.5 text-center"
            style={{ backgroundColor: "#2a7a7c" }}
          >
            <p className="hero-text-shadow text-[12px] text-white">
              <span className="font-bold text-[#FFDA00]">Save 15%</span>
              <span className="text-white">
                {" "}
                On your first cleaning — code QWEB15
              </span>
            </p>
          </div>

          {/* Header */}
          <header className="flex shrink-0 items-center justify-between bg-transparent px-6 py-3">
          <div className="flex items-center gap-2">
            {headerLogoUrl ? (
              <Link href="/" className="block">
                <Image
                  src={headerLogoUrl}
                  alt="Quicklyn"
                  width={70}
                  height={16}
                  className="h-5 w-auto object-contain [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.4))]"
                  unoptimized={!!isLocalLogo}
                />
              </Link>
            ) : (
              <>
                <LeafIcon className="text-white [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.4))]" />
                <span className="hero-text-shadow text-lg font-medium lowercase text-white">
                  quicklyn
                </span>
              </>
            )}
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-white"
            aria-label="Open menu"
          >
            <HamburgerIcon className="text-white [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.4))]" />
          </button>
        </header>
        </div>

        {/* Main content */}
        <div
          className="flex flex-1 flex-col items-center px-6 pb-0 text-center"
          style={{ paddingTop: "max(0px, calc(18vh - 120px))" }}
        >
          {/* Spacer between (separate) heading layer and badges */}
          <div className="min-h-[40vh] shrink-0" aria-hidden />

          {/* Store badges */}
          <div className="mb-6 mt-8 flex flex-wrap items-center justify-center gap-[14px]">
            {appStoreUrl && (
              <Link
                href="#"
                className="relative z-[10] block transition hover:opacity-95"
              >
                <Image
                  src={appStoreUrl}
                  alt="Download on the App Store"
                  width={122}
                  height={46}
                  className="h-[46px] w-auto object-contain"
                  unoptimized={isLocalImage}
                />
              </Link>
            )}
            {googlePlayUrl && (
              <Link
                href="#"
                className="relative z-[10] block transition hover:opacity-95"
              >
                <Image
                  src={googlePlayUrl}
                  alt="GET IT ON Google Play"
                  width={122}
                  height={46}
                  className="h-[46px] w-auto object-contain"
                  unoptimized={isLocalImage}
                />
              </Link>
            )}
          </div>

          {/* Description */}
          <p className="hero-text-shadow relative z-[20] mb-6 max-w-[280px] text-[16px] leading-relaxed text-white/90">
            {data.section_1_description}
          </p>
        </div>
      </div>
    </section>
  );
}

