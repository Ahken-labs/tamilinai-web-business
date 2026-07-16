"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import {
  BioIcon,
  BusinessNameIcon,
  CareerIcon,
  ClockIcon,
  QualificationIcon,
  WhatsAppRowIcon,
} from "@/assets/Icons";
import EditBusinessNameModal from "./modal/EditBusinessNameModal";
import EditBioModal from "./modal/EditBioModal";
import EditWhatsAppModal from "./modal/EditWhatsAppModal";
import EditExperienceModal from "./modal/EditExperienceModal";
import EditQualificationsModal from "./modal/EditQualificationsModal";
import EditCareerHighlightModal from "./modal/EditCareerHighlightModal";
import { IntroRow } from "@/components/common-layout/IntroRow";
import { updateBizMe } from "@/lib/api";

type Props = {
  businessName: string;
  bio: string;
  countryCode: string;
  phone: string;
  experience: string;
  qualifications: string;
  careerHighlight: string;
};

type ActiveModal = "businessName" | "bio" | "whatsapp" | "experience" | "qualifications" | "careerHighlight" | null;

export default function EditIntroSection({ businessName: initName, bio: initBio, countryCode: initCC, phone: initPhone, experience: initExp, qualifications: initQual, careerHighlight: initCareer }: Props) {
  const { t } = useLang();

  const [businessName, setBusinessName] = useState(initName);
  const [bio, setBio] = useState(initBio);
  const [countryCode, setCountryCode] = useState(initCC);
  const [phone, setPhone] = useState(initPhone);
  const [experience, setExperience] = useState(initExp);
  const [qualifications, setQualifications] = useState(initQual);
  const [careerHighlight, setCareerHighlight] = useState(initCareer);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const closeModal = () => setActiveModal(null);

  async function saveField(field: string, value: unknown) {
    await updateBizMe({ [field]: value } as never);
  }

  return (
    <div className="px-4 max-[500px]:mt-[66px] mt-[124px]">
      <div className="max-w-[640px] mx-auto">
        <h2 className="font-poppins max-[500px]:text-[16px] text-[20px] font-semibold leading-[150%] text-[#767676]">{t("Intro")}</h2>
        <div className="mt-3 flex flex-col gap-3">
          <IntroRow
            icon={<BusinessNameIcon className="w-6 h-6" />}
            title={t("Business_Name")}
            value={businessName}
            onClick={() => setActiveModal("businessName")}
          />
          <IntroRow
            icon={<BioIcon className="w-6 h-6" />}
            title={t("Bio")}
            value={bio}
            placeholder={t("Add_a_bio")}
            onClick={() => setActiveModal("bio")}
          />
          <IntroRow
            icon={<WhatsAppRowIcon className="w-6 h-6" />}
            title={t("WhatsApp_number")}
            value={`${countryCode} ${phone}`}
            onClick={() => setActiveModal("whatsapp")}
          />
        </div>

        <div className="max-[500px]:mt-5 mt-10 mb-5 border-t border-[#EAEAEA]" />

        <h2 className="font-poppins max-[500px]:text-[16px] text-[20px] font-semibold leading-[150%] text-[#767676]">{t("Qualifications")}</h2>
        <div className="mt-3 flex flex-col gap-3">
          <IntroRow
            icon={<ClockIcon className="w-6 h-6" />}
            title={t("Experience")}
            value={experience}
            onClick={() => setActiveModal("experience")}
          />
          <IntroRow
            icon={<QualificationIcon className="w-6 h-6" />}
            title={t("Qualifications_or_Training")}
            placeholder={t("Add_your_qualifications")}
            value={qualifications}
            onClick={() => setActiveModal("qualifications")}
          />
          <IntroRow
            icon={<CareerIcon className="w-6 h-6" />}
            title={t("Career_highlight")}
            placeholder={t("Add_your_career_highlight")}
            value={careerHighlight}
            onClick={() => setActiveModal("careerHighlight")}
          />
        </div>

        {activeModal === "businessName" && (
          <EditBusinessNameModal
            value={businessName}
            onClose={closeModal}
            onSave={async (v) => { await saveField("businessName", v); setBusinessName(v); closeModal(); }}
          />
        )}

        {activeModal === "bio" && (
          <EditBioModal
            value={bio}
            onClose={closeModal}
            onSave={async (v) => { await saveField("bio", v); setBio(v); closeModal(); }}
          />
        )}

        {activeModal === "whatsapp" && (
          <EditWhatsAppModal
            countryCode={countryCode}
            phone={phone}
            onClose={closeModal}
            onSave={(cc, p) => { setCountryCode(cc); setPhone(p); closeModal(); }}
          />
        )}

        {activeModal === "experience" && (
          <EditExperienceModal
            value={experience}
            onClose={closeModal}
            onSave={async (v) => { await saveField("experience", v); setExperience(v); closeModal(); }}
          />
        )}

        {activeModal === "qualifications" && (
          <EditQualificationsModal
            value={qualifications}
            onClose={closeModal}
            onSave={async (v) => { await saveField("qualifications", v); setQualifications(v); closeModal(); }}
          />
        )}

        {activeModal === "careerHighlight" && (
          <EditCareerHighlightModal
            value={careerHighlight}
            onClose={closeModal}
            onSave={async (v) => { await saveField("careerHighlight", v); setCareerHighlight(v); closeModal(); }}
          />
        )}
      </div>
    </div>
  );
}
