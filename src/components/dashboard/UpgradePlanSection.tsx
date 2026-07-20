"use client";

import { useLang } from "@/context/LangContext";
import { BoostIcon} from "@/assets/Icons";
import Button from "../common-layout/Button";
import { useRouter } from "next/navigation";


export default function UpgradePlanSection() {
  const { t } = useLang();
  const router = useRouter();

  return (
    <div className="px-4 sm:px-6 mt-6">
        <div className="flex min-w-[288px] max-w-[640px] w-full mx-auto flex-col rounded-[20px] bg-[#F2F2F2] max-[500px]:px-4 px-5 pt-6 pb-5 cursor-pointer text-left" >
          <span className="text-center leading-[135%] font-semibold text-[#222] font-20">{t("Ready_for_more_inquiries")}</span>
          <p className="max-[500px]:mt-2 mt-4 font-16 text-center text-[#656565] leading-[135%]">{t("Upgrade_plan_desc")}</p>

         <div className="max-[500px]:w-full mt-4 mx-auto">
          <Button iconLeft={<BoostIcon className="w-5 h-5"/>} text={t("Boost_my_business")} className="max-[500px]:w-full min-[500px]:px-6" onPress={() => router.push("/dashboard/boost")}/>
          </div>
        </div>
    </div>

  );
}
