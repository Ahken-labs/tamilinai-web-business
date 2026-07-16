"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/context/LangContext";
import { useScrollLock } from "@/hooks/useScrollLock";
import Button from "@/components/common-layout/Button";
import ServiceDetailsBody from "@/components/storefront/ServiceDetailsBody";
import ServicePhotosStepModal from "@/components/storefront/ServicePhotosStepModal";
import DeleteServiceConfirmModal from "@/components/storefront/DeleteServiceConfirmModal";
import { DeleteIcon, XIcon } from "@/assets/Icons";
import { useServiceForm } from "@/hooks/useServiceForm";
import type { NewService } from "@/type/serviceTypes";

type EditServiceModalProps = {
  onClose: () => void;
  onSave: (service: NewService) => void;
  onDelete: () => void;
  saving?: boolean;
  initialService: NewService;
};

export default function EditServiceModal({ onClose, onSave, onDelete, saving, initialService }: EditServiceModalProps) {
  const { t } = useLang();
  const form = useServiceForm(initialService);
  const { photos, title, price, description } = form;

  const [step, setStep] = useState<"details" | "photos" | "confirmDelete">("details");
  useScrollLock(step === "details");

  function handleSave() {
    if (!form.validate()) return;
    onSave(form.toNewService());
  }

  if (step === "photos") {
    return (
      <ServicePhotosStepModal
        form={form}
        onClose={onClose}
        onContinue={() => setStep("details")}
      />
    );
  }

  if (step === "confirmDelete") {
    return (
      <DeleteServiceConfirmModal
        title={title}
        onClose={() => setStep("details")}
        onConfirm={onDelete}
        deleting={saving}
      />
    );
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end min-[500px]:items-center justify-center min-[500px]:p-4 bg-black/60">
      <div className="flex h-[96dvh] max-h-[96dvh] min-[500px]:h-[85vh] min-[500px]:max-h-[85vh] w-full min-[500px]:max-w-[640px] flex-col overflow-hidden rounded-t-[32px] min-[500px]:rounded-[32px] bg-white shadow-2xl">
        <div className="shrink-0 flex items-center justify-between gap-2 px-1 sm:px-1.5 md:px-2 max-[500px]:py-0 max-[500px]:pt-2 py-2 sm:py-3 md:py-4">
          <button
            type="button"
            onClick={() => setStep("confirmDelete")}
            className="cursor-pointer h-10 w-10"
            aria-label="Delete service"
          >
            <div className="p-2">
              <DeleteIcon className="w-5 h-4.5" stroke="#222" />
            </div>
          </button>

          <div className="min-w-0 flex-1" />

          <button type="button" onClick={onClose} className="cursor-pointer h-10 w-10 p-2" aria-label="Close">
            <XIcon className="h-6 sm:h-7 md:h-8 w-6 sm:h-7 md:w-8" stroke="#222222" />
          </button>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto px-4 sm:px-5 pt-3 sm:pt-4 pb-4 sm:pb-5">
          <ServiceDetailsBody form={form} onPhotosAdded={() => setStep("photos")} />
        </div>

        {photos.length > 0 && (
          <div className="shrink-0 flex items-center justify-between gap-3 border-t border-[#D8D8D8] px-4 sm:px-5 md:px-6 py-3">
            <button
              type="button"
              onClick={() => setStep("photos")}
              className="font-poppins text-[16px] font-medium text-[#222222] cursor-pointer transition-all duration-150 hover:text-[#B31B38] active:scale-[0.98]"
            >
              {t("Add_photo")}
            </button>
            <Button
              text={saving ? "Saving…" : t("Save_changes")}
              onPress={handleSave}
              className="max-[500px]:!px-6"
              disabled={saving || !title.trim() || !price.trim() || !description.trim() || photos.length === 0}
            />
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
