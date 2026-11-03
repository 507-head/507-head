"use client";

import { useTransition } from "react";
import { deleteCategory } from "./actions";

export default function CategoryDeleteButton({
  id,
  slug,
  name,
}: {
  id: string;
  slug: string;
  name: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confirmed = window.confirm(
      `क्या आप वाकई '${name}' श्रेणी को हटाना चाहते हैं?\n(अगर इस श्रेणी में कोई लेख जुड़ा होगा, तो यह नहीं हटेगी)`,
    );
    if (!confirmed) return;

    const formData = new FormData();
    formData.set("id", id);
    formData.set("slug", slug);

    startTransition(async () => {
      await deleteCategory(formData);
    });
  };

  return (
    <form onSubmit={handleDelete} className="inline-block">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="slug" value={slug} />
      <button
        type="submit"
        disabled={isPending}
        title={`'${name}' श्रेणी को हटाएं`}
        aria-label={`'${name}' श्रेणी को हटाएं`}
        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50/80 px-2.5 py-1.5 text-xs font-semibold text-red-700 shadow-xs transition hover:bg-red-100 hover:border-red-300 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg
          className="h-3.5 w-3.5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <span>{isPending ? "हटा रहे हैं..." : "हटाएं"}</span>
      </button>
    </form>
  );
}
