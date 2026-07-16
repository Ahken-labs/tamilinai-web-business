"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import Modal from "@/components/ui/Modal";
import Button from "@/components/common-layout/Button";
import ServiceDetailsBody from "@/components/storefront/ServiceDetailsBody";
import ServicePhotosStepModal from "@/components/storefront/ServicePhotosStepModal";
import { useServiceForm } from "@/hooks/useServiceForm";
import type { NewService } from "@/type/serviceTypes";

export type { NewService };

type AddServiceModalProps = {
  onClose: () => void;
  onSave: (service: NewService) => void;
  saving?: boolean;
};

export default function AddServiceModal({ onClose, onSave, saving }: AddServiceModalProps) {
  const { t } = useLang();
  const form = useServiceForm();
  const { photos, title, price, description } = form;

  const [step, setStep] = useState<"details" | "photos">("details");

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
              text={saving ? "Saving…" : t("Save")}
              onPress={handleSave}
              disabled={saving || !title.trim() || !price.trim() || !description.trim() || photos.length === 0}
            />
          </>
        ) : undefined
      }
    >
      <ServiceDetailsBody form={form} onPhotosAdded={() => setStep("photos")} />
    </Modal>
  );
}
