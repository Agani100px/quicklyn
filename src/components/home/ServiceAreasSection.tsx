"use client";

import Image from "next/image";
import type { HomePageACF } from "@/types/wordpress";

interface ServiceAreasSectionProps {
  data: HomePageACF;
}

export function ServiceAreasSection({ data }: ServiceAreasSectionProps) {
  const heading = data["4th_section_heading"];
  const subHeading = data["4th_section_sub_heading"];
  const description = data["4th_section_description"];
  const map = data["4th_section_map"];

  if (!heading && !subHeading && !description && !map) return null;

  const mapUrl = map?.url;
  const isLocalMap =
    !!mapUrl &&
    (mapUrl.includes("quicklyn-headless.local") ||
      mapUrl.includes("quick.rootholdings"));

  return (
    <section className="relative w-full overflow-hidden bg-[#226d71] pb-16 pt-14">
      {/* Mobile layout (unchanged) */}
      <div className="md:hidden">
        {/* Map image as right-aligned background */}
        {mapUrl && (
          <div className="pointer-events-none absolute right-0 top-[190px] mr-[20px] h-[260px] w-[75%]">
            <Image
              src={mapUrl}
              alt={map.alt || heading || "Service areas map"}
              fill
              className="object-contain object-right"
              priority={false}
              unoptimized={isLocalMap}
            />
          </div>
        )}

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
          {heading && (
            <h2 className="mb-8 text-center text-[40px] font-semibold leading-[42px] text-white">
              {heading}
            </h2>
          )}

          <div className="w-[50%] text-left">
            {subHeading && (
              <p className="mb-3 text-[20px] font-normal leading-snug text-white">
                {subHeading}
              </p>
            )}
            {description && (
              <p className="text-[12px] leading-relaxed text-white/85">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Desktop / tablet layout */}
      <div className="relative z-10 mx-auto hidden w-full max-w-[1260px] px-8 py-10 md:block lg:px-6 lg:py-14">
        <div className="grid grid-cols-12 items-center gap-6 lg:gap-10">
          <div className="col-span-3">
            {heading && (
              <h2 className="hero-text-shadow text-left text-[54px] font-semibold leading-[0.92] tracking-[-0.03em] text-white lg:text-[72px]">
                {heading.split(/\s+/).map((word, index) => (
                  <span key={`${word}-${index}`} className="block">
                    {word}
                  </span>
                ))}
              </h2>
            )}
          </div>

          <div className="col-span-5">
            {mapUrl ? (
              <div className="relative mx-auto h-[360px] w-full max-w-[470px] lg:h-[440px] lg:max-w-[560px]">
                <Image
                  src={mapUrl}
                  alt={map.alt || heading || "Service areas map"}
                  fill
                  className="object-contain object-center"
                  priority={false}
                  unoptimized={isLocalMap}
                />
              </div>
            ) : null}
          </div>

          <div className="col-span-4 pl-2 text-left lg:pl-6">
            {subHeading && (
              <h3 className="text-[30px] font-medium leading-tight text-white lg:text-[40px]">
                {subHeading}
              </h3>
            )}
            {description && (
              <p className="mt-5 max-w-[290px] text-[13px] leading-[1.75] text-white/90 lg:mt-6 lg:max-w-[340px] lg:text-[16px] lg:leading-[1.8]">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
