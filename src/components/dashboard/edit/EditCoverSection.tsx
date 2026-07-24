"use client";

import { useRef, useState } from "react";
import { useLang } from "@/context/LangContext";
import { CameraIcon } from "@/assets/Icons";
import { compressImage } from "@/utils/imageCompression";
import { updateBizCoverPhoto, updateBizLogo, deleteBizLogo } from "@/lib/api";
import ChangeLogoModal from "@/components/dashboard/edit/ChangeLogoModal";

const CAMERA_BUTTON_CLASS =
  "flex items-center justify-center rounded-full bg-white/80 backdrop-blur-[8px] cursor-pointer shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_6px_0_rgba(0,0,0,0.04),0_4px_8px_0_rgba(0,0,0,0.10)]";

type Props = {
  coverPhotoUrl: string | null;
  logoUrl: string | null;
  businessName: string;
};

export default function EditCoverSection({ coverPhotoUrl, logoUrl, businessName }: Props) {
  const { t } = useLang();
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [photoUrl, setPhotoUrl] = useState<string | null>(coverPhotoUrl);
  const [currentLogoUrl, setCurrentLogoUrl] = useState<string | null>(logoUrl);
  const [coverUploading, setCoverUploading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoModalOpen, setLogoModalOpen] = useState(false);

  async function handleCoverFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    const compressed = await compressImage(file);
    const preview = URL.createObjectURL(compressed);
    setPhotoUrl(preview);
    setCoverUploading(true);
    try {
      const formData = new FormData();
      formData.append("photo", compressed, "cover.jpg");
      const { coverPhotoUrl: newUrl } = await updateBizCoverPhoto(formData);
      URL.revokeObjectURL(preview);
      setPhotoUrl(newUrl);
    } catch {
      setPhotoUrl(coverPhotoUrl);
    } finally {
      setCoverUploading(false);
    }
  }

  async function handleLogoFile(file: File) {
    setLogoModalOpen(false);
    const compressed = await compressImage(file);
    const preview = URL.createObjectURL(compressed);
    setCurrentLogoUrl(preview);
    setLogoUploading(true);
    try {
      const formData = new FormData();
      formData.append("photo", compressed, "logo.jpg");
      const { logoUrl: newUrl } = await updateBizLogo(formData);
      URL.revokeObjectURL(preview);
      setCurrentLogoUrl(newUrl);
    } catch {
      setCurrentLogoUrl(logoUrl);
    } finally {
      setLogoUploading(false);
    }
  }

  async function handleRemoveLogo() {
    setLogoModalOpen(false);
    setLogoUploading(true);
    try {
      await deleteBizLogo();
      setCurrentLogoUrl(null);
    } catch {
      setCurrentLogoUrl(logoUrl);
    } finally {
      setLogoUploading(false);
    }
  }

  return (
    <div className="w-full max-[500px]:px-2 px-4 sm:px-6 md:px-10 lg:px-22">
      <h1 className="mt-5 mb-4 leading-[140%] font-semibold max-[500px]:text-[24px] text-[32px] text-[#222] text-center">{t("Review_your_details")}</h1>
      <div className="rounded-[24px] relative">
        <div
          className="hidden sm:block absolute inset-0 rounded-[24px] opacity-100"
          style={{
            backgroundImage: photoUrl
              ? `linear-gradient(90deg, rgba(255,255,255,0.00) 50%, rgba(255,255,255,0.30) 85%, #FFF 100%), linear-gradient(270deg, rgba(255,255,255,0.00) 50%, rgba(255,255,255,0.30) 85%, #FFF 100%), linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.20) 45%, #FFF 90%), url(${photoUrl})`
              : undefined,
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
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoUrl} alt="" className={`h-full w-full object-cover transition-opacity ${coverUploading ? "opacity-60" : ""}`} />
            )}
            {coverUploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            disabled={coverUploading}
            aria-label="Change cover photo"
            className={`absolute max-[500px]:bottom-2 bottom-6 max-[500px]:right-2 right-6 max-[500px]:h-[26px] h-[26px] max-[500px]:w-[34px] w-[34px] ${CAMERA_BUTTON_CLASS}`}
          >
            <CameraIcon className="max-[500px]:w-4 w-5 max-[500px]:h-4 h-5 shrink-0" />
          </button>
          <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverFile} />

          <div className="absolute min-[500px]:-bottom-11.5 -bottom-6 max-[500px]:left-2 min-[500px]:right-0 min-[500px]:left-0 min-[500px]:mx-auto h-[50.4px] min-[500px]:h-23 w-[50.4px] min-[500px]:w-23">
            <button
              type="button"
              onClick={() => setLogoModalOpen(true)}
              disabled={logoUploading}
              aria-label="Change logo"
              className="cursor-pointer relative flex h-full w-full items-center justify-center overflow-hidden rounded-full max-[500px]:border-[2.4px] border-[4px] border-white bg-[#E8E8E8]"
            >
              {currentLogoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={currentLogoUrl} alt="" className={`h-full w-full object-cover transition-opacity ${logoUploading ? "opacity-60" : ""}`} />
              ) : (
                <span className="text-[19.2px] min-[500px]:text-[33.84px] font-medium text-[#E5BAC2]">
                  {businessName.trim().charAt(0).toUpperCase() || "?"}
                </span>
              )}
              {logoUploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                </div>
              )}

            </button>
            <div
              className={`pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 max-[500px]:h-[26px] h-[26px] max-[500px]:w-[34px] w-[34px] ${CAMERA_BUTTON_CLASS}`}
            >
              <CameraIcon className="max-[500px]:w-4 w-5 max-[500px]:h-4 h-5 shrink-0" />
            </div>
          </div>

          {logoModalOpen && (
            <ChangeLogoModal
              onClose={() => setLogoModalOpen(false)}
              onChoose={handleLogoFile}
              onRemove={currentLogoUrl ? handleRemoveLogo : undefined}
              hasLogo={!!currentLogoUrl}
            />
          )}
        </div>
      </div>
    </div>
  );
}
