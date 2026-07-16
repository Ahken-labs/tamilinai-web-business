"use client";

import { useLang } from "@/context/LangContext";
import Modal from "@/components/ui/Modal";
import { DeleteIcon } from "@/assets/Icons";
import Button from "../common-layout/Button";

type DeleteServiceConfirmModalProps = {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  deleting?: boolean;
};

export default function DeleteServiceConfirmModal({ title, onClose, onConfirm, deleting }: DeleteServiceConfirmModalProps) {
  const { t } = useLang();

  const deleteButton = (
    <button
      type="button"
      onClick={onConfirm}
      disabled={deleting}
      className={`w-full min-[500px]:w-auto min-[500px]:px-8 rounded-full py-3 font-poppins text-[16px] font-semibold transition-all duration-150 ${deleting
        ? "cursor-not-allowed bg-[#525252] text-white uploading-shimmer"
        : "cursor-pointer bg-[#F0F0F0] text-[#B31B38] hover:bg-[#E6E6E6] active:scale-[0.98]"
        }`}
    >
      {deleting ? t("Deleting") : t("Delete")}
    </button>
  );
  const cancelButton = (
    <Button
      className="w-full min-[500px]:w-auto"
      text={t("Cancel")} onPress={onClose} disabled={deleting} />
  );

  return (
    <Modal
      title=""
      onClose={onClose}
      closeSide="right"
      footerClassName="max-[500px]:hidden"
      footer={
        <div className="flex w-full justify-between gap-3">
          {deleteButton}
          {cancelButton}
        </div>
      }
    >
      <div className="-mt-3">
        <DeleteIcon className="w-12 h-12" stroke="#8D5900" />

        <h2 className="max-[500px]:mt-3 mt-4 font-poppins text-[20px] font-semibold leading-[135%] text-[#222222]">
          {t("Delete_service_title")}
        </h2>
        <p className="mt-3 font-poppins text-[14px] sm:text-[15px] md:text-[16px] leading-[150%] text-[#222222]">
          {t("Delete_service_desc").replace("[Service Title]", title || t("Service_title"))}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 min-[500px]:hidden">
          {deleteButton}
          {cancelButton}
        </div>
      </div>
    </Modal>
  );
}
