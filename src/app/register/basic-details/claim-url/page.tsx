"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";
import FormRow from "@/components/common-layout/FormRow";
import InputBox from "@/components/common-layout/InputBox";
import { CheckIcon, XIcon } from "@/assets/Icons";
import { CLAIM_URL_STORAGE_KEY, USERNAME_RESERVATION_KEY } from "@/constants/storageKeys";
import { checkUsername, reserveUsername, releaseUsername } from "@/lib/api";
import { isReservedUsername } from "@/constants/reservedUsernames";

const CHECK_DELAY_MS = 600;

type Status = "idle" | "checking" | "available" | "taken";

export default function ClaimUrlPage() {
  const { t } = useLang();
  const router = useRouter();

  const [username, setUsername] = useState(() => {
    try { const s = JSON.parse(sessionStorage.getItem(CLAIM_URL_STORAGE_KEY) ?? "{}"); return s.username ?? ""; } catch { return ""; }
  });
  const [status, setStatus] = useState<Status>(() => {
    try {
      const s = JSON.parse(sessionStorage.getItem(CLAIM_URL_STORAGE_KEY) ?? "{}");
      if (!s.username) return "idle";
      return sessionStorage.getItem(USERNAME_RESERVATION_KEY) ? "available" : "checking";
    } catch { return "idle"; }
  });
  const [error, setError] = useState("");
  const [reserving, setReserving] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (username.length < 2) return;

    timeoutRef.current = setTimeout(async () => {
      // Skip check if we own the reservation for this username
      const token = sessionStorage.getItem(USERNAME_RESERVATION_KEY);
      const saved = sessionStorage.getItem(CLAIM_URL_STORAGE_KEY);
      if (token && saved) {
        const parsed = JSON.parse(saved) as { username?: string };
        if (parsed.username === username) { setStatus("available"); return; }
      }
      if (isReservedUsername(username)) { setStatus("taken"); return; }
      try {
        const res = await checkUsername(username);
        setStatus(res.available ? "available" : "taken");
      } catch {
        setStatus("idle");
      }
    }, CHECK_DELAY_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [username]);

  async function handleNext() {
    if (!username) { setError(t("Username_required")); return; }
    if (username.length < 2) { setError(t("Username_min_length")); return; }
    if (status !== "available") return;

    setError("");

    // Already have a valid reservation for this exact username — skip reserve call
    const existingToken = sessionStorage.getItem(USERNAME_RESERVATION_KEY);
    const existingSaved = sessionStorage.getItem(CLAIM_URL_STORAGE_KEY);
    if (existingToken && existingSaved) {
      const saved = JSON.parse(existingSaved) as { username?: string };
      if (saved.username === username) {
        router.push("/register/basic-details/main-photo");
        return;
      }
    }

    setReserving(true);
    try {
      const { reservationToken } = await reserveUsername(username);
      sessionStorage.setItem(CLAIM_URL_STORAGE_KEY, JSON.stringify({ username }));
      sessionStorage.setItem(USERNAME_RESERVATION_KEY, reservationToken);
      router.push("/register/basic-details/main-photo");
    } catch (err) {
      setStatus("taken");
      setError(err instanceof Error ? err.message : "Username no longer available.");
    } finally {
      setReserving(false);
    }
  }

  const isTaken = status === "taken";

  return (
    <div className="font-poppins flex flex-col px-5 py-4 sm:w-[640px] mx-auto">
      <h1 className="mx-auto max-w-[300px] md:max-w-[500px] text-center font-48 font-semibold leading-[120%] text-[#000]">
        {t("Claim_your_profile_link")}
      </h1>

      <p className="mx-auto max-w-[560px] mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-center font-20 leading-[150%] text-[#525252]">
        {t("Claim_url_description")}
      </p>

      <div className="mt-8 sm:mt-10 md:mt-11 lg:mt-12 flex flex-col">
        <FormRow label={t("Username")} required error={error}>
          <InputBox
            compact
            value={username}
            onChange={(v) => {
              const clean = v.toLowerCase().replace(/[^a-z0-9_-]/g, "");
              if (clean !== username) {
                const prevUsername = sessionStorage.getItem(CLAIM_URL_STORAGE_KEY);
                const prevToken = sessionStorage.getItem(USERNAME_RESERVATION_KEY);
                if (prevUsername && prevToken) {
                  const prev = JSON.parse(prevUsername) as { username?: string };
                  if (prev.username) releaseUsername(prev.username, prevToken);
                  sessionStorage.removeItem(USERNAME_RESERVATION_KEY);
                }
              }
              setUsername(clean);
              setStatus(clean.length >= 2 ? "checking" : "idle");
              setError("");
            }}
            label={t("Username_Placeholder")}
            suffix={
              status === "checking" ? (
                <div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-[#D9D9D9] border-t-[#B31B38]" />
              ) : status === "available" ? (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2E7D32]">
                  <CheckIcon className="w-3 h-3 shrink-0" stroke="white" />
                </div>
              ) : isTaken ? (
                <button
                  type="button"
                  onClick={() => {
                    setUsername("");
                    setStatus("idle");
                    setError("");
                  }}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8D5900] cursor-pointer"
                >
                  <XIcon className="w-4.5 h-4.5 shrink-0" stroke="white" />
                </button>
              ) : undefined
            }
          />
        </FormRow>

        {status === "available" && (
          <p className="mt-1.5 font-poppins text-[12px] leading-[150%] text-[#2E7D32]">
            {t("Username_available")}
          </p>
        )}
        {isTaken && (
          <p className="mt-1.5 font-poppins text-[12px] leading-[150%] text-[#8D5900]">
            {t("Username_taken")}
          </p>
        )}

        <div
          className="mt-6 rounded-[16px] bg-white px-4 py-3 shadow-[0_0_8px_0_rgba(0,0,0,0.12)]"
        >
          <p
            className="font-poppins text-[14px] leading-[125%] text-[#767676]"
          >
            {t("Your_public_link")}
          </p>
          <p
            className={`mt-1.5 min-w-[248px] break-words font-poppins text-[16px] leading-[125%] ${
              isTaken ? "text-[#8D5900]" : "text-[#222222]"
            }`}
          >
            inai.lk/business/<span className="font-semibold">{username || "username"}</span>
          </p>
        </div>
      </div>

      <Button
        text={reserving ? "..." : t("Next")}
        onPress={handleNext}
        disabled={reserving}
        className={`mt-8 sm:mt-9 md:mt-10 mx-auto w-[173px] ${
          username.length < 2 || isTaken || reserving ? "!bg-[#525252] hover:!bg-[#525252]" : ""
        }`}
      />
    </div>
  );
}
