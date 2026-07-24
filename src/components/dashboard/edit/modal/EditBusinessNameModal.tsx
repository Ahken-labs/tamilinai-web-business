"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import InputBox from "@/components/common-layout/InputBox";
import EditModal from "./EditModal";

type EditBusinessNameModalProps = {
  value: string;
  onClose: () => void;
  onSave: (value: string) => void;
};

export default function EditBusinessNameModal({ value, onClose, onSave }: EditBusinessNameModalProps) {
  const { t } = useLang();
  const [draft, setDraft] = useState(value);

  return (
    <EditModal title={t("Edit_business_name")} onClose={onClose} onSave={() => onSave(draft)} saveText={t("Save_changes")} saveDisabled={!draft.trim()}>
      <div className="mt-2">
        <InputBox compact value={draft} onChange={setDraft} label={t("Business_Name_Placeholder")} />
      </div>
    </EditModal>
  );
}
