"use client";

import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";
import FormRow from "@/components/common-layout/FormRow";
import InputBox from "@/components/common-layout/InputBox";
import { MultiPhotoPlaceholderIcon, XIcon } from "@/assets/Icons";
import { formatThousands, capitalizeFirst } from "@/utils/format";
import { MAX_DESCRIPTION_LENGTH, type ServiceForm } from "@/hooks/useServiceForm";

type ServiceDetailsBodyProps = {
  form: ServiceForm;
  onPhotosAdded: () => void;
};

export default function ServiceDetailsBody({ form, onPhotosAdded }: ServiceDetailsBodyProps) {
  const { t } = useLang();
  const {
    fileInputRef, photos, removePhoto, addFiles,
    title, setTitle, price, setPrice, description, setDescription,
    errors, setErrors,
  } = form;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    await addFiles(e.target.files);
    e.target.value = "";
    onPhotosAdded();
  }

  async function handleDrop(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    await addFiles(e.dataTransfer.files);
    onPhotosAdded();
  }

  function handleDragOver(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
  }

  return (
    <>
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
            <div key={photo.id} className="relative h-[124px] w-[124px] shrink-0 overflow-hidden rounded-[12px] bg-[#F2F2F2]">
              {/* eslint-disable-next-line @next/next/no-img-element -- blob: preview URL */}
              <img src={photo.url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
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

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFile}
      />

      <div className="mt-5 sm:mt-6 md:mt-8 lg:mt-10 flex flex-col gap-5">
        <FormRow label={t("Service_title")} error={errors.title}>
          <InputBox compact value={title} onChange={(v) => { setTitle(capitalizeFirst(v)); setErrors((e) => ({ ...e, title: "" })); }} label={t("Type_here")} />
        </FormRow>

        <FormRow label={t("Starting_price")} error={errors.price}>
          <InputBox
            compact
            type="text"
            value={formatThousands(price)}
            onChange={(v) => { const digits = v.replace(/\D/g, ""); if (parseInt(digits || "0", 10) <= 9999999) setPrice(digits); setErrors((e) => ({ ...e, price: "" })); }}
            label="Enter"
          />
        </FormRow>

        <FormRow label={t("Description")} error={errors.description}>
          <InputBox
            className="!min-h-[80px]"
            compact
            multiline
            value={description}
            onChange={(v) => { setDescription(capitalizeFirst(v).slice(0, MAX_DESCRIPTION_LENGTH)); setErrors((e) => ({ ...e, description: "" })); }}
            label={t("Description_Placeholder")}
          />
          <p className="mt-1 text-right font-poppins text-[14px] text-[#767676]">
            ({description.length} / {MAX_DESCRIPTION_LENGTH})
          </p>
        </FormRow>
      </div>
    </>
  );
}
