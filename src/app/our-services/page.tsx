import Link from "next/link";
import { getOurServicesPage, getServices, getAppLink } from "@/lib/wordpress";
import { OurServicesHero } from "@/components/our-services/OurServicesHero";
import { OurMainServicesSection } from "@/components/our-services/OurMainServicesSection";
import { OurServicesExtrasSection } from "@/components/our-services/OurServicesExtrasSection";
import { OurServicesFeatureListSection } from "@/components/our-services/OurServicesFeatureListSection";
import { AppDownloadSection } from "@/components/home/AppDownloadSection";

export default async function OurServicesPage() {
  const [page, services, appLink] = await Promise.all([
    getOurServicesPage(),
    getServices(),
    getAppLink(),
  ]);

  if (!page?.acf) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#2a7a7c] p-6">
        <p className="max-w-xs text-center text-sm text-white/80">
          Our Services content is not available. Please ensure the WordPress
          page with ACF fields is published.
        </p>
      </main>
    );
  }

  const {
    page_heading,
    ["1st_section_background"]: heroImage,
    service_sub_heading,
    service_description,
  } = page.acf;

  const heroImageUrl = heroImage?.url;
  const isLocalHero =
    !!heroImageUrl && heroImageUrl.includes("quicklyn-headless.local");

  const descriptionParagraphs =
    service_description
      ?.split(/\r?\n\r?\n/)
      .map((p) => p.trim())
      .filter(Boolean) ?? [];

  return (
    <main className="min-h-screen bg-[#2a7a7c] text-white">
      <OurServicesHero
        heading={page_heading ?? "Our Services"}
        subHeading={service_sub_heading ?? undefined}
        descriptionParagraphs={descriptionParagraphs}
        heroImageUrl={heroImageUrl}
        heroImageAlt={heroImage?.alt || undefined}
        isLocalHero={isLocalHero}
      />

      <OurMainServicesSection services={services} />

      <OurServicesExtrasSection extras={page.acf.extras_list ?? []} />

      <OurServicesFeatureListSection
        features={page.acf.feature_list ?? []}
        backgroundImage={page.acf.background_image}
      />

      <section className="px-5">
        <div className="overflow-visible rounded-3xl shadow-[0_16px_32px_rgba(0,0,0,0.45)]">
          <AppDownloadSection
            data={appLink ?? null}
            showBottomCta={false}
            noInnerBottomPadding
          />
        </div>
      </section>

      {appLink?.acf && (
        <section className="px-5 pb-16 mt-6 flex flex-col items-end text-right">
          <p className="text-sm font-medium uppercase tracking-wide text-white">
            OR
          </p>
          <Link
            href={appLink.acf.booking_link?.url || "#"}
            target={appLink.acf.booking_link?.target || "_self"}
            className="mt-3 inline-flex items-center gap-2 text-[20px] font-semibold text-white hover:text-white/90 focus:outline-none"
          >
            {appLink.acf.booking_text?.trim() || "Book A Cleaning Now"}
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
          {appLink.acf.description && (
            <p className="mt-2 text-[14px] text-white/90">
              {appLink.acf.description.trim()}
            </p>
          )}
        </section>
      )}

      {/* Floating CTA at bottom, same behaviour as home page */}
      <Link
        href="/book-a-cleaning"
        className="fixed left-1/2 z-[9999] flex h-12 w-[224px] -translate-x-1/2 items-center justify-center rounded-full bg-[#FFDA00] shadow-xl drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)] transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#FFDA00] focus:ring-offset-2 focus:ring-offset-[#297476]"
        style={{
          minWidth: "224px",
          bottom: "max(36px, env(safe-area-inset-bottom, 0px) + 32px)",
        }}
      >
        <span className="text-base font-semibold text-[#1B5B5D]">
          Get An Estimate
        </span>
      </Link>
    </main>
  );
}

