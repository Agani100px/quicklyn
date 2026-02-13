import type { WPPage, HomePageACF } from "@/types/wordpress";
import { fallbackHomePage } from "./fallback-home";

const WORDPRESS_URL = process.env.WORDPRESS_URL ?? "http://quicklyn-headless.local";

export function getWordPressUrl(): string {
  return WORDPRESS_URL.replace(/\/$/, "");
}

export function getApiUrl(path: string): string {
  return `${getWordPressUrl()}/wp-json/wp/v2${path}`;
}

export async function getHomePage(): Promise<WPPage | null> {
  try {
    const res = await fetch(getApiUrl("/pages?slug=home&acf_format=standard"), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallbackHomePage;
    const data: WPPage[] = await res.json();
    return data[0] ?? fallbackHomePage;
  } catch {
    return fallbackHomePage;
  }
}

export interface WPService {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    service_heading: string;
    service_description: string;
    link: {
      title: string;
      url: string;
      target: string;
    };
  };
}

export async function getServices(): Promise<WPService[]> {
  try {
    const res = await fetch(getApiUrl("/service?acf_format=standard"), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data: WPService[] = await res.json();
    return data;
  } catch {
    return [];
  }
}
