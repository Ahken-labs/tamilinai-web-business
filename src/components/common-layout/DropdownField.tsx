"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronIcon } from "../../assets/Icons";

type DropdownFieldProps = {
  value?: string;
  placeholder: string;
  open: boolean;
  setOpen: (val: boolean) => void;
  onSelect: (value: string) => void;
  items: string[];
  className?: string;
  dropdownClassName?: string;
  itemClassName?: string;
  maxHeight?: string;
  borderClassName?: string;
  openBorderClassName?: string;
  bgClassName?: string;
  textClassName?: string;
  typeable?: boolean; // true = input + dropdown
  numberOnly?: boolean; // strip non-numeric characters on input
};

export default function DropdownField({
  value,
  placeholder,
  open,
  setOpen,
  onSelect,
  items,
  className = "",
  dropdownClassName = "",
  itemClassName = "",
  maxHeight = "240px",
  borderClassName,
  openBorderClassName,
  bgClassName = "bg-[#F2F2F2]",
  textClassName,
  typeable = false,
  numberOnly = false,
}: DropdownFieldProps) {
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = focused || open || (value?.length ?? 0) > 0;
  // True when user has typed a partial query that isn't an exact match in the list.
  const isFiltering = !!value && !items.includes(value);

  const borderClass = open
    ? (openBorderClassName ?? borderClassName ?? "border-[#F2F2F2]")
    : (borderClassName ?? "border-[#F2F2F2]");

  // Close when user clicks outside this component.
  useEffect(() => {
    if (!open) return;
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open, setOpen]);

  // Enter: confirm the first suggestion in the filtered list.
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && filteredItems.length > 0) {
      e.preventDefault();
      onSelect(filteredItems[0]);
      setOpen(false);
      setFocused(false);
    }
  }

  // Blur: auto-complete when exactly one match remains (unambiguous).
  function handleBlur() {
    setFocused(false);
    if (
      value &&
      !filteredItems.includes(value) &&
      filteredItems.length === 1
    ) {
      onSelect(filteredItems[0]);
    }
    setOpen(false);
  }

  const filteredItems = isFiltering
    ? [...items]
      .filter((item) =>
        item.toLowerCase().includes((value ?? "").toLowerCase())
      )
      .sort((a, b) => {
        const q = (value ?? "").toLowerCase();
        const aStarts = a.toLowerCase().startsWith(q);
        const bStarts = b.toLowerCase().startsWith(q);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.localeCompare(b);
      })
    : items;
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {typeable ? (
        <div
          className={`flex h-[40px] sm:h-[44px] md:h-[48px] items-center rounded-[12px] border ${bgClassName} px-4 transition-colors ${borderClass}`}
        >
          <div className="relative flex w-full items-center">
            <label
              className={`absolute left-0 border transition-all duration-300 ease-in-out pointer-events-none select-none ${isActive
                ? "top-[-2px] text-[14px] text-[#525252]"
                : "top-1/2 -translate-y-1/2 text-[16px] text-[#525252]"
                }`}
            >
              {placeholder}
            </label>
            <input
              value={value ?? ""}
              onFocus={() => { setFocused(true); setOpen(true); }}
              onBlur={handleBlur}
              onChange={(e) => { const v = numberOnly ? e.target.value.replace(/\D/g, "") : e.target.value; onSelect(v); setOpen(true); }}
              onKeyDown={handleKeyDown}
              className={`w-full bg-transparent pt-4 text-[16px] outline-none ${textClassName ?? "text-[#222222]"}`}
            />
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="shrink-0 cursor-pointer pl-2 focus:outline-none"
            >
              <ChevronIcon open={open} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={`h-[40px] sm:h-[44px] md:h-[48px] flex w-full items-center justify-between rounded-[12px] border ${bgClassName} pl-2 sm:pl-3 pr-[10px] py-[10px] text-left transition-colors cursor-pointer focus:outline-none ${borderClass} ${className}`}
        >
          <span className={`font-poppins text-[16px] font-normal leading-[125%] ${textClassName ?? (value ? "text-[#222222]" : "text-[#656565]")}`}>
            {value || placeholder}
          </span>
          <ChevronIcon className="w-4 h-4" open={open} />
        </button>
      )}

      {open && (
        <div
          onMouseDown={(e) => e.preventDefault()}
          className={`absolute left-0 right-0 top-[calc(100%+4px)] z-30 overflow-y-auto rounded-xl border border-[#E0E0E0] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.1)] ${dropdownClassName}`}
          style={{ maxHeight }}
        >
          {filteredItems.length === 0 ? (
            <p className="px-4 py-3 font-poppins text-[14px] text-center text-[#999]">No results</p>
          ) : filteredItems.map((item, index) => {
            const isSelected = item === value;
            const isSuggested = isFiltering && index === 0;

            return (
              <button
                key={item}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onSelect(item);
                  setOpen(false);
                  setFocused(false);
                }}
                className={`flex w-full items-center px-4 py-2 md:py-3 text-left font-poppins text-[16px] transition-colors ${isSelected
                  ? "bg-[#FFF0F3] text-[#B31B38]"
                  : isSuggested
                    ? "bg-[#FFF8F9] text-[#222222] font-medium"
                    : "text-[#222222] hover:bg-[#EAEAEA] hover:text-[#222222]"
                  } ${itemClassName}`}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
