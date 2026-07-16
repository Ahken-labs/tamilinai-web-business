"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";
import FormRow from "@/components/common-layout/FormRow";
import InputBox from "@/components/common-layout/InputBox";
import DropdownField from "@/components/common-layout/DropdownField";
import { SERVICE_CATEGORIES } from "@/constants/services";
import { BASIC_DETAILS_STORAGE_KEY } from "@/constants/storageKeys";
import Image from "next/image";

export default function BusinessInfoPage() {
  const { t } = useLang();
  const router = useRouter();

  const [category, setCategory] = useState(() => {
    try { const s = JSON.parse(sessionStorage.getItem(BASIC_DETAILS_STORAGE_KEY) ?? "{}"); return s.category ?? ""; } catch { return ""; }
  });
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [specify, setSpecify] = useState(() => {
    try { const s = JSON.parse(sessionStorage.getItem(BASIC_DETAILS_STORAGE_KEY) ?? "{}"); return s.specify ?? ""; } catch { return ""; }
  });
  const [businessName, setBusinessName] = useState(() => {
    try { const s = JSON.parse(sessionStorage.getItem(BASIC_DETAILS_STORAGE_KEY) ?? "{}"); return s.businessName ?? ""; } catch { return ""; }
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isOther = category === "Other";

  function handleNext() {
    const errs: Record<string, string> = {};
    if (!category) errs.category = t("Please_select_a_category");
    if (isOther && !specify) errs.specify = t("Please_specify_your_service");
    if (!businessName) errs.businessName = t("Business_name_required");

    setErrors(errs);
    if (Object.keys(errs).length) return;

    sessionStorage.setItem(
      BASIC_DETAILS_STORAGE_KEY,
      JSON.stringify({ category, specify, businessName })
    );
    router.push("/register/basic-details/claim-url");
  }

  return (
    <div className="flex flex-col px-5 py-4 sm:px-5 sm:w-[640px] mx-auto">
      <h1 className="mx-auto max-w-[300px] md:max-w-[500px] text-center font-poppins font-48 font-semibold leading-[120%] text-[#000]">
        {t("Tell_us_about_your_business")}
      </h1>
      <Image
        src="/images/basic_business.webp"
        alt=""
        width={360}
        height={164}
        className="mt-10 w-[clamp(246px,66vw,360px)] aspect-[219/100] object-contain mx-auto animate-fade-in"
        priority
      />

      <div className="mt-8 sm:mt-10 md:mt-11 lg:mt-12 flex flex-col gap-5">
        <FormRow label={t("Main_wedding_service")} required error={errors.category}>
          <DropdownField
            placeholder={t("Select_a_category")}
            value={category}
            open={categoryOpen}
            setOpen={setCategoryOpen}
            onSelect={(v) => { setCategory(v); if (v !== "Other") setSpecify(""); }}
            items={SERVICE_CATEGORIES}
          />
        </FormRow>

        {isOther && (
          <FormRow label={t("Please_specify")} required error={errors.specify}>
            <InputBox
              compact
              value={specify}
              onChange={setSpecify}
              label={t("Type_here")}
            />
          </FormRow>
        )}

        <FormRow label={t("Business_Name")} required error={errors.businessName}>
          <InputBox
            compact
            value={businessName}
            onChange={setBusinessName}
            label={t("Business_Name_Placeholder")}
          />
        </FormRow>
      </div>

      <Button text={t("Next")} onPress={handleNext} className="mt-5 mx-auto w-[173px]" />
    </div>
  );
}
