"use client";

import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";

type LocationProps = {
  streetAddress?: string;
  village: string;
  district: string;
  serviceDistricts: string[];
  islandWide: boolean;
  countryCode: string;
  phone: string;
};

export default function LocationSection({
  streetAddress,
  village,
  district,
  serviceDistricts,
  islandWide,
  countryCode,
  phone,
}: LocationProps) {
  const { t } = useLang();

  const whatsappHref = phone
    ? `https://wa.me/${countryCode.replace("+", "")}${phone}`
    : undefined;

  const locationText = [streetAddress, village, district].filter(Boolean).join(", ");

  return (
    <div className="flex flex-col items-center px-4 max-[500px]:mt-5 mt-6">
      {whatsappHref && (
        <Button text={t("WhatsApp")} className="max-[500px]:px-6" onPress={() => window.open(whatsappHref, "_blank")} />
      )}

      {locationText && (
        <div className="max-[500px]:mt-6 mt-12">
          <h3 className="text-center font-poppins max-[500px]:text-[16px] text-[20px] font-semibold leading-[150%] text-[#222]">
            {t("Location")}
          </h3>
          <p className="max-[500px]:mt-1 mt-2 text-center font-poppins max-[500px]:text-[14px] text-[16px] leading-[135%] text-[#767676]">{locationText}</p>
        </div>
      )}

      {serviceDistricts.length > 0 && (
        <div className="max-[500px]:mt-4 mt-6">
          <h3 className="text-center font-poppins max-[500px]:text-[16px] text-[20px] font-semibold leading-[150%] text-[#222]">
            {t("Service_areas")}
          </h3>
          <p className="max-[500px]:mt-1 mt-2 max-w-[320px] text-center font-poppins max-[500px]:text-[14px] text-[16px] leading-[135%] text-[#767676]">
            {islandWide ? t("Island_wide") : serviceDistricts.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
