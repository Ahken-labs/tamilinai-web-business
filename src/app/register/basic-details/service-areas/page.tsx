"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { CheckIcon } from "@/assets/Icons";
import Button from "@/components/common-layout/Button";
import Toggle from "@/components/ui/Toggle";
import { SRI_LANKA_DISTRICTS } from "@/constants/districts";
import { LOCATION_STORAGE_KEY, SERVICE_AREAS_STORAGE_KEY } from "@/constants/storageKeys";

export default function ServiceAreasPage() {
  const { t } = useLang();
  const router = useRouter();

  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");

  const islandWide = selected.length === SRI_LANKA_DISTRICTS.length;

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LOCATION_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { district?: string };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (saved.district) setSelected([saved.district]);
      }
    } catch {
      // no saved location
    }
  }, []);

  function toggleDistrict(district: string) {
    setSelected((prev) =>
      prev.includes(district) ? prev.filter((d) => d !== district) : [...prev, district]
    );
  }

  function handleIslandWideChange(checked: boolean) {
    setSelected(checked ? [...SRI_LANKA_DISTRICTS] : []);
  }

  function handleNext() {
    if (selected.length === 0) {
      setError("*Please select at least one district, or choose Island-wide");
      return;
    }
    setError("");

    sessionStorage.setItem(
      SERVICE_AREAS_STORAGE_KEY,
      JSON.stringify({ districts: selected, islandWide })
    );
    router.push("/register/basic-details/experience");
  }

  return (
    <div className="font-poppins flex flex-col px-5 py-4 sm:w-[640px] mx-auto">
      <h1 className="mx-auto max-w-[250px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[520px] text-center font-48 font-semibold leading-[120%] text-[#000]">
        {t("Where_do_you_offer_services")}
      </h1>

      <p className="mx-auto max-w-[560px] mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-center font-20 leading-[150%] text-[#525252]">
        {t("Service_areas_description")}
      </p>

      <label className="mx-auto max-w-[360px] mt-8 sm:mt-10 md:mt-11 lg:mt-12 flex items-center gap-3 sm:gap-4 rounded-[12px] sm:rounded-[16px] bg-[#F2F2F2] px-2 sm:px-4 py-3 sm:py-4 cursor-pointer">
        <Toggle checked={islandWide} onChange={handleIslandWideChange} />
        <span className="font-poppins lang-ta:text-[14px] text-[16px] font-normal leading-[135%] text-[#222222]">
          {t("Island_wide_toggle")}
        </span>
      </label>

      <div className="mt-8 sm:mt-10 md:mt-11 lg:mt-12 flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {SRI_LANKA_DISTRICTS.map((district) => {
          const isSelected = selected.includes(district);
          return (
            <button
              key={district}
              type="button"
              onClick={() => toggleDistrict(district)}
              className={`flex items-center gap-[2px] rounded-[48px] px-4 py-[7px] font-poppins text-[16px] font-normal leading-[150%] transition-colors duration-150 cursor-pointer ${isSelected
                  ? "border border-[rgba(179,27,56,0.25)] bg-[#FFF0F3] text-[#B31B38]"
                  : "bg-[#F2F2F2] text-[#222222]"
                }`}
            >
              {isSelected && <CheckIcon />}
              {district}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-4 text-center font-poppins text-[14px] text-[#B31B38]">{error}</p>
      )}

      <Button
        text={t("Next")}
        onPress={handleNext}
        disabled={selected.length === 0}
        className="mt-8 sm:mt-5 mx-auto w-[173px]"
      />
    </div>
  );
}
