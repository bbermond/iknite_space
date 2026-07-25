/**
 * Global site configuration for FindWellness.
 *
 * This file is the single place to change brand copy, contact details,
 * navigation, and footer architecture. Nothing here is hard-coded into
 * components — edit and redeploy.
 */

export const site = {
  name: "FindWellness",
  region: "South Bay",
  tagline: "The South Bay's curated guide to modern wellness",
  description:
    "270+ vetted med spas, longevity clinics, IV lounges, and hormone specialists across San Jose, Los Gatos, and the South Bay — researched, rated, organized.",
  /** Set NEXT_PUBLIC_SITE_URL on Railway once the custom domain is live. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://web-production-fdcc5.up.railway.app",
  /** Contact happens through the /contact form; set an address to also show it. */
  email: null as string | null,
  location: "San Jose · Los Gatos · Silicon Valley, CA",
} as const;

export const nav = [
  { href: "/directory", label: "Directory" },
  { href: "/functional-medicine", label: "Functional Medicine" },
  { href: "/coaches", label: "Coaches" },
  { href: "/eden", label: "Eden" },
  { href: "/about", label: "About" },
] as const;

export const primaryCta = {
  href: "/for-businesses",
  label: "List your practice",
} as const;

/** Footer link architecture — grouped, deep, and crawlable. */
export const footerGroups: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "/directory", label: "Browse the directory" },
      { href: "/categories", label: "All categories" },
      { href: "/cities", label: "All cities" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/functional-medicine", label: "Functional medicine" },
      { href: "/coaches", label: "Coaches & consultants" },
      { href: "/eden", label: "Eden — knowledge garden" },
    ],
  },
  {
    title: "Categories",
    links: [
      { href: "/categories/med-spas-aesthetics", label: "Med spas & aesthetics" },
      { href: "/categories/functional-longevity", label: "Functional & longevity" },
      { href: "/categories/medical-weight-loss", label: "Medical weight loss" },
      { href: "/categories/hormone-trt", label: "Hormone & TRT clinics" },
      { href: "/categories/iv-nutrient-lounges", label: "IV & nutrient lounges" },
      { href: "/categories/full-service-wellness", label: "Full-service wellness" },
      { href: "/categories/mobile-iv", label: "Mobile IV providers" },
    ],
  },
  {
    title: "Cities",
    links: [
      { href: "/cities/san-jose", label: "San Jose" },
      { href: "/cities/los-gatos", label: "Los Gatos" },
      { href: "/cities/sunnyvale", label: "Sunnyvale" },
      { href: "/cities/santa-clara", label: "Santa Clara" },
      { href: "/cities/mountain-view", label: "Mountain View" },
      { href: "/cities/campbell", label: "Campbell" },
      { href: "/cities/cupertino", label: "Cupertino" },
      { href: "/cities", label: "All 17 cities →" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About FindWellness" },
      { href: "/for-businesses", label: "For businesses" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];
