import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getAllPublishedArticles, getCategories } from "@/lib/content";
import { getHomepageInstagramReels } from "@/lib/instagram";
import HeroSlider from "@/components/HeroSlider";
import RemoteArticleImage from "@/components/RemoteArticleImage";
import InstagramReelCarousel from "@/components/InstagramReelCarousel";
import { FaCow, FaBowlFood } from "react-icons/fa6";

export const instant = false;

export const metadata: Metadata = {
  title: "507 Head | हिंदी समाचार, थार मरुस्थल, खेती और जनजीवन",
  description:
    "507 हैड (छतरगढ़, बीकानेर) का प्रमुख डिजिटल पोर्टल। थार रेगिस्तान, नहरी पानी, पारंपरिक खेती, राठी गाय और ग्रामीण विरासत की प्रामाणिक रिपोर्ट।",
  openGraph: {
    title: "507 Head | हिंदी समाचार, थार मरुस्थल, खेती और जनजीवन",
    description:
      "507 हैड (छतरगढ़, बीकानेर) का प्रमुख डिजिटल पोर्टल। थार रेगिस्तान, नहरी पानी, पारंपरिक खेती और ग्रामीण विरासत।",
    locale: "hi_IN",
    type: "website",
  },
};

const INSTAGRAM_URL = "https://www.instagram.com/507head/";

// Only these editor-curated stories belong in the home hero slider. Publishing
// an article adds it to listings and its category, not to the hero automatically.
const HERO_ARTICLE_SLUGS = [
  "thar-registan-507-head-itihas",
  "nahari-kshetra-kheti-unnat-tarike",
  "rathi-gaay-marusthal-ki-kamdhenu",
  "thar-sanskriti-lokgeet-parampara",
  "kisan-mehanat-anubhav-desh-ki-shaan",
];

const HERO_IMAGES: Record<string, string> = {
  "thar-registan-507-head-itihas": "/images/hero-history-canal-v2.png",
  "nahari-kshetra-kheti-unnat-tarike":
    "/images/hero-water-efficient-farming-v2.png",
  "rathi-gaay-marusthal-ki-kamdhenu": "/images/hero-rathi-cow-v2.png",
  "thar-sanskriti-lokgeet-parampara": "/images/hero-thar-folk-music-v2.png",
  "kisan-mehanat-anubhav-desh-ki-shaan": "/images/hero-desert-farmers-v2.png",
};

const fallbackReels = [
  {
    title: "507 हैड — थार रेगिस्तान की अनूठी झलक",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEyTtGBClDFHDUPJL2qK7vosE24ZreCkLg1GYZi5esyw&s=10",
    url: INSTAGRAM_URL,
  },
  {
    title: "थार के धोरों में सूर्यास्त",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQMaA7LGtefXqSnLZwt-N6LgFaXYmXBgy3ff3dMbbVww&s=10",
    url: INSTAGRAM_URL,
  },
  {
    title: "राठी गोवंश की समृद्ध परंपरा",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShUNJzXGSMFEBS2UDR2DIynpv0LU5m1RGEq81msYDZug&s=10",
    url: INSTAGRAM_URL,
  },
  {
    title: "507 हैड — ग्रामीण जीवन की कहानी",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPzlis4w-yX_1kMaJMlCEPEKNeP7JcmUv3UUa5tN9rIg&s=10",
    url: INSTAGRAM_URL,
  },
];

interface CategoryTheme {
  sectionBg: string;
  borderColor: string;
  cardBg: string;
  buttonBg: string;
}

