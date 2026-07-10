"use client";

import { useRouter } from "next/navigation";
import { BackChevronIcon, EditIcon, Logo, ShareIcon } from "@/assets/Icons";
import LangDropdownButton from "./LangDropdownButton";

type DashboardHeaderProps = {
  onBack?: () => void;
  onEdit?: () => void;
  onShare?: () => void;
  variant?: "owner" | "editing";
};

export default function DashboardHeader({ onBack, onEdit, onShare, variant = "owner" }: DashboardHeaderProps) {
  const router = useRouter();
  const showActions = variant === "owner";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-sm">
      <div className="flex items-center justify-between max-[500px]:px-2 px-4 sm:px-8 md:px-10 max-[500px]:pt-1.5 pt-5 max-[500px]:pb-1.5 pb-[14px]">
        <div className="flex items-center">
          <div className="max-[500px]:hidden flex mr-2 sm:mr-3">
            <Logo />
          </div>
          <button
            type="button"
            onClick={onBack ?? (() => router.back())}
            aria-label="Go back"
            className="h-10 w-10 flex shrink-0 max-[500px]:p-0.5 p-0 cursor-pointer select-none items-center justify-center"
          >
            <div className="rounded-full max-[500px]:p-1.5 p-2 bg-[#F0F0F0]">
              <BackChevronIcon />
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {showActions && (
            <button
              type="button"
              onClick={onEdit}
              aria-label="Edit"
              className="h-10 w-10 flex shrink-0 max-[500px]:p-0.5 p-0 cursor-pointer select-none items-center justify-center"
            >
              <EditIcon />
            </button>
          )}
          {showActions && (
            <button
              type="button"
              onClick={onShare}
              aria-label="Share"
              className="h-10 w-10 flex shrink-0 max-[500px]:p-0.5 p-0 cursor-pointer select-none items-center justify-center"
            >
              <ShareIcon />
            </button>
          )}
          <LangDropdownButton />
        </div>
      </div>
    </header>
  );
}
