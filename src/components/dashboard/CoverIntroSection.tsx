"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";
import { CareerIcon, ChevronIcon, ClockIcon, QualificationIcon, WhatsAppLineIcon } from "@/assets/Icons";
import {
  BASIC_DETAILS_STORAGE_KEY,
  BIO_STORAGE_KEY,
  EXPERIENCE_STORAGE_KEY,
  MAIN_PHOTO_STORAGE_KEY,
  WHATSAPP_STORAGE_KEY,
} from "@/constants/storageKeys";
import Button from "../common-layout/Button";

// Dummy fallback data for frontend testing — remove once this reads from the backend.
const DUMMY_DATA = {
  businessName: "Ahken Bridal Studio",
  bio: "Luxury High-End Products: Tailored exclusively using premium, high-end brands to ensure the finest quality for your skin. Soft & Flawless Finish: A beautifully radiant, long-lasting bridal look crafted for your special day.",
  experience: "2 years experience",
  qualifications: "Certified cosmetologist",
  careerHighlight: "Award-winning photographer, or 500+ weddings hosted",
  countryCode: "Sri Lanka (+94)",
  phone: "750207507",
};

function useIntroData() {
  const [businessName, setBusinessName] = useState(DUMMY_DATA.businessName);
  const [photoUrl, setPhotoUrl] = useState("");
  const [bio, setBio] = useState(DUMMY_DATA.bio);
  const [experience, setExperience] = useState(DUMMY_DATA.experience);
  const [qualifications, setQualifications] = useState(DUMMY_DATA.qualifications);
  const [careerHighlight, setCareerHighlight] = useState(DUMMY_DATA.careerHighlight);
  const [countryCode, setCountryCode] = useState(DUMMY_DATA.countryCode);
  const [phone, setPhone] = useState(DUMMY_DATA.phone);

  useEffect(() => {
    try {
      const basic = sessionStorage.getItem(BASIC_DETAILS_STORAGE_KEY);
      if (basic) {
        const saved = JSON.parse(basic) as { businessName?: string };
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBusinessName(saved.businessName ?? "");
      }

      const photo = sessionStorage.getItem(MAIN_PHOTO_STORAGE_KEY);
      if (photo) setPhotoUrl(photo);

      const bioRaw = sessionStorage.getItem(BIO_STORAGE_KEY);
      if (bioRaw) setBio(JSON.parse(bioRaw).bio ?? "");

      const exp = sessionStorage.getItem(EXPERIENCE_STORAGE_KEY);
      if (exp) {
        const saved = JSON.parse(exp) as {
          experience?: string;
          qualifications?: string;
          careerHighlight?: string;
        };
        setExperience(saved.experience ?? "");
        setQualifications(saved.qualifications ?? "");
        setCareerHighlight(saved.careerHighlight ?? "");
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

  return { businessName, photoUrl, bio, experience, qualifications, careerHighlight, countryCode, phone };
}

// Cover banner — rendered by the page at full browser width, outside the content column.
export function CoverPhoto() {
  const { businessName, photoUrl } = useIntroData();

  return (
    <div className="relative w-full max-[500px]:px-2 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="aspect-video w-full overflow-hidden rounded-[32px] bg-[#D9D9D9]">
        {photoUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- data URL from sessionStorage, next/image can't optimize it
          <img src={photoUrl} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="absolute -bottom-6.5 left-2 flex h-13 w-13 items-center justify-center rounded-full border-[4px] border-white bg-[#E8E8E8]">
        <span className="text-[19.2px] font-medium text-[#E5BAC2]">
          {businessName.trim().charAt(0).toUpperCase() || "?"}
        </span>
      </div>
    </div>
  );
}

// Business name, bio, WhatsApp button, qualifications — rendered inside the page's normal content column.
export function IntroDetails() {
  const { t } = useLang();
  const { businessName, bio, experience, qualifications, careerHighlight, countryCode, phone } = useIntroData();
  const [bioExpanded, setBioExpanded] = useState(false);

  const whatsappHref = phone
    ? `https://wa.me/${countryCode.match(/\+\d+/)?.[0].replace("+", "") ?? ""}${phone}`
    : undefined;

  const hasQualificationInfo = experience || qualifications || careerHighlight;

  return (
    <div className="flex flex-col px-4 mt-12">
      <h1 className="text-center font-poppins font-48 font-semibold leading-[120%] text-[#222]">
        {businessName}
      </h1>

      {bio && (
        <div className="mx-auto mt-2 max-w-[560px] text-center">
          <p
            className={`font-poppins text-[12px] leading-[150%] text-[#656565] ${bioExpanded ? "" : "line-clamp-4"
              }`}
          >
            {bio}
          </p>
          <button
            type="button"
            onClick={() => setBioExpanded((v) => !v)}
            className="inline-flex items-center gap-1 font-poppins text-[12px] text-[#767676] cursor-pointer"
          >
            {bioExpanded ? t("See_less") : t("See_more")}
            <ChevronIcon open={bioExpanded} className="w-3 h-3 shrink-0 transition-transform duration-300" stroke="#767676" />
          </button>
        </div>
      )}

      {whatsappHref && (
        <Button text={t("WhatsApp")}
          iconLeft={<WhatsAppLineIcon />}
          className="mt-4 mx-auto max-[500px]:px-4 items-center " />
      )}

      {hasQualificationInfo && (
        <div className="mt-6 flex flex-col gap-2 rounded-[20px] bg-white px-4 py-6 shadow-[0_0_8px_0_rgba(0,0,0,0.16)]">
          {experience && (
            <div className="flex items-center gap-2.5">
              <ClockIcon />
              <span className="font-poppins font-16 text-[#222222]">{experience}</span>
            </div>
          )}
          {qualifications && (
            <div className="flex items-center gap-2.5">
              <QualificationIcon />
              <span className="font-poppins font-16 text-[#222222]">{qualifications}</span>
            </div>
          )}
          {careerHighlight && (
            <div className="flex items-start gap-2.5">
              <div className="mt-[2.5px]">
              <CareerIcon />
              </div>
              <span className="font-poppins font-16 text-[#222222]">{careerHighlight}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
