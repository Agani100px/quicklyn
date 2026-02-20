"use client";

import Image from "next/image";
import { CareersForm } from "./CareersForm";

export interface CareersContentProps {
  heading: string;
  description: string;
  image1Url: string | undefined;
  image2Url: string | undefined;
  image3Url: string | undefined;
}

export function CareersContent({
  heading,
  description,
  image1Url,
  image2Url,
  image3Url,
}: CareersContentProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#2a7a7c] text-white">
      {/* Subtle wave texture from bottom-left */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06]"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse 80% 50% at 20% 100%, #3a9a9c, transparent)`,
        }}
      />

      {/* Hero: image collage + heading + description */}
      <section className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 pb-12 md:pt-32 md:pb-16">
        {/* Three images in asymmetric collage */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-4">
          {image1Url && (
            <div className="absolute left-1/2 top-[12%] z-0 h-[280px] w-[90px] -translate-x-1/2 opacity-50 md:top-[10%] md:h-[340px] md:w-[100px]">
              <Image
                src={image1Url}
                alt=""
                fill
                className="object-contain object-center"
                sizes="100px"
                unoptimized={image1Url.includes("quick.rootholdings")}
              />
            </div>
          )}
          {image2Url && (
            <div className="absolute left-[8%] top-[32%] z-0 h-[260px] w-[95px] opacity-50 md:left-[12%] md:top-[30%] md:h-[320px] md:w-[110px]">
              <Image
                src={image2Url}
                alt=""
                fill
                className="object-contain object-center"
                sizes="110px"
                unoptimized={image2Url.includes("quick.rootholdings")}
              />
            </div>
          )}
          {image3Url && (
            <div className="absolute right-[8%] top-[28%] z-0 h-[270px] w-[92px] opacity-50 md:right-[12%] md:top-[26%] md:h-[330px] md:w-[105px]">
              <Image
                src={image3Url}
                alt=""
                fill
                className="object-contain object-center"
                sizes="105px"
                unoptimized={image3Url.includes("quick.rootholdings")}
              />
            </div>
          )}
        </div>

        {/* Heading and description - centered, semi-transparent */}
        <div className="relative z-10 max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white/90 md:text-4xl lg:text-5xl">
            {heading}
          </h1>
          {description && (
            <p className="mt-4 text-base text-white/75 md:text-lg">
              {description}
            </p>
          )}
        </div>
      </section>

      {/* Form section */}
      <section className="relative z-10 flex justify-center px-6 pb-20 md:pb-24">
        <CareersForm />
      </section>
    </main>
  );
}
