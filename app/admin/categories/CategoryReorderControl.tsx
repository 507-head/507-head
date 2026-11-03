"use client";

import { useTransition } from "react";
import { reorderCategory } from "./actions";

export default function CategoryReorderControl({
  id,
  slug,
  currentPosition,
  totalCategories,
}: {
  id: string;
  slug: string;
  currentPosition: number;
  totalCategories: number;
}) {
  const [isPending, startTransition] = useTransition();

  const handleMove = (targetPosition: number) => {
    if (targetPosition === currentPosition || isPending) return;

    const formData = new FormData();
    formData.set("id", id);
    formData.set("slug", slug);
    formData.set("targetPosition", String(targetPosition));

    startTransition(async () => {
      await reorderCategory(formData);
    });
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="inline-flex items-center gap-1">
        {/* Move Up Button */}
        <button
          type="button"
          onClick={() => handleMove(currentPosition - 1)}
          disabled={currentPosition <= 1 || isPending}
          title="एक स्थान ऊपर करें"
          aria-label="एक स्थान ऊपर करें"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e2d5c5] bg-white text-xs font-bold text-[#6b3915] transition hover:bg-[#f6efe7] hover:border-[#8a4b1f] disabled:cursor-not-allowed disabled:opacity-30"
        >
          ▲
        </button>

        {/* Position Selector Dropdown */}
        <select
          value={currentPosition}
          disabled={isPending}
          onChange={(e) => handleMove(Number(e.target.value))}
          title="सीधे स्थान बदलें"
          aria-label="स्थान चुनें"
          className="h-7 rounded-md border border-[#d8c8b6] bg-white px-2 py-0 text-xs font-bold text-[#542a19] shadow-2xs focus:border-[#8a4b1f] focus:outline-hidden disabled:opacity-50"
        >
          {Array.from({ length: totalCategories }, (_, i) => i + 1).map(
            (pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ),
          )}
        </select>

        {/* Move Down Button */}
        <button
          type="button"
          onClick={() => handleMove(currentPosition + 1)}
          disabled={currentPosition >= totalCategories || isPending}
          title="एक स्थान नीचे करें"
          aria-label="एक स्थान नीचे करें"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e2d5c5] bg-white text-xs font-bold text-[#6b3915] transition hover:bg-[#f6efe7] hover:border-[#8a4b1f] disabled:cursor-not-allowed disabled:opacity-30"
        >
          ▼
        </button>
      </div>

      {/* Top 6 Indicator */}
      {currentPosition <= 6 ? (
        <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold text-[#8a4b1f] bg-amber-50 border border-amber-300">
          ★ Top 6 (Home/Nav)
        </span>
      ) : (
        <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium text-gray-500 bg-gray-50 border border-gray-200">
          अन्य (More)
        </span>
      )}
    </div>
  );
}
