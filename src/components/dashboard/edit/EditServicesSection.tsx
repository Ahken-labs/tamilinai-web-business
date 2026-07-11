"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { PlusIcon, BackChevronIcon } from "@/assets/Icons";
import AddServiceModal, { NewService } from "@/components/storefront/AddServiceModal";
import Image from "next/image";

type Service = NewService & { id: string };

// Dummy data until this reads/writes the backend — remove once wired up.
const DUMMY_SERVICES: Service[] = [
  {
    id: "1",
    title: "Bridal makeup",
    price: "15000",
    description: "Award winningphotographer, or 500+ weddings hosted Award-winning photographer, or 500+ weddings hosted",
    photos: ["/images/Bridal_makeup.webp", "/images/Bridal_makeup.webp", "/images/Bridal_makeup.webp", "/images/Bridal_makeup.webp",],
  },
  {
    id: "2",
    title: "Bridal makeup",
    price: "15000",
    description: "Award-winning photographer, or 500+ weddings hosted Award-winning photographer, or 500+ weddings hosted",
    photos: ["/images/Bridal_makeup.webp"],
  },
  {
    id: "3",
    title: "Bridal makeup",
    price: "15000",
    description: "Award-winning photographer, or 500+ weddings hosted Award-winning photographer, or 500+ weddings hosted",
    photos: ["/images/Bridal_makeup.webp"],
  },
  {
    id: "4",
    title: "Bridal makeup",
    price: "15000",
    description: "Award-winning photographer, or 500+ weddings hosted Award-winning photographer, or 500+ weddings hosted",
    photos: ["/images/Bridal_makeup.webp"],
  },
];

export default function EditServicesSection() {
  const { t } = useLang();

  const [services, setServices] = useState<Service[]>(DUMMY_SERVICES);
  const [addOpen, setAddOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingService = services.find((s) => s.id === editingId);

  function handleAddSave(service: NewService) {
    setServices((prev) => [...prev, { ...service, id: crypto.randomUUID() }]);
    setAddOpen(false);
  }

  function handleEditSave(service: NewService) {
    setServices((prev) => prev.map((s) => (s.id === editingId ? { ...service, id: s.id } : s)));
    setEditingId(null);
  }

  return (
    <div className="px-4">
      <div className="max-w-[640px] mx-auto">

      <div className="max-[500px]:mt-5 mt-10 mb-5 border-t border-[#EAEAEA]" />

      <h2 className="font-poppins max-[500px]:text-[16px] text-[20px] font-semibold leading-[150%] text-[#767676]">{t("Services")}</h2>

      <div className="mt-4 flex flex-col max-[500px]:gap-4 gap-5">
        {services.map((service) => (
          <button
            type="button"
            key={service.id}
            onClick={() => setEditingId(service.id)}
            className="flex w-full items-center gap-4 max-[500px]:rounded-[16px] rounded-[32px] max-[500px]:p-2 p-4 shadow-[0_0_8px_0_rgba(0,0,0,0.12)] cursor-pointer text-left"
          >
            <div className="relative max-[500px]:h-20 h-39 max-[500px]:w-20 w-39 shrink-0 overflow-hidden max-[500px]:rounded-[12px] rounded-[20px] bg-[#D9D9D9]">
              {service.photos[0] && <Image src={service.photos[0]} alt="" fill className="object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="leading-[150%] truncate font-poppins max-[500px]:text-[14px] text-[20px] font-semibold text-[#222222]">{service.title}</p>
              <p className="leading-[135%] max-[500px]:mt-0.5 mt-1 max-[500px]:line-clamp-2 line-clamp-3 font-poppins font-16 text-[#767676]">{service.description}</p>
              <div className="max-[500px]:mt-1 mt-4 inline-flex items-center py-[2px] pl-2 pr-1.5 bg-[#F2F2F2] rounded-full gap-1">
                <span className="font-poppins max-[500px]:text-[12px] text-[16px] leading-[150%] text-[#B31B38]">{t("Edit")}</span>
                <BackChevronIcon className="max-[500px]:w-3 w-4 max-[500px]:h-3 h-4 shrink-0 rotate-180" stroke="#B31B38" strokeWidth={2.5} />
              </div>
            </div>
          </button>
        ))}

        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-4 rounded-[16px] border border-[#F4F4F4] p-4 cursor-pointer shadow-[0_0_8px_0_rgba(0,0,0,0.08)]"
        >
          <div className="rounded-[11.2px] bg-[#F2F2F2] p-3">
          <PlusIcon className="h-8 w-8" stroke="#B31B38" />
          </div>
          <span className="font-poppins text-[16px] font-semibold text-[#B31B38]">
            {t("Add_another_service")}
          </span>
        </button>
      </div>

      {addOpen && <AddServiceModal onClose={() => setAddOpen(false)} onSave={handleAddSave} />}
      {editingService && (
        <AddServiceModal
          initialService={{ title: editingService.title, price: editingService.price, description: editingService.description, photos: editingService.photos }}
          onClose={() => setEditingId(null)}
          onSave={handleEditSave}
        />
      )}
      </div>
    </div>
  );
}
