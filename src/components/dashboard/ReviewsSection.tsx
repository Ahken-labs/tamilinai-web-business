"use client";

import { useState, useEffect } from "react";
import { ReviewCard, MobileCarousel, RatingStars, type Review } from "@/components/review/ReviewCard";
import ReviewsModal, { ReviewSkeleton } from "@/components/review/ReviewsModal";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

function formatReviewDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
  });
}

function toReview(r: { reviewerName: string; reviewerPicture?: string; rating: number; comment?: string | null; createdAt: string }): Review {
  return {
    name: r.reviewerName,
    subtitle: formatReviewDate(r.createdAt),
    rating: r.rating,
    text: r.comment ?? "",
    picture: r.reviewerPicture ?? "",
  };
}

export default function ReviewsSection({ username }: { username: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/public/business/${username}/reviews`);
      if (!res.ok) return;
      const data = await res.json();
      const mapped: Review[] = (data.reviews ?? []).map(toReview);
      setReviews(mapped);
      setTotalCount(data.total ?? mapped.length);
      if (mapped.length > 0) {
        const avg = (data.reviews as { rating: number }[]).reduce((s, r) => s + r.rating, 0) / data.reviews.length;
        setAverageRating(Math.round(avg * 10) / 10);
      }
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { fetchReviews(); }, [username]);

  return (
    <section className="bg-white py-12 sm:px-6 font-poppins">
      <div className="px-4">
        <div className="max-w-[1008px] mx-auto flex flex-col items-center bg-white rounded-[24px] py-4 shadow-[0_0_8px_0_rgba(0,0,0,0.12)]">
          <span className="text-[16px] font-semibold leading-[150%] text-[#222]">Reviews</span>
          <span className="mt-2 text-[20px] font-semibold leading-[150%] text-[#222]">{averageRating || 0}</span>
          <div className="mt-1">
            <RatingStars rating={averageRating} />
          </div>
        </div>
      </div>

      {loading && (
        <>
          <div className="hidden min-[710px]:grid mt-8 gap-2 justify-center grid-cols-[repeat(2,341px)] min-[1084px]:grid-cols-[repeat(3,341px)]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full min-[710px]:w-[341px] bg-white rounded-[12px] py-5 px-4">
                <ReviewSkeleton />
              </div>
            ))}
          </div>
          <div className="min-[710px]:hidden mt-8 px-4">
            <div className="bg-white rounded-[12px] py-5 px-4">
              <ReviewSkeleton />
            </div>
          </div>
        </>
      )}

      {!loading && reviews.length > 0 && (
        <>
          <div className="hidden min-[710px]:grid mt-8 gap-2 justify-center grid-cols-[repeat(2,341px)] min-[1084px]:grid-cols-[repeat(3,341px)]">
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} onShowMore={() => setReviewsOpen(true)} />
            ))}
          </div>

          <div className="hidden min-[600px]:grid min-[710px]:hidden mt-8 gap-2 justify-center grid-cols-[repeat(2,266px)]">
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} onShowMore={() => setReviewsOpen(true)} />
            ))}
          </div>

          <div className="min-[600px]:hidden">
            <MobileCarousel reviews={reviews} onShowMore={() => setReviewsOpen(true)} />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="button"
              onClick={() => setReviewsOpen(true)}
              className="bg-[#F2F2F2] px-6 py-3 rounded-[31px] cursor-pointer text-[#B31B38] text-[16px] font-medium leading-[150%] font-poppins border-0 transition-colors duration-150 hover:bg-[#E5E5E5] active:scale-[0.98]"
            >
              See all reviews
            </button>
          </div>
        </>
      )}

      {reviewsOpen && (
        <ReviewsModal
          allReviews={reviews}
          averageRating={averageRating}
          totalCount={totalCount}
          onClose={() => setReviewsOpen(false)}
        />
      )}
    </section>
  );
}
