"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";

export default function BasicDetailsIntroPage() {
  const { t } = useLang();
  const router = useRouter();

  return (
    <div className="flex flex-col px-4 py-4 sm:px-4 sm:w-[640px] mx-auto">
      <h1 className="mx-auto max-w-[300px] md:max-w-[500px] text-center font-poppins font-48 font-semibold leading-[120%] text-[#000]">
        {t("Onboarding_Title")}
      </h1>

      <Image
        src="/images/setup_image.webp"
        alt=""
        width={400}
        height={288}
        className="mt-6 sm:mt-8 md:mt-9 lg:mt-10 w-[clamp(288px,77vw,400px)] aspect-[146/75] object-contain mx-auto"
        priority
      />

      <p className="mt-10 text-center font-poppins font-20 leading-[150%] text-[#525252]">
        {t("Onboarding_Time_Prefix")}{" "}
        <span className="font-semibold text-[#525252]">{t("Onboarding_Time_Value")}</span>
      </p>
      <br />
      <p className="text-center font-poppins font-20 leading-[150%] text-[#525252]">
        {t("Onboarding_Description")}
      </p>

      <Button
        text={t("Get_Started")}
        onPress={() => router.push("/register/basic-details/business-info")}
        className="mt-6 mx-auto w-[173px]"
      />


      <div className="mt-5 text-[#767676] max-[500px]:text-[12px] text-[14px] text-center max-[500px]:max-w-[278px] max-w-[288px] lang-ta:max-[500px]:max-w-[340px] lang-ta:max-w-[350px] mx-auto">
        {t("Terms_agreement_prefix")}{" "}
        <button type="button" className="underline cursor-pointer">{t("Terms_and_Conditions")}</button>{" "}
        {t("And")}{" "}
        <button type="button" className="underline cursor-pointer">{t("Privacy_Policy")}</button>
      </div>
    </div>
  );
}
