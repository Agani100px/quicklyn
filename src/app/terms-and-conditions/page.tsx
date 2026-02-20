import { getTermsPage } from "@/lib/wordpress";
import { TermsAccordion } from "@/components/terms/TermsAccordion";

export const metadata = {
  title: "Terms & Conditions | Quicklyn",
  description: "Terms and conditions for Quicklyn cleaning services.",
};

export default async function TermsAndConditionsPage() {
  const page = await getTermsPage();

  if (!page?.acf) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#2a7a7c] p-6">
        <p className="max-w-xs text-center text-sm text-white/80">
          Terms &amp; Conditions content is not available. Please ensure the
          WordPress page with ACF fields is published.
        </p>
      </main>
    );
  }

  const heading =
    page.acf.page_heading?.trim() ||
    page.title?.rendered?.trim() ||
    "Terms & Conditions";
  const termsList = page.acf.terms_list ?? [];

  return (
    <main className="min-h-screen bg-[#2a7a7c] text-white">
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-24">
        <h1
          className="mb-12 text-center font-semibold uppercase tracking-wide md:mb-16"
          style={{ fontSize: "27px", lineHeight: "30px" }}
        >
          {heading}
        </h1>

        <TermsAccordion items={termsList} />
      </div>
    </main>
  );
}
