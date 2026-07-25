/**
 * Category and city taxonomy.
 *
 * `airtableName` must match the single-select option in the Airtable base
 * exactly — it is the join key between the CMS and the site. Slugs are the
 * public URL identity and should never change once launched.
 */

export type Category = {
  slug: string;
  airtableName: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  /** Common treatments shown as chips on the category page. */
  signatureServices: string[];
};

export const categories: Category[] = [
  {
    slug: "med-spas-aesthetics",
    airtableName: "Med Spa / Aesthetics + Wellness",
    name: "Med Spas & Aesthetics",
    shortName: "Med Spas",
    tagline: "Clinical aesthetics, done conservatively and well.",
    description:
      "Physician-supervised aesthetics — injectables, laser, skin health, and regenerative treatments. The South Bay has more med spas than any other wellness category; we rank them by verified ratings, review depth, and clinical credentials so you can separate true medical practices from storefronts.",
    signatureServices: ["Botox & Dysport", "Dermal fillers", "Laser resurfacing", "Microneedling & PRP", "HydraFacial", "Skin tightening"],
  },
  {
    slug: "functional-longevity",
    airtableName: "Functional / Longevity Clinic",
    name: "Functional & Longevity Medicine",
    shortName: "Functional",
    tagline: "Root-cause medicine for a longer healthspan.",
    description:
      "Clinics that look upstream: advanced lab panels, metabolic and hormonal workups, and personalized protocols instead of ten-minute appointments. This is the fastest-growing category in the directory — start with our functional medicine primer if the field is new to you.",
    signatureServices: ["Advanced biomarker panels", "Longevity protocols", "Gut & microbiome testing", "Metabolic optimization", "Regenerative therapies", "Physician-led plans"],
  },
  {
    slug: "medical-weight-loss",
    airtableName: "Medical Weight Loss",
    name: "Medical Weight Loss",
    shortName: "Weight Loss",
    tagline: "Physician-managed programs, not fad plans.",
    description:
      "GLP-1 therapy, body-composition tracking, and metabolic coaching under medical supervision. We list programs that publish their approach and staff real clinicians — and note which disclose pricing up front.",
    signatureServices: ["GLP-1 programs (semaglutide, tirzepatide)", "Body composition analysis", "Metabolic testing", "Nutrition coaching", "Ongoing medical supervision"],
  },
  {
    slug: "hormone-trt",
    airtableName: "Hormone / TRT Clinic",
    name: "Hormone & TRT Clinics",
    shortName: "Hormones",
    tagline: "Data-driven hormone optimization for men and women.",
    description:
      "Testosterone replacement, bio-identical hormone therapy, and peptide protocols — prescribed from labs, not guesswork. The best clinics here retest on a schedule and manage the full picture: sleep, body composition, and cardiovascular markers alongside hormones.",
    signatureServices: ["TRT for men", "Bio-identical HRT", "Peptide therapy", "Thyroid optimization", "Lab-based dosing & retesting"],
  },
  {
    slug: "iv-nutrient-lounges",
    airtableName: "IV / Nutrient Lounge",
    name: "IV & Nutrient Lounges",
    shortName: "IV Lounges",
    tagline: "Clinical hydration and micronutrient therapy.",
    description:
      "Drip lounges staffed by nurses and NPs — from recovery and immunity blends to NAD+ infusions. We favor medically directed lounges that customize from an intake rather than a set menu.",
    signatureServices: ["Custom IV blends", "NAD+ infusions", "Vitamin injections", "Immunity & recovery drips", "Micronutrient testing"],
  },
  {
    slug: "full-service-wellness",
    airtableName: "Direct Full-Service",
    name: "Full-Service Wellness Clinics",
    shortName: "Full-Service",
    tagline: "One roof, many modalities.",
    description:
      "Practices that combine primary-care-adjacent services with aesthetics, IV therapy, hormones, and weight management. A strong choice when you want one clinical team coordinating everything.",
    signatureServices: ["Integrated care plans", "Aesthetics + wellness", "IV therapy", "Hormone care", "Weight management"],
  },
  {
    slug: "mobile-iv",
    airtableName: "Mobile IV Provider",
    name: "Mobile IV Providers",
    shortName: "Mobile IV",
    tagline: "Licensed clinicians who come to you.",
    description:
      "On-demand IV hydration delivered to homes, offices, and events across the South Bay. Every provider listed operates under medical direction with licensed nurses administering treatment.",
    signatureServices: ["At-home IV therapy", "Group & event bookings", "Recovery drips", "Same-day availability"],
  },
];

export type City = {
  slug: string;
  name: string;
  blurb: string;
};

export const cities: City[] = [
  { slug: "san-jose", name: "San Jose", blurb: "The heart of the directory — from Santana Row med spas to Blossom Hill wellness lounges." },
  { slug: "los-gatos", name: "Los Gatos", blurb: "The South Bay's premium wellness corridor, dense with longevity and aesthetics practices." },
  { slug: "sunnyvale", name: "Sunnyvale", blurb: "Tech-adjacent clinics with strong hormone, IV, and recovery offerings." },
  { slug: "santa-clara", name: "Santa Clara", blurb: "Accessible, well-reviewed practices in the center of the valley." },
  { slug: "morgan-hill", name: "Morgan Hill", blurb: "The south corridor's growing wellness scene." },
  { slug: "mountain-view", name: "Mountain View", blurb: "Peninsula-edge clinics serving the mid-valley." },
  { slug: "milpitas", name: "Milpitas", blurb: "East-bay-gateway practices with strong value." },
  { slug: "campbell", name: "Campbell", blurb: "A compact downtown with standout IV and aesthetics studios." },
  { slug: "cupertino", name: "Cupertino", blurb: "West-valley precision — aesthetics and skin clinics cluster here." },
  { slug: "gilroy", name: "Gilroy", blurb: "South-county options without the drive north." },
  { slug: "fremont", name: "Fremont", blurb: "East-bay practices within easy reach of the South Bay." },
  { slug: "saratoga", name: "Saratoga", blurb: "Quiet, high-end practices in the west hills." },
  { slug: "palo-alto", name: "Palo Alto", blurb: "Peninsula medicine with a research bent." },
  { slug: "los-altos", name: "Los Altos", blurb: "Boutique practices with a personal touch." },
  { slug: "hollister", name: "Hollister", blurb: "The southern edge of our coverage area." },
  { slug: "union-city", name: "Union City", blurb: "East-bay coverage for northern commuters." },
  { slug: "newark", name: "Newark", blurb: "East-bay coverage near the Dumbarton corridor." },
];

export function categoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
export function categoryByAirtableName(name: string | null) {
  return categories.find((c) => c.airtableName === name);
}
export function cityBySlug(slug: string) {
  return cities.find((c) => c.slug === slug);
}
export function cityByName(name: string | null) {
  return cities.find((c) => c.name === name);
}
