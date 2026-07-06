"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { ImagePlaceholderIcon } from "@/assets/Icons";
import { CATEGORY_PHOTO_GUIDANCE } from "@/constants/services";
import { BASIC_DETAILS_STORAGE_KEY } from "@/constants/storageKeys";
import Button from "@/components/common-layout/Button";
import { compressImage } from "@/utils/imageCompression";

const UPLOAD_DURATION_MS = 1800;

export default function MainPhotoPage() {
  const { t } = useLang();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(BASIC_DETAILS_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { category?: string; businessName?: string };
        setCategory(saved.category ?? "");
        setBusinessName(saved.businessName ?? "");
      }
    } catch {
      // no saved selection
    }
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const guidance = CATEGORY_PHOTO_GUIDANCE[category] ?? CATEGORY_PHOTO_GUIDANCE["Other"];

  async function processFile(file: File) {
    if (!file.type.startsWith("image/")) return;

    setUploading(true);
    const compressed = await compressImage(file);
    setPhotoFile(compressed);
    setPreviewUrl(URL.createObjectURL(compressed));
    setTimeout(() => setUploading(false), UPLOAD_DURATION_MS);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  function handleDragOver(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
  }

  function handleChange() {
    fileInputRef.current?.click();
  }

  return (
    <div className="font-poppins flex flex-col px-5 py-4 max-[500px]:pb-28 sm:w-[640px] mx-auto">
      <h1 className="mx-auto max-w-[250px] md:max-w-[400px] text-center font-48 font-semibold leading-[120%] text-[#000]">
        {t("Add_your_main_business_photo")}
      </h1>

      <p className="mx-auto max-w-[560px] mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-center font-20 leading-[150%] text-[#525252]">
        {guidance}
      </p>

      {!previewUrl ? (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="pt-6 pb-5 mt-7 sm:mt-8 md:mt-10 lg:mt-12 flex aspect-[16/9] w-full max-w-[400px] mx-auto flex-col items-center justify-center self-stretch rounded-[20px] border border-dashed border-[#656565] bg-[#F2F2F2] cursor-pointer"
        >
          <div className="drop-shadow-[0_3.803px_6.085px_rgba(0,0,0,0.25)]">
            <ImagePlaceholderIcon />
            </div>
        
          <p className="mt-4 text-center text-[16px] leading-[150%] text-[#525252]">
            {t("Drag_and_drop")}
            <br />
            {t("Or_browse_for_photo")}
          </p>
          <Button
            text={t("Browse")}
            onPress={() => fileInputRef.current?.click()}
            className="mt-4"
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </label>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="relative mt-7 sm:mt-8 md:mt-10 lg:mt-12 aspect-[16/9] w-full max-w-[400px] mx-auto overflow-hidden rounded-[20px] bg-[#F2F2F2]"
        >
          {/* object-cover: display fills the 16:9 cover-photo frame. This is a CSS-only visual crop —
              the stored file (photoFile) keeps the full original, uncropped image */}
          {/* eslint-disable-next-line @next/next/no-img-element -- blob: preview URL, next/image can't optimize it */}
          <img
            src={previewUrl}
            alt=""
            className={`h-full w-full object-cover transition-[filter] ${uploading ? "brightness-50" : ""}`}
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="upload-spinner h-16 w-16" />
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      )}

      {previewUrl && (
        <div className="relative z-10 -mt-10.5 mx-auto flex h-21 w-21 border-[4px] border-[#FFF] items-center justify-center rounded-full bg-[#E8E8E8]">
          <span className="text-[32px] font-normal text-[#E5BAC2]">
            {businessName.trim().charAt(0).toUpperCase() || "?"}
          </span>
        </div>
      )}

      <p className="mx-auto max-w-[560px] mt-7 md:mt-8 text-center font-poppins text-[14px] sm:text-[15px] md:text-[16px] leading-[150%] text-primary">
        {t("Photo_upload_warning")}
      </p>

      {previewUrl && (
        <div className="max-[500px]:fixed max-[500px]:inset-x-0 max-[500px]:bottom-0 max-[500px]:z-40 max-[500px]:border-t max-[500px]:border-[#D8D8D8] max-[500px]:bg-white/60 max-[500px]:backdrop-blur-sm max-[500px]:px-4 py-3 max-[500px]:backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-[600px] items-center justify-between min-[500px]:mt-12 min-[500px]:pt-0">
            <button
              type="button"
              onClick={handleChange}
              className="font-poppins py-3 font-16 min-[500px]:font-semibold font-medium min-[500px]:bg-[#F2F2F2] min-[500px]:px-10 rounded-full text-[#222222] min-[500px]:text-[#525252] cursor-pointer transition-all duration-150 min-[500px]:hover:bg-[#E6E6E6] active:scale-[0.98]"
            >
              {t("Change")}
            </button>

            <button
              type="button"
              disabled={uploading}
              onClick={() => router.push("/register/basic-details/location")}
              className={`rounded-full px-10 py-3 font-16 font-semibold text-white transition-all duration-150 ${
                uploading
                  ? "cursor-not-allowed bg-[#525252] uploading-shimmer"
                  : "bg-[#B31B38] hover:bg-[#8E162D] active:bg-[#6F1023] active:scale-[0.98] cursor-pointer"
              }`}
            >
              {uploading ? t("Uploading") : t("Add")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
