"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import OnboardingHeader from "@/components/main/OnboardingHeader";

const STEP_SEGMENTS = ["basic-details", "verification", "storefront"];

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLang();

  const segment = pathname.split("/")[2] ?? "";
  const currentStep = Math.max(1, STEP_SEGMENTS.indexOf(segment) + 1);

  return (
    <div className="flex min-h-screen flex-col">
      <OnboardingHeader
        currentStep={currentStep}
        totalSteps={3}
        text={[t("Step_Basic_Details"), t("Step_Verification"), t("Step_Storefront")]}
        onBack={() => router.back()}
      />
      <div className="flex flex-1 flex-col sm:items-center sm:justify-center">
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
