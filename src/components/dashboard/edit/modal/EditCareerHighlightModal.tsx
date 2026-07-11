"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import InputBox from "@/components/common-layout/InputBox";
import EditModal from "./EditModal";

type EditCareerHighlightModalProps = {
  value: string;
  onClose: () => void;
  onSave: (value: string) => void;
};

export default function EditCareerHighlightModal({ value, onClose, onSave }: EditCareerHighlightModalProps) {
  const { t } = useLang();
  const [draft, setDraft] = useState(value);

  return (
    <EditModal
      title={t("Edit_career_highlight")}
      subtitle={t("Edit_career_highlight_subtitle")}
      onClose={onClose}
      onSave={() => onSave(draft)}
      saveText={t("Save_changes")}
    >
      <div className="mt-4">
        <InputBox compact value={draft} onChange={setDraft} label={t("Career_highlight_Placeholder")} />
      </div>
    </EditModal>
  );
}
