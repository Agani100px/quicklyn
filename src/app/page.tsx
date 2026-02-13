import { getHomePage, getServices } from "@/lib/wordpress";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";

export default async function HomePage() {
  const [page, services] = await Promise.all([getHomePage(), getServices()]);

  if (!page?.acf) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <p className="text-center text-white/80">
          No home page content found. Ensure WordPress is running and the home
          page with ACF data exists.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <HeroSection data={page.acf} />
      <ServicesSection
        background={page.acf.section2_background}
        counters={page.acf.counter}
        services={services}
        sectionHeading={page.acf.section_heading}
        whyList={page.acf.why_list}
      />
    </main>
  );
}
