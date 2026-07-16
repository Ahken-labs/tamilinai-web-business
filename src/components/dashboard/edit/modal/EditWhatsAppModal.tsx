"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import FormRow from "@/components/common-layout/FormRow";
import InputBox from "@/components/common-layout/InputBox";
import CountryCodeSelect from "@/components/ui/CountryCodeSelect";
import { sanitizePhoneInput, validatePhone } from "@/utils/validation";
import EditModal from "./EditModal";
import { sendBizWhatsAppOtp, confirmBizWhatsAppOtp } from "@/lib/api";

type Props = {
  countryCode: string;
  phone: string;
  onClose: () => void;
  onSave: (countryCode: string, phone: string) => void;
};

export default function EditWhatsAppModal({ countryCode, phone, onClose, onSave }: Props) {
  const { t } = useLang();

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [draftCountryCode, setDraftCountryCode] = useState(countryCode);
  const [draftPhone, setDraftPhone] = useState(phone);
  const [otp, setOtp] = useState("");
  const [countryOpen, setCountryOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSendOtp() {
    const phoneErr = validatePhone(draftPhone, draftCountryCode, t);
    if (phoneErr) { setError(phoneErr); return; }
    setError("");
    setLoading(true);
    try {
      await sendBizWhatsAppOtp(draftPhone, draftCountryCode);
      setStep("otp");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmOtp() {
    if (!otp.trim()) { setError(t("Please_enter_the_complete_OTP")); return; }
    setError("");
    setLoading(true);
    try {
      await confirmBizWhatsAppOtp(draftPhone, draftCountryCode, otp.trim());
      onSave(draftCountryCode, draftPhone);
    } catch (e) {
      setError(e instanceof Error ? e.message : t("Invalid_OTP_Please_try_again"));
    } finally {
      setLoading(false);
    }
  }

  if (step === "otp") {
    return (
      <EditModal
        title={t("Verify_your_WhatsApp")}
        subtitle={`${t("We_sent_a_code_to")} ${draftCountryCode} ${draftPhone}`}
        onClose={onClose}
        onSave={handleConfirmOtp}
        saveText={loading ? t("Verifying") : "Confirm"}
        saveDisabled={loading}
      >
        <div className="flex flex-col mt-4 gap-5">
          <FormRow label={t("Please_enter_it_below")} required error={error}>
            <InputBox
              compact
              type="tel"
              value={otp}
              onChange={(v) => { setOtp(v.replace(/\D/g, "").slice(0, 6)); setError(""); }}
              label="6-digit code"
            />
          </FormRow>
          <button
            type="button"
            onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
            className="text-[14px] text-[#767676] hover:text-[#B31B38] text-left transition-colors"
          >
            {t("Wrong_number_Edit")}
          </button>
        </div>
      </EditModal>
    );
  }

  return (
    <EditModal
      title={t("Edit_WhatsApp_number")}
      subtitle={t("Edit_WhatsApp_number_subtitle")}
      onClose={onClose}
      onSave={handleSendOtp}
      saveText={loading ? "Sending…" : t("Send_verification_code")}
      saveDisabled={loading}
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
