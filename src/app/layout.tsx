import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quicklyn | Premium Cleaning Services in NYC",
  description:
    "Trusted, vetted cleaning professionals delivering consistent, white-glove service across NYC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
