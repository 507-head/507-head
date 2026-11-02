import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "सभी श्रेणियाँ | 507 Head",
  description: "507 हैड की सभी विषय श्रेणियाँ देखें।",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-[#fcf9f5] text-[#222222]">
      {/* Category Hero Banner */}
      <section className="category-pattern-hero py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-[#8a4b1f] mb-4">
            <Link href="/" className="hover:underline">
              होम
            </Link>
            <span>›</span>
            <span className="font-bold">सभी श्रेणियाँ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#222] tracking-tight">
            सभी श्रेणियाँ
          </h1>

          <p className="mt-4 max-w-3xl text-base sm:text-lg text-[#666] leading-relaxed">
            थार, खेती, संस्कृति और ग्रामीण जीवन से जुड़ी अपनी पसंद की श्रेणी चुनें।
          </p>

          <div className="mt-4 text-xs font-semibold text-[#8a4b1f]">
            कुल {categories.length} मुख्य विषय श्रेणियाँ
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {categories.map((category) => (
            <Link
              key={category.id || category.slug}
              href={`/categories/${category.slug}`}
              className="group relative flex items-center justify-between rounded-2xl border border-[#eadbc9] bg-white p-5 sm:p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#8a4b1f] hover:bg-gradient-to-b hover:from-white hover:to-[#fffaf5] hover:shadow-md"
            >
              <div className="min-w-0 space-y-1.5 pr-4">
                <h2 className="text-lg sm:text-xl font-black text-[#542a19] transition-colors group-hover:text-[#8a4b1f]">
                  {category.name}
                </h2>
                {category.description && (
                  <p className="line-clamp-2 text-sm leading-relaxed text-[#6b625a]">
                    {category.description}
                  </p>
                )}
                <span
                  aria-hidden="true"
                  className="block h-1 w-6 rounded-full bg-[#8a4b1f]/35 transition-all duration-200 group-hover:w-10 group-hover:bg-[#8a4b1f]"
                />
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F4DE] text-[#8a4b1f] transition-all duration-200 group-hover:bg-[#8a4b1f] group-hover:text-white">
                <span
                  aria-hidden="true"
                  className="text-base font-bold transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
