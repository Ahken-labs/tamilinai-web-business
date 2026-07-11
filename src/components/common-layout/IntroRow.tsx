import { BackChevronIcon, PlusIcon } from "@/assets/Icons";

export function IntroRow({
  icon,
  title,
  value,
  placeholder,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  placeholder?: string;
  onClick?: () => void;
}) {
  const isEmpty = !value;

  return (
    <button type="button" onClick={onClick} className="rounded-[8px] min-[500px]:py-3 min-[500px]:px-4 min-[500px]:bg-[#F2F2F2] flex w-full items-center justify-between max-[500px]:gap-2 gap-3 cursor-pointer text-left">
      <div className="flex items-center gap-2 min-w-0">
        <div className="max-[500px]:w-6 w-8 max-[500px]:h-6 h-8 shrink-0">{icon}</div>
        <div className="min-w-0">
          <p className="font-poppins max-[500px]:text-[16px] text-[20px] font-medium leading-[150%] text-[#222]">{title}</p>
          {!isEmpty && (
            <p className="truncate font-poppins max-[500px]:text-[14px] text-[16px] leading-[150%] text-[#222]">{value}</p>
          )}
          {isEmpty && placeholder && (
            <p className="font-poppins max-[500px]:text-[14px] text-[16px] leading-[150%] text-[#767676]">{placeholder}</p>
          )}
        </div>
      </div>

      {isEmpty && placeholder ? (
        <PlusIcon className="w-4 h-4 shrink-0" stroke="#B31B38" />
      ) : (
        <BackChevronIcon className="w-[14px] h-[14px] shrink-0 rotate-180" stroke="#525252" />
      )}
    </button>
  );
}
