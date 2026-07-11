"use client";

import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/main/DashboardHeader";
import CoverIntroSection from "@/components/dashboard/CoverIntroSection";
import PerformanceSection from "@/components/dashboard/PerformanceSection";
import ServicesSection from "@/components/dashboard/ServicesSection";
import LocationSection from "@/components/dashboard/LocationSection";
import ReviewsSection from "@/components/dashboard/ReviewsSection";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <>
      <DashboardHeader variant="owner" onEdit={() => router.push("/dashboard/edit")} />
      <div className="font-poppins flex flex-col">
        <CoverIntroSection />
        <PerformanceSection />
        <ServicesSection />
        <LocationSection />
        <ReviewsSection />
      </div>
    </>
  );
}
