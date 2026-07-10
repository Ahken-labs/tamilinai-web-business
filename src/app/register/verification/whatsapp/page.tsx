"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";
import FormRow from "@/components/common-layout/FormRow";
import InputBox from "@/components/common-layout/InputBox";
import CountryCodeSelect from "@/components/ui/CountryCodeSelect";
import { COUNTRIES } from "@/constants/countries";
import { sanitizePhoneInput, validatePhone } from "@/utils/validation";
import { WHATSAPP_STORAGE_KEY, OTP_SENT_AT_KEY, OTP_COOLDOWN_KEY, OTP_RESEND_COUNT_KEY } from "@/constants/storageKeys";
import { RESEND_COOLDOWNS } from "@/constants/otp";

export default function WhatsAppPage() {
  const { t } = useLang();
  const router = useRouter();

  const [countryCode, setCountryCode] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleVerify() {
    const errs: Record<string, string> = {};
    const phoneErr = validatePhone(phone, countryCode, t);
    if (phoneErr) errs.phone = phoneErr;

    setErrors(errs);
    if (Object.keys(errs).length) return;

    sessionStorage.setItem(WHATSAPP_STORAGE_KEY, JSON.stringify({ countryCode, phone }));
    sessionStorage.setItem(OTP_SENT_AT_KEY, String(Date.now()));
    sessionStorage.setItem(OTP_COOLDOWN_KEY, String(RESEND_COOLDOWNS[0]));
    sessionStorage.setItem(OTP_RESEND_COUNT_KEY, "0");
    router.push("/register/verification/otp");
  }

  return (
    <div className="font-poppins flex flex-col px-5 py-4 sm:w-[640px] mx-auto">
      <h1 className="mx-auto max-w-[350px] sm:max-w-[420px] md:max-w-[600px] text-center font-48 font-semibold leading-[120%] text-[#000]">
        {t("How_should_reach_you")}
      </h1>

      <p className="mx-auto max-w-[560px] mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-center font-20 leading-[150%] text-[#525252]">
        {t("Send_leads_to_whatsapp")}
      </p>

      <Image
        src="/images/families.webp"
        alt=""
        width={400}
        height={197}
        className="mt-8 sm:mt-9 md::mt-10 w-[clamp(280px,75vw,400px)] aspect-[217/107] object-contain mx-auto"
        priority
      />

      <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 flex flex-col gap-5">
        <FormRow label={t("Country_code")} required>
          <CountryCodeSelect
            value={countryCode}
            onChange={(val) => { setCountryCode(val); setPhone(""); setErrors((e) => ({ ...e, phone: "" })); }}
            open={countryOpen}
            setOpen={setCountryOpen}
          />
        </FormRow>

        <FormRow label={t("WhatsApp_business_number")} required error={errors.phone}>
          <InputBox
            compact
            type="tel"
            value={phone}
            onChange={(val) => {
              setPhone(sanitizePhoneInput(val, countryCode));
              setErrors((e) => ({ ...e, phone: "" }));
            }}
            label={t("Type_here")}
          />
        </FormRow>
      </div>

      <Button
        text={t("Verify_number")}
        onPress={handleVerify}
        className={`mt-8 sm:mt-9 md:mt-10 mx-auto ${!phone ? "!bg-[#525252] hover:!bg-[#525252]" : ""}`}
      />
    </div>
  );
}
