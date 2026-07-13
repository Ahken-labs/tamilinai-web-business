"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";
import { PlusIcon } from "@/assets/Icons";
import AddServiceModal, { NewService } from "@/components/storefront/AddServiceModal";
import { formatThousands } from "@/utils/format";
import { createBizService } from "@/lib/api";

type Service = NewService & { id: string };

export default function YourServicesPage() {
  const { t } = useLang();
  const router = useRouter();

  const [services, setServices] = useState<Service[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    history.pushState(null, "", window.location.href);
    const handlePop = () => history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);
  const [saveError, setSaveError] = useState("");

  async function handleSave(service: NewService) {
    setSaving(true);
    setSaveError("");
    try {
      const fd = new FormData();
      fd.append("title", service.title);
      fd.append("price", service.price);
      fd.append("description", service.description);
      for (let i = 0; i < service.photos.length; i++) {
        const blob = await fetch(service.photos[i]).then((r) => r.blob());
        fd.append("photos", blob, `photo_${i}.jpg`);
      }
      const res = await createBizService(fd);
      setServices((prev) => [...prev, { ...service, id: res.id }]);
      setModalOpen(false);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save service.");
    } finally {
      setSaving(false);
    }
  }

  function handleFinish() {
    router.push("/dashboard");
  }

  return (
    <div className="font-poppins flex flex-col px-5 py-4 sm:w-[640px] mx-auto">
      <h1 className="mx-auto text-center font-48 font-semibold leading-[120%] text-[#000]">
        {t("Your_services")}
      </h1>

      <p className="mx-auto max-w-[560px] mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-center font-20 leading-[150%] text-[#525252]">
        {t("Your_services_description")}
      </p>

      <div className="mt-8 sm:mt-9 md:mt-10 lg:mt-12 flex flex-col gap-4 md:gap-5">
        {services.map((service) => (
          <div key={service.id} className="flex items-center gap-4 sm:rounded-[32px] rounded-[16px] border border-[#F4F4F4] p-2 sm:p-3 md:p-4 lg:p-5 shadow-[0_0_8px_0_rgba(0,0,0,0.08)]">
            {/* eslint-disable-next-line @next/next/no-img-element -- blob: preview URL */}
            <img src={service.photos[0]} alt="" className="h-14 sm:h-15 md:h-16 w-14 sm:w-15 md:w-16 shrink-0 rounded-[12px] object-cover" />
            <div className="min-w-0">
              <p className="truncate font-poppins font-20 font-semibold text-[#222222]">{service.title}</p>
              <p className="truncate font-poppins font-16 text-[#525252]">Rs {formatThousands(service.price)} {t("Rs_total")}</p>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-4 sm:rounded-[32px] rounded-[16px] border border-[#F4F4F4] p-2 sm:p-3 md:p-4 lg:p-5 cursor-pointer shadow-[0_0_8px_0_rgba(0,0,0,0.08)]"
        >
          <span className="flex p-3 shrink-0 items-center justify-center rounded-[12px] bg-[#F2F2F2]">
            <PlusIcon className="h-8 w-8" stroke="#B31B38" />
          </span>
          <span className="font-poppins font-20 font-semibold text-[#B31B38]">
            {services.length === 0 ? t("Add_your_first_service") : t("Add_another_service")}
          </span>
        </button>
      </div>

      {services.length > 0 && (
        <div className="max-[500px]:justify-between flex mt-6 max-[500px]:fixed max-[500px]:inset-x-0 max-[500px]:bottom-0 max-[500px]:z-30 max-[500px]:border-t max-[500px]:border-[#EAEAEA] bg-white/90 px-5 py-3 backdrop-blur-sm">
          <div className="max-[500px]:flex-1 min-[500px]:hidden"/>
          <Button text={t("Finish")} onPress={handleFinish} className="mx-auto max-[500px]:w-[128px] w-[173px]" />
        </div>
      )}

      {saveError && (
        <p className="mt-4 text-center text-[14px] text-[#B31B38]">{saveError}</p>
      )}

      {modalOpen && <AddServiceModal onClose={() => { if (!saving) setModalOpen(false); }} onSave={handleSave} saving={saving} />}
    </div>
  );
}
