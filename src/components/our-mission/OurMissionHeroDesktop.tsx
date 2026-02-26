"use client";

import Image from "next/image";

interface OurMissionHeroDesktopProps {
  heading: string;
  headerLogoUrl: string | undefined;
  heroImageUrl: string | undefined;
}

function ChevronDownIcon({ className }: { className?: string }) {
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
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function OurMissionHeroDesktop({
  heading,
  headerLogoUrl,
  heroImageUrl,
}: OurMissionHeroDesktopProps) {
  return (
    <section className="relative hidden min-h-screen w-full overflow-hidden bg-[#185b5d] md:block">
      {/* Background image - full cover */}
      {heroImageUrl && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-top"
            aria-hidden
          />
        </>
      )}

      {/* Centered content: Behind, logo, scroll-down arrow */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-end px-6 pb-16 pt-24 lg:pb-20">
        <h1 className="text-center text-[64px] font-normal tracking-wide text-white">
          {heading}
        </h1>
        <div className="mt-6 w-full max-w-[1180px] px-6">
          {headerLogoUrl ? (
            <Image
              src={headerLogoUrl}
              alt="Quicklyn"
              width={1180}
              height={200}
              className="h-28 w-full object-contain object-center lg:h-[160px]"
              unoptimized={
                headerLogoUrl.includes("quicklyn-headless.local") ||
                headerLogoUrl.includes("quick.rootholdings")
              }
            />
          ) : (
            <span className="text-6xl font-medium lowercase text-white lg:text-7xl">
              Quicklyn
            </span>
          )}
        </div>
        <div
          className="mt-8 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/90 text-white lg:h-16 lg:w-16"
          aria-hidden
        >
          <ChevronDownIcon className="h-7 w-7 lg:h-8 lg:w-8" />
        </div>
      </div>
    </section>
  );
}
