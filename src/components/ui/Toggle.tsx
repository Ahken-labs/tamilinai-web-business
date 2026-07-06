"use client";

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

export default function Toggle({ checked, onChange, className = "" }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
        checked ? "bg-[#B31B38]" : "bg-[#8C8C8C]"
      } ${className}`}
    >
      <span
        className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200 ${
          checked ? "translate-x-[22px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}
