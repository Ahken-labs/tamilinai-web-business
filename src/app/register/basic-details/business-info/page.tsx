"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";
import FormRow from "@/components/common-layout/FormRow";
import InputBox from "@/components/common-layout/InputBox";
import DropdownField from "@/components/common-layout/DropdownField";
import { SERVICE_CATEGORIES } from "@/constants/services";
import Image from "next/image";

export default function BusinessInfoPage() {
  const { t } = useLang();

  const [category, setCategory] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [specify, setSpecify] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isOther = category === "Other";

  function handleNext() {
    const errs: Record<string, string> = {};
    if (!category) errs.category = "*Please select a category";
    if (isOther && !specify) errs.specify = "*Please specify your service";
    if (!businessName) errs.businessName = "*Business name is required";

    setErrors(errs);
    if (Object.keys(errs).length) return;

    // Next screen not built yet
  }

  return (
    <div className="flex flex-col px-5 py-4 sm:px-5 sm:w-[640px] mx-auto">
      <h1 className="mx-auto max-w-[300px] md:max-w-[500px] text-center font-poppins text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-[120%] text-[#000]">
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
