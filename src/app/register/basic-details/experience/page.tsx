"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";
import FormRow from "@/components/common-layout/FormRow";
import InputBox from "@/components/common-layout/InputBox";
import DropdownField from "@/components/common-layout/DropdownField";
import { EXPERIENCE_OPTIONS } from "@/constants/experience";
import { EXPERIENCE_STORAGE_KEY } from "@/constants/storageKeys";

export default function ExperiencePage() {
  const { t } = useLang();
  const router = useRouter();

  const [experience, setExperience] = useState("");
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [qualifications, setQualifications] = useState("");
  const [careerHighlight, setCareerHighlight] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleNext() {
    const errs: Record<string, string> = {};
    if (!experience) errs.experience = t("Please_select_years_of_experience");

    setErrors(errs);
    if (Object.keys(errs).length) return;

    sessionStorage.setItem(
      EXPERIENCE_STORAGE_KEY,
      JSON.stringify({ experience, qualifications, careerHighlight })
    );
    router.push("/register/verification/whatsapp");
  }

  return (
    <div className="font-poppins flex flex-col px-5 py-4 sm:w-[640px] mx-auto">
      <h1 className="mx-auto max-w-[250px] sm:max-w-[400px] md:max-w-[500px] text-center font-48 font-semibold leading-[120%] text-[#000]">
        {t("Build_trust_with_clients")}
      </h1>

      <p className="mx-auto max-w-[560px] mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-center font-20 leading-[150%] text-[#525252]">
        {t("Build_trust_description")}
      </p>

      <div className="mt-8 sm:mt-10 md:mt-11 lg:mt-12 flex flex-col gap-5">
        <FormRow label={t("Years_of_experience")} required error={errors.experience}>
          <DropdownField
            placeholder={t("Select_ellipsis")}
            value={experience}
            open={experienceOpen}
            setOpen={setExperienceOpen}
            onSelect={(v) => { setExperience(v); setErrors((e) => ({ ...e, experience: "" })); }}
            items={EXPERIENCE_OPTIONS}
          />
        </FormRow>

        <FormRow label={t("Qualifications_or_Training")}>
          <InputBox
            compact
            multiline
            value={qualifications}
            onChange={setQualifications}
            label={t("Qualifications_Placeholder")}
          />
        </FormRow>

        <FormRow label={t("Career_highlight")}>
          <InputBox
            compact
            multiline
            value={careerHighlight}
            onChange={setCareerHighlight}
            label={t("Career_highlight_Placeholder")}
          />
        </FormRow>
      </div>

      <Button
        text={t("Next")}
        onPress={handleNext}
        className={`mt-5 mx-auto w-[173px] ${!experience ? "!bg-[#525252] hover:!bg-[#525252]" : ""}`}
      />
    </div>
  );
}
