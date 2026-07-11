"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import FormRow from "@/components/common-layout/FormRow";
import InputBox from "@/components/common-layout/InputBox";
import CountryCodeSelect from "@/components/ui/CountryCodeSelect";
import { sanitizePhoneInput, validatePhone } from "@/utils/validation";
import EditModal from "./EditModal";

type EditWhatsAppModalProps = {
  countryCode: string;
  phone: string;
  onClose: () => void;
  onSave: (countryCode: string, phone: string) => void;
};

export default function EditWhatsAppModal({ countryCode, phone, onClose, onSave }: EditWhatsAppModalProps) {
  const { t } = useLang();

  const [draftCountryCode, setDraftCountryCode] = useState(countryCode);
  const [draftPhone, setDraftPhone] = useState(phone);
  const [countryOpen, setCountryOpen] = useState(false);
  const [error, setError] = useState("");

  function handleSave() {
    const phoneErr = validatePhone(draftPhone, draftCountryCode, t);
    if (phoneErr) {
      setError(phoneErr);
      return;
    }
    setError("");
    onSave(draftCountryCode, draftPhone);
  }

  return (
    <EditModal
      title={t("Edit_WhatsApp_number")}
      subtitle={t("Edit_WhatsApp_number_subtitle")}
      onClose={onClose}
      onSave={handleSave}
      saveText={t("Send_verification_code")}
    >
      <div className="flex flex-col mt-4 gap-5">
        <FormRow label={t("Country_code")} required>
          <CountryCodeSelect
            value={draftCountryCode}
            onChange={(val) => { setDraftCountryCode(val); setDraftPhone(""); setError(""); }}
            open={countryOpen}
            setOpen={setCountryOpen}
          />
        </FormRow>

        <FormRow label={t("WhatsApp_business_number")} required error={error}>
          <InputBox
            compact
            type="tel"
            value={draftPhone}
            onChange={(val) => {
              setDraftPhone(sanitizePhoneInput(val, draftCountryCode));
              setError("");
            }}
            label={t("Type_here")}
          />
        </FormRow>
      </div>
    </EditModal>
  );
}
