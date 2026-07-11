"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";
import { LOCATION_STORAGE_KEY, SERVICE_AREAS_STORAGE_KEY, WHATSAPP_STORAGE_KEY } from "@/constants/storageKeys";

// Dummy fallback data for frontend testing — remove once this reads from the backend.
const DUMMY_DATA = {
  streetAddress: "No 247, KKS Road",
  village: "Kokuvil",
  district: "Jaffna",
  districts: ["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota"],
  islandWide: false,
  countryCode: "Sri Lanka (+94)",
  phone: "750207507",
};

export default function LocationSection() {
  const { t } = useLang();

  const [streetAddress, setStreetAddress] = useState(DUMMY_DATA.streetAddress);
  const [village, setVillage] = useState(DUMMY_DATA.village);
  const [district, setDistrict] = useState(DUMMY_DATA.district);
  const [districts, setDistricts] = useState<string[]>(DUMMY_DATA.districts);
  const [islandWide, setIslandWide] = useState(DUMMY_DATA.islandWide);
  const [countryCode, setCountryCode] = useState(DUMMY_DATA.countryCode);
  const [phone, setPhone] = useState(DUMMY_DATA.phone);

  useEffect(() => {
    try {
      const loc = sessionStorage.getItem(LOCATION_STORAGE_KEY);
      if (loc) {
        const saved = JSON.parse(loc) as { streetAddress?: string; village?: string; district?: string };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStreetAddress(saved.streetAddress ?? "");
        setVillage(saved.village ?? "");
        setDistrict(saved.district ?? "");
      }

      const areas = sessionStorage.getItem(SERVICE_AREAS_STORAGE_KEY);
      if (areas) {
        const saved = JSON.parse(areas) as { districts?: string[]; islandWide?: boolean };
        setDistricts(saved.districts ?? []);
        setIslandWide(saved.islandWide ?? false);
      }

      const wa = sessionStorage.getItem(WHATSAPP_STORAGE_KEY);
      if (wa) {
        const saved = JSON.parse(wa) as { countryCode?: string; phone?: string };
        setCountryCode(saved.countryCode ?? "");
        setPhone(saved.phone ?? "");
      }
    } catch {
      // no saved data
    }
  }, []);

  const whatsappHref = phone
    ? `https://wa.me/${countryCode.match(/\+\d+/)?.[0].replace("+", "") ?? ""}${phone}`
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

      {districts.length > 0 && (
        <div className="max-[500px]:mt-4 mt-6">
          <h3 className="text-center font-poppins max-[500px]:text-[16px] text-[20px] font-semibold leading-[150%] text-[#222]">
            {t("Service_areas")}
          </h3>
          <p className="max-[500px]:mt-1 mt-2 max-w-[320px] text-center font-poppins max-[500px]:text-[14px] text-[16px] leading-[135%] text-[#767676]">
            {islandWide ? t("Island_wide") : districts.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
