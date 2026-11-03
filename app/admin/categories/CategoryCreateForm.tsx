"use client";

import { useRef, useState } from "react";
import { createCategory } from "./actions";

const devanagariMap: Record<string, string> = {
  अ: "a",
  आ: "a",
  इ: "i",
  ई: "i",
  उ: "u",
  ऊ: "u",
  ऋ: "ri",
  ए: "e",
  ऐ: "ai",
  ओ: "o",
  औ: "au",
  क: "k",
  ख: "kh",
  ग: "g",
  घ: "gh",
  ङ: "n",
  च: "ch",
  छ: "chh",
  ज: "j",
  झ: "jh",
  ञ: "n",
  ट: "t",
  ठ: "th",
  ड: "d",
  ढ: "dh",
  ण: "n",
  त: "t",
  थ: "th",
  द: "d",
  ध: "dh",
  न: "n",
  प: "p",
  फ: "ph",
  ब: "b",
  भ: "bh",
  म: "m",
  य: "y",
  र: "r",
  ल: "l",
  व: "v",
  श: "sh",
  ष: "sh",
  स: "s",
  ह: "h",
  ळ: "l",
  "ा": "a",
  "ि": "i",
  "ी": "i",
  "ु": "u",
  "ू": "u",
  "ृ": "ri",
  "े": "e",
  "ै": "ai",
  "ो": "o",
  "ौ": "au",
  "ं": "n",
  "ँ": "n",
  "ः": "",
  "्": "",
  क़: "q",
  ख़: "kh",
  ग़: "g",
  ज़: "z",
  ड़: "d",
  ढ़: "dh",
  फ़: "f",
  "०": "0",
  "१": "1",
  "२": "2",
  "३": "3",
  "४": "4",
  "५": "5",
  "६": "6",
  "७": "7",
  "८": "8",
  "९": "9",
};

function makeSlug(value: string) {
  return [...value]
    .map((character) => devanagariMap[character] ?? character)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export default function CategoryCreateForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const slugEdited = useRef(false);

  return (
    <form action={createCategory} className="mt-5 grid gap-3 md:grid-cols-2">
      <input
        name="name"
        required
        minLength={2}
        value={name}
        onChange={(event) => {
          const nextName = event.target.value;
          setName(nextName);
          if (!slugEdited.current) setSlug(makeSlug(nextName));
        }}
        placeholder="नाम, जैसे स्थानीय समाचार"
        className="rounded-xl border border-[#e7ddd0] px-4 py-3"
      />
      <input
        name="slug"
        required
        value={slug}
        onChange={(event) => {
          slugEdited.current = true;
          setSlug(makeSlug(event.target.value));
        }}
        pattern="[a-z0-9]+(-[a-z0-9]+)*"
        placeholder="English URL slug अपने-आप बनेगा"
        className="rounded-xl border border-[#e7ddd0] px-4 py-3"
      />
      <p className="text-xs text-[#786b5e] md:col-span-2">
        नाम लिखते ही English URL slug अपने-आप बन जाएगा। जरूरत हो तो उसे बदल सकते
        हैं।
      </p>
      <input
        name="description"
        placeholder="Subtitle — जैसे श्रेणी का छोटा परिचय (optional)"
        className="rounded-xl border border-[#e7ddd0] px-4 py-3 md:col-span-2"
      />
      <button
        type="submit"
        className="w-fit rounded-xl bg-[#8a4b1f] px-5 py-3 text-sm font-bold text-white hover:bg-[#6b3915]"
      >
        श्रेणी जोड़ें
      </button>
    </form>
  );
}
