"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { useLang } from "@/context/LangContext";
import { useScrollLock } from "@/hooks/useScrollLock";
import { bizLogout } from "@/lib/api";
import {
  BackChevronIcon, BoostIcon, EditIcon, Logo, LogoutIcon,
  MenuIcon, SettingsIcon, ShareIcon,
} from "@/assets/Icons";
import LangDropdownButton from "./LangDropdownButton";
import ShareModal from "@/components/ui/ShareModal";

function LogoutPopup({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  useScrollLock(true);
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-[320px] rounded-[20px] bg-white p-6 shadow-xl">
        <p className="font-poppins text-[16px] font-semibold text-[#222222] leading-[150%]">Log out</p>
        <p className="mt-2 font-poppins text-[14px] font-normal text-[#6B6B6B] leading-[150%]">Are you sure you want to log out?</p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-[10px] border border-[#E0E0E0] py-2.5 font-poppins text-[14px] font-medium text-[#222222] hover:bg-[#F5F5F5] transition-colors duration-150 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-[10px] bg-[#B31B38] py-2.5 font-poppins text-[14px] font-medium text-white hover:bg-[#8E162D] active:bg-[#6F1023] transition-colors duration-150 cursor-pointer"
          >
            Yes, log out
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

type DashboardHeaderProps = {
  onBack?: () => void;
  onEdit?: () => void;
  onBoost?: () => void;
  onSettings?: () => void;
  variant?: "owner" | "editing";
  username?: string;
};

export default function DashboardHeader({ onBack, onEdit, onBoost, onSettings, variant = "owner", username }: DashboardHeaderProps) {
  const router = useRouter();
  const { t } = useLang();
  const showActions = variant === "owner";
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function handleLogout() {
    setMenuOpen(false);
    setLogoutOpen(true);
  }

  function confirmLogout() {
    bizLogout();
    router.replace("/login");
  }

  return (
    <>
    <header className="sticky top-0 z-50 w-full bg-white/60 backdrop-blur-sm">
      <div className="flex items-center justify-between max-[500px]:px-2 px-4 sm:px-8 md:px-10 max-[500px]:h-13 h-20">
        <div className="flex items-center">
          {showActions && (
            <div className=" mr-2 sm:mr-3">
              <Logo className="max-[500px]:w-5 w-6 max-[500px]:h-5 h-6" />
            </div>
          )}
          {!showActions && (
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
          )}
        </div>

        {showActions ? (
          <div className="flex items-center max-[500px]:gap-2 gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onBoost}
              className="max-[500px]:px-[2px] h-10 cursor-pointer select-none"
            >
              <div className="flex items-center gap-1 rounded-full pl-2 pr-3 max-[500px]:py-1.5 py-2 bg-[#F0F0F0]">
                <BoostIcon className="w-6 h-6" stroke="#525252" />
                <span className="font-poppins text-[14px] font-medium leading-[150%] text-[#525252]">{t("Boost")}</span>
              </div>
            </button>

            <LangDropdownButton />

            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Menu"
                className="h-10 w-10 flex shrink-0 max-[500px]:p-[2px] cursor-pointer select-none items-center justify-center"
              >
                <div className="rounded-full max-[500px]:p-1.5 p-2 bg-[#F0F0F0]">
                  <MenuIcon />
                </div>
              </button>

              {menuOpen && (
                <div className="absolute right-0 z-50 mt-1 w-[224px] overflow-hidden rounded-[16px] bg-white px-2 py-4 shadow-[0_0_16px_0_rgba(0,0,0,0.16)]">
                  <button
                    type="button"
                    onClick={() => { setMenuOpen(false); onEdit?.(); }}
                    className="mb-2 flex w-full items-center gap-3 rounded-[12px] px-2 py-2 text-left cursor-pointer hover:bg-[#F5F5F5]"
                  >
                    <EditIcon className="w-4 h-4" stroke="#222222" />
                    <span className="font-poppins leading-[150%] text-[16px] text-[#222222]">{t("Edit_profile")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMenuOpen(false); setShareOpen(true); }}
                    className="mb-2 flex w-full items-center gap-3 rounded-[12px] px-2 py-2 text-left cursor-pointer hover:bg-[#F5F5F5]"
                  >
                    <ShareIcon className="w-4 h-4" stroke="#222222" />
                    <span className="font-poppins leading-[150%] text-[16px] text-[#222222]">{t("Share")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setMenuOpen(false); onBoost?.(); }}
                    className="mb-2 flex w-full items-center gap-3 rounded-[12px] px-2 py-2 text-left cursor-pointer hover:bg-[#F5F5F5]"
                  >
                    <BoostIcon className="w-4 h-4" stroke="#222222" />
                    <span className="font-poppins leading-[150%] text-[16px] text-[#222222]">{t("Boost_business")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setMenuOpen(false); onSettings?.(); }}
                    className="mb-2 flex w-full items-center gap-3 rounded-[12px] px-2 py-2 text-left cursor-pointer hover:bg-[#F5F5F5]"
                  >
                    <SettingsIcon className="w-4 h-4" stroke="#222222" />
                    <span className="font-poppins leading-[150%] text-[16px] text-[#222222]">{t("Account_settings")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-[12px] px-2 py-2 text-left cursor-pointer hover:bg-[#F5F5F5]"
                  >
                    <LogoutIcon className="w-4 h-4" stroke="#8D5900" />
                    <span className="font-poppins leading-[150%] text-[16px] text-[#8D5900]">{t("Logout")}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-3">
            <LangDropdownButton />
          </div>
        )}
      </div>
    </header>
    {logoutOpen && <LogoutPopup onClose={() => setLogoutOpen(false)} onConfirm={confirmLogout} />}
    {shareOpen && (
      <ShareModal
        url={username ? `https://inai.lk/business/${username}` : (typeof window !== "undefined" ? window.location.href : "")}
        title={typeof document !== "undefined" ? document.title : "Check this out on Inai"}
        onClose={() => setShareOpen(false)}
      />
    )}
    </>
  );
}
