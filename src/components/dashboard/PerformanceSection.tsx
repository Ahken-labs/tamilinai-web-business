"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { ChevronIcon } from "@/assets/Icons";

type PerformanceProps = {
  profileViews: number;
  whatsappClicks: number;
};

export default function PerformanceSection({ profileViews, whatsappClicks }: PerformanceProps) {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="px-4 sm:px-6 max-[500px]:mt-6 mt-7 sm:mt-8 md:mt-9 lg:mt-10">    
      <div className="min-w-[288px] max-w-[640px] w-full mx-auto">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full flex-col rounded-[20px] bg-[#F2F2F2] max-[500px]:px-4 px-5 pt-6 pb-5 cursor-pointer text-left"
      >
        <div className="flex items-center justify-between">
          <span
            className={`font-poppins min-w-[240px] w-full text-[14px] sm:text-[15px] md:text-[16px] leading-[150%] text-[#222] ${expanded ? "font-semibold" : "font-normal"
              }`}
          >
            {t("Your_performance_30_days")}
          </span>
          <ChevronIcon open={expanded} strokeWidth={1.5} className="w-4 h-4 shrink-0 transition-transform duration-300" stroke="#222" />
        </div>

        {expanded && (
          <div className="mt-4 flex gap-2 sm:gap-4">
            <div className="flex-1 rounded-[8px] bg-white px-2 py-2">
              <p className="font-poppins text-[14px] sm:text-[15px] md:text-[16px] leading-[135%] text-[#525252]">{t("Profile_views")}</p>
              <p className="mt-[5px] font-poppins text-[18px] font-semibold leading-[135%] text-[#CD2B4A]">
                {profileViews}
              </p>
            </div>
            <div className="flex-1 rounded-[8px] bg-white px-2 py-2">
              <p className="font-poppins min-w-[118px] text-[14px] sm:text-[15px] md:text-[16px] leading-[135%] text-[#525252]">{t("WhatsApp_clicks")}</p>
              <p className="mt-[5px] min-w-[118px] font-poppins text-[18px] font-semibold leading-[135%] text-[#CD2B4A]">
                {whatsappClicks} {t("Leads")}
              </p>
            </div>
          </div>
        )}
      </button>
    </div>
    </div>

  );
}
