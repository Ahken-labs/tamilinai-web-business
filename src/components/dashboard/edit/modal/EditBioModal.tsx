"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import EditModal from "./EditModal";

const BIO_MAX_LENGTH = 300;

function nonSpaceLength(s: string) {
  return s.replace(/\s/g, "").length;
}

type EditBioModalProps = {
  value: string;
  onClose: () => void;
  onSave: (value: string) => void;
};

export default function EditBioModal({ value, onClose, onSave }: EditBioModalProps) {
  const { t } = useLang();
  const [draft, setDraft] = useState(value);

  return (
    <EditModal
      title={t("Write_a_short_bio")}
      subtitle={t("Write_a_short_bio_subtitle")}
      onClose={onClose}
      onSave={() => onSave(draft)}
      saveText={t("Save_changes")}
      saveDisabled={!draft.trim()}
    >
      <div className="rounded-[12px] bg-[#F2F2F2] mt-4 px-2 py-3">
        <textarea
          value={draft}
          onChange={(e) => { const v = e.target.value; if (nonSpaceLength(v) <= BIO_MAX_LENGTH) setDraft(v); }}
          placeholder={t("Bio_Placeholder")}
          rows={4}
          className="w-full resize-none bg-transparent font-poppins text-[16px] leading-[150%] text-[#222] outline-none placeholder:text-[#656565]"
        />
      </div>
      <p className="mt-1 leading-[150%] text-right font-poppins text-[14px] text-[#767676]">
        ({nonSpaceLength(draft)} / {BIO_MAX_LENGTH})
      </p>
    </EditModal>
  );
}
