"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const messages = {
  created: {
    text: "श्रेणी Supabase में जोड़ दी गई है।",
    className: "bg-green-50 text-green-800 border border-green-200",
  },
  updated: {
    text: "इस स्लग वाली श्रेणी पहले से थी, उसे Supabase में अपडेट और सक्रिय कर दिया गया है।",
    className: "bg-blue-50 text-blue-800 border border-blue-200",
  },
  edited: {
    text: "श्रेणी का नाम और subtitle अपडेट कर दिया गया है।",
    className: "bg-green-50 text-green-800 border border-green-200",
  },
  deleted: {
    text: "श्रेणी सफलतापूर्वक हटा दी गई है।",
    className: "bg-green-50 text-green-800 border border-green-200",
  },
  reordered: {
    text: "श्रेणियों का क्रम (Order) सफलतापूर्वक बदल दिया गया है।",
    className: "bg-green-50 text-green-800 border border-green-200",
  },
  invalid: {
    text: "नाम और अंग्रेज़ी स्लग सही भरें, जैसे: local-news.",
    className: "bg-red-50 text-red-800 border border-red-200",
  },
  error: {
    text: "डेटाबेस में श्रेणी जोड़ने में समस्या आई।",
    className: "bg-red-50 text-red-800 border border-red-200",
  },
} as const;

export default function CategoryStatusNotice({
  status,
  message,
}: {
  status?: string;
  message?: string;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(true);
  const notice =
    status && status in messages
      ? messages[status as keyof typeof messages]
      : null;

  useEffect(() => {
    if (!notice) return;
    const delay = status === "error" || status === "invalid" ? 12000 : 3500;
    const timeout = window.setTimeout(() => {
      setVisible(false);
      router.replace("/admin/categories");
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [notice, router, status]);

  if (!notice || !visible) return null;

  let displayText: string = notice.text;
  if (status === "error" && message) {
    if (message.includes("approved 507 Head category slugs")) {
      displayText =
        "Supabase डेटाबेस में केवल 7 पुरानी श्रेणियों की पाबंदी (Trigger) लगी हुई है। कृपया Supabase SQL Editor में 'DROP TRIGGER categories_require_fixed_slug ON public.categories;' रन करें।";
    } else {
      displayText = `त्रुटि: ${message}`;
    }
  }

  return (
    <div
      className={`mb-5 flex items-center justify-between gap-4 rounded-xl px-4 py-3 text-sm font-semibold ${notice.className}`}
      role="status"
    >
      <span>{displayText}</span>
      <button
        type="button"
        onClick={() => {
          setVisible(false);
          router.replace("/admin/categories");
        }}
        className="shrink-0 text-base leading-none text-current opacity-70 hover:opacity-100"
        aria-label="संदेश बंद करें"
      >
        ×
      </button>
    </div>
  );
}
