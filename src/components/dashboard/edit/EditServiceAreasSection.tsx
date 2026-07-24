"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { BackChevronIcon, CheckIcon, ServiceAreaIcon } from "@/assets/Icons";
import Toggle from "@/components/ui/Toggle";
import { SRI_LANKA_DISTRICTS } from "@/constants/districts";
import EditModal from "./modal/EditModal";
import { updateBizMe } from "@/lib/api";

type Props = {
  serviceDistricts: string[];
  islandWide: boolean;
};

function EditServiceAreasModal({
  districts,
  onClose,
  onSave,
}: {
  districts: string[];
  onClose: () => void;
  onSave: (districts: string[], islandWide: boolean) => void;
}) {
  const { t } = useLang();
  const [selected, setSelected] = useState<string[]>(districts);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const islandWide = selected.length === SRI_LANKA_DISTRICTS.length;
  const unchanged = selected.length === districts.length && selected.every((d) => districts.includes(d));

  function toggleDistrict(district: string) {
    setSelected((prev) =>
      prev.includes(district) ? prev.filter((d) => d !== district) : [...prev, district]
    );
    setError("");
  }

  function handleIslandWideChange(checked: boolean) {
    setSelected(checked ? [...SRI_LANKA_DISTRICTS] : []);
    setError("");
  }

  async function handleSave() {
    if (selected.length === 0) {
      setError(t("Please_select_a_district_or_island_wide"));
      return;
    }
    setSaving(true);
    try {
      await updateBizMe({ serviceDistricts: selected, islandWide } as never);
      onSave(selected, islandWide);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <EditModal title={t("Edit_service_areas")} subtitle={t("Service_areas_description")} onClose={onClose} onSave={handleSave} saveText={saving ? "Saving…" : t("Save_changes")} saveDisabled={saving || selected.length === 0 || unchanged}>
      <div className="mt-4 flex flex-col gap-8">
        <label className="flex items-center gap-3 rounded-[12px] bg-[#F2F2F2] px-4 py-3 cursor-pointer">
          <Toggle checked={islandWide} onChange={handleIslandWideChange} />
          <span className="font-poppins text-[16px] font-normal leading-[135%] text-[#222222]">
            {t("Island_wide_toggle")}
          </span>
        </label>

        <div className="flex justify-center flex-wrap gap-2.5">
          {SRI_LANKA_DISTRICTS.map((district) => {
            const isSelected = selected.includes(district);
            return (
              <button
                key={district}
                type="button"
                onClick={() => toggleDistrict(district)}
                className={`flex items-center gap-[2px] rounded-[48px] px-4 py-[7px] font-poppins text-[16px] font-normal leading-[150%] transition-colors duration-150 cursor-pointer ${
                  isSelected
                    ? "border border-[rgba(179,27,56,0.25)] bg-[#FFF0F3] text-[#B31B38]"
                    : "bg-[#F2F2F2] text-[#222222]"
                }`}
              >
                {isSelected && <CheckIcon />}
                {district}
              </button>
            );
          })}
        </div>

        {error && <p className="font-poppins text-[14px] text-[#B31B38]">{error}</p>}
      </div>
    </EditModal>
  );
}

export default function EditServiceAreasSection({ serviceDistricts: initDistricts, islandWide: initIslandWide }: Props) {
  const { t } = useLang();

  const [districts, setDistricts] = useState<string[]>(initDistricts);
  const [islandWide, setIslandWide] = useState(initIslandWide);
  const [editOpen, setEditOpen] = useState(false);

  const displayIslandWide = districts.length === SRI_LANKA_DISTRICTS.length || islandWide;

  return (
    <div className="px-4 pb-10">
      <div className="max-w-[640px] mx-auto">
        <div className="max-[500px]:mt-5 mt-10 mb-5 border-t border-[#EAEAEA]" />

        <h2 className="font-poppins max-[500px]:text-[16px] text-[20px] font-semibold leading-[150%] text-[#767676]">{t("Areas_covered")}</h2>

        <button
          type="button"
          onClick={() => setEditOpen(true)}
          className="mt-3 rounded-[8px] min-[500px]:py-3 min-[500px]:px-4 min-[500px]:bg-[#F2F2F2] flex w-full items-center justify-between cursor-pointer text-left"
        >
          <div className="flex items-center max-[500px]:gap-2 gap-3 min-w-0">
            <ServiceAreaIcon className="max-[500px]:w-6 w-8 max-[500px]:h-6 h-8 shrink-0" />
            <div className="min-w-0">
              <p className="font-poppins max-[500px]:text-[16px] text-[20px] font-medium leading-[150%] text-[#222]">{t("Service_areas")}</p>
              <p className="font-poppins max-[500px]:text-[14px] text-[16px] leading-[150%] text-[#222]">
                {displayIslandWide ? t("Island_wide") : districts.join(", ")}
              </p>
            </div>
          </div>
          <BackChevronIcon className="w-[14px] h-[14px] shrink-0 rotate-180" stroke="#525252" />
        </button>

        {editOpen && (
          <EditServiceAreasModal
            districts={districts}
            onClose={() => setEditOpen(false)}
            onSave={(d, iw) => { setDistricts(d); setIslandWide(iw); setEditOpen(false); }}
          />
        )}
      </div>
    </div>
  );
}
