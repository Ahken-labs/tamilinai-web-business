"use client";

import { useRef, useState } from "react";
import { useLang } from "@/context/LangContext";
import { CameraIcon } from "@/assets/Icons";
import { compressImage } from "@/utils/imageCompression";

// Dummy data until this reads/writes the backend — remove once wired up.
const DUMMY_DATA = {
  businessName: "Ahken Bridal Studio",
  photoUrl: "/images/wedding_hall.webp",
  logoUrl: "/images/wedding_hall.webp",
};

const CAMERA_BUTTON_CLASS =
  "flex items-center justify-center rounded-full bg-white/80 backdrop-blur-[8px] cursor-pointer shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_6px_0_rgba(0,0,0,0.04),0_4px_8px_0_rgba(0,0,0,0.10)]";

export default function EditCoverSection() {
  const { t } = useLang();
  const coverInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [businessName] = useState(DUMMY_DATA.businessName);
  const [photoUrl, setPhotoUrl] = useState(DUMMY_DATA.photoUrl);
  const [logoUrl, setLogoUrl] = useState(DUMMY_DATA.logoUrl);

  async function handleCoverFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file);
    setPhotoUrl(URL.createObjectURL(compressed));
    e.target.value = "";
  }

  async function handleLogoFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file);
    setLogoUrl(URL.createObjectURL(compressed));
    e.target.value = "";
  }

  return (
    <div className="w-full max-[500px]:px-2 px-4 sm:px-6 md:px-10 lg:px-22">
      <h1 className="mt-5 mb-4 leading-[140%] font-semibold max-[500px]:text-[24px] text-[32px] text-[#222] text-center">{t("Review_your_details")}</h1>
      <div className="rounded-[24px] relative">
        <div
          className="hidden sm:block absolute inset-0 rounded-[24px] opacity-100"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.00) 50%, rgba(255,255,255,0.30) 85%, #FFF 100%), linear-gradient(270deg, rgba(255,255,255,0.00) 50%, rgba(255,255,255,0.30) 85%, #FFF 100%), linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.20) 45%, #FFF 90%), url(${photoUrl})`,
            backgroundColor: "#D9D9D9",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            filter: "blur(7px)",
          }}
        />
        <div className="relative max-w-[1040px] mx-auto">
          <div className="aspect-video w-full overflow-hidden rounded-[32px] min-[500px]:rounded-[64px] bg-[#D9D9D9]">
            {photoUrl && (
              // eslint-disable-next-line @next/next/no-img-element -- blob: preview URL, next/image can't optimize it
              <img src={photoUrl} alt="" className="h-full w-full object-cover" />
            )}
          </div>

          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            aria-label="Change cover photo"
            className={`absolute max-[500px]:bottom-2 bottom-6 max-[500px]:right-2 right-6 max-[500px]:h-[26px] h-[26px] max-[500px]:w-[34px] w-[34px] ${CAMERA_BUTTON_CLASS}`}
          >
            <CameraIcon className="max-[500px]:w-4 w-5 max-[500px]:h-4 h-5 shrink-0" />
          </button>
          <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverFile} />

          <div className="absolute min-[500px]:-bottom-11.5 -bottom-6.5 max-[500px]:left-2 min-[500px]:right-0 min-[500px]:left-0 min-[500px]:mx-auto h-13 min-[500px]:h-23 w-13 min-[500px]:w-23">
            <button
              type="button"
              onClick={() => logoInputRef.current?.click()}
              aria-label="Change logo">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-[4px] border-white bg-[#E8E8E8]">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- blob: preview URL, next/image can't optimize it
                <img src={logoUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="text-[19.2px] min-[500px]:text-[33.84px] font-medium text-[#E5BAC2]">
                  {businessName.trim().charAt(0).toUpperCase() || "?"}
                </span>
              )}
            </div>

            <div
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 max-[500px]:h-[26px] h-[26px] max-[500px]:w-[34px] w-[34px] ${CAMERA_BUTTON_CLASS}`}
            >
              <CameraIcon className="max-[500px]:w-4 w-5 max-[500px]:h-4 h-5 shrink-0" />
              </div>
            </button>
          </div>
          <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoFile} />
        </div>
      </div>
    </div>
  );
}