const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  // 1. इतिहास और विरासत (Sandstone Amber)
  history: {
    sectionBg: "bg-gradient-to-b from-[#FAF2E4] to-[#F3E5D0]",
    borderColor: "border-[#E8D4BB]",
    cardBg: "bg-[#FFFDF9]/95 border-[#E5D2BA]",
    buttonBg: "bg-[#EFE0CB] text-[#8a4b1f] hover:bg-[#8a4b1f] hover:text-white",
  },
  // 2. खेती-बाड़ी (Pastoral Green)
  farming: {
    sectionBg: "bg-gradient-to-b from-[#F0F6EA] to-[#E2EDD6]",
    borderColor: "border-[#D0E2C2]",
    cardBg: "bg-[#FEFFFC]/95 border-[#CFE1C1]",
    buttonBg: "bg-[#E1EDD5] text-[#3f6323] hover:bg-[#3f6323] hover:text-white",
  },
  // 3. किसान (Harvest Golden Wheat)
  kisan: {
    sectionBg: "bg-gradient-to-b from-[#FCF5E5] to-[#F8ECCB]",
    borderColor: "border-[#EAD5AA]",
    cardBg: "bg-[#FFFDF7]/95 border-[#E9D4A8]",
    buttonBg: "bg-[#F7EAC8] text-[#85561a] hover:bg-[#85561a] hover:text-white",
  },
  // 4. बुजुर्गों की सीख (Warm Choupal Clay)
  wisdom: {
    sectionBg: "bg-gradient-to-b from-[#FAF1E8] to-[#F1E2D2]",
    borderColor: "border-[#E2CDBD]",
    cardBg: "bg-[#FFFDFB]/95 border-[#E1CCBC]",
    buttonBg: "bg-[#EFE0D0] text-[#7d4e28] hover:bg-[#7d4e28] hover:text-white",
  },
  // 5. सांस्कृतिक विरासत (Festive Royal Terracotta)
  heritage: {
    sectionBg: "bg-gradient-to-b from-[#FCF0EB] to-[#F7DDD2]",
    borderColor: "border-[#ECCAC0]",
    cardBg: "bg-[#FFFCFB]/95 border-[#EBC8BD]",
    buttonBg: "bg-[#F6DCD0] text-[#8e3c23] hover:bg-[#8e3c23] hover:text-white",
  },
  // 6. पशुपालन (Meadow Pasture)
  pashupalan: {
    sectionBg: "bg-gradient-to-b from-[#F3F7EC] to-[#E6EEDD]",
    borderColor: "border-[#D5E1CA]",
    cardBg: "bg-[#FEFFFC]/95 border-[#D4E0C9]",
    buttonBg: "bg-[#E5EEDC] text-[#4d662e] hover:bg-[#4d662e] hover:text-white",
  },
  // 7. खान-पान (Warm Saffron Hearth)
  food: {
    sectionBg: "bg-gradient-to-b from-[#FDF3EA] to-[#F9E5D2]",
    borderColor: "border-[#ECD3BC]",
    cardBg: "bg-[#FFFDF9]/95 border-[#EBD2BB]",
    buttonBg: "bg-[#F8E5D1] text-[#934f18] hover:bg-[#934f18] hover:text-white",
  },
};

const DEFAULT_CATEGORY_THEME: CategoryTheme = {
  sectionBg: "bg-gradient-to-b from-[#FCF9F5] to-[#F7F2EA]",
  borderColor: "border-[#E5DDD3]",
  cardBg: "bg-[#F7F6EE] border-[#E5DDD3]",
  buttonBg: "bg-[#F7F4DE] text-[#8a4b1f] hover:bg-[#8a4b1f] hover:text-white",
};

const CATEGORY_ACCENTS: Record<string, string> = {
  history: "bg-[#8a4b1f]",
  farming: "bg-[#4d662e]",
  kisan: "bg-[#9a681d]",
  wisdom: "bg-[#7d4e28]",
  heritage: "bg-[#8e3c23]",
  pashupalan: "bg-[#4d662e]",
  food: "bg-[#934f18]",
};

