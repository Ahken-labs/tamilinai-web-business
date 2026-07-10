"use client";

import DashboardHeader from "@/components/main/DashboardHeader";
import EditCoverSection from "@/components/dashboard/edit/EditCoverSection";
import EditIntroSection from "@/components/dashboard/edit/EditIntroSection";
import EditQualificationsSection from "@/components/dashboard/edit/EditQualificationsSection";
import EditServicesSection from "@/components/dashboard/edit/EditServicesSection";
import EditLocationSection from "@/components/dashboard/edit/EditLocationSection";
import EditServiceAreasSection from "@/components/dashboard/edit/EditServiceAreasSection";

export default function DashboardEditPage() {
  return (
    <>
      <DashboardHeader variant="editing" />
      <div className="font-poppins flex flex-col px-5 py-4 sm:w-[640px] mx-auto">
        <EditCoverSection />
        <EditIntroSection />
        <EditQualificationsSection />
        <EditServicesSection />
        <EditLocationSection />
        <EditServiceAreasSection />
      </div>
    </>
  );
}
