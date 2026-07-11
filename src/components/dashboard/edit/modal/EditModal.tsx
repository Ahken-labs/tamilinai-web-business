"use client";

import { createPortal } from "react-dom";
import { useScrollLock } from "@/hooks/useScrollLock";
import { XIcon } from "@/assets/Icons";
import Button from "@/components/common-layout/Button";

type EditModalProps = {
  title?: string;
  subtitle?: string;
  onClose: () => void;
  onSave: () => void;
  saveText: string;
  saveDisabled?: boolean;
  children: React.ReactNode;
};

export default function EditModal({ title, subtitle, onClose, onSave, saveText, saveDisabled, children }: EditModalProps) {
  useScrollLock(true);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end min-[500px]:items-center justify-center min-[500px]:p-4 bg-black/60">
      <div className="flex h-[96dvh] max-h-[96dvh] min-[500px]:h-[75dvh] min-[500px]:max-h-[85vh] w-full min-[500px]:max-w-[640px] flex-col overflow-hidden rounded-t-[32px] min-[500px]:rounded-[32px] bg-white shadow-2xl">
        <div className="shrink-0 w-full flex justify-end max-[500px]:px-1 px-2 max-[500px]:pt-2 pt-4 min-[500px]:pb-4">
          <button type="button" onClick={onClose} className="cursor-pointer p-2 shrink-0" aria-label="Close">
            <XIcon className="max-[500px]:h-6 h-8 max-[500px]:w-6 w-8" stroke="#222222" />
          </button>
        </div>

        <div className="no-scrollbar flex-1 overflow-y-auto max-[500px]:px-4 px-5 pt-2 pb-4">
          <div className="">
            <h2 className="font-poppins text-[20px] font-semibold leading-[135%] text-[#222]">{title}</h2>
            {subtitle && <p className="mt-2 font-poppins max-[500px]:text-[14px] text-[16px] leading-[150%] text-[#222222]">{subtitle}</p>}
          </div>

          <div className="">{children}</div>
        </div>

        <div className="shrink-0 border-t border-[#D8D8D8] max-[500px]:px-4 px-6 py-3 min-[500px]:flex">
          <div className="max-[500px]:hidden flex-1"/>
          <Button text={saveText} onPress={onSave} disabled={saveDisabled} className="max-[500px]:w-full" />
        </div>
      </div>
    </div>,
    document.body
  );
}
