"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import DropdownField from "@/components/common-layout/DropdownField";
import { EXPERIENCE_OPTIONS } from "@/constants/experience";
import EditModal from "./EditModal";

type EditExperienceModalProps = {
  value: string;
  onClose: () => void;
  onSave: (value: string) => void;
};

export default function EditExperienceModal({ value, onClose, onSave }: EditExperienceModalProps) {
  const { t } = useLang();
  const [draft, setDraft] = useState(value);
  const [open, setOpen] = useState(false);

  return (
    <EditModal title={t("Edit_experience")} onClose={onClose} onSave={() => onSave(draft)} saveText={t("Save_changes")} saveDisabled={!draft}>
      <div className="mt-4">
        <DropdownField
          placeholder={t("Select_ellipsis")}
          value={draft}
          open={open}
          setOpen={setOpen}
          onSelect={setDraft}
          items={EXPERIENCE_OPTIONS}
        />
      </div>
    </EditModal>
  );
}
