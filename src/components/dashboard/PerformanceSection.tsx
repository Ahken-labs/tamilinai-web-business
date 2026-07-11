"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { ChevronIcon } from "@/assets/Icons";

// Dummy fallback data for frontend testing — remove once this reads from the backend.
const DUMMY_DATA = {
  profileViews: 222,
  whatsappClicks: 12,
};

export default function PerformanceSection() {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-[640px] mx-auto px-4 mt-6">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full flex-col rounded-[20px] bg-[#F2F2F2] px-4 pt-6 pb-5 cursor-pointer text-left"
      >
        <div className="flex items-center justify-between">
          <span
            className={`font-poppins min-w-[240px] w-full text-[14px] leading-[150%] text-[#222] ${expanded ? "font-semibold" : "font-normal"
              }`}
          >
            {t("Your_performance_30_days")}
          </span>
          <ChevronIcon open={expanded} strokeWidth={1.5} className="w-4 h-4 shrink-0 transition-transform duration-300" stroke="#222" />
        </div>

        {expanded && (
          <div className="mt-4 flex gap-2">
            <div className="flex-1 rounded-[8px] bg-white px-2 py-2">
              <p className="font-poppins text-[14px] leading-[135%] text-[#525252]">{t("Profile_views")}</p>
              <p className="mt-[5px] font-poppins text-[18px] font-semibold leading-[135%] text-[#CD2B4A]">
                {DUMMY_DATA.profileViews}
              </p>
            </div>
            <div className="flex-1 rounded-[8px] bg-white px-2 py-2">
              <p className="font-poppins min-w-[118px] text-[14px] leading-[135%] text-[#525252]">{t("WhatsApp_clicks")}</p>
              <p className="mt-[5px] min-w-[118px] font-poppins text-[18px] font-semibold leading-[135%] text-[#CD2B4A]">
                {DUMMY_DATA.whatsappClicks} {t("Leads")}
              </p>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
