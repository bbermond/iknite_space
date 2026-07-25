import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/taxonomy";
import { getPublishedBusinesses } from "@/lib/businesses";
import { countLabel } from "@/lib/format";
import { Reveal } from "@/components/reveal";
import { PlusCorners } from "@/components/section";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Wellness categories in the South Bay",
  description:
    "Seven categories of vetted wellness care — med spas, functional and longevity medicine, medical weight loss, hormone clinics, IV lounges, and more.",
};

export default async function CategoriesPage() {
  const businesses = await getPublishedBusinesses();

  return (
    <>
      <div className="wash-fern border-b hairline">
        <div className="mx-auto max-w-6xl px-5 sm:px-10 pt-14 pb-10">
          <p className="micro text-fern mb-3">Browse by category</p>
          <h1 className="display text-3xl sm:text-5xl max-w-[18ch]">
            Seven kinds of care, one standard of vetting.
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-10 py-12">
        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((cat, i) => {
            const count = businesses.filter((b) => b.category === cat.airtableName).length;
            return (
              <Reveal key={cat.slug} delay={i * 40}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="relative block border hairline bg-paper p-7 no-underline card-hover h-full"
                >
                  <PlusCorners />
                  <p className="micro text-fern mb-3">{countLabel(count, "practice")}</p>
                  <h2 className="display text-2xl text-ink mb-2">{cat.name}</h2>
                  <p className="text-[13px] text-ink-soft leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  <span className="micro text-fern">Explore {cat.shortName} →</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </>
  );
}
