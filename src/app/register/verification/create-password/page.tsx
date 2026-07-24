"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";
import InputBox from "@/components/common-layout/InputBox";
import { CheckIcon, XIcon, EyeOnIcon, EyeOffIcon } from "@/assets/Icons";
import {
  BASIC_DETAILS_STORAGE_KEY,
  CLAIM_URL_STORAGE_KEY,
  LOCATION_STORAGE_KEY,
  SERVICE_AREAS_STORAGE_KEY,
  EXPERIENCE_STORAGE_KEY,
  WHATSAPP_STORAGE_KEY,
  MAIN_PHOTO_STORAGE_KEY,
  TEMP_TOKEN_KEY,
  USERNAME_RESERVATION_KEY,
} from "@/constants/storageKeys";
import { extractCountryCode } from "@/utils/validation";
import { createBizAccount, saveSession } from "@/lib/api";
import { useLoadingText } from "@/hooks/useLoadingText";

export default function PasswordPage() {
  const { t } = useLang();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const loadingText = useLoadingText(submitting, "register");


  const passwordRules = useMemo(
    () => [
      { key: "length", label: t("Rule_length"), met: password.length >= 8 },
      { key: "uppercase", label: t("Rule_uppercase"), met: /[A-Z]/.test(password) },
      { key: "number", label: t("Rule_number"), met: /\d/.test(password) },
      { key: "symbol", label: t("Rule_symbol"), met: /[^A-Za-z0-9]/.test(password) },
    ],
    [password, t]
  );

  const allRulesMet = passwordRules.every((rule) => rule.met);
  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const showRules = password.length > 0 || submitted;
  const showMatchLine = confirmPassword.length > 0 && password.length > 0;

  async function handleContinue() {
    setSubmitted(true);

    if (!password) { setPasswordError(t("Password_required")); return; }
    if (!confirmPassword) { setConfirmPasswordError(t("Confirm_password_required")); return; }
    if (!allRulesMet) return;
    if (password !== confirmPassword) { setConfirmPasswordError(t("Passwords_do_not_match")); return; }

    setPasswordError("");
    setConfirmPasswordError("");
    setSubmitError("");
    setSubmitting(true);

    try {
      const basic = JSON.parse(sessionStorage.getItem(BASIC_DETAILS_STORAGE_KEY) ?? "{}") as Record<string, string>;
      const claimUrl = JSON.parse(sessionStorage.getItem(CLAIM_URL_STORAGE_KEY) ?? "{}") as Record<string, string>;
      const location = JSON.parse(sessionStorage.getItem(LOCATION_STORAGE_KEY) ?? "{}") as Record<string, string>;
      const areas = JSON.parse(sessionStorage.getItem(SERVICE_AREAS_STORAGE_KEY) ?? "{}") as { districts?: string[]; islandWide?: boolean };
      const exp = JSON.parse(sessionStorage.getItem(EXPERIENCE_STORAGE_KEY) ?? "{}") as Record<string, string>;
      const wa = JSON.parse(sessionStorage.getItem(WHATSAPP_STORAGE_KEY) ?? "{}") as { countryCode?: unknown; phone?: string };
      const tempToken = sessionStorage.getItem(TEMP_TOKEN_KEY) ?? "";
      let reservationToken = sessionStorage.getItem(USERNAME_RESERVATION_KEY) ?? "";

      // Re-reserve if expired
      if (claimUrl.username) {
        try {
          const { reserveUsername } = await import("@/lib/api");
          const res = await reserveUsername(claimUrl.username);
          reservationToken = res.reservationToken;
          sessionStorage.setItem(USERNAME_RESERVATION_KEY, reservationToken);
        } catch { /* already reserved by us or still valid — use existing token */ }
      }

      const dialCode = extractCountryCode((wa.countryCode as string | undefined) ?? "");

      const fd = new FormData();
      fd.append("tempToken", tempToken);
      fd.append("reservationToken", reservationToken);
      fd.append("username", claimUrl.username ?? "");
      fd.append("businessName", basic.businessName ?? "");
      fd.append("category", basic.category ?? "");
      if (basic.specify) fd.append("specify", basic.specify);
      fd.append("experience", exp.experience ?? "");
      if (exp.qualifications) fd.append("qualifications", exp.qualifications);
      if (exp.careerHighlight) fd.append("careerHighlight", exp.careerHighlight);
      fd.append("phone", wa.phone ?? "");
      fd.append("countryCode", dialCode);
      fd.append("password", password);
      if (location.streetAddress) fd.append("streetAddress", location.streetAddress);
      fd.append("village", location.village ?? "");
      fd.append("district", location.district ?? "");
      fd.append("serviceDistricts", JSON.stringify(areas.districts ?? []));
      fd.append("islandWide", String(areas.islandWide ?? false));

      const mainPhoto = sessionStorage.getItem(MAIN_PHOTO_STORAGE_KEY);
      if (mainPhoto) {
        const blob = await fetch(mainPhoto).then((r) => r.blob());
        fd.append("coverPhoto", blob, "cover.jpg");
      }

      const res = await createBizAccount(fd);
      saveSession(res.accessToken, res.business);
      router.push("/register/storefront/services");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to create account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="font-poppins flex flex-col px-5 py-4 sm:w-[640px] mx-auto">
      <h1 className="mx-auto text-center font-48 font-semibold leading-[120%] text-[#000]">
        {t("Create_your_password")}
      </h1>

      <p className="mx-auto mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-center font-20 leading-[150%] text-[#525252]">
        {t("Create_password_subtitle")}
      </p>

      <Image
        src="/images/password_key.webp"
        alt=""
        width={220}
        height={90}
        className="mt-5 sm:mt-8 md:mt-10 lg:mt-12 mx-auto w-[220px] h-[90px] object-contain"
        priority
      />

      <div className="mt-5 sm:mt-7 md:mt-8 lg:mt-10 flex flex-col">
        <InputBox
          value={password}
          onChange={(val) => { setPassword(val); setPasswordError(""); }}
          label={t("Password")}
          type={showPassword ? "text" : "password"}
          className="bg-[#F2F2F2] border-[#F2F2F2]"
          error={passwordError}
          suffix={
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="cursor-pointer">
              {showPassword ? <EyeOnIcon /> : <EyeOffIcon />}
            </button>
          }
        />

        {showRules && (
          <div className="mt-2 sm:mt-3 grid grid-cols-1 min-[500px]:grid-cols-2 gap-x-4 gap-y-1">
            {passwordRules.map((rule) => (
              <div
                key={rule.key}
                className={`flex items-center gap-1 text-[14px] font-normal leading-[150%] ${rule.met ? "text-[#16A34A]" : "text-[#525252]"
                  }`}
              >
                {rule.met ? <CheckIcon strokeWidth="1.14286" stroke="#16A34A" /> : <XIcon stroke="#525252" />}
                {rule.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 sm::mt-7 lg:mt-8">
        <InputBox
          value={confirmPassword}
          onChange={(val) => { setConfirmPassword(val); setConfirmPasswordError(""); }}
          label={t("Confirm_password")}
          type={showConfirmPassword ? "text" : "password"}
          className="bg-[#F2F2F2] border-[#F2F2F2]"
          error={confirmPasswordError}
          suffix={
            <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} className="cursor-pointer">
              {showConfirmPassword ? <EyeOnIcon /> : <EyeOffIcon />}
            </button>
          }
        />

        {showMatchLine && (
          <div
            className={`mt-2 sm:mt-3 flex items-center gap-1 text-[14px] font-normal leading-[150%] ${passwordsMatch ? "text-[#16A34A]" : "text-[#525252]"
              }`}
          >
            {passwordsMatch && <CheckIcon strokeWidth="1.14286" stroke="#16A34A" />}
            {passwordsMatch ? t("Passwords_match") : null}
          </div>
        )}
      </div>


      {submitError && (
        <p className="mt-4 text-center text-[14px] text-[#B31B38]">{submitError}</p>
      )}

      <div className="flex min-[500px]:mt-6 md:mt-8 lg:10 mx-auto w-full max-[500px]:fixed max-[500px]:inset-x-0 max-[500px]:bottom-0 max-[500px]:z-40 max-[500px]:border-t max-[500px]:border-[#D8D8D8] max-[500px]:bg-white/60 max-[500px]:backdrop-blur-sm max-[500px]:px-4 max-[500px]:py-3">
        <Button
          text={submitting ? loadingText : t("Continue")}
          onPress={handleContinue}
          disabled={!allRulesMet || !passwordsMatch || submitting}
          className="mx-auto min-w-[173px] w-full"
        />

      </div>
    </div>
  );
}
