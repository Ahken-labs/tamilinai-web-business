type FormRowProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
  className?: string;
  leftWidth?: string;
};

export default function FormRow({
  label,
  required,
  children,
  error,
  className = "",
  leftWidth = "max-[360px]:w-[280px] w-full",
}: FormRowProps) {
  return (
    <div className={`flex w-full flex-col ${className}`}>
      <span className={`${leftWidth} lang-ta:text-[14px] text-[16px] text-dark leading-[150%]`}>
        {label}
        {required && <span className="text-[#B31B38] ml-0.5">*</span>}
      </span>

      <div className="mt-1.5">{children}</div>

      {error && <p className="mt-1.5 lang-ta:text-[12px] text-[14px] text-[#B31B38]">{error}</p>}
    </div>
  );
}
