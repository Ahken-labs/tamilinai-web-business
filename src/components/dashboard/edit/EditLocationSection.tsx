"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { BackChevronIcon, LocationIcon, PinIcon, RouteIcon } from "@/assets/Icons";
import FormRow from "@/components/common-layout/FormRow";
import InputBox from "@/components/common-layout/InputBox";
import DropdownField from "@/components/common-layout/DropdownField";
import { SRI_LANKA_DISTRICTS } from "@/constants/districts";
import EditModal from "./modal/EditModal";
import { updateBizMe } from "@/lib/api";

type Props = {
  streetAddress: string;
  village: string;
  district: string;
};

function EditAddressModal({
  streetAddress,
  village,
  district,
  onClose,
  onSave,
}: {
  streetAddress: string;
  village: string;
  district: string;
  onClose: () => void;
  onSave: (streetAddress: string, village: string, district: string) => void;
}) {
  const { t } = useLang();
  const [draftStreet, setDraftStreet] = useState(streetAddress);
  const [draftVillage, setDraftVillage] = useState(village);
  const [draftDistrict, setDraftDistrict] = useState(district);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const unchanged = draftStreet === streetAddress && draftVillage === village && draftDistrict === district;

  async function handleSave() {
    if (!draftVillage.trim() || !draftDistrict.trim()) {
      setError(t("Village_required"));
      return;
    }
    setSaving(true);
    try {
      await updateBizMe({ streetAddress: draftStreet, village: draftVillage, district: draftDistrict } as never);
      onSave(draftStreet, draftVillage, draftDistrict);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <EditModal title={t("Edit_address")} onClose={onClose} onSave={handleSave} saveText={saving ? "Saving…" : t("Save_changes")} saveDisabled={saving || unchanged}>
      <div className="mt-4 flex flex-col gap-5">
        <FormRow label={t("Street_address")}>
          <InputBox compact value={draftStreet} onChange={setDraftStreet} label={t("Street_address_Placeholder")} />
        </FormRow>

        <FormRow label={t("Village_City_Town")} required error={error}>
          <InputBox
            compact
            value={draftVillage}
            onChange={(v) => { setDraftVillage(v); setError(""); }}
            label={t("Village_City_Town_Placeholder")}
          />
        </FormRow>

        <FormRow label={t("District")} required>
          <DropdownField
            placeholder={t("Select_a_district")}
            value={draftDistrict}
            open={districtOpen}
            setOpen={setDistrictOpen}
            onSelect={setDraftDistrict}
            items={SRI_LANKA_DISTRICTS}
          />
        </FormRow>
      </div>
    </EditModal>
  );
}

export default function EditLocationSection({ streetAddress: initStreet, village: initVillage, district: initDistrict }: Props) {
  const { t } = useLang();

  const [streetAddress, setStreetAddress] = useState(initStreet);
  const [village, setVillage] = useState(initVillage);
  const [district, setDistrict] = useState(initDistrict);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="px-4">
      <div className="max-w-[640px] mx-auto">
        <div className="max-[500px]:mt-5 mt-10 mb-5 border-t border-[#EAEAEA]" />

        <button
          type="button"
          onClick={() => setEditOpen(true)}
          className="flex w-full items-center justify-between cursor-pointer"
        >
          <h2 className="font-poppins max-[500px]:text-[16px] text-[20px] font-semibold leading-[150%] text-[#767676]">{t("Location")}</h2>
          <BackChevronIcon className="w-[14px] h-[14px] shrink-0 rotate-180" stroke="#525252" />
        </button>

        <div className="mt-3 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-2 rounded-[8px] min-[500px]:py-3 min-[500px]:px-4 min-[500px]:bg-[#F2F2F2] max-[500px]:gap-2 gap-3 cursor-pointer text-left"
          >
            <RouteIcon className="max-[500px]:w-6 w-8 max-[500px]:h-6 h-8 shrink-0" />
            <div className="min-w-0">
              <p className="font-poppins max-[500px]:text-[16px] text-[20px] font-medium leading-[150%] text-[#222]">{t("Street_address")}</p>
              <p className="truncate font-poppins max-[500px]:text-[14px] text-[16px] leading-[150%] text-[#222]">{streetAddress}</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-2 rounded-[8px] min-[500px]:py-3 min-[500px]:px-4 min-[500px]:bg-[#F2F2F2] max-[500px]:gap-2 gap-3 cursor-pointer text-left"
          >
            <PinIcon className="max-[500px]:w-6 w-8 max-[500px]:h-6 h-8 shrink-0" />
            <div className="min-w-0">
              <p className="font-poppins max-[500px]:text-[16px] text-[20px] font-medium leading-[150%] text-[#222]">{t("Village_City_Town")}</p>
              <p className="truncate font-poppins max-[500px]:text-[14px] text-[16px] leading-[150%] text-[#222]">{village}</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-2 rounded-[8px] min-[500px]:py-3 min-[500px]:px-4 min-[500px]:bg-[#F2F2F2] max-[500px]:gap-2 gap-3 cursor-pointer text-left"
          >
            <LocationIcon className="max-[500px]:w-6 w-8 max-[500px]:h-6 h-8 shrink-0" />
            <div className="min-w-0">
              <p className="font-poppins max-[500px]:text-[16px] text-[20px] font-medium leading-[150%] text-[#222]">{t("District")}</p>
              <p className="truncate font-poppins max-[500px]:text-[14px] text-[16px] leading-[150%] text-[#222]">{district}</p>
            </div>
          </button>
        </div>

        {editOpen && (
          <EditAddressModal
            streetAddress={streetAddress}
            village={village}
            district={district}
            onClose={() => setEditOpen(false)}
            onSave={(s, v, d) => { setStreetAddress(s); setVillage(v); setDistrict(d); setEditOpen(false); }}
          />
        )}
      </div>
    </div>
  );
}
