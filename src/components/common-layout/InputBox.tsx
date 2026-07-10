"use client";

import { ReactNode, useState, useId } from "react";

interface InputBoxProps {
  value: string;
  onChange: (val: string) => void;
  label: string;
  type?: string;
  error?: string;
  className?: string;
  suffix?: ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
  compact?: boolean;
  multiline?: boolean;
}

export default function InputBox({
  value,
  onChange,
  label,
  type = "text",
  error,
  className,
  suffix,
  onFocus,
  onBlur,
  compact = false,
  multiline = false,
}: InputBoxProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);

  const isActive = focused || value.length > 0;

  function autoGrow(el: HTMLTextAreaElement | null) {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  if (compact && multiline) {
    return (
      <div className="flex flex-col w-full">
        <div
          className={`flex min-h-[40px] sm:min-h-[44px] md:min-h-[48px] items-start rounded-[12px] border bg-[#F2F2F2] py-2 pl-2 sm:pl-3 pr-4 transition-colors
            ${focused ? "border-[#F2F2F2]" : "border-[#F2F2F2]"} ${className ?? ""}`}
        >
          <textarea
            id={id}
            value={value}
            placeholder={label}
            aria-label={label}
            rows={1}
            ref={autoGrow}
            onInput={(e) => autoGrow(e.currentTarget)}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => { setFocused(true); onFocus?.(); }}
            onBlur={() => { setFocused(false); onBlur?.(); }}
            className="w-full resize-none overflow-hidden bg-transparent lang-ta:text-[14px] text-[16px] leading-[150%] outline-none placeholder:text-[#656565] text-[#222]"
          />
          {suffix && <div className="shrink-0 ml-2 flex items-center">{suffix}</div>}
        </div>
        {error && <p className="mt-2 text-[14px] text-[#B31B38]">{error}</p>}
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex flex-col w-full">
        <div
          className={`flex h-[40px] sm:h-[44px] md:h-[48px] items-center rounded-[12px] border bg-[#F2F2F2] pl-2 sm:pl-3 pr-4 transition-colors
            ${focused ? "border-[#F2F2F2]" : "border-[#F2F2F2]"} ${className ?? ""}`}
        >
          <input
            id={id}
            type={type}
            value={value}
            placeholder={label}
            aria-label={label}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => { setFocused(true); onFocus?.(); }}
            onBlur={() => { setFocused(false); onBlur?.(); }}
            className="w-full bg-transparent lang-ta:text-[14px] text-[16px] outline-none placeholder:text-[#656565] text-[#222]"
          />
          {suffix && <div className="shrink-0 ml-2 flex items-center">{suffix}</div>}
        </div>
        {error && <p className="mt-2 text-[14px] text-[#B31B38]">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div
        className={`relative flex max-[500px]:h-[52px] h-[55px] md:h-[60px] items-center rounded-xl border px-4 transition-colors
          ${focused ? "border-[#B31B38]" : "border-[#8C8C8C]"} ${className ?? ""}`}
      >
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-300 ease-in-out pointer-events-none select-none
            ${isActive
              ? "top-2 text-[12px] text-[#525252]"
              : "top-1/2 -translate-y-1/2 text-[14px] md:text-[16px] text-[#525252]"
            }`}
        >
          {label}
        </label>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => { setFocused(true); onFocus?.(); }}
          onBlur={() => { setFocused(false); onBlur?.(); }}
          className="w-full bg-transparent lang-ta:text-[14px] text-[16px] text-[#222222] outline-none pt-4"
        />
        {suffix && <div className="shrink-0 ml-2 flex items-center">{suffix}</div>}
      </div>
      {error && <p className="mt-0.5 text-[14px] text-[#B31B38]">{error}</p>}
    </div>
  );
}
