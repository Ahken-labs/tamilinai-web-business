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

// Dummy data until this reads/writes the backend — remove once wired up.
const DUMMY_DATA = {
  businessName: "Ahken Bridal Studio northern",
  bio: "",
  countryCode: "Sri Lanka (+94)",
  phone: "75 020 7507",
  experience: "2 years",
  qualifications: "Certified cosmetologist",
  careerHighlight: "Award-winning photographer, or 500+ weddings hosted",
};

type ActiveModal = "businessName" | "bio" | "whatsapp" | "experience" | "qualifications" | "careerHighlight" | null;


export default function EditIntroSection() {
  const { t } = useLang();

  const [businessName, setBusinessName] = useState(DUMMY_DATA.businessName);
  const [bio, setBio] = useState(DUMMY_DATA.bio);
  const [countryCode, setCountryCode] = useState(DUMMY_DATA.countryCode);
  const [phone, setPhone] = useState(DUMMY_DATA.phone);
  const [experience, setExperience] = useState(DUMMY_DATA.experience);
  const [qualifications, setQualifications] = useState(DUMMY_DATA.qualifications);
  const [careerHighlight, setCareerHighlight] = useState(DUMMY_DATA.careerHighlight);

  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const closeModal = () => setActiveModal(null);

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
          value={`${countryCode.match(/\+\d+/)?.[0] ?? ""} ${phone}`}
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
          onSave={(v) => { setBusinessName(v); closeModal(); }}
        />
      )}

      {activeModal === "bio" && (
        <EditBioModal
          value={bio}
          onClose={closeModal}
          onSave={(v) => { setBio(v); closeModal(); }}
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
          onSave={(v) => { setExperience(v); closeModal(); }}
        />
      )}

      {activeModal === "qualifications" && (
        <EditQualificationsModal
          value={qualifications}
          onClose={closeModal}
          onSave={(v) => { setQualifications(v); closeModal(); }}
        />
      )}

      {activeModal === "careerHighlight" && (
        <EditCareerHighlightModal
          value={careerHighlight}
          onClose={closeModal}
          onSave={(v) => { setCareerHighlight(v); closeModal(); }}
        />
      )}
      </div>
    </div>
  );
}
