"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";
import DashboardHeader from "@/components/main/DashboardHeader";
import { CopyIcon, CopiedCheckIcon, ChevronIcon, ReceiptFileIcon, BoostIconFilled, UploadIcon, PromoIcon, CheckIcon, CloseCircleIcon, ReceiptDocIcon, ReuploadIcon, InterestLockIcon, MailIcon, WpIcon, VerifiedCheckCircleIcon } from "@/assets/Icons";
import { compressImage } from "@/utils/imageCompression";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useScrollHide } from "@/hooks/useScrollHide";
import { getBizMe, getBizBoostPending, validateBizPromo, bizBoostPreUpload, createBizBoostOrder, reuployBizBoostReceipt } from "@/lib/api";
import { BiCheckCircle } from "react-icons/bi";


// ── Constants ──────────────────────────────────────────────────────────────────

const BOOST_REGULAR_PRICE = 3000;
const BOOST_DISCOUNTED_PRICE = 1000;
const BOOST_OFFER_DURATION_MS = 10 * 24 * 60 * 60 * 1000;

const BANK_DETAILS = [
  { labelKey: "Account_name", displayValue: "Ahken Nexus Pvt Ltd", copyValue: "Ahken Nexus Pvt Ltd" },
  { labelKey: "Bank", displayValue: "Sampath Bank PLC", copyValue: "Sampath Bank PLC" },
  { labelKey: "Account_number", displayValue: "0148 1100 4426", copyValue: "014811004426" },
  { labelKey: "Branch", displayValue: "Kilinochchi", copyValue: "Kilinochchi" },
];

const WHATSAPP_NUMBER = "94770750760";
const SUPPORT_EMAIL = "support@inai.lk";
const STEP_KEYS = ["Checkout_Step_Transfer", "Checkout_Step_Upload", "Checkout_Step_Verify"] as const;

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}


type T = (key: string) => string;

