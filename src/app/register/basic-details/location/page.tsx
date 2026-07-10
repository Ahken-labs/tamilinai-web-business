"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";
import FormRow from "@/components/common-layout/FormRow";
import InputBox from "@/components/common-layout/InputBox";
import DropdownField from "@/components/common-layout/DropdownField";
import { SRI_LANKA_DISTRICTS } from "@/constants/districts";
import { LOCATION_STORAGE_KEY } from "@/constants/storageKeys";

export default function LocationPage() {
  const { t } = useLang();
  const router = useRouter();

  const [streetAddress, setStreetAddress] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [districtOpen, setDistrictOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleNext() {
    const errs: Record<string, string> = {};
    if (!village) errs.village = t("Village_required");
    if (!district) errs.district = t("Please_select_a_district");

    setErrors(errs);
    if (Object.keys(errs).length) return;

    sessionStorage.setItem(
      LOCATION_STORAGE_KEY,
      JSON.stringify({ streetAddress, village, district })
    );
    router.push("/register/basic-details/service-areas");
  }

  return (
    <div className="font-poppins flex flex-col px-5 sm:px-7 md:px-10 py-4 sm:w-[640px] mx-auto">
      <h1 className="mx-auto max-w-[250px] sm:max-w-[300px] md:max-w-[420px] text-center font-48 font-semibold leading-[120%] text-[#000]">
        {t("Where_is_your_business_based")}
      </h1>

      <div className="mt-8 sm:mt-10 md:mt-14 lg:mt-16 flex flex-col gap-5">
        <FormRow label={t("Street_address")}>
          <InputBox
            compact
            value={streetAddress}
            onChange={setStreetAddress}
            label={t("Street_address_Placeholder")}
          />
        </FormRow>

        <FormRow label={t("Village_City_Town")} required error={errors.village}>
          <InputBox
            compact
            value={village}
            onChange={setVillage}
            label={t("Village_City_Town_Placeholder")}
          />
        </FormRow>

        <FormRow label={t("District")} required error={errors.district}>
          <DropdownField
            placeholder={t("Select_a_district")}
            value={district}
            open={districtOpen}
            setOpen={setDistrictOpen}
            onSelect={setDistrict}
            items={SRI_LANKA_DISTRICTS}
          />
        </FormRow>
      </div>

      <Button text={t("Next")} onPress={handleNext} className="mt-5 sm:mt-7 md:mt-8 lg:mt-10 mx-auto w-[173px]" />
    </div>
  );
}
