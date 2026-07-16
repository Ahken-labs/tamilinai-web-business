"use client";

import { useLang } from "@/context/LangContext";
import Modal from "@/components/ui/Modal";
import { CheckIcon, PlusIcon, TrashIcon } from "@/assets/Icons";
import type { ServiceForm } from "@/hooks/useServiceForm";

type ServicePhotosStepModalProps = {
  form: ServiceForm;
  onClose: () => void;
  onContinue: () => void;
};

export default function ServicePhotosStepModal({ form, onClose, onContinue }: ServicePhotosStepModalProps) {
  const { t } = useLang();
  const { fileInputRef, photos, uploading, addFiles, removePhoto, MAX_PHOTOS } = form;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    await addFiles(e.target.files);
    e.target.value = "";
  }

  async function handleDrop(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    await addFiles(e.dataTransfer.files);
  }

  function handleDragOver(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
  }

  return (
    <Modal
      title={t("Add_photos")}
      subtitle={t("Add_at_least_one_photo")}
      onClose={onClose}
      onAddPhoto={() => fileInputRef.current?.click()}
      loading={uploading}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="font-poppins text-[16px] font-medium text-[#222222] cursor-pointer transition-all duration-150 hover:bg-[#E6E6E6] active:scale-[0.98] rounded-full px-4 py-2"
          >
            {t("Cancel")}
          </button>
          <button
            type="button"
            disabled={uploading || photos.length === 0}
            onClick={onContinue}
            className={`rounded-full px-10 py-3 text-[16px] font-semibold text-white transition-all duration-150 ${uploading || photos.length === 0
              ? "cursor-not-allowed bg-[#525252] uploading-shimmer"
              : "bg-[#B31B38] hover:bg-[#8E162D] active:bg-[#6F1023] active:scale-[0.98] cursor-pointer"
              }`}
          >
            {uploading ? t("Uploading") : t("Add")}
          </button>
        </>
      }
    >
      <div onDrop={handleDrop} onDragOver={handleDragOver} className="max-w-[432px] mx-auto grid grid-cols-2 gap-3">
        {photos.map((photo) => (
          <div key={photo.id} className="relative aspect-square overflow-hidden rounded-[12px] bg-[#F2F2F2]">
            {/* eslint-disable-next-line @next/next/no-img-element -- blob: preview URL */}
            <img src={photo.url} alt="" className={`h-full w-full object-cover transition-[filter] ${photo.uploading ? "brightness-50" : ""}`} />
            {photo.uploading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="upload-spinner h-8 w-8" />
              </div>
            ) : uploading ? (
              // This photo is done, but others in the batch are still uploading —
              // show a checkmark instead of the delete action until the whole batch finishes.
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckIcon className="h-8 w-8" stroke="#FFFFFF" />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                className="absolute right-2 top-2 flex p-1.5 items-center justify-center rounded-full cursor-pointer border border-white/50 bg-white/80 backdrop-blur-[16px] shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_6px_0_rgba(0,0,0,0.04),0_4px_8px_0_rgba(0,0,0,0.10)]"
                aria-label="Remove photo"
              >
                <TrashIcon className="h-4 sm:h-5 w-4 sm:w-5" />
              </button>
            )}
          </div>
        ))}

        {photos.length < MAX_PHOTOS && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex aspect-square items-center justify-center rounded-2xl bg-[#F2F2F2] cursor-pointer"
            aria-label="Add photo"
          >
            <PlusIcon className="h-6 w-6" stroke="#525252" />
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFile}
      />
    </Modal>
  );
}