interface CategoryMeta {
  iconBg: string;
  iconColor: string;
  accentColor: string;
  borderHover: string;
  tagline: string;
  icon: React.ReactNode;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  history: {
    iconBg: "bg-[#F7EFE4]",
    iconColor: "text-[#8a4b1f]",
    accentColor: "bg-[#8a4b1f]",
    borderHover: "hover:border-[#8a4b1f]",
    tagline: "धरोहर व इतिहास",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 21h18" />
        <path d="M5 21V10l2-2 2 2v11" />
        <path d="M15 21V10l2-2 2 2v11" />
        <path d="M9 13h6" />
        <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
        <path d="M10 6.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2.5" />
      </svg>
    ),
  },
  farming: {
    iconBg: "bg-[#EFF6E8]",
    iconColor: "text-[#446624]",
    accentColor: "bg-[#4d662e]",
    borderHover: "hover:border-[#4d662e]",
    tagline: "उन्नत व नहरी कृषि",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22v-9" />
        <path d="M12 13a4.5 4.5 0 0 0 4.5-4.5c0-3-4.5-5.5-4.5-5.5s-4.5 2.5-4.5 5.5A4.5 4.5 0 0 0 12 13Z" />
        <path d="M12 17a4 4 0 0 1 4-4" />
        <path d="M12 19a4 4 0 0 0-4-4" />
      </svg>
    ),
  },
  kisan: {
    iconBg: "bg-[#FDF3DE]",
    iconColor: "text-[#9a681d]",
    accentColor: "bg-[#9a681d]",
    borderHover: "hover:border-[#9a681d]",
    tagline: "मेहनत व जनजीवन",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 22 16 8" />
        <path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z" />
        <path d="M20 2h2v2a4 4 0 0 1-4 4h-2V6a4 4 0 0 1 4-4Z" />
        <path d="M11.47 17.47 13 19l1.53-1.53a3.5 3.5 0 0 0 0-4.94L13 11l-1.53 1.53a3.5 3.5 0 0 0 0 4.94Z" />
        <path d="M15.47 13.47 17 15l1.53-1.53a3.5 3.5 0 0 0 0-4.94L17 7l-1.53 1.53a3.5 3.5 0 0 0 0 4.94Z" />
      </svg>
    ),
  },
  wisdom: {
    iconBg: "bg-[#F9EDE1]",
    iconColor: "text-[#7d4e28]",
    accentColor: "bg-[#7d4e28]",
    borderHover: "hover:border-[#7d4e28]",
    tagline: "लोक समझ व सीख",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
        <path d="M8 7h8" />
        <path d="M8 11h8" />
        <path d="M8 15h5" />
      </svg>
    ),
  },
  heritage: {
    iconBg: "bg-[#FCEAE3]",
    iconColor: "text-[#8e3c23]",
    accentColor: "bg-[#8e3c23]",
    borderHover: "hover:border-[#8e3c23]",
    tagline: "लोक कला व परंपरा",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
      </svg>
    ),
  },
  pashupalan: {
    iconBg: "bg-[#EEF5E7]",
    iconColor: "text-[#416127]",
    accentColor: "bg-[#4d662e]",
    borderHover: "hover:border-[#4d662e]",
    tagline: "राठी गाय व गोधन",
    icon: <FaCow className="h-5 w-5" aria-hidden="true" />,
  },
  food: {
    iconBg: "bg-[#FDF0E1]",
    iconColor: "text-[#934f18]",
    accentColor: "bg-[#934f18]",
    borderHover: "hover:border-[#934f18]",
    tagline: "स्वाद व मरु व्यंजन",
    icon: <FaBowlFood className="h-5 w-5" aria-hidden="true" />,
  },
};

const DEFAULT_CATEGORY_META: CategoryMeta = {
  iconBg: "bg-[#F7F4DE]",
  iconColor: "text-[#8a4b1f]",
  accentColor: "bg-[#8a4b1f]",
  borderHover: "hover:border-[#8a4b1f]",
  tagline: "विशेष रिपोर्ट व लेख",
  icon: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
};

