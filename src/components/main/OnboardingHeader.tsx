"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { BackChevronIcon, Logo, TamilLanguageIcon } from "@/assets/Icons";
import StepProgress from "../common-layout/StepProgress";

type OnboardingHeaderProps = {
  currentStep: number;
  totalSteps?: number;
  text?: string[];
  onBack?: () => void;
};

const LANGUAGES = [
  { label: "English", value: "en" as const },
  { label: "தமிழ்", value: "ta" as const },
];

export default function OnboardingHeader({
  currentStep,
  totalSteps,
  text,
  onBack,
}: OnboardingHeaderProps) {
  const router = useRouter();
  const { lang, setLang } = useLang();

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-sm">
      <div className="flex items-center max-[500px]:px-2 px-4 sm:px-8 md:px-10 max-[500px]:pt-1.5 pt-5 max-[500px]:pb-1.5 pb-[14px]">
        <div className="max-[500px]:hidden flex mr-2 sm:mr-3">
        <Logo />
        </div>
        <button
          type="button"
          onClick={onBack ?? (() => router.back())}
          aria-label="Go back"
          className="h-10 w-10 flex shrink-0 max-[500px]:p-0.5 p-0 cursor-pointer select-none items-center justify-center"
        >
          <div className="rounded-full max-[500px]:p-1.5 p-2 bg-[#F0F0F0]">
            <BackChevronIcon /> </div>
        </button>

        <div className="flex-1 max-[340px]:max-w-[192px] max-w-[584px] mx-auto max-[340px]:px-0 max-[500px]:px-4 px-6">
          <StepProgress currentStep={currentStep} totalSteps={totalSteps} text={text} />
        </div>

        <div ref={langRef} className="relative">
          <button
            type="button"
            onClick={() => setLangOpen((v) => !v)}
            aria-label="Change language"
            className="h-10 w-10 flex shrink-0 max-[500px]:p-0.5 p-0 cursor-pointer select-none items-center justify-center"
          >
            <div className="rounded-full max-[500px]:p-1.5 p-2 bg-[#F0F0F0]">
              <TamilLanguageIcon />
            </div>
          </button>

          {langOpen && (
            <div className="absolute right-0 z-50 mt-2 w-[148px] overflow-hidden rounded-[16px] border border-[#f0e8ea] bg-white p-1 shadow-lg">
              {LANGUAGES.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => { setLang(l.value); setLangOpen(false); }}
                  className={`my-0.5 w-full rounded-[8px] px-5 py-2 text-left font-tamil text-[15px] font-medium transition-colors ${
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
      </div>
    </header>
  );
}
