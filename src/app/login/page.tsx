"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";
import InputBox from "@/components/common-layout/InputBox";
import { COUNTRIES } from "@/constants/countries";
import { extractCountryCode } from "@/utils/validation";
import CountryCodeSelect from "@/components/ui/CountryCodeSelect";
import { bizLogin, saveSession, BIZ_TOKEN_KEY } from "@/lib/api";
import { EyeOnIcon, EyeOffIcon } from "@/assets/Icons";

const BIZ_REGISTER_URL = process.env.NEXT_PUBLIC_BIZ_URL ?? "";

export default function LoginPage() {
  const { t } = useLang();
  const router = useRouter();

  const [country, setCountry] = useState(COUNTRIES[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(BIZ_TOKEN_KEY)) {
      router.replace("/dashboard");
    }
  }, [router]);

  async function handleLogin() {
    let hasError = false;
    if (!phone.trim()) {
      setPhoneError(t("Phone_number_required"));
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError(t("Password_required"));
      hasError = true;
    }
    if (hasError) return;

    setLoading(true);
    setPhoneError("");
    setPasswordError("");

    try {
      const dialCode = extractCountryCode(country);
      const res = await bizLogin(phone.trim().replace(/^0+/, ""), dialCode, password);
      saveSession(res.accessToken, res.business);
      router.replace("/dashboard");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.toLowerCase().includes("rejected")) {
        setPhoneError("*This account has been rejected.");
      } else if (msg.toLowerCase().includes("network") || msg.toLowerCase().includes("fetch")) {
        setPasswordError("Network error. Please try again shortly.");
      } else {
        setPasswordError(t("Incorrect_phone_or_password"));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-poppins flex flex-col px-5 py-4 sm:w-[640px] mx-auto">
      <h1 className="text-center mx-auto md:max-w-[500px] sm:max-w-[360px] max-w-[280px] font-48 font-semibold leading-[120%] text-[#000]">
        {t("Welcome_back_business")}
      </h1>

      <p className="mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-center font-20 leading-[150%] text-[#525252]">
        {t("Login_subtitle")}
      </p>

      <Image
        src="/images/password_key.webp"
        alt=""
        width={220}
        height={90}
        className="mt-5 sm:mt-8 md:mt-10 lg:mt-12 mx-auto w-[220px] h-[90px] object-contain"
        priority
      />

      <div className="mt-5 sm:mt-6 md:mt-7 lg:mt-8 flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-8">
        <div className="flex gap-2 sm:gap-3">
          <CountryCodeSelect
            value={country}
            onChange={(val) => { setCountry(val); setPhoneError(""); }}
            open={countryOpen}
            setOpen={setCountryOpen}
            className="w-[96px] sm:w-[116px] shrink-0"
            buttonClassName="bg-[#F2F2F2] border-[#F2F2F2]"
          />
          <div className="flex-1">
            <InputBox
              type="tel"
              inputMode="numeric"
              value={phone}
              error={phoneError}
              onChange={(val) => { setPhone(val.replace(/\D/g, "")); setPhoneError(""); }}
              label={t("WhatsApp_number")}
              className="bg-[#F2F2F2] border-[#F2F2F2]"
            />
          </div>
        </div>
        <InputBox
          type={showPassword ? "text" : "password"}
          value={password}
          error={passwordError}
          onChange={(val) => setPassword(val)}
          label={t("Enter_your_password")}
          className="bg-[#F2F2F2] border-[#F2F2F2]"
          autoComplete="current-password"
          suffix={
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="cursor-pointer"
            >
              {showPassword ?  <EyeOnIcon />: <EyeOffIcon />}
            </button>
          }
        />
      </div>

      <Button
        text={loading ? "Logging in" : t("Log_In")}
        onPress={handleLogin}
        disabled={loading || !phone.trim() || !password.trim()}
        className="mt-5 sm:mt-6 md:mt-7 lg:mt-8 mx-auto max-[500px]:w-full min-[500px]:w-[173px]"
      />

      <button
        type="button"
        className="mt-5 md:mt-6 text-center font-poppins lang-ta:text-[14px] text-[16px] text-[#B31B38] cursor-pointer hover:underline"
      >
        {t("Forgot_password")}
      </button>

      <p className="mt-4 text-center font-poppins lang-ta:text-[14px] text-[16px] text-[#525252]">
        {t("No_business_profile_yet")}
        <br />
        <a
          href={`${BIZ_REGISTER_URL}/register/basic-details/intro`}
          className="font-medium text-[#525252] underline cursor-pointer"
        >
          {t("Create_your_business_profile")}
        </a>
      </p>

      <div className="max-w-[600px] mt-6 rounded-[20px] bg-[#FFFFFF] shadow-[0_0_8px_0_rgba(0,0,0,0.12)] px-5 py-5 text-center">
        <p className="font-poppins lang-ta:text-[14px] text-[16px] text-[#525252]">
          {t("Not_a_vendor")}
        </p>
        <a
          href="https://inai.lk/login"
          className="mt-2 inline-block font-poppins lang-ta:text-[14px] text-[16px] text-[#B31B38] hover:underline"
        >
          {t("Go_to_user_login")}
        </a>
      </div>
    </div>
  );
}
