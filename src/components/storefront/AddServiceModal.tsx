"use client";

import { useRef, useState } from "react";
import { useLang } from "@/context/LangContext";
import Modal from "@/components/ui/Modal";
import Button from "@/components/common-layout/Button";
import FormRow from "@/components/common-layout/FormRow";
import InputBox from "@/components/common-layout/InputBox";
import { MultiPhotoPlaceholderIcon, TrashIcon, CheckIcon, PlusIcon, XIcon } from "@/assets/Icons";
import { compressImage } from "@/utils/imageCompression";
import { formatThousands, capitalizeFirst } from "@/utils/format";

const UPLOAD_DURATION_MS = 1200;
const MAX_PHOTOS = 4;

export type NewService = {
  title: string;
  price: string;
  description: string;
  photos: string[];
};

type Photo = { url: string; uploading: boolean };

type AddServiceModalProps = {
  onClose: () => void;
  onSave: (service: NewService) => void;
};

export default function AddServiceModal({ onClose, onSave }: AddServiceModalProps) {
  const { t } = useLang();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<"details" | "photos">("details");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const uploading = photos.some((p) => p.uploading);

  async function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const room = MAX_PHOTOS - photos.length;
    const picked = Array.from(files).slice(0, room);

    for (const file of picked) {
      if (!file.type.startsWith("image/")) continue;
      const compressed = await compressImage(file);
      const url = URL.createObjectURL(compressed);
      setPhotos((prev) => [...prev, { url, uploading: true }]);
      setTimeout(() => {
        setPhotos((prev) => prev.map((p) => (p.url === url ? { ...p, uploading: false } : p)));
      }, UPLOAD_DURATION_MS);
    }
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    await addFiles(e.target.files);
    e.target.value = "";
    setStep("photos");
  }

  async function handleDrop(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    await addFiles(e.dataTransfer.files);
    setStep("photos");
  }

  function handleDragOver(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
  }

  function removePhoto(url: string) {
    setPhotos((prev) => prev.filter((p) => p.url !== url));
    URL.revokeObjectURL(url);
  }

  function handleSave() {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "*Service title is required";
    if (!price.trim()) errs.price = "*Starting price is required";
    if (!description.trim()) errs.description = "*Description is required";
    if (photos.length === 0) errs.photos = "*Please add at least one photo";

    setErrors(errs);
    if (Object.keys(errs).length) return;

    onSave({ title, price, description, photos: photos.map((p) => p.url) });
  }

  const fileInput = (
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      multiple
      className="hidden"
      onChange={handleFile}
    />
  );

  if (step === "photos") {
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
              onClick={() => setStep("details")}
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
            <div key={photo.url} className="relative aspect-square overflow-hidden rounded-[12px] bg-[#F2F2F2]">
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
                  onClick={() => removePhoto(photo.url)}
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

        {fileInput}
      </Modal>
    );
  }

  return (
    <Modal
      title={t("Add_service_details")}
      onClose={onClose}
      onAddPhoto={photos.length > 0 ? () => setStep("photos") : undefined}
      footer={
        photos.length > 0 ? (
          <>
            <button
              type="button"
              onClick={() => setStep("photos")}
              className="font-poppins text-[16px] font-medium text-[#222222] cursor-pointer transition-all duration-150 hover:text-[#B31B38] active:scale-[0.98]"
            >
              {t("Add_photo")}
            </button>
            <Button
              text={t("Save")}
              onPress={handleSave}
              disabled={!title.trim() || !price.trim() || !description.trim() || photos.length === 0}
            />
          </>
        ) : undefined
      }
    >
      {photos.length === 0 ? (
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
            {t("Or_browse_for_photo").replace("photo", "photos")}
          </p>
          <Button text={t("Browse")} onPress={() => fileInputRef.current?.click()} />
        </div>
      ) : (
        <div onDrop={handleDrop} onDragOver={handleDragOver} className="no-scrollbar flex gap-3 overflow-x-auto">
          {photos.map((photo) => (
            <div key={photo.url} className="relative h-[124px] w-[124px] shrink-0 overflow-hidden rounded-[12px] bg-[#F2F2F2]">
              {/* eslint-disable-next-line @next/next/no-img-element -- blob: preview URL */}
              <img src={photo.url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(photo.url)}
                className="absolute right-2 top-2 flex h-[28px] w-[28px] items-center justify-center rounded-full cursor-pointer border border-white/50 bg-white/80 backdrop-blur-[16px] shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_6px_0_rgba(0,0,0,0.04),0_4px_8px_0_rgba(0,0,0,0.10)]"
                aria-label="Remove photo"
              >
                <XIcon className="h-6 w-6" stroke="#222222" />
              </button>
            </div>
          ))}
        </div>
      )}
      {errors.photos && <p className="mt-2 text-[14px] text-[#B31B38]">{errors.photos}</p>}
      {fileInput}

      <div className="mt-5 sm:mt-6 md:mt-8 lg:mt-10 flex flex-col gap-5">
        <FormRow label={t("Service_title")} error={errors.title}>
          <InputBox compact value={title} onChange={(v) => { setTitle(capitalizeFirst(v)); setErrors((e) => ({ ...e, title: "" })); }} label={t("Type_here")} />
        </FormRow>

        <FormRow label={t("Starting_price")} error={errors.price}>
          <InputBox
            compact
            type="text"
            value={formatThousands(price)}
            onChange={(v) => { setPrice(v.replace(/\D/g, "")); setErrors((e) => ({ ...e, price: "" })); }}
            label="Enter"
          />
        </FormRow>

        <FormRow label={t("Description")} error={errors.description}>
          <InputBox
            className="h-20"
            compact
            multiline
            value={description}
            onChange={(v) => { setDescription(capitalizeFirst(v)); setErrors((e) => ({ ...e, description: "" })); }}
            label={t("Description_Placeholder")}
          />
        </FormRow>
      </div>
    </Modal>
  );
}
