import type { Metadata } from "next";
import { getFooter, getAppLink, getHeader } from "@/lib/wordpress";
import { Footer } from "@/components/Footer";
import { GlobalHeader } from "@/components/GlobalHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quicklyn | Premium Cleaning Services in NYC",
  description:
    "Trusted, vetted cleaning professionals delivering consistent, white-glove service across NYC.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [footer, appLink, header] = await Promise.all([
    getFooter(),
    getAppLink(),
    getHeader(),
  ]);

  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <GlobalHeader header={header} />
        {children}
        <Footer data={footer} appLink={appLink} />
      </body>
    </html>
  );
}
