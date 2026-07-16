"use client";

import { useRouter } from "next/navigation";
import { BackChevronIcon, Logo } from "@/assets/Icons";
import StepProgress from "../common-layout/StepProgress";
import LangDropdownButton from "./LangDropdownButton";

type OnboardingHeaderProps = {
  currentStep?: number;
  totalSteps?: number;
  text?: string[];
  onBack?: () => void;
  hideBack?: boolean;
  hideProgress?: boolean;
};

export default function OnboardingHeader({
  currentStep = 1,
  totalSteps,
  text,
  onBack,
  hideBack,
  hideProgress,
}: OnboardingHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-sm">
      <div className="flex items-center max-[500px]:px-2 px-4 sm:px-8 md:px-10 max-[500px]:pt-1.5 pt-5 max-[500px]:pb-1.5 pb-[14px]">
        <div className={`max-[500px]:hidden flex ${hideBack ? "mr-0" : "mr-2 sm:mr-3"} `}>
          <Logo />
        </div>
        {hideBack ? (
          <div className="shrink-0" >
            <div className="min-[500px]:hidden flex">
              <Logo className="max-[500px]:w-5 w-6 max-[500px]:h-5 h-6" />
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={onBack ?? (() => router.back())}
            aria-label="Go back"
            className="h-10 w-10 flex shrink-0 max-[500px]:p-0.5 p-0 cursor-pointer select-none items-center justify-center"
          >
            <div className="rounded-full max-[500px]:p-1.5 p-2 bg-[#F0F0F0]">
              <BackChevronIcon /> </div>
          </button>
        )}
        
        {!hideProgress ? (
          <div className="flex-1 max-[340px]:max-w-[192px] max-w-[584px] mx-auto max-[340px]:px-0 max-[500px]:px-4 px-6">
            <StepProgress currentStep={currentStep} totalSteps={totalSteps} text={text} />
          </div>
        ) : (
          <div className="flex-1 max-[340px]:max-w-[192px] max-w-[584px] mx-auto max-[340px]:px-0 max-[500px]:px-4 px-6">
          </div>
        )}

        <LangDropdownButton />
      </div>
    </header>
  );
}