function VerifyingDots() {
  const [dots, setDots] = useState(1);
  const { t } = useLang();
  useEffect(() => {
    const timer = setInterval(() => setDots((d) => (d % 3) + 1), 420);
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-[#2E7D32]">
      {t("Verifying")}{".".repeat(dots)}
    </span>
  );
}

function StepProgress({ currentStep, t }: { currentStep: number; t: T }) {
  return (
    <div className="flex flex-col">
      <div className="flex max-[370px]:gap-1.5 gap-4">
        {STEP_KEYS.map((_, i) => (
          <div key={i} className={`max-[500px]:h-1 h-2 flex-1 rounded-[27px] ${i < currentStep ? "bg-[#B31B38]" : "bg-[#D9D9D9]"}`} />
        ))}
      </div>
      <div className="flex max-[370px]:gap-1.5 gap-4 max-[500px]:mt-0.5 mt-1 md:mt-2">
        {STEP_KEYS.map((key, i) => (
          <div key={i} className="flex-1 text-center">
            <span
              className={`select-none font-poppins max-[350px]:text-[11px] text-[12px] sm:text-[13px] md:text-[14px] font-medium leading-[150%] ${i < currentStep ? "text-[#B31B38]" : "text-[#888888]"}`}
              style={i === STEP_KEYS.length - 1 && i < currentStep ? { color: "#2E7D32" } : undefined}
            >
              {t(key)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoostTag({ t }: { t: T }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#B31B38] max-[500px]:px-2 px-3 py-0.5 font-16 text-white">
      <BoostIconFilled className="w-5 h-5 shrink-0" stroke="white" />
      {t("Business_boost")}
    </span>
  );
}

// ── Support links (shared between mobile card and desktop sidebar) ──────────────

function SupportLinks({ t }: { t: T }) {
  return (
    <>
      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 text-[#525252] hover:text-[#222222]">
        <WpIcon className="h-4 w-4 shrink-0" strokeWidth="1.6" stroke="#525252" fill="#525252" />
        <span className="text-[14px] font-normal leading-[150%] underline">+94 770 750 760</span>
      </a>
      <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-2 text-[#525252] hover:text-[#222222]">
        <MailIcon className="h-4 w-4 shrink-0" />
        <span className="text-[14px] font-normal leading-[150%] underline">{SUPPORT_EMAIL}</span>
      </a>
      <div className="flex items-center gap-2 text-[#525252]">
        <InterestLockIcon className="h-4 w-4 shrink-0" stroke="#525252" />
        <span className="text-[14px] font-normal leading-[150%]">{t("Secure_payment")}</span>
      </div>
      <button type="button"
        className="flex items-center gap-2 text-[#525252] hover:text-[#222222] cursor-pointer text-left">
        <BiCheckCircle className="h-4 w-4 shrink-0" />
        <span className="text-[14px] font-normal leading-[150%] underline">{t("Refund_Return_Policy")}</span>
      </button>
    </>
  );
}

// ── Plan Summary — matches web PlanSummary exactly ────────────────────────────

function PlanSummary({
  t, offerActive, finalPrice, promoInput, setPromoInput,
  promoApplied, promoError, onApplyPromo, onRemovePromo,
}: {
  t: T; offerActive: boolean; finalPrice: number; promoInput: string;
  setPromoInput: (v: string) => void; promoApplied: boolean; promoError: string;
  onApplyPromo: () => void; onRemovePromo: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const PromoRow = (
    <div className="mt-4">
      <div className={`flex items-center gap-2 rounded-[12px] border bg-white py-2 pl-4 pr-2 ${promoError ? "border-[#B31B38]" : "border-dashed border-[#D8D8D8]"}`}>
        <input
          type="text"
          placeholder={t("Promo_code")}
          value={promoInput}
          onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
          disabled={promoApplied}
          className="flex-1 min-w-0 bg-transparent text-[16px] text-[#58585B] placeholder:text-[#58585B] outline-none disabled:opacity-100"
        />
        {promoApplied ? (
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={onRemovePromo} className="cursor-pointer shrink-0"><CloseCircleIcon /></button>
            <Button text={t("Applied")} iconLeft={<CheckIcon stroke="#767676" strokeWidth={1.5} />} className="!px-3 !bg-[#F2F2F2] !text-[#767676] !font-medium shrink-0" disabled />
          </div>
        ) : (
          <Button text={t("Apply")} className="!px-4 !bg-[#FFF0F3] !text-[#222] !font-medium shrink-0"
            iconLeft={<PromoIcon className="w-4 h-4" />} onPress={onApplyPromo}
            disabled={!promoInput.trim()} />
        )}
      </div>
      {promoError && <p className="mt-1.5 text-[12px] text-[#B31B38] leading-[150%]">{promoError}</p>}
    </div>
  );

  return (
    <>
      {/* Mobile collapsible card — visible only ≤500px */}
      <div className="hidden max-[500px]:block font-poppins w-full">
        <div className="p-4 border border-[#EAEAEA] bg-[#F2F2F2] rounded-[20px]">
          <div className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-normal leading-[150%] text-[#242424]">{t("Order_summary")}</span>
              <ChevronIcon open={isExpanded} className="w-4 h-4 shrink-0 transition-transform duration-200" stroke="#222222" />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <BoostTag t={t} />
              {!isExpanded && <span className="text-[16px] font-semibold leading-[150%] text-[#222222]">Rs {finalPrice.toLocaleString()}</span>}
            </div>
          </div>
          <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden">
              <div>
                <div className="mt-4 border-t border-[#D8D8D8]" />
                <div className="mt-3 flex flex-col">
                  <div className="flex justify-between">
                    <span className="text-[16px] font-medium leading-[150%] text-[#222222]">{t("Per_month")}</span>
                    <span className="text-[16px] font-medium leading-[150%] text-[#222222]">Rs {BOOST_REGULAR_PRICE.toLocaleString()}</span>
                  </div>
                  {(offerActive || promoApplied) && (
                    <div className="flex justify-between">
                      <span className="text-[16px] font-medium leading-[150%] text-[#222222]">{t("Discount")}</span>
                      <span className="text-[16px] font-medium leading-[150%] text-[#222222]">− Rs {(BOOST_REGULAR_PRICE - finalPrice).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[16px] font-medium leading-[150%] text-[#222222]">{t("Tax")}</span>
                    <span className="text-[16px] font-medium leading-[150%] text-[#222222]">{t("Tax_included")}</span>
                  </div>
                </div>
                <div className="mt-3 border-t border-[#EAEAEA]" />
                <div className="mt-4 flex justify-between">
                  <span className="text-[18px] font-semibold leading-[150%] text-[#222222]">{t("Total")}</span>
                  <span className="text-[18px] font-semibold leading-[150%] text-[#222222]">Rs {finalPrice.toLocaleString()}</span>
                </div>
                {PromoRow}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop full card — hidden ≤500px */}
      <div className="font-poppins w-full md:max-w-[360px] flex flex-col max-[500px]:hidden">
        <div className="py-6 px-5 bg-[#F2F2F2] border border-[#EAEAEA] rounded-t-[20px] rounded-b-[8px]">
          <BoostTag t={t} />
          <div className="flex items-end mt-5">
            <span className="text-[20px] font-medium leading-[100%] text-[#222222]">Rs {BOOST_REGULAR_PRICE.toLocaleString()} /{t("Per_month")}</span>
          </div>
          <div className="flex flex-col border-t border-[#D8D8D8] mt-4 py-3">
            {(offerActive || promoApplied) && (
              <div className="flex justify-between">
                <span className="font-16 font-medium leading-[150%] text-[#222222]">{t("Discount")}</span>
                <span className="font-16 font-medium leading-[150%] text-[#222222]">− Rs {(BOOST_REGULAR_PRICE - finalPrice).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-16 font-medium leading-[150%] text-[#222222]">{t("Tax")}</span>
              <span className="font-16 font-medium leading-[150%] text-[#222222]">{t("Tax_included")}</span>
            </div>
          </div>
          <div className="flex justify-between border-t border-[#D8D8D8] pt-3">
            <span className="text-[20px] font-semibold leading-[150%] text-[#222222]">{t("Total")}</span>
            <span className="text-[20px] font-semibold leading-[150%] text-[#222222]">Rs {finalPrice.toLocaleString()}</span>
          </div>
          {PromoRow}
        </div>
        <div className="mt-1 max-[500px]:hidden flex flex-col gap-2 py-4 px-5 bg-[#F2F2F2] border border-[#EAEAEA] rounded-b-[20px] rounded-t-[8px]">
          <SupportLinks t={t} />
        </div>
      </div>
    </>
  );
}

// ── Bank Details Card ──────────────────────────────────────────────────────────

function BankDetailsCard({ t, copiedKey, onCopy, uploaded }: {
  t: T; copiedKey: string | null; onCopy: (v: string) => void; uploaded?: boolean;
}) {
  return (
    <div className="font-poppins rounded-[20px] md:rounded-[24px] bg-white px-4 sm:px-5 md:px-6 pb-5 sm:pb-5.5 md:pb-6 pt-5 sm:pt-5.5 md:pt-8">
      <h2 className="max-[500px]:text-[16px] text-[17px] sm:text-[18px] md:text-[19px] lg:text-[20px] font-semibold text-[#222222] leading-[150%]">
        {t("Checkout_Transfer_Title")}
      </h2>
      <p className="mt-1 sm:mt-1.5 md:mt-2 max-[500px]:text-[12px] text-[14px] sm:text-[15px] md:text-[16px] text-[#2E7D32] leading-[150%]">
        {t("Checkout_Transfer_Desc")}
      </p>
      <div className="py-5 pr-3 bg-[#F2F2F2] pl-4 mt-5 sm:mt-6 rounded-[16px] flex flex-col">
        <span className="font-semibold text-[16px] sm:text-[18px] text-[#222222] mb-1">{t("Account_details")}</span>
        {BANK_DETAILS.map(({ labelKey, displayValue, copyValue }) => (
          <div key={labelKey} className="flex flex-col mt-3 sm:mt-3.5 md:mt-4">
            <div className="flex items-center justify-between">
              <div className="flex-col flex">
                <span className="font-16 text-[#525252] leading-[150%]">{t(labelKey)}</span>
                <span className="font-16 text-[#222222] leading-[150%] font-medium flex-1 min-w-0">{displayValue}</span>
              </div>
              <button
                type="button"
                onClick={() => onCopy(copyValue)}
                className={`shrink-0 max-[500px]:px-[14px] px-[16px] md:px-[18px] max-[500px]:py-[6px] py-[7px] md:py-[9px] border border-[#FFFFFF] rounded-full hover:bg-[#FFF0F3] transition-opacity cursor-pointer ${uploaded ? "text-[#222222]" : "text-[#B31B38]"}`}
                aria-label={`Copy ${t(labelKey)}`}
              >
                {copiedKey === copyValue ? <CopiedCheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Upload Receipt Popup ───────────────────────────────────────────────────────

function UploadReceiptPopup({ t, onClose, onFileSelected, username }: {
  t: T; onClose: () => void; onFileSelected: (file: File) => void; username: string;
}) {
  useScrollLock(true);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    onClose();
    onFileSelected(f);
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-end min-[500px]:items-center justify-center min-[500px]:p-4 bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="font-poppins w-full min-[500px]:max-w-[560px] bg-white rounded-t-[16px] min-[500px]:rounded-[16px] max-[500px]:px-4 px-5 sm:px-6 pt-5 sm:pt-6 max-[500px]:pb-8 pb-6">
        <div className="flex items-center justify-between max-[500px]:mb-3 mb-4 sm:mb-5">
          <h2 className="max-[500px]:text-[14px] text-[15px] md:text-[20px] font-semibold text-[#222222] leading-[150%]">{t("Upload_payment_receipt")}</h2>
          <button type="button" onClick={onClose}
            className="max-[500px]:w-7 w-8 max-[500px]:h-7 h-8 flex items-center justify-center rounded-full bg-[#F2F2F2] hover:bg-[#E0E0E0] active:scale-95 transition-all duration-150 cursor-pointer shrink-0"
            aria-label="Close">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M13 1L1 13M1 1L13 13" stroke="#222222" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center rounded-[16px] border-2 border-dashed border-[#D8D8D8] bg-[#F2F2F2] px-4 py-6">
          <UploadIcon className="shrink-0 w-6 h-6 text-[#222222]" />
          <h2 className="mt-2 text-[16px] font-semibold text-[#222222] text-center">{t("Upload_payment_receipt")}</h2>
          <p className="mt-2 text-[14px] text-[#525252] text-center">{t("Upload_receipt_desc")}</p>
          <Button text={t("Choose_file")} onPress={() => inputRef.current?.click()}
            className="flex-1 w-full mt-4"
            iconLeft={<ReceiptFileIcon className="shrink-0 w-5 h-5 text-white" />} />
          <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleChange} />
          <p className="mt-4 text-[12px] text-[#525252] text-center">
            {t("Having_trouble_uploading")}{" "}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, my Inai Business username is: ${username}`)}`}
              target="_blank" rel="noopener noreferrer"
              className="underline text-[#525252] hover:text-[#B31B38] cursor-pointer">
              {t("Send_receipt_WhatsApp")}
            </a>
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function BoostCheckoutPage() {
  const router = useRouter();
  const { t: _t } = useLang();
  const t = _t as T;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [promoDiscountLkr, setPromoDiscountLkr] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);
  const [receiptReady, setReceiptReady] = useState(false);
  const [receiptKey, setReceiptKey] = useState<string | undefined>(undefined);
  const [pendingOrderId, setPendingOrderId] = useState<string | undefined>(undefined);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const cancelUploadRef = useRef<(() => void) | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  useEffect(() => {
    getBizMe().then((me) => {
      setUsername(me.username ?? me.businessName ?? "");
      setCreatedAt(me.createdAt ?? null);
    }).catch(() => { });

    getBizBoostPending().then(({ order }) => {
      if (order) {
        setPendingOrderId(order.id);
        setReceiptKey(order.receiptKey ?? undefined);
        if (order.receiptKey) {
          setReceiptReady(true);
          setStep(3);
        }
        if (order.promoCode) {
          setPromoInput(order.promoCode);
          setPromoApplied(true);
          setPromoDiscountLkr(order.discountLkr);
        }
      }
    }).catch(() => { });
  }, []);

  const offerActive = createdAt ? Date.now() < new Date(createdAt).getTime() + BOOST_OFFER_DURATION_MS : false;
  const promoDiscount = promoApplied ? promoDiscountLkr : 0;
  const finalPrice = offerActive
    ? BOOST_DISCOUNTED_PRICE
    : Math.max(0, BOOST_REGULAR_PRICE - promoDiscount);

  async function handleApplyPromo() {
    if (!promoInput.trim()) return;
    setPromoError("");
    try {
      const res = await validateBizPromo(promoInput.trim());
      if (res.valid) {
        setPromoApplied(true);
        setPromoDiscountLkr(res.discountLkr);
      } else {
        setPromoError("Invalid or expired promo code.");
      }
    } catch (err) {
      setPromoError(err instanceof Error ? err.message : "Invalid promo code.");
    }
  }

  function handleRemovePromo() {
    setPromoApplied(false);
    setPromoInput("");
    setPromoDiscountLkr(0);
    setPromoError("");
  }

  async function handleCopy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(value);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch { /* silent */ }
  }

  async function startUpload(f: File) {
    cancelUploadRef.current?.();
    setFile(f);
    setReceiptReady(false);
    setUploadPct(0);
    setUploading(true);
    setSubmitError("");
    setStep(2);

    let cancelled = false;
    cancelUploadRef.current = () => { cancelled = true; };

    try {
      const compressed = f.type.startsWith("image/") ? await compressImage(f, { maxDimension: 1200, quality: 0.75 }) : f;
      if (cancelled) return;
      setFile(compressed);

      // Fake progress 0→85 while uploading
      let pct = 0;
      const interval = setInterval(() => {
        pct = Math.min(pct + Math.random() * 15, 85);
        setUploadPct(Math.round(pct));
      }, 200);

      let newKey: string;
      if (pendingOrderId) {
        const res = await reuployBizBoostReceipt(pendingOrderId, compressed);
        newKey = res.receiptKey;
      } else {
        const res = await bizBoostPreUpload(compressed, receiptKey);
        newKey = res.receiptKey;
      }

      clearInterval(interval);
      if (cancelled) return;
      setReceiptKey(newKey);
      setUploadPct(100);
      setUploading(false);
      setReceiptReady(true);
    } catch (err) {
      if (!cancelled) {
        setSubmitError(err instanceof Error ? err.message : "Upload failed. Please try again.");
        resetUpload();
      }
    }
  }

  function resetUpload() {
    cancelUploadRef.current?.();
    cancelUploadRef.current = null;
    setFile(null);
    setUploading(false);
    setUploadPct(0);
    setReceiptReady(false);
    setStep(1);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    e.target.value = "";
    startUpload(f);
  }

  async function handleSubmit() {
    if (!receiptReady || submitting) return;
    setSubmitError("");
    setSubmitting(true);
    try {
      await createBizBoostOrder({
        promoCode: promoApplied ? promoInput.trim() : undefined,
        receiptKey,
      });
      setStep(3);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const headerVisible = useScrollHide();

  const summaryProps = {
    t, offerActive, finalPrice, promoInput, setPromoInput,
    promoApplied, promoError, onApplyPromo: handleApplyPromo, onRemovePromo: handleRemovePromo,
  };

  // Step 3 — confirmation
  if (step === 3) {
    return (
      <>
        <DashboardHeader variant="owner" showBack hideBoost scrollHide onEdit={() => router.push("/dashboard/edit")} />
        <div
          className="sticky z-40 min-[501px]:!top-[80px] w-full bg-white/60 backdrop-blur-sm border-t border-[#EEEEEE] transition-[top] duration-300"
          style={{ top: headerVisible ? 52 : 0 }}
        >
          <div className="flex justify-center items-center py-3 px-4">
            <div className="w-full max-w-[945px]"><StepProgress currentStep={3} t={t} /></div>
          </div>
        </div>
        <main className="min-h-screen bg-[#F8F5F2] pb-20">
          <div className="mx-auto max-w-[1037px] px-4 sm:px-6 md:px-6 lg:px-10 max-[500px]:pt-4 pt-5 sm:pt-6 md:pt-7 lg:pt-8 flex justify-center">
            <div className="w-full max-w-[640px] flex flex-col gap-4">
              <div className="rounded-[24px] bg-white max-[500px]:px-4 px-5 sm:px-5.5 md:px-6 max-[500px]:pb-5 pb-6 sm:pb-7 md:pb-8 max-[500px]:pt-5 pt-6 sm:pt-7 md:pt-8 flex flex-col items-center text-center font-poppins">
                <div className="p-4 bg-[#E3FFD9] rounded-full">
                  <VerifiedCheckCircleIcon className="w-8 h-8 shrink-0 text-[#2E7D32]" />
                </div>
                <h2 className="mt-4 sm:mt-3 md:mt-2 text-[18px] sm:text-[19px] md:text-[20px] font-semibold text-[#222222]">{t("Checkout_Got_Receipt")}</h2>
                <p className="mt-2 sm:mt-3 md:mt-4 text-[16px] text-[#17761B]">
                  {t("Checkout_Verifying_Desc")}
                </p>
                <div className="mt-5 sm:mt-4 w-full p-4 bg-[#F2FFED] rounded-[16px] overflow-hidden text-left">
                  {[
                    [t("Username"), username],
                    [t("Amount"), `Rs ${finalPrice.toLocaleString()}`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center pb-1.5">
                      <span className="text-[14px] sm:text-[15px] md:text-[16px] text-[#2C303A]">{label}</span>
                      <span className="text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-[#2C303A]">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] sm:text-[15px] md:text-[16px] text-[#2C303A]">{t("Status")}</span>
                    <VerifyingDots />
                  </div>
                </div>
                <Button text={t("Back_to_dashboard")} className="mt-6 w-full" onPress={() => router.push("/dashboard")} />

                <p className="mt-5 font-16 text-[#656565] leading-[150%]">
                  {t("Checkout_Notif_Desc")}
                </p>
                <p className="mt-4 md:mt-2 text-[#656565] text-[12px] sm:text-[13px] md:text-[14px]">
                  {t("Wrong_receipt")}{" "}
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, my Inai Business username is: ${username}\nI uploaded the wrong receipt.`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="underline cursor-pointer hover:text-[#B31B38]">
                    {t("Get_help_on_WhatsApp")}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Steps 1–2
  return (
    <>
      <DashboardHeader variant="owner" showBack hideBoost scrollHide onEdit={() => router.push("/dashboard/edit")} />
      <div
        className="sticky z-40 min-[501px]:!top-[80px] w-full bg-white/60 backdrop-blur-sm border-t border-[#EEEEEE] transition-[top] duration-300"
        style={{ top: headerVisible ? 52 : 0 }}
      >
        <div className="flex justify-center items-center py-3 px-4">
          <div className="w-full max-w-[945px]"><StepProgress currentStep={step} t={t} /></div>
        </div>
      </div>

      <main className="min-h-screen bg-[#F8F5F2] pb-20">
        <div className="mx-auto max-w-[1037px] px-4 sm:px-6 md:px-6 lg:px-10 max-[500px]:pt-4 pt-5 sm:pt-6 md:pt-7 lg:pt-8">
          <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-start">

            {/* LEFT: bank details + upload — order-2 on mobile, left column on desktop */}
            <div className="max-[500px]:order-2 w-full flex flex-col gap-4 sm:gap-5 md:gap-6">
              <BankDetailsCard t={t} copiedKey={copiedKey} onCopy={handleCopy} uploaded={receiptReady} />

              {/* Upload receipt */}
              <div className="font-poppins rounded-[20px] md:rounded-[24px] bg-white px-4 sm:px-5 md:px-6 pb-5 sm:pb-5.5 md:pb-6 pt-5 sm:pt-5.5 md:pt-8">
                <h2 className="max-[500px]:text-[16px] text-[17px] sm:text-[18px] md:text-[19px] lg:text-[20px] font-semibold text-[#222222] leading-[150%]">
                  {t("Checkout_Step_Upload")}
                </h2>

                {/* Empty state */}
                {!file && (
                  <div className="mt-3 sm:mt-4 md:mt-5 flex flex-col items-center justify-center rounded-[36px] border-1 border-dashed border-[#656565] bg-[#F2F2F2] px-4 py-6">
                    <UploadIcon className="shrink-0 w-6 h-6 text-[#222222]" />
                    <h2 className="mt-2 font-medium text-[16px] text-[#222222] text-center">{t("Upload_payment_receipt")}</h2>
                    <p className="mt-2 text-[14px] text-[#656565] text-center">{t("Upload_receipt_desc")}</p>
                    <Button text={t("Choose_file")} onPress={() => fileInputRef.current?.click()}
                      className="flex-1 w-full mt-4 sm:mt-4.5 md:mt-5"
                      iconLeft={<ReceiptFileIcon className="shrink-0 w-5 h-5 text-white" />} />
                    <p className="m-4 sm:mt-4.5 md:mt-5 text-[12px] text-[#525252] text-center">
                      {t("Having_trouble")}{" "}
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, my Inai Business username is: ${username}`)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="underline text-[#525252] hover:text-[#B31B38] cursor-pointer">
                        {t("Send_receipt_WhatsApp_instead")}
                      </a>
                    </p>
                  </div>
                )}

                {/* Uploading progress */}
                {file && uploading && (
                  <div className="mt-4 flex items-center gap-3 rounded-[36px] border-1 border-dashed border-[#656565] bg-[#F2F2F2] pl-4 pr-[14px] py-6">
                    <div className="rounded-[8px] md:rounded-[12.8px] bg-[#fff] py-2 sm:py-[12.8px] px-2 sm:px-[12.8px] flex items-center justify-center shrink-0">
                      <ReceiptDocIcon className="max-[500px]:w-6 w-7 sm:w-8 md:w-9.5 max-[500px]:h-6 h-7 sm:h-8 md:h-9.5 shrink-0" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[#222222] truncate">{file.name}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-[#FFF] overflow-hidden">
                          <div className="h-full bg-[#B31B38] rounded-full transition-all duration-200" style={{ width: `${uploadPct}%` }} />
                        </div>
                        <span className="text-[14px] sm:text-[15px] md:text-[16px] text-[#222222] shrink-0">{uploadPct}%</span>
                      </div>
                    </div>
                    <button className="shrink-0 bg-[#FFF] rounded-full p-1 hover:bg-[#F2F2F2] cursor-pointer" type="button" onClick={resetUpload}>
                      <div className="shrink-0 text-[#656565] hover:text-[#222222] cursor-pointer">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    </button>
                  </div>
                )}

                {/* Ready to submit */}
                {file && !uploading && receiptReady && (
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="rounded-[36px] border-1 border-dashed border-[#656565] bg-[#F2F2F2] pl-4 pr-[14px] py-6">
                      <div className="items-center flex gap-2 sm:gap-3 md:gap-4">
                        <button type="button"
                          onClick={() => { const url = URL.createObjectURL(file); window.open(url, "_blank"); }}
                          className="rounded-[8px] md:rounded-[12.8px] bg-[#fff] py-2 sm:py-[12.8px] px-2 sm:px-[12.8px] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#F0F0F0] transition-colors"
                          aria-label="View receipt">
                          <ReceiptDocIcon className="max-[500px]:w-6 w-7 sm:w-8 md:w-9.5 max-[500px]:h-6 h-7 sm:h-8 md:h-9.5 shrink-0" />
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-[#222222] truncate">{file.name}</p>
                          <p className="text-[12px] text-[#2E7D32]">{t("Ready_to_submit")} · {formatSize(file.size)}</p>
                        </div>
                        <button type="button" onClick={() => setShowUploadPopup(true)}
                          className="p-1.5 bg-[#FFF] rounded-full cursor-pointer" aria-label="Re-upload receipt">
                          <ReuploadIcon className="shrink-0 text-[#656565] hover:text-[#B31B38] max-[500px]:w-[16.5px] w-5 max-[500px]:h-[16.5px] h-5" />
                        </button>
                      </div>
                      {submitError && (
                        <p className="mt-3 text-[13px] text-[#B31B38] text-center">{submitError}</p>
                      )}
                      <Button className="w-full mt-3" onPress={handleSubmit} text={submitting ? t("Submitting") : t("Submit_receipt")} disabled={submitting} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Plan summary — order-1 on mobile (top), right column on desktop */}
            <div className="max-[500px]:order-1 w-full md:max-w-[360px]">
              <PlanSummary {...summaryProps} />
            </div>

            {/* Support card — order-3 on mobile (last), hidden on desktop (desktop sidebar handles it) */}
            <div className="hidden max-[500px]:block max-[500px]:order-3 w-full font-poppins">
              <div className="flex flex-col gap-1.5 py-3 px-4 bg-[#F2F2F2] border border-[#EAEAEA] rounded-[20px]">
                <SupportLinks t={t} />
              </div>
            </div>

          </div>
        </div>
      </main>

      <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileChange} />

      {showUploadPopup && (
        <UploadReceiptPopup
          t={t}
          onClose={() => setShowUploadPopup(false)}
          onFileSelected={(f) => { setShowUploadPopup(false); startUpload(f); }}
          username={username}
        />
      )}
    </>
  );
}
