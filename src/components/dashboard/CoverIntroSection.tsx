"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LangContext";
import { CareerIcon, ChevronIcon, ClockIcon, QualificationIcon, WhatsAppLineIcon } from "@/assets/Icons";
import Button from "../common-layout/Button";

// Dummy data until the dashboard is wired to the backend (GET /api/business/me) — no sessionStorage here.
const DUMMY_DATA = {
  businessName: "Ahken Bridal Studio",
  photoUrl: "/images/wedding_hall.webp",
  logoUrl: "",
  bio: "Luxury High-End Products: Tailored exclusively using premium, high-end brands to ensure the finest quality for your skin. Soft & Flawless Finish: A beautifully radiant, long-lasting bridal look crafted for your special day. huhds dhsidns dnsjdbs dsnfjsdnv usscsa sjishid xchasixhcs shciosahc ahuchas shoiash ahouag ahshougas ahiahsx aixhaix asxuax ajsbcxa scbas csa cca scas a  xa xha sxcsbdsbud babsuab bsababsa asbja da c c a cas xcscsdc sdc sdc ds d cd c ",
  experience: "2 years",
  qualifications: "Certified cosmetologist",
  careerHighlight: "Award-winning photographer, or 500+ weddings hosted",
  countryCode: "Sri Lanka (+94)",
  phone: "750207507",
};

function useIntroData() {
  return DUMMY_DATA;
}

export default function CoverIntroSection() {
  const { t } = useLang();
  const { businessName, photoUrl, logoUrl, bio, experience, qualifications, careerHighlight, countryCode, phone } = useIntroData();
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
    ? `https://wa.me/${countryCode.match(/\+\d+/)?.[0].replace("+", "") ?? ""}${phone}`
    : undefined;

  const hasQualificationInfo = experience || qualifications || careerHighlight;

  return (
    <div className="flex flex-col">
      <div className="w-full max-[500px]:px-2 px-4 sm:px-6 md:px-10 lg:px-22">

        {/* this is where cover photo */}
        <div className="rounded-[24px] relative">
          <div
            className="hidden sm:block absolute inset-0 rounded-[24px] opacity-70"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.00) 50%, rgba(255,255,255,0.30) 85%, #FFF 100%), linear-gradient(270deg, rgba(255,255,255,0.00) 50%, rgba(255,255,255,0.30) 85%, #FFF 100%), linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.20) 45%, #FFF 90%), url(${photoUrl})`,
              backgroundColor: "#D9D9D9",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              filter: "blur(7px)",
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

          <div className="relative flex flex-col px-4 max-[500px]:mt-12 mt-21">
            <h1 className="text-center font-poppins max-[500px]:text-[24px] text-[32px] font-semibold leading-[120%] text-[#222]">
              {businessName}
            </h1>

            {bio && (
              <div className="mx-auto mt-2 max-[500px]:mt-[15.67px] max-w-[640px] text-center">
                <p
                  ref={bioRef}
                  className={`font-poppins max-[500px]:text-[12px] text-[14px] md:text-[18px] leading-[150%] text-[#656565] ${bioExpanded ? "" : "line-clamp-3 max-[500px]:line-clamp-4"
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
        <div className="max-[500px]:mt-6 mt-10 max-w-[640px] mx-auto flex flex-col max-[500px]:gap-2 gap-3 rounded-[20px] bg-white max-[500px]:px-4 px-5 max-[500px]:py-6 py-5 shadow-[0_0_8px_0_rgba(0,0,0,0.16)]">
          {experience && (
            <div className="flex items-center max-[500px]:gap-2.5 gap-[19.58px]">
              <ClockIcon className="max-[500px]:w-3.5 w-5 max-[500px]:h-3.5 h-5"/>
              <span className="font-poppins max-[500px]:text-[14px] text-[18px] text-[#222222]">{experience}</span>
            </div>
          )}
          {qualifications && (
            <div className="flex items-center max-[500px]:gap-2.5 gap-[19.58px]">
              <QualificationIcon className="max-[500px]:w-3.5 w-5 max-[500px]:h-3.5 h-5"/>
              <span className="font-poppins max-[500px]:text-[14px] text-[18px] text-[#222222]">{qualifications}</span>
            </div>
          )}
          {careerHighlight && (
            <div className="flex items-start max-[500px]:gap-2.5 gap-[19.58px]">
              <div className="mt-[2.5px]">
                <CareerIcon className="max-[500px]:w-3.5 w-5 max-[500px]:h-3.5 h-5"/>
              </div>
              <span className="font-poppins max-[500px]:text-[14px] text-[18px] text-[#222222]">{careerHighlight}</span>
            </div>
          )}
        </div>
        </div>
      )}

    </div>
  );
}
