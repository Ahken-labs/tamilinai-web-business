"use client";

import DashboardHeader from "@/components/main/DashboardHeader";
import EditCoverSection from "@/components/dashboard/edit/EditCoverSection";
import EditIntroSection from "@/components/dashboard/edit/EditIntroSection";
import EditServicesSection from "@/components/dashboard/edit/EditServicesSection";
import EditLocationSection from "@/components/dashboard/edit/EditLocationSection";
import EditServiceAreasSection from "@/components/dashboard/edit/EditServiceAreasSection";

export default function DashboardEditPage() {
  return (
    <>
      <DashboardHeader variant="editing" />
      <div className="font-poppins flex flex-col">
        <EditCoverSection />
        <EditIntroSection />
        <EditServicesSection />
        <EditLocationSection />
        <EditServiceAreasSection />
      </div>
    </>
  );
}
