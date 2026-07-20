"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import DashboardHeader from "@/components/main/DashboardHeader";
import Button from "@/components/common-layout/Button";
import { BoostIcon, CheckIcon } from "@/assets/Icons";
import { GoogleReviewTag, TrustpilotReviewTag, InaiReviewTag } from "@/components/review/ReviewTag";
import { getBizMe } from "@/lib/api";

const BOOST_OFFER_DURATION_MS = 10 * 24 * 60 * 60 * 1000;
const BOOST_REGULAR_PRICE = "Rs 3,000";
const BOOST_DISCOUNTED_PRICE = "Rs 1,000";

const BOOST_PLAN_FEATURE_KEYS = [
  "Everything_in_free_plan_plus",
  "Show_up_top_of_category",
  "Appear_in_main_feed",
  "Featured_homepage_5_days",
] as const;

function useCountdown(createdAt: string | null) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!createdAt) return;
    const deadline = new Date(createdAt).getTime() + BOOST_OFFER_DURATION_MS;
    const tick = () => setRemaining(Math.max(0, deadline - Date.now()));
    tick();
    const interval = setInterval(tick, 1000 * 30);
    return () => clearInterval(interval);
  }, [createdAt]);

  if (remaining === null) return { days: 0, hrs: 0, mins: 0, expired: false, loaded: false };
  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hrs = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const mins = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  return { days, hrs, mins, expired: remaining <= 0, loaded: true };
}

export default function BoostPage() {
  const { t } = useLang();
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const { days, hrs, mins, expired, loaded } = useCountdown(createdAt);
  const offerActive = loaded && !expired;

  useEffect(() => {
    getBizMe().then((me) => { setBusinessName(me.businessName); setCreatedAt(me.createdAt); }).catch(() => { });
  }, []);

  return (
    <>
      <DashboardHeader variant="owner" showBack hideBoost onEdit={() => router.push("/dashboard/edit")} />

      <div className="font-poppins flex flex-col px-4 sm:px-6 pb-16">
        <h1 className="max-[500px]:mt-2 mt-4 sm:mt-6 md:mt-8 lg:mt-10 text-center font-semibold font-40 leading-[130%] text-[#222]">
          {t("Grow_your_business")}
        </h1>
        {businessName && (
          <p className="mt-0.5 leading-[150%] text-center text-[14px] sm:text-[15px] md:text-[16px] text-[#222]">{businessName}</p>
        )}
        <p className="mt-3 sm:mt-4 max-w-[800px] mx-auto text-center font-18 leading-[150%] text-[#767676]">
          {t("Boost_page_subtitle")}
        </p>

        <div className="mt-6 sm:mt-7 md:mt-9 lg:mt-10 max-w-[1024px] lg:px-10 w-full mx-auto grid grid-cols-1 min-[720px]:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {/* Free plan */}
          <div className="flex flex-col rounded-[32px] border border-[#EAEAEA] bg-white shadow-[0_0_8px_0_rgba(0,0,0,0.16)] pt-6 sm:pt-7 md:pt-8 pb-4 sm:pb-5 md:pb-6 px-4 sm:px-5 md:px-6">
            <h2 className="font-semibold font-28 leading-[130%] text-[#222]">
              {t("Free_business_listing")}
            </h2>
            <div className="max-[500px]:mt-2 mt-3 flex items-center gap-1">
              <CheckIcon className="w-5 h-5 shrink-0" strokeWidth={1.2} stroke="#222" />
              <span className="text-[14px]  leading-[150%] text-[#222]">
                {t("Business_profile_and_service_listing")}
              </span>
            </div>
            <span className="max-[500px]:mt-4 mt-5 min-[500px]:ml-6 inline-flex w-fit rounded-full bg-[#2E7D32] max-[500px]:px-2 px-4 py-0.5 font-poppins font-16 text-[#fff]">
              {t("Your_plan")}
            </span>
          </div>

          {/* Business Boost plan */}
          <div className="flex flex-col rounded-[32px] border border-[#FFDED3] bg-white shadow-[0_0_8px_0_#FFDE9F] pt-6 sm:pt-7 md:pt-8 pb-4 sm:pb-5 md:pb-6 px-4 sm:px-5 md:px-6">
            <h2 className="font-semibold font-28 leading-[130%] text-[#222]">
              {t("Business_boost")}
            </h2>

            <div className="max-[500px]:mt-2 mt-3 flex flex-col max-[500px]:gap-2 gap-3">
              {BOOST_PLAN_FEATURE_KEYS.map((key) => (
                <div key={key} className="flex items-start gap-1">
                  <CheckIcon className="w-5 h-5 shrink-0" strokeWidth={1.2} stroke="#222" />
                  <span className="text-[14px] leading-[150%] text-[#222]">{t(key)}</span>
                </div>
              ))}
            </div>

            {!expired && (
              <>
                <p className="max-[500px]:mt-9 mt-10 text-center font-semibold font-18 text-[#8D5900]">
                  {t("Limited_time_offer_new_users")}
                </p>
                <p className="leading-[150%] mt-3 min-[500px]:mt-2 text-center font-poppins font-16 font-medium text-[#A97216]">
                  {days} {t("Days")} : {hrs} {t("Hrs")} : {mins} {t("Mins")}
                </p>
              </>
            )}

            <div className={`${!expired ? "mt-4" : "mt-10"} flex items-center justify-center gap-2`}>
              {offerActive && (
                <span className="max-[500px]:text-[18px] text-[19px] sm:text-[20px] font-medium text-[#222] line-through">{BOOST_REGULAR_PRICE}</span>
              )}
              <span className="max-[500px]:text-[18px] text-[19px] sm:text-[20px] font-medium font-semibold text-[#222]">
                {offerActive ? BOOST_DISCOUNTED_PRICE : BOOST_REGULAR_PRICE}
              </span>
              <span className="font-16 text-[#767676]">{t("Per_month")}</span>
            </div>

            <Button
              text={t("Boost_my_business")}
              iconLeft={<BoostIcon className="w-5 h-5" stroke="white" />}
              className="max-[500px]:mt-5 mt-6 w-full"
              onPress={() => router.push("/dashboard/boost/checkout")}
            />
          </div>
        </div>

        <h2 className="mt-12 sm:mt-14 md:mt-16 text-center font-semibold max-[500px]:text-[20px] text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] text-[#000]">
          {t("Our_ratings_and_reviews")}
        </h2>

        <div className="flex flex-wrap justify-center mt-6 sm:mt-5 gap-3 sm:gap-4 max-[450px]:mx-0 mx-4">
          <GoogleReviewTag gray />
          <TrustpilotReviewTag gray />
          <InaiReviewTag gray />
        </div>
      </div>
    </>
  );
}
