"use client";

import { useRef, useState } from "react";
// import Button from "../common-layout/Button";
import { useLang } from "@/context/LangContext";
import { GoogleEmptyStarIcon, GoogleHalfStarIcon, GoogleStarIcon, ReviewStarIcon } from "@/assets/Icons";

const AVERAGE_RATING = 4.5;
const RATING_STARS = 5;

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: RATING_STARS }, (_, i) => {
        const remainder = rating - i;
        if (remainder >= 1) return <GoogleStarIcon key={i} />;
        if (remainder >= 0.5) return <GoogleHalfStarIcon key={i} />;
        return <GoogleEmptyStarIcon key={i} />;
      })}
    </div>
  );
}

interface Review {
  name: string;
  country: string;
  rating: number;
  text: string;
}

const DUMMY_REVIEWS: Review[] = [
  {
    name: "Anushiya",
    country: "London",
    rating: 5,
    text: "Living abroad, I wanted someone who understands our culture but also my life here. Took some time but the matchmaker actually understood",
  },
  {
    name: "Dushyanth",
    country: "Colombo",
    rating: 5,
    text: "The blur feature is what made me trust this. My pictures stay safe, not floating around like on other sites. Genuine profiles, no time wasters",
  },
  {
    name: "Priyaveni",
    country: "Switzerland",
    rating: 5,
    text: "We were nervous about putting our daughter's profile online. The verified badges and the photo protection made my wife finally agree. Found a",
  },
  {
    name: "Pravenan",
    country: "Jaffna",
    rating: 5,
    text: "I created the profile for my son. The support team helped me at every step over WhatsApp. Respectful, patient with an older person like me. We are",
  },
  {
    name: "Tharaka",
    country: "Batticaloa",
    rating: 5,
    text: "Honestly, I just joined to try it out and didn't expect much. But the matches were actually really good, not just random people. As a woman, I felt",
  },
  {
    name: "Vinoth",
    country: "Nanuoya",
    rating: 5,
    text: "Got engaged last month! 🙏 We started talking through the platform, then our families met, and everything just flowed naturally. Highly",
  },
];

function ReviewCard({ review }: { review: Review }) {
  const { t } = useLang();
  const CHAR_LIMIT = 220;
  const displayText = review.text.slice(0, CHAR_LIMIT).trimEnd() + "…";

  return (
    <div className="w-full min-[710px]:w-[341px] bg-white rounded-[12px] py-5 px-4 font-poppins">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-[110px] bg-[#F2F2F2] shrink-0 flex items-center justify-center">
          <span className="text-[#656565] text-[15.4px] font-semibold leading-[150%]">
            {review.name.charAt(0)}
          </span>
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="text-[#242424] text-[14px] sm:text-[15px] md:text-[16px] font-medium leading-[150%] overflow-hidden text-ellipsis whitespace-nowrap">
            {review.name}
          </span>
          <span className="text-[#58585B] text-[12px] sm:text-[13px] md:text-[14px] font-normal leading-[125%]">
            {review.country}
          </span>
        </div>
      </div>
      <div className="flex items-center mt-6 gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <ReviewStarIcon key={i} />
        ))}
      </div>
      <div className="mt-4">
        <p className="m-0 text-[#343434] text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[150%]">
          {displayText}
        </p>
        <button
          type="button"
          onClick={() => { }}
          className="mt-[2px] bg-transparent border-0 p-0 cursor-pointer text-[#343434] text-[14px] sm:text-[15px] md:text-[16px] font-medium leading-[150%] underline decoration-solid underline-offset-auto"
        >
          {t("Show_more")}
        </button>
      </div>
    </div>
  );
}

function MobileCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dotCount = Math.min(DUMMY_REVIEWS.length, 6);
  const CARD_WIDTH = 266;
  const GAP = 8;

  function handleScroll() {
    if (!scrollRef.current) return;
    const idx = Math.round(scrollRef.current.scrollLeft / (CARD_WIDTH + GAP));
    setCurrentIdx(Math.min(idx, DUMMY_REVIEWS.length - 1));
  }

  function goTo(idx: number) {
    scrollRef.current?.scrollTo({ left: idx * (CARD_WIDTH + GAP), behavior: "smooth" });
    setCurrentIdx(idx);
  }

  return (
    <div className="mt-2">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory"
        style={{ gap: GAP, scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex-shrink-0 w-4" />
        {DUMMY_REVIEWS.map((review, i) => (
          <div key={i} className="snap-start flex-shrink-0" style={{ width: CARD_WIDTH }}>
            <ReviewCard review={review} />
          </div>
        ))}
        <div className="flex-shrink-0 w-4" />
      </div>

      <div className="mt-8 h-3 flex justify-center items-center" style={{ gap: "8px" }}>
        {Array.from({ length: dotCount }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to review ${i + 1}`}
            style={{
              width: i === currentIdx ? 10 : 8,
              height: i === currentIdx ? 10 : 8,
              borderRadius: "50%",
              background: i === currentIdx ? "#222" : "#B8B8B8",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ReviewSection() {
  const { t } = useLang();

  return (
    <section className="bg-white py-12 sm:py-12 md:py-12 lg:py-12 sm:px-6 font-poppins">

      <div className="px-4">
        <div className="max-w-[1008px] mx-auto flex flex-col items-center bg-[#fff] rounded-[24px] py-4 shadow-[0_0_8px_0_rgba(0,0,0,0.12)]">
          <span className="text-[16px] font-semibold leading-[150%] text-[#222]">{t("Reviews")}</span>
          <span className="mt-2 text-[20px] font-semibold leading-[150%] text-[#222]">{AVERAGE_RATING}</span>
          <div className="mt-1">
            <RatingStars rating={AVERAGE_RATING} />
          </div>
        </div>
      </div>

      {/* ≥710px: 2 cols 341px, ≥1084px: 3 cols 341px */}
      <div className="hidden min-[710px]:grid mt-8 gap-2 justify-center grid-cols-[repeat(2,341px)] min-[1084px]:grid-cols-[repeat(3,341px)]">
        {DUMMY_REVIEWS.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>

      {/* 600px–709px: 2 cols 266px grid */}
      <div className="hidden min-[600px]:grid min-[710px]:hidden mt-8 gap-2 justify-center grid-cols-[repeat(2,266px)]">
        {DUMMY_REVIEWS.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>

      {/* <600px: carousel */}
      <div className="min-[600px]:hidden">
        <MobileCarousel />
      </div>

      {/* vendors don't have it but this exact same ui for families view also that is why */}
      {/* 
      <div className="flex justify-center flex-col mt-4 gap-4">
        <Button text={t("Add_a_review")} className="max-[500px]:px-6 mx-auto" />

        <button
          type="button"
          className="mx-auto bg-[#F2F2F2] px-6 py-2 rounded-[31px] cursor-pointer text-[#B31B38] text-[16px] font-medium leading-[150%] font-poppins border-0 transition-colors duration-150 hover:bg-[#E5E5E5] active:scale-[0.98]"
        >
          {t("See_all_reviews")}
        </button>
      </div> */}
    </section>
  );
}
