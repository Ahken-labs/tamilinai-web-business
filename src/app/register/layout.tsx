"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import OnboardingHeader from "@/components/main/OnboardingHeader";

const STEP_SEGMENTS = ["basic-details", "verification", "storefront"];
const INTRO_PATH = "/register/basic-details/intro";
const TERMS_KEY = "inai_biz_terms_ok";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLang();

  useEffect(() => {
    if (pathname === INTRO_PATH) return;
    const hasTerms = sessionStorage.getItem(TERMS_KEY);
    const hasToken = localStorage.getItem("inai_biz_access_token");
    if (!hasTerms && !hasToken) {
      router.replace(INTRO_PATH);
    }
  }, [pathname, router]);

  const segment = pathname.split("/")[2] ?? "";
  const currentStep = Math.max(1, STEP_SEGMENTS.indexOf(segment) + 1);
  const hideBack = pathname === "/register/verification/create-password" || pathname.startsWith("/register/storefront");

  return (
    <div className="flex min-h-screen flex-col">
      <OnboardingHeader
        currentStep={currentStep}
        totalSteps={3}
        text={[t("Step_Basic_Details"), t("Step_Verification"), t("Step_Storefront")]}
        onBack={() => router.back()}
        hideBack={hideBack}
      />
      <div className="flex flex-1 flex-col sm:items-center sm:justify-center">
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
