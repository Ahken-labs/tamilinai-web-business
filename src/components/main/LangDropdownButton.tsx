"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LangContext";
import { TamilLanguageIcon } from "@/assets/Icons";

const LANGUAGES = [
  { label: "English", value: "en" as const },
  { label: "தமிழ்", value: "ta" as const },
];

export default function LangDropdownButton() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        className="transition-transform duration-300 ease-out hover:scale-[1.06] h-10 w-10 flex shrink-0 max-[500px]:p-0.5 p-0 cursor-pointer select-none items-center justify-center"
      >
        <div className="rounded-full max-[500px]:p-1.5 p-2 bg-[#F0F0F0]">
          <TamilLanguageIcon />
        </div>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-[148px] overflow-hidden rounded-[16px] border border-[#f0e8ea] bg-white p-1 shadow-lg">
          {LANGUAGES.map((l) => (
            <button
              key={l.value}
              type="button"
              onClick={() => { setLang(l.value); setOpen(false); }}
              className={`transition-transform duration-300 ease-out hover:scale-[1.02] cursor-pointer my-0.5 w-full rounded-[8px] px-5 py-2 text-left font-tamil text-[15px] font-medium transition-colors ${
                lang === l.value
                  ? "bg-[#fdf0f2] text-[#B31B38]"
                  : "text-[#222222] hover:bg-[#EAEAEA]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
