"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/main/DashboardHeader";
import EditCoverSection from "@/components/dashboard/edit/EditCoverSection";
import EditIntroSection from "@/components/dashboard/edit/EditIntroSection";
import EditServicesSection from "@/components/dashboard/edit/EditServicesSection";
import EditLocationSection from "@/components/dashboard/edit/EditLocationSection";
import EditServiceAreasSection from "@/components/dashboard/edit/EditServiceAreasSection";
import EditPageSkeleton from "@/components/dashboard/edit/EditPageSkeleton";
import { getBizMe } from "@/lib/api";
import type { BizMe } from "@/lib/api";

export default function DashboardEditPage() {
  const [me, setMe] = useState<BizMe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBizMe().then(setMe).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <DashboardHeader variant="editing" />
        <EditPageSkeleton />
      </>
    );
  }

  if (!me) return null;

  return (
    <>
      <DashboardHeader variant="editing" />
      <div className="font-poppins flex flex-col">
        <EditCoverSection
          coverPhotoUrl={me.coverPhotoUrl}
          logoUrl={me.logoUrl}
          businessName={me.businessName}
        />
        <EditIntroSection
          businessName={me.businessName}
          bio={me.bio ?? ""}
          countryCode={me.countryCode}
          phone={me.phone}
          experience={me.experience}
          qualifications={me.qualifications ?? ""}
          careerHighlight={me.careerHighlight ?? ""}
        />
        <EditServicesSection services={me.services} />
        <EditLocationSection
          streetAddress={me.streetAddress ?? ""}
          village={me.village}
          district={me.district}
        />
        <EditServiceAreasSection
          serviceDistricts={me.serviceDistricts}
          islandWide={me.islandWide}
        />
      </div>
    </>
  );
}
