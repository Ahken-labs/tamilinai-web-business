"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/context/LangContext";
import { useScrollLock } from "@/hooks/useScrollLock";
import Button from "@/components/common-layout/Button";
import { ImagePlaceholderIcon, MultiPhotoPlaceholderIcon, TrashIcon, XIcon } from "@/assets/Icons";

type ChangeLogoModalProps = {
  onClose: () => void;
  onChoose: (file: File) => void;
  onRemove?: () => void;
  hasLogo: boolean;
};

export default function ChangeLogoModal({ onClose, onChoose, onRemove, hasLogo }: ChangeLogoModalProps) {
  const { t } = useLang();
  useScrollLock(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) onChoose(file);
  }

  function handleDrop(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onChoose(file);
  }

  function handleDragOver(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end min-[500px]:items-center justify-center min-[500px]:p-4 bg-black/60">
      <div className="flex h-[36dvh] max-h-[96dvh] min-[500px]:h-[50vh] min-[500px]:max-h-[85vh] w-full min-[500px]:max-w-[480px] flex-col overflow-hidden rounded-t-[32px] min-[500px]:rounded-[32px] bg-white shadow-2xl">
        <div className="shrink-0 flex items-center justify-end px-3 pt-3">
          <button type="button" onClick={onClose} className="cursor-pointer p-2" aria-label="Close">
            <XIcon className="h-6 w-6" stroke="#222222" />
          </button>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto">
          <div className="hidden min-[500px]:flex flex-col px-6 pb-6">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex aspect-video max-h-[280px] w-full flex-col items-center justify-center gap-5 rounded-[20px] border border-dashed border-[#656565] bg-[#F2F2F2] py-6"
            >
              <div className="drop-shadow-[0_3.803px_6.085px_rgba(0,0,0,0.25)]">
                <MultiPhotoPlaceholderIcon />
              </div>
              <p className="text-center font-poppins text-[16px] leading-[150%] text-[#525252]">
                {t("Drag_and_drop")}
                <br />
                {t("Or_browse_for_photo")}
              </p>
              <Button text={t("Browse")} onPress={() => fileInputRef.current?.click()} />
            </div>

            {hasLogo && onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="mt-6 mx-auto flex items-center gap-2 font-poppins text-[16px] text-[#8D5900] cursor-pointer transition-all duration-150 hover:opacity-70 active:scale-[0.98]"
              >
                <TrashIcon className="h-6 w-6" stroke="#8D5900" />
                {t("Remove_photo")}
              </button>
            )}
          </div>

          <div className="min-[500px]:hidden flex flex-col gap-2 px-2 pb-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center gap-3 rounded-[12px] px-3 py-2 text-left cursor-pointer hover:bg-[#F5F5F5]"
            >
              <ImagePlaceholderIcon className="h-6 w-6" stroke="#222222" />
              <span className="font-poppins text-[16px] text-[#222222]">{t("Choose_from_gallery")}</span>
            </button>

            {hasLogo && onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="flex w-full items-center gap-3 rounded-[12px] px-3 py-3 text-left cursor-pointer hover:bg-[#F5F5F5]"
              >
                <TrashIcon className="h-6 w-6" stroke="#8D5900" />
                <span className="font-poppins text-[16px] text-[#8D5900]">{t("Remove_photo")}</span>
              </button>
            )}
          </div>
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    </div>,
    document.body
  );
}
