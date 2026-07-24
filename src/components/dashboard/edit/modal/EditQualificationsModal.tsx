"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import InputBox from "@/components/common-layout/InputBox";
import EditModal from "./EditModal";

type EditQualificationsModalProps = {
  value: string;
  onClose: () => void;
  onSave: (value: string) => void;
};

export default function EditQualificationsModal({ value, onClose, onSave }: EditQualificationsModalProps) {
  const { t } = useLang();
  const [draft, setDraft] = useState(value);

  return (
    <EditModal
      title={t("Edit_qualifications")}
      subtitle={t("Edit_qualifications_subtitle")}
      onClose={onClose}
      onSave={() => onSave(draft)}
      saveText={t("Save_changes")}
      saveDisabled={!draft.trim() || draft === value}
    >
      <div className="mt-4">
        <InputBox compact value={draft} onChange={setDraft} label={t("Qualifications_Placeholder")} />
      </div>
    </EditModal>
  );
}
