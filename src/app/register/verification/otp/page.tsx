"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";
import { ArrowRightIcon, WhatsAppIcon } from "@/assets/Icons";
import { OTP_LENGTH, RESEND_COOLDOWNS, DUMMY_OTP } from "@/constants/otp";
import {
  WHATSAPP_STORAGE_KEY,
  OTP_SENT_AT_KEY,
  OTP_COOLDOWN_KEY,
  OTP_RESEND_COUNT_KEY,
} from "@/constants/storageKeys";
import { extractCountryCode } from "@/utils/validation";

// Sri Lankan numbers are shown in the locally familiar "075 020 7507" format
// (leading 0 + groups of 3-3-4) instead of the raw +94 international form.
function formatSriLankanLocal(phone: string): string {
  const local = `0${phone}`;
  return `${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`.trim();
}

function getSecondsRemaining(): number {
  const sentAt = Number(sessionStorage.getItem(OTP_SENT_AT_KEY) ?? 0);
  const duration = Number(sessionStorage.getItem(OTP_COOLDOWN_KEY) ?? 0);
  if (!sentAt || !duration) return 0;
  return Math.max(0, duration - Math.floor((Date.now() - sentAt) / 1000));
}

export default function OtpPage() {
  const { t } = useLang();
  const router = useRouter();

  const [fullPhone, setFullPhone] = useState("");
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [banned, setBanned] = useState(false);
  const [shake, setShake] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(WHATSAPP_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { countryCode?: string; phone?: string };
        const code = extractCountryCode(saved.countryCode ?? "");
        const phone = saved.phone ?? "";
        const display = code === "+94" ? formatSriLankanLocal(phone) : `${code} ${phone}`.trim();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFullPhone(display);
      }
    } catch {
      // no saved number
    }
    setCountdown(getSecondsRemaining());
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const id = window.setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  function handleChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setError("");
    if (value && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  }

  function handleVerify() {
    const otp = digits.join("");
    if (otp.length < OTP_LENGTH) {
      setError(t("Please_enter_the_complete_OTP"));
      triggerShake();
      return;
    }

    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);

      if (otp !== DUMMY_OTP) {
        setError(t("Invalid_OTP_Please_try_again"));
        triggerShake();
        setDigits(Array(OTP_LENGTH).fill(""));
        inputRefs.current[0]?.focus();
        return;
      }

      router.push("/register/verification/create-password");
    }, 1200);
  }

  function handleResend() {
    if (countdown > 0 || banned) return;

    const resendCount = Number(sessionStorage.getItem(OTP_RESEND_COUNT_KEY) ?? 0);
    if (resendCount >= RESEND_COOLDOWNS.length) {
      setBanned(true);
      setError(t("Too_many_attempts"));
      return;
    }

    const cooldown = RESEND_COOLDOWNS[resendCount];
    sessionStorage.setItem(OTP_SENT_AT_KEY, String(Date.now()));
    sessionStorage.setItem(OTP_COOLDOWN_KEY, String(cooldown));
    sessionStorage.setItem(OTP_RESEND_COUNT_KEY, String(resendCount + 1));
    setCountdown(cooldown);
    setDigits(Array(OTP_LENGTH).fill(""));
    setError("");
    inputRefs.current[0]?.focus();
  }

  const formattedTimer = `${String(Math.floor(countdown / 60)).padStart(2, "0")}:${String(countdown % 60).padStart(2, "0")}`;
  const isComplete = digits.every((d) => d);

  return (
    <div className="font-poppins flex flex-col px-5 py-4 sm:w-[640px] mx-auto">
      <div className="mx-auto hidden p-3 md:p-[13.38px] items-center justify-center rounded-[25px] md:rounded-[30.102px] bg-[#25D366] mb-8 min-[500px]:flex">
        <WhatsAppIcon className="w-[40px] md:w-[53.013px] h-[40px] md:h-[53.013px]" />
      </div>
      <h1 className="mx-auto text-center font-48 font-semibold leading-[120%] text-[#000]">
        {t("Verify_your_WhatsApp")}
      </h1>

      <p className="mx-auto max-[370]:max-w-[220px] max-w-[440px] md:max-w-[500px] lg:max-w-[560px] mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-center font-20 leading-[150%] text-[#525252]">
        {t("We_sent_a_code_to")}{" "}
        <span className="font-medium text-[#222222]">{fullPhone}</span>.{" "}
        {t("Please_enter_it_below")}
      </p>

      <div
        className={`select-none mt-8 flex justify-center gap-1.5 sm:gap-2 ${shake ? "animate-shake" : ""}`}
        onPaste={handlePaste}
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`flex-1 w-[41.667px] max-w-[60px] max-[500px]:h-[56px] h-[62px] rounded-[12px] border text-center font-20 font-medium text-[#222222] outline-none transition-colors duration-150 ${error ? "border-[#B31B38] bg-[#F0F0F0]" : "border-[#F0F0F0] bg-[#F0F0F0] focus:border-[#B31B38]"
              }`}
          />
        ))}
      </div>

      {error && <p className="mt-3 text-center text-[14px] text-[#B31B38]">{error}</p>}

      <Button
        text={verifying ? t("Verifying") : t("Next")}
        onPress={handleVerify}
        disabled={!isComplete || verifying}
        icon={verifying ? undefined : <ArrowRightIcon />}
        className="mt-5 mx-auto max-w-[400px] w-full"
      />

      <button
        type="button"
        onClick={handleResend}
        disabled={countdown > 0 || banned}
        className={`max-[500px]:flex hidden mt-4 mx-auto font-poppins font-16 font-medium cursor-pointer ${countdown > 0 || banned ? "text-[#767676] cursor-default" : "text-[#B31B38]"
          }`}
      >
        {countdown > 0 ? `${t("Resend_code")} (${formattedTimer})` : t("Resend_code")}
      </button>

      <div className="mx-auto w-full max-[500px]:fixed max-[500px]:inset-x-0 max-[500px]:bottom-0 max-[500px]:z-40 max-[500px]:border-t max-[500px]:border-[#D8D8D8] max-[500px]:bg-white/60 max-[500px]:backdrop-blur-sm max-[500px]:px-4 max-[500px]:py-3">
        <div className="min-[500px]:mt-4 max-w-[460px] mx-auto flex justify-between">
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || banned}
            className={`min-[500px]:flex hidden mx-auto font-poppins font-16 font-medium cursor-pointer ${countdown > 0 || banned ? "text-[#767676] cursor-default" : "text-[#B31B38]"
              }`}
          >
            {countdown > 0 ? `${t("Resend_code")} (${formattedTimer})` : t("Resend_code")}
          </button>

          <button
            type="button"
            onClick={() => router.push("/register/verification/whatsapp")}
            className="max-[500px]:py-3 mx-auto font-poppins font-16 font-normal text-[#525252] underline cursor-pointer"
          >
            {t("Wrong_number_Edit")}
          </button>

        </div>
      </div>
    </div>
  );
}
