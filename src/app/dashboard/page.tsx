"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/main/DashboardHeader";
import CoverIntroSection from "@/components/dashboard/CoverIntroSection";
import PerformanceSection from "@/components/dashboard/PerformanceSection";
import ServicesSection from "@/components/dashboard/ServicesSection";
import LocationSection from "@/components/dashboard/LocationSection";
import ReviewsSection from "@/components/dashboard/ReviewsSection";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import { getBizMe, getBizPerformance } from "@/lib/api";
import type { BizMe, BizPerformance, BizService } from "@/lib/api";
import {
  BASIC_DETAILS_STORAGE_KEY, CLAIM_URL_STORAGE_KEY, LOCATION_STORAGE_KEY,
  SERVICE_AREAS_STORAGE_KEY, EXPERIENCE_STORAGE_KEY, WHATSAPP_STORAGE_KEY,
  OTP_SENT_AT_KEY, OTP_COOLDOWN_KEY, OTP_RESEND_COUNT_KEY,
  MAIN_PHOTO_STORAGE_KEY, TEMP_TOKEN_KEY, USERNAME_RESERVATION_KEY,
} from "@/constants/storageKeys";
import UpgradePlanSection from "@/components/dashboard/UpgradePlanSection";

const REGISTRATION_KEYS = [
  BASIC_DETAILS_STORAGE_KEY, CLAIM_URL_STORAGE_KEY, LOCATION_STORAGE_KEY,
  SERVICE_AREAS_STORAGE_KEY, EXPERIENCE_STORAGE_KEY, WHATSAPP_STORAGE_KEY,
  OTP_SENT_AT_KEY, OTP_COOLDOWN_KEY, OTP_RESEND_COUNT_KEY,
  MAIN_PHOTO_STORAGE_KEY, TEMP_TOKEN_KEY, USERNAME_RESERVATION_KEY, "inai_biz_terms_ok",
];

function toMockServices(services: BizService[]) {
  return services.map((s) => ({
    id: s.id,
    images: s.photos.map((p) => p.url),
    title: s.title,
    price: String(s.price),
    description: s.description,
  }));
}

export default function DashboardPage() {
  const router = useRouter();
  const [me, setMe] = useState<BizMe | null>(null);
  const [perf, setPerf] = useState<BizPerformance>({ profileViews: 0, whatsappClicks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [meData, perfData] = await Promise.all([getBizMe(), getBizPerformance()]);
        if (meData.services.length === 0) {
          router.replace("/register/storefront/services");
          return;
        }
        setMe(meData);
        setPerf(perfData);
        REGISTRATION_KEYS.forEach((k) => sessionStorage.removeItem(k));
      } catch {
        // session expired or no auth — redirect to login
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  if (loading || !me) {
    return (
      <>
        <DashboardHeader variant="owner" onEdit={() => {}} />
        <DashboardSkeleton />
      </>
    );
  }

  return (
    <>
      <DashboardHeader variant="owner" onEdit={() => router.push("/dashboard/edit")} username={me.username} />
      <div className="font-poppins flex flex-col">
        <CoverIntroSection
          businessName={me.businessName}
          coverPhotoUrl={me.coverPhotoUrl}
          logoUrl={me.logoUrl}
          bio={me.bio}
          experience={me.experience}
          qualifications={me.qualifications}
          careerHighlight={me.careerHighlight}
          countryCode={me.countryCode}
          phone={me.phone}
          isApproved={me.isApproved}
        />
        <PerformanceSection profileViews={perf.profileViews} whatsappClicks={perf.whatsappClicks} />
        <UpgradePlanSection/>
        <ServicesSection services={toMockServices(me.services)} whatsappHref={`https://wa.me/${me.countryCode.replace("+", "")}${me.phone}`} />
        <LocationSection
          streetAddress={me.streetAddress ?? undefined}
          village={me.village}
          district={me.district}
          serviceDistricts={me.serviceDistricts}
          islandWide={me.islandWide}
          countryCode={me.countryCode}
          phone={me.phone}
        />
        <ReviewsSection username={me.username} />
      </div>
    </>
  );
}
