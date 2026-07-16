"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LangContext";
import { CareerIcon, ChevronIcon, ClockIcon, QualificationIcon, WhatsAppLineIcon } from "@/assets/Icons";
import Button from "../common-layout/Button";

type CoverIntroProps = {
  businessName: string;
  coverPhotoUrl: string | null;
  logoUrl: string | null;
  bio?: string;
  experience: string;
  qualifications?: string;
  careerHighlight?: string;
  countryCode: string;
  phone: string;
  isApproved: boolean;
};

export default function CoverIntroSection({
  businessName,
  coverPhotoUrl,
  logoUrl,
  bio,
  experience,
  qualifications,
  careerHighlight,
  countryCode,
  phone,
  isApproved,
}: CoverIntroProps) {
  const { t } = useLang();
  const photoUrl = coverPhotoUrl ?? "";
  const [bioExpanded, setBioExpanded] = useState(false);
  const [bioTruncated, setBioTruncated] = useState(false);
  const bioRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = bioRef.current;
    if (!el) return;

    const measure = () => setBioTruncated(el.scrollHeight > el.clientHeight);
    measure();

    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [bio]);

  const whatsappHref = phone
    ? `https://wa.me/${countryCode.replace("+", "")}${phone}`
    : undefined;

  const hasQualificationInfo = experience || qualifications || careerHighlight;

  return (
    <div className="font-poppins flex flex-col">
      <div className="w-full max-[500px]:px-2 px-4 sm:px-6 md:px-10 lg:px-22">

        {/* this is where cover photo */}
        <div className="rounded-[24px] relative">
          <div
            className="hidden sm:block absolute inset-0 rounded-[24px] opacity-100"
            style={{
              backgroundImage: `linear-gradient(89deg, rgba(255,255,255,0.00) 50%, rgba(255,255,255,0.30) 85%, #FFF 100%), linear-gradient(270deg, rgba(255,255,255,0.00) 50%, rgba(255,255,255,0.30) 85%, #FFF 100%), linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.20) 45%, #FFF 90%), url(${photoUrl})`,
              backgroundColor: "#D9D9D9",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              filter: "blur(4px)",
            }}
          />
          <div className="relative">
            <div className="max-w-[1040px] mx-auto aspect-video w-full overflow-hidden rounded-[32px] min-[500px]:rounded-[64px] bg-[#D9D9D9]">
              {photoUrl && (
                // eslint-disable-next-line @next/next/no-img-element -- data URL from sessionStorage, next/image can't optimize it
                <img src={photoUrl} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="absolute min-[500px]:-bottom-11.5 -bottom-6.5 max-[500px]:left-2 min-[500px]:right-0 min-[500px]:left-0 min-[500px]:mx-auto flex h-13 min-[500px]:h-23 w-13 min-[500px]:w-23 items-center justify-center overflow-hidden rounded-full border-[4px] border-white bg-[#E8E8E8]">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- data URL from sessionStorage, next/image can't optimize it
                <img src={logoUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="text-[19.2px] min-[500px]:text-[33.84px] font-medium text-[#E5BAC2]">
                  {businessName.trim().charAt(0).toUpperCase() || "?"}
                </span>
              )}
            </div>
          </div>

          {/* height gap between logo*/}
          <div className="max-[500px]:h-6 h-11 " />

          {!isApproved && (
            <div className="min-w-[288px] max-w-[640px] flex-col flex w-full mx-auto bg-[#FFFCEE] rounded-[20px] max-[500px]:px-4 px-5 max-[500px]:py-5 py-6 relative max-[500px]:mt-6 mt-7 sm:mt-8 md:mt-9 lg:mt-10 shadow-[0_0_8px_0_rgba(0,0,0,0.16)]">
              <span className="text-[16px] sm:text-[17px] md:text-[18px] font-medium leading-[135%] text-[#8D5900]">{t("Profile_under_review")}</span>
              <span className="mt-2 text-[14px] sm:text-[15px] md:text-[16px] leading-[135%] text-[#767676]">{t("Profile_under_review_desc")}</span>
            </div>
          )}


          <div className="relative flex flex-col px-4 max-[500px]:mt-6 mt-7 sm:mt-8 md:mt-9 lg:mt-10">
            <h1 className="text-center font-poppins max-[500px]:text-[24px] text-[26px] sm:text-[28px] md:text-[30px] lg:text-[32px] font-semibold leading-[120%] text-[#222]">
              {businessName}
            </h1>

            {bio && (
              <div className="mx-auto mt-2 max-[500px]:mt-[15.67px] max-w-[640px] text-center">
                <p
                  ref={bioRef}
                  className={`font-poppins max-[500px]:text-[12px] text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-[150%] text-[#656565] ${bioExpanded ? "" : "line-clamp-3 max-[500px]:line-clamp-4"
                    }`}
                >
                  {bio}
                </p>
                {bioTruncated && (
                  <button
                    type="button"
                    onClick={() => setBioExpanded((v) => !v)}
                    className="min-[500px]:font-semibold inline-flex items-center gap-1 font-poppins max-[500px]:text-[12px] text-[14px] md:text-[18px] text-[#767676] cursor-pointer"
                  >
                    {bioExpanded ? t("See_less") : t("See_more")}
                    <ChevronIcon open={bioExpanded} className="max-[500px]:w-3 w-4 max-[500px]:h-3 h-4 shrink-0 transition-transform duration-300" stroke="#767676" />
                  </button>
                )}
              </div>
            )}

            {whatsappHref && (
              <Button text={t("WhatsApp")}
                iconLeft={<WhatsAppLineIcon />}
                className="max-[500px]:mt-4 mt-6 mx-auto max-[500px]:px-4 items-center " />
            )}
          </div>
        </div>
      </div>


      {hasQualificationInfo && (
        <div className="px-4 sm:px-6">
          <div className="max-[500px]:mt-6 mt-10 min-w-[288px] max-w-[640px] w-full mx-auto flex flex-col max-[500px]:gap-2 gap-3 rounded-[20px] bg-white max-[500px]:px-4 px-5 max-[500px]:py-6 py-5 shadow-[0_0_8px_0_rgba(0,0,0,0.16)]">
            {experience && (
              <div className="flex items-center max-[500px]:gap-2.5 gap-3 sm:gap-4 md:gap-5">
                <ClockIcon className="max-[500px]:w-3.5 w-5 max-[500px]:h-3.5 h-5" />
                <span className="font-poppins max-[500px]:text-[14px] text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-[#222222]">{experience}</span>
              </div>
            )}
            {qualifications && (
              <div className="flex items-center max-[500px]:gap-2.5 gap-3 sm:gap-4 md:gap-5">
                <QualificationIcon className="max-[500px]:w-3.5 w-5 max-[500px]:h-3.5 h-5" />
                <span className="font-poppins max-[500px]:text-[14px] text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-[#222222]">{qualifications}</span>
              </div>
            )}
            {careerHighlight && (
              <div className="flex items-start max-[500px]:gap-2.5 gap-3 sm:gap-4 md:gap-5">
                <div className="mt-[2.5px]">
                  <CareerIcon className="max-[500px]:w-3.5 w-5 max-[500px]:h-3.5 h-5" />
                </div>
                <span className="font-poppins max-[500px]:text-[14px] text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] text-[#222222]">{careerHighlight}</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
