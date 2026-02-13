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

export interface WPTestimonial {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    name: string;
    testimonial: string;
    stars: string;
  };
}

const fallbackTestimonials: WPTestimonial[] = [
  {
    id: 79,
    slug: "hany-y",
    title: { rendered: "Hany Y." },
    acf: {
      name: "Hany Y.",
      testimonial:
        "The young ladies (2) of them showed up early to clean my large apartment. They did a fantastic job and had pleasant personalities. I would recommend Quicklyn for any cleaning job. I will use again in the near future.",
      stars: "5",
    },
  },
  {
    id: 80,
    slug: "tracy-h",
    title: { rendered: "Tracy H." },
    acf: {
      name: "Tracy H.",
      testimonial:
        "Finally, we found a housecleaning service that knows how to clean. And the house was in terrible shape when they arrived. Quicklyn did a fabulous job in record time. The house was sparkling! So happy with their service. Will definitely use them again.",
      stars: "5",
    },
  },
  {
    id: 78,
    slug: "kelly-c",
    title: { rendered: "Kelly C." },
    acf: {
      name: "Kelly C.",
      testimonial:
        "Great responsiveness, on time, good work. Needs an update on materials used to clean.",
      stars: "5",
    },
  },
];

export async function getTestimonials(): Promise<WPTestimonial[]> {
  try {
    const res = await fetch(getApiUrl("/testimonial?acf_format=standard"), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallbackTestimonials;
    const data: WPTestimonial[] = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : fallbackTestimonials;
  } catch {
    return fallbackTestimonials;
  }
}