export default async function Home() {
  const [allArticles, instagramReels, categories] = await Promise.all([
    getAllPublishedArticles(),
    getHomepageInstagramReels(),
    getCategories(),
  ]);
  const reels =
    instagramReels.length > 0
      ? instagramReels
      : fallbackReels.map((reel, index) => ({
          ...reel,
          id: `fallback-${index}`,
        }));
  const featured =
    allArticles.find(
      (article) => article.slug === "thar-registan-507-head-itihas",
    ) ||
    allArticles.find((article) => article.is_featured) ||
    allArticles[0];

  // Latest cards are intentionally separate from the featured story. Do not
  // repeat it as a fallback: when fewer than six posts exist, show fewer cards.
  const seenLatestSlugs = new Set<string>();
  const latestArticles = allArticles
    .filter((article) => {
      if (article.id === featured.id || article.slug === featured.slug)
        return false;
      if (seenLatestSlugs.has(article.slug)) return false;
      seenLatestSlugs.add(article.slug);
      return true;
    })
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
    )
    .slice(0, 6);
  const heroSlides = HERO_ARTICLE_SLUGS.map((slug) =>
    allArticles.find((article) => article.slug === slug),
  )
    .filter((article): article is (typeof allArticles)[number] =>
      Boolean(article),
    )
    .map((article) => ({
      image: HERO_IMAGES[article.slug],
      title: article.title,
      excerpt: article.excerpt,
      href: `/blog/${article.slug}`,
      category: article.category_name,
    }));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://507head.com";
  const homepageJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "507 Head",
      url: siteUrl,
      inLanguage: "hi-IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "507 Head",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
    },
  ];

  return (
    <main className="public-page min-h-screen bg-[#fcf9f5] text-[#222222]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Featured Story Hero */}
      <HeroSlider slides={heroSlides} />

      {/* Categories section */}
      <section
        aria-labelledby="homepage-categories-title"
        className="border-b border-[#dfcbb5] bg-gradient-to-b from-[#f9f2e7] via-[#f5e9d9] to-[#eee0cc] py-7 sm:py-9"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-5 flex items-end justify-between gap-4 sm:mb-7">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full bg-[#8a4b1f]"
                  aria-hidden="true"
                />
                <p className="text-xs font-bold uppercase tracking-wider text-[#8a4b1f]">
                  विषय चुनें
                </p>
              </div>
              <h2
                id="homepage-categories-title"
                className="mt-1 text-2xl font-black tracking-tight text-[#542a19] sm:text-3xl"
              >
                श्रेणियाँ
              </h2>
            </div>
            <Link
              href="/categories"
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#8a4b1f] bg-white px-3.5 py-1.5 text-xs font-bold text-[#8a4b1f] shadow-xs transition hover:bg-[#8a4b1f] hover:text-white sm:px-4 sm:py-2"
            >
              <span>सभी श्रेणियाँ देखें</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          <div
            aria-label="श्रेणियों की सूची"
            className="-mx-4 flex gap-3 overflow-x-auto px-4 pt-2 pb-2 scrollbar-none snap-x sm:mx-0 sm:grid sm:grid-cols-3 md:grid-cols-6 sm:gap-3.5 sm:px-0 sm:pt-2 sm:pb-2 sm:overflow-visible lg:grid-cols-6"
          >
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id || category.slug}
                href={`/categories/${category.slug}`}
                className="group relative flex min-h-[64px] w-36 shrink-0 snap-start flex-col items-center justify-center rounded-2xl border border-[#eadbc9] bg-white px-3.5 py-3 text-center shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#8a4b1f] hover:bg-gradient-to-b hover:from-white hover:to-[#fff9f3] hover:shadow-md sm:w-auto sm:px-4 sm:py-3.5"
              >
                <span className="text-sm sm:text-base font-bold leading-snug text-[#422115] transition-colors group-hover:text-[#8a4b1f] line-clamp-2">
                  {category.name}
                </span>

                <span
                  aria-hidden="true"
                  className="mt-2 h-1 w-6 rounded-full bg-[#8a4b1f]/35 transition-all duration-200 group-hover:w-10 group-hover:bg-[#8a4b1f]"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hidden border-b border-[#e5ddd3] bg-gradient-to-b from-[#F7F4DE] to-[#fcf9f5] py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#8a4b1f] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#8a4b1f]">
              प्रमुख समाचार / FEATURED STORY
            </span>
          </div>

          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            {/* Left Content */}
            <div className="space-y-4 md:col-span-6">
              <Link
                href={`/categories/${featured.category_slug}`}
                className="inline-block rounded-full bg-[#8a4b1f]/10 px-3.5 py-1 text-xs font-bold text-[#8a4b1f]"
              >
                {featured.category_name}
              </Link>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#222] tracking-tight leading-tight hover:text-[#8a4b1f]">
                <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
              </h1>

              <p className="text-base sm:text-lg text-[#666] leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>

              <div className="flex items-center gap-3 pt-2 text-xs text-[#777]">
                <span className="font-semibold text-[#333]">
                  {featured.author.name}
                </span>
                <span>•</span>
                <span>
                  {new Date(featured.published_at).toLocaleDateString("hi-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>{featured.reading_time_minutes} मिनट पठन</span>
              </div>

              <div className="pt-3">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#8a4b1f] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#6b3915]"
                >
                  पूरा लेख पढ़ें <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="md:col-span-6">
              <Link
                href={`/blog/${featured.slug}`}
                className="group relative block aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#e5ddd3] bg-[#F7F6EE] shadow-md"
              >
                <RemoteArticleImage
                  src={featured.featured_image_url}
                  alt={featured.featured_image_alt}
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {featured.category_name}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates / Latest News & Reports */}
      <section className="latest-news-section">
        <div className="latest-news-section__inner mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="latest-news-heading mb-8">
            <div className="latest-news-heading__content">
              <div className="latest-news-heading__title">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8a4b1f]">
                  लेटेस्ट अपडेट्स
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#222] mt-1">
                  ताज़ा लेख
                </h2>
              </div>
            </div>
            <div className="latest-news-divider" aria-hidden="true">
              <span />
              <b>✦</b>
              <span />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <article
                key={article.id}
                data-article-href={`/blog/${article.slug}`}
                className="scroll-reveal-card group flex flex-col overflow-hidden rounded-2xl border border-[#e5ddd3] bg-[#F7F6EE] transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <Link
                  href={`/blog/${article.slug}`}
                  className="relative aspect-[16/9] w-full overflow-hidden bg-[#eee]"
                >
                  <RemoteArticleImage
                    src={article.featured_image_url}
                    alt={article.featured_image_alt}
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {article.category_name}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs text-[#888]">
                    <span>
                      {new Date(article.published_at).toLocaleDateString(
                        "hi-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                    <span>•</span>
                    <span>{article.reading_time_minutes} मिनट</span>
                  </div>

                  <h3 className="text-lg font-bold leading-snug line-clamp-2 text-[#222] group-hover:text-[#8a4b1f]">
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#666] line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#f0e7dd] pt-4">
                    <span className="text-xs font-medium text-[#777]">
                      {article.author.name}
                    </span>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="text-xs font-bold text-[#8a4b1f] hover:underline"
                    >
                      पढ़ें →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reel Thumbnail Strip (Static Thumbnails linking to Instagram) */}
      <section className="reels-showcase-section border-y border-[#e5ddd3] bg-[#fafaf8] py-14">
        <div className="reels-showcase-section__inner mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8a4b1f]">
                झलकियाँ • REELS & PHOTOS
              </span>
              <h2 className="text-2xl font-black text-[#222] mt-1">
                507 हैड की तस्वीरें और वीडियो
              </h2>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-[#8a4b1f] hover:text-[#6b3915] transition-colors hidden sm:inline-flex"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="inline"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @507head पर फॉलो करें ↗
            </a>
          </div>

          <InstagramReelCarousel reels={reels} />
        </div>
      </section>

      {/* About 507 Head Section */}
      <section
        aria-labelledby="homepage-about-title"
        className="homepage-about-section relative border-y border-[#dfc5a6] bg-[#e8d5bc] py-14 sm:py-18 md:py-20 overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="homepage-about-background pointer-events-none absolute inset-0 bg-no-repeat"
          style={{ backgroundImage: "url('/images/about-fort-bg.jpg')" }}
        />
        {/* Keep text readable on the left and the desktop artwork clear on the right. */}
        <div
          aria-hidden="true"
          className="homepage-about-overlay pointer-events-none absolute inset-0"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-xl md:max-w-2xl lg:max-w-[620px] space-y-3.5 sm:space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dfc5a6] bg-white/90 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8a4b1f] shadow-xs">
              <span
                className="h-2 w-2 rounded-full bg-[#8a4b1f] animate-pulse"
                aria-hidden="true"
              />
              <span>ABOUT US • हमारे बारे में</span>
            </div>

            <h2
              id="homepage-about-title"
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#542a19] leading-[1.15]"
            >
              हमारे बारे में —{" "}
              <span className="text-[#8a4b1f]">507 हैड की कहानी</span>
            </h2>

            <p className="text-base sm:text-lg font-bold text-[#8a4b1f]">
              अपनी मिट्टी, अपनी पहचान, अपनी जीवंत गाथा
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-[#4a3222]">
              बीकानेर के छतरगढ़ अंचल में स्थित{" "}
              <strong className="text-[#542a19]">507 हैड</strong> केवल एक नहरी
              जल वितरण केंद्र नहीं, बल्कि थार मरुस्थल के रेतीले धोरों में जीवन,
              कड़े संघर्ष, नहरी क्रांति और ग्रामीण उत्थान की ऐतिहासिक पहचान है।
            </p>

            <p className="text-xs sm:text-sm leading-relaxed text-[#5e4433]">
              हमारा डिजिटल मंच पश्चिमी राजस्थान के किसानों के अनथक परिश्रम, नहरी
              खेती के आधुनिक तौर-तरीकों, राठी गोवंश की समृद्ध परंपरा, बुजुर्गों
              के अमूल्य अनुभवों और लोक संस्कृति को प्रामाणिकता के साथ सहेजने के
              लिए समर्पित है।
            </p>

            {/* Action Button */}
            <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-[#8a4b1f] hover:bg-[#542a19] px-7 py-3.5 text-xs sm:text-sm font-bold text-white hover:text-white shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 uppercase tracking-wide"
              >
                <span className="text-white hover:text-white">
                  और जानें / पूरा परिचय पढ़ें
                </span>
                <span
                  aria-hidden="true"
                  className="text-white hover:text-white transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Blocks: 3 cards per category with individual thematic backgrounds */}
      {categories.slice(0, 6).map((cat, sectionIndex) => {
        const catArticles = allArticles.filter(
          (a) => a.category_slug === cat.slug,
        );
        if (catArticles.length === 0) return null;

        const hasCustomHeading =
          cat.slug === "history" ||
          cat.slug === "farming" ||
          cat.slug === "kisan" ||
          cat.slug === "wisdom" ||
          cat.slug === "heritage" ||
          cat.slug === "pashupalan" ||
          cat.slug === "food";

        const theme = CATEGORY_THEMES[cat.slug] || DEFAULT_CATEGORY_THEME;

        return (
          <section
            key={cat.slug}
            className={`w-full py-8 sm:py-14 border-b transition-colors duration-200 ${sectionIndex % 2 === 0 ? "scroll-reveal-from-right" : ""} ${theme.sectionBg} ${theme.borderColor}`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div
                className={`mb-6 flex flex-wrap items-center justify-between gap-3 pb-3 ${hasCustomHeading ? "home-history-heading" : "border-b-2 border-[#8a4b1f]"}`}
              >
                <div className="flex items-center gap-3">
                  {!hasCustomHeading && (
                    <span className="h-6 w-1.5 rounded-full bg-[#8a4b1f]" />
                  )}
                  {cat.slug === "history" && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/images/history-ornament-left.png"
                      alt=""
                      aria-hidden="true"
                      className="home-history-heading__image history-heading-original"
                      style={{ transform: "scaleX(-1)" }}
                    />
                  )}
                  {cat.slug === "farming" && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/images/farming-ornament-left.png"
                      alt=""
                      aria-hidden="true"
                      className="home-history-heading__image home-history-heading__image--farming"
                    />
                  )}
                  {cat.slug === "kisan" && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/images/kisan-ornament-left.png"
                      alt=""
                      aria-hidden="true"
                      className="home-history-heading__image home-history-heading__image--farming"
                    />
                  )}
                  {cat.slug === "wisdom" && (
                    <span
                      aria-hidden="true"
                      className="home-history-heading__image home-history-heading__image--farming wisdom-heading-ornament wisdom-heading-ornament--left"
                    />
                  )}
                  {cat.slug === "heritage" && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/images/culture-ornament-left.png"
                      alt=""
                      aria-hidden="true"
                      className="home-history-heading__image home-history-heading__image--farming"
                    />
                  )}
                  {cat.slug === "pashupalan" && (
                    <span
                      aria-hidden="true"
                      className="home-history-heading__image home-history-heading__image--farming pashupalan-heading-ornament pashupalan-heading-ornament--left"
                    />
                  )}
                  {cat.slug === "food" && (
                    <span
                      aria-hidden="true"
                      className="home-history-heading__image home-history-heading__image--farming food-heading-ornament food-heading-ornament--left"
                    />
                  )}
                  <h3 className="text-2xl sm:text-3xl font-black text-[#222] tracking-tight">
                    {cat.name}
                  </h3>
                  {cat.slug === "history" && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/images/history-ornament-left.png"
                      alt=""
                      aria-hidden="true"
                      className="home-history-heading__image history-heading-original"
                    />
                  )}
                  {cat.slug === "farming" && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/images/farming-ornament-right.png"
                      alt=""
                      aria-hidden="true"
                      className="home-history-heading__image home-history-heading__image--farming"
                    />
                  )}
                  {cat.slug === "kisan" && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/images/kisan-ornament-right.png"
                      alt=""
                      aria-hidden="true"
                      className="home-history-heading__image home-history-heading__image--farming"
                    />
                  )}
                  {cat.slug === "wisdom" && (
                    <span
                      aria-hidden="true"
                      className="home-history-heading__image home-history-heading__image--farming wisdom-heading-ornament wisdom-heading-ornament--right"
                    />
                  )}
                  {cat.slug === "heritage" && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/images/culture-ornament-right.png"
                      alt=""
                      aria-hidden="true"
                      className="home-history-heading__image home-history-heading__image--farming"
                    />
                  )}
                  {cat.slug === "pashupalan" && (
                    <span
                      aria-hidden="true"
                      className="home-history-heading__image home-history-heading__image--farming pashupalan-heading-ornament pashupalan-heading-ornament--right"
                    />
                  )}
                  {cat.slug === "food" && (
                    <span
                      aria-hidden="true"
                      className="home-history-heading__image home-history-heading__image--farming food-heading-ornament food-heading-ornament--right"
                    />
                  )}
                </div>
                <Link
                  href={`/categories/${cat.slug}`}
                  className={`inline-flex cursor-pointer items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-bold transition shadow-sm ${theme.buttonBg}`}
                >
                  <span>सभी खबरें देखें</span>
                  <span aria-hidden="true">→</span>
                </Link>
                {hasCustomHeading && (
                  <div
                    className="home-history-heading__divider"
                    aria-hidden="true"
                  >
                    <span />
                    <i>✦</i>
                    <span />
                  </div>
                )}
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {catArticles.slice(0, 3).map((article) => (
                  <article
                    key={article.id}
                    data-article-href={`/blog/${article.slug}`}
                    className={`scroll-reveal-card group flex flex-col overflow-hidden rounded-xl border transition hover:-translate-y-1 hover:shadow-lg shadow-sm ${theme.cardBg}`}
                  >
                    <Link
                      href={`/blog/${article.slug}`}
                      className="relative aspect-[16/9] w-full overflow-hidden bg-[#eee]"
                    >
                      <RemoteArticleImage
                        src={article.featured_image_url}
                        alt={article.featured_image_alt}
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </Link>

                    <div className="p-5 flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="text-base font-bold leading-snug line-clamp-2 text-[#222] group-hover:text-[#8a4b1f]">
                          <Link href={`/blog/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h4>
                        <p className="mt-2 text-xs leading-relaxed text-[#666] line-clamp-2">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-[#f0e7dd] pt-3 text-xs">
                        <span className="text-[#888]">
                          {new Date(article.published_at).toLocaleDateString(
                            "hi-IN",
                            { day: "numeric", month: "short" },
                          )}
                        </span>
                        <Link
                          href={`/blog/${article.slug}`}
                          className="font-bold text-[#8a4b1f] hover:underline"
                        >
                          पढ़ें →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* 4-Column Footer */}
    </main>
  );
}
