"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SocialIcon from "@/components/SocialIcon";

type NavigationCategory = { slug: string; name: string };

const categories = [
  ["history", "इतिहास और विरासत"],
  ["farming", "खेती-बाड़ी"],
  ["kisan", "किसान"],
  ["wisdom", "बुजुर्गों की सीख"],
  ["heritage", "सांस्कृतिक विरासत"],
  ["pashupalan", "पशुपालन"],
  ["food", "खान-पान"],
] as const;
const fallbackCategories: NavigationCategory[] = categories.map(
  ([slug, name]) => ({ slug, name }),
);
const socials = [
  ["facebook", "https://www.facebook.com/507Head/", "Facebook"],
  ["instagram", "https://www.instagram.com/507head/", "Instagram"],
  [
    "youtube",
    "https://www.youtube.com/channel/UC0QF1fncNE4Z8G8ryNa4DiQ",
    "YouTube",
  ],
] as const;

function Header({
  categories = fallbackCategories,
}: {
  categories?: NavigationCategory[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isCategoryPage =
    pathname.startsWith("/categories/") ||
    pathname.startsWith("/category/") ||
    pathname === "/categories" ||
    pathname === "/categories/";
  const isCategoryActive = (slug: string) =>
    pathname === `/categories/${slug}` ||
    pathname.startsWith(`/categories/${slug}/`) ||
    pathname === `/category/${slug}` ||
    pathname.startsWith(`/category/${slug}/`);
  const isAboutPage = pathname === "/about" || pathname.startsWith("/about/");
  const navCategories = categories.slice(0, 6);
  const [hasScrolled, setHasScrolled] = useState(
    !isHomepage && !isCategoryPage,
  );
  const usesHeroOverlay = (isHomepage || isCategoryPage) && !hasScrolled;
  const usesBrownNavbar = (!isHomepage && !isCategoryPage) || hasScrolled;
  // Keep the white navigation pill both over the home hero and after scrolling.
  const usesWhitePillNav = usesBrownNavbar || usesHeroOverlay;
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const updateHeader = () => {
      const scrolled = isHomepage
        ? window.scrollY > 40
        : isCategoryPage
          ? window.scrollY > 40
          : true;
      setHasScrolled(scrolled);
      headerRef.current?.setAttribute("data-scrolled", String(scrolled));
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    document.addEventListener("scroll", updateHeader, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateHeader);
      document.removeEventListener("scroll", updateHeader);
    };
  }, [isHomepage, isCategoryPage]);

  return (
    <>
      <header
        ref={headerRef}
        data-scrolled={hasScrolled ? "true" : "false"}
        data-brown-navbar={usesBrownNavbar ? "true" : "false"}
        data-home-hero-overlay={usesHeroOverlay ? "true" : "false"}
        className={`top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
          isHomepage || isCategoryPage ? "fixed inset-x-0" : "sticky"
        } ${
          usesHeroOverlay
            ? "border-b border-transparent bg-transparent shadow-none"
            : usesBrownNavbar
              ? "border-b border-white/15 bg-[#542A19] shadow-lg shadow-[#2c1309]/25"
              : "border-b border-[#e5ddd3] bg-white shadow-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-1.5 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <Link
            href="/"
            prefetch
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <Image
              src="/images/507-head-logo-brown.png"
              alt="507 हैड"
              width={96}
              height={96}
              className="logo-handbook-tone h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-2xl border border-white/70 bg-white object-cover shadow-lg"
            />
            <span className="min-w-0 leading-tight">
              <strong
                className={`block text-base sm:text-2xl font-black tracking-tight ${
                  usesHeroOverlay || usesBrownNavbar
                    ? "text-white drop-shadow-md"
                    : "text-[#8a4b1f]"
                }`}
              >
                507 हैड
              </strong>
              <small
                className={`block text-[11px] sm:text-xs font-semibold whitespace-nowrap ${
                  usesHeroOverlay || usesBrownNavbar
                    ? "text-[#fff1d4]"
                    : "text-[#8a4b1f]"
                }`}
              >
                जल, प्रकृति और जनजीवन
              </small>
            </span>
          </Link>
          <nav
            className={`desktop-header-nav hidden items-center text-sm font-semibold xl:flex ${
              usesWhitePillNav
                ? "navbar-white-pill rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-[#542A19] shadow-lg"
                : usesBrownNavbar
                  ? "gap-5 text-white"
                  : "gap-5 text-[#8a4b1f]"
            }`}
          >
            <Link
              href="/"
              prefetch
              aria-current={isHomepage ? "page" : undefined}
              className={`font-bold ${isHomepage ? "nav-active-link" : ""} ${
                usesWhitePillNav
                  ? "rounded-full px-3 py-1.5 text-[#542A19] hover:bg-[#f6ebe2]"
                  : usesBrownNavbar
                    ? "text-white hover:text-[#fff1d4]"
                    : "text-[#8a4b1f]"
              }`}
            >
              होम
            </Link>
            {navCategories.map(({ slug, name }) => {
              const isActive = isCategoryActive(slug);
              return (
                <Link
                  key={slug}
                  href={`/categories/${slug}`}
                  prefetch
                  aria-current={isActive ? "page" : undefined}
                  className={`transition-colors whitespace-nowrap ${isActive ? "nav-active-link" : ""} ${
                    usesWhitePillNav
                      ? "rounded-full px-3 py-1.5 text-[#542A19] hover:bg-[#f6ebe2]"
                      : usesBrownNavbar
                        ? "text-white hover:text-[#fff1d4]"
                        : "hover:text-[#6b3915]"
                  }`}
                >
                  {name}
                </Link>
              );
            })}
            <Link
              href="/about"
              prefetch
              aria-current={isAboutPage ? "page" : undefined}
              className={`transition-colors whitespace-nowrap ${isAboutPage ? "nav-active-link font-bold" : ""} ${
                usesWhitePillNav
                  ? "rounded-full px-3 py-1.5 text-[#542A19] hover:bg-[#f6ebe2]"
                  : usesBrownNavbar
                    ? "text-white hover:text-[#fff1d4]"
                    : "hover:text-[#6b3915]"
              }`}
            >
              हमारे बारे में
            </Link>
          </nav>
          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            {socials.map(([name, href, label]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition duration-200 hover:-translate-y-0.5 sm:h-10 sm:w-10 ${
                  usesWhitePillNav
                    ? "border-white bg-white text-[#542A19] hover:bg-[#f5f5f5]"
                    : usesBrownNavbar
                      ? "border-white/80 bg-white text-[#542A19] hover:bg-[#f5f5f5]"
                      : "border-[#8a4b1f] bg-white text-[#8a4b1f] hover:bg-[#f5f5f5]"
                }`}
              >
                <SocialIcon name={name} className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            ))}
          </div>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-site-menu"
            aria-label={menuOpen ? "मेनू बंद करें" : "मेनू खोलें"}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            className={`grid h-10 w-10 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-xl border transition focus:outline-none focus:ring-2 focus:ring-[#245d92] focus:ring-offset-2 xl:hidden ${
              usesWhitePillNav && !usesBrownNavbar
                ? "border-white/80 bg-white/95 text-[#542A19] hover:bg-white"
                : usesBrownNavbar
                  ? "border-white/25 bg-white/10 text-white hover:bg-white/25"
                  : "border-[#e5ddd3] text-[#6b3915] hover:bg-[#F7F4DE]"
            }`}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
        {menuOpen ? (
          <div
            id="mobile-site-menu"
            className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-[#eadfd8] bg-white px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-xl sm:px-4 sm:py-4 xl:hidden"
          >
            <nav aria-label="Mobile navigation" className="grid gap-1">
              <Link
                href="/"
                prefetch
                onClick={() => setMenuOpen(false)}
                aria-current={isHomepage ? "page" : undefined}
                className={`rounded-lg px-4 py-3 text-sm transition text-[#542A19] ${
                  isHomepage
                    ? "active-mobile-link bg-[#f2e5df] font-bold text-[#542A19] shadow-sm"
                    : "font-semibold text-[#542A19] hover:bg-[#f8f1ed]"
                }`}
              >
                होम
              </Link>
              {navCategories.map(({ slug, name }) => {
                const isActive = isCategoryActive(slug);
                return (
                  <Link
                    key={slug}
                    href={`/categories/${slug}`}
                    prefetch
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-lg px-4 py-3 text-sm transition text-[#542A19] ${
                      isActive
                        ? "active-mobile-link bg-[#f2e5df] font-bold text-[#542A19] shadow-sm"
                        : "font-semibold text-[#542A19] hover:bg-[#f8f1ed]"
                    }`}
                  >
                    {name}
                  </Link>
                );
              })}
              <Link
                href="/about"
                prefetch
                onClick={() => setMenuOpen(false)}
                aria-current={isAboutPage ? "page" : undefined}
                className={`rounded-lg px-4 py-3 text-sm transition text-[#542A19] ${
                  isAboutPage
                    ? "active-mobile-link bg-[#f2e5df] font-bold text-[#542A19] shadow-sm"
                    : "font-semibold text-[#542A19] hover:bg-[#f8f1ed]"
                }`}
              >
                हमारे बारे में
              </Link>
              {categories.length > 6 && (
                <Link
                  href="/categories"
                  prefetch
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-[#8a4b1f] hover:bg-[#f8f1ed]"
                >
                  सभी श्रेणियाँ ({categories.length}) →
                </Link>
              )}
            </nav>
            <div className="mt-4 flex gap-3 border-t border-[#eadfd8] pt-4">
              {socials.map(([name, href, label]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="mobile-social-icon flex h-11 w-11 items-center justify-center rounded-full border border-[#542A19]/30 bg-[#542A19] text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#f4c978] hover:bg-[#f4c978] hover:text-[#542A19] focus-visible:outline-[#542A19]"
                >
                  <SocialIcon name={name} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        ) : null}
        <nav aria-label="श्रेणियाँ" className="hidden">
          <Link
            href="/"
            prefetch
            className="shrink-0 snap-start text-[#8a4b1f]"
          >
            होम
          </Link>
          {categories.map(({ slug, name }) => (
            <Link
              key={slug}
              href={`/categories/${slug}`}
              prefetch
              className="shrink-0 snap-start hover:text-[#8a4b1f]"
            >
              {name}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}

function Footer({
  categories = fallbackCategories,
}: {
  categories?: NavigationCategory[];
}) {
  return (
    <footer
      className="border-t border-[#e5c999] bg-[#fff8eb] bg-cover bg-bottom bg-no-repeat pb-0 pt-5 text-[#55331d]"
      style={{ backgroundImage: "url('/images/footer-background.png')" }}
    >
      <div className="mx-auto grid max-w-5xl gap-8 px-4 pb-12 max-sm:grid-cols-2 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.45fr_0.95fr_0.95fr_1fr] lg:gap-4">
        <div className="col-span-2 space-y-2 sm:col-auto">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/507-head-logo-brown.png"
              alt="507 हैड"
              width={96}
              height={96}
              className="logo-handbook-tone h-12 w-12 rounded-lg bg-white object-cover"
            />
            <span className="leading-tight">
              <strong className="block text-xl font-black text-[#222]">
                507 हैड
              </strong>
              <small className="text-xs text-[#777]">
                जल, प्रकृति और जनजीवन
              </small>
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-[#666]">
            बीकानेर के छतरगढ़ क्षेत्र से संचालित स्वतंत्र हिंदी न्यूज़ पोर्टल।
            थार रेगिस्तान, किसान, पशुपालन और मरुस्थलीय विरासत की सच्ची आवाज़।
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold text-[#552b12]">
            प्रमुख श्रेणियाँ
          </h4>
          <ul className="space-y-2 text-xs">
            {categories.map(({ slug, name }) => (
              <li key={slug}>
                <Link
                  href={`/categories/${slug}`}
                  className="hover:text-[#8a4b1f]"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold text-[#552b12]">
            507 Head लिंक
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/about" className="hover:text-[#8a4b1f]">
                हमारे बारे में
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#8a4b1f]">
                संपर्क करें
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-[#8a4b1f]">
                गोपनीयता नीति
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#8a4b1f]">
                नियम एवं शर्तें
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 sm:col-auto">
          <h4 className="mb-4 text-sm font-bold text-[#552b12]">
            507 हैड से जुड़े रहें
          </h4>
          <div className="flex items-center gap-3">
            {socials.map(([name, href, label]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="footer-social-icon grid h-11 w-11 place-items-center rounded-full border border-[#542A19] bg-[#542A19] text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#f4c978] hover:bg-[#f4c978] hover:text-[#542A19] focus-visible:outline-[#542A19]"
              >
                <SocialIcon name={name} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="relative top-1 mx-auto mt-4 flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-3 text-center font-[Mukta] text-[12px] leading-4 text-[#FFFFFF] drop-shadow-[0_1px_2px_rgba(67,20,8,0.9)] max-sm:-top-12 sm:h-14 sm:flex-row sm:gap-4 sm:p-[20px_24px] sm:text-left">
        <p className="relative top-2 text-[#FFFFFF]">
          © 2026 507 हैड। सर्वाधिकार सुरक्षित।
        </p>
      </div>
    </footer>
  );
}

export default function PublicSiteChrome({
  children,
  categories,
}: {
  children: React.ReactNode;
  categories?: NavigationCategory[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const prefetchedRoutes = useRef(new Set<string>());
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const observed = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const heading = entry.target;
          const distance = window.matchMedia("(max-width: 639px)").matches
            ? 20
            : 40;
          const timing = { duration: 750, easing: "ease-out" };
          if (heading.matches(".latest-news-heading__content")) {
            heading.animate(
              [{ translate: `-${distance}px 0` }, { translate: "0 0" }],
              { ...timing, pseudoElement: "::before" },
            );
            heading.animate(
              [{ translate: `${distance}px 0` }, { translate: "0 0" }],
              { ...timing, pseudoElement: "::after" },
            );
          } else {
            const title = heading.querySelector("h3");
            heading
              .querySelectorAll(".home-history-heading__image")
              .forEach((image) => {
                const left =
                  title &&
                  Boolean(
                    image.compareDocumentPosition(title) &
                    Node.DOCUMENT_POSITION_FOLLOWING,
                  );
                image.animate(
                  [
                    { translate: `${left ? -distance : distance}px 0` },
                    { translate: "0 0" },
                  ],
                  timing,
                );
              });
          }
          observer.unobserve(heading);
        }
      },
      { threshold: 0.25 },
    );
    const observeHeadings = () => {
      document
        .querySelectorAll(
          ".latest-news-heading__content, .home-history-heading",
        )
        .forEach((heading) => {
          if (!observed.has(heading)) {
            observed.add(heading);
            observer.observe(heading);
          }
        });
    };
    observeHeadings();
    const changes = new MutationObserver(observeHeadings);
    changes.observe(document.body, { childList: true, subtree: true });
    return () => {
      changes.disconnect();
      observer.disconnect();
    };
  }, [pathname]);
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const observed = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const fromRight = entry.target.closest(".scroll-reveal-from-right");
          const distance = window.matchMedia("(max-width: 639px)").matches
            ? 20
            : 36;
          entry.target.animate(
            [
              { translate: `${fromRight ? distance : -distance}px 0` },
              { translate: "0 0" },
            ],
            { duration: 600, easing: "ease-out" },
          );
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.25 },
    );

    const observeCards = () => {
      document.querySelectorAll(".scroll-reveal-card").forEach((card) => {
        if (!observed.has(card)) {
          observed.add(card);
          observer.observe(card);
        }
      });
    };
    observeCards();
    const changes = new MutationObserver(observeCards);
    changes.observe(document.body, { childList: true, subtree: true });
    return () => {
      changes.disconnect();
      observer.disconnect();
    };
  }, [pathname]);
  useEffect(() => {
    const prefetch = (href: string) => {
      if (!href.startsWith("/") || prefetchedRoutes.current.has(href)) return;
      prefetchedRoutes.current.add(href);
      router.prefetch(href);
    };

    const prefetchOnIntent = (event: Event) => {
      const target = event.target as HTMLElement;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      const href = link?.getAttribute("href");
      if (href) prefetch(href);
    };

    const openCard = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("a, button, input, textarea, select, label")) return;
      const card = target.closest<HTMLElement>("[data-article-href]");
      if (card?.dataset.articleHref) {
        prefetch(card.dataset.articleHref);
        router.push(card.dataset.articleHref);
      }
    };
    document.addEventListener("pointerover", prefetchOnIntent, {
      passive: true,
    });
    document.addEventListener("focusin", prefetchOnIntent);
    document.addEventListener("click", openCard);
    return () => {
      document.removeEventListener("pointerover", prefetchOnIntent);
      document.removeEventListener("focusin", prefetchOnIntent);
      document.removeEventListener("click", openCard);
    };
  }, [router]);
  if (pathname.startsWith("/admin") || pathname.startsWith("/api"))
    return <>{children}</>;
  return (
    <div className="public-site-shell">
      <Header categories={categories} />
      <div className="public-site-content">{children}</div>
      <Footer categories={categories} />
    </div>
  );
}
