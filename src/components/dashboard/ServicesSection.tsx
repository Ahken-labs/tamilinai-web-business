"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useDragScroll } from "@/hooks/useDragScroll";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useLang } from "@/context/LangContext";
import { BackChevronIcon, ExpandIcon, XIcon } from "@/assets/Icons";
import Modal from "@/components/ui/Modal";

interface MockService {
  id: string;
  image: string | null;
  title: string;
  price: string;
  description: string;
}

// Dummy fallback data for frontend testing — remove once services come from the backend.
const SERVICES: MockService[] = [
  { id: "1", image: "/images/password_key.webp", title: "Bridal makeup", price: "15,000", description: "Award-winning photographer, or 500+ weddings hosted. Full bridal makeup package with trial session included." },
  { id: "2", image: "/images/Wedding_car.webp", title: "Wedding car", price: "8,000", description: "Luxury decorated wedding car with driver for the full day." },
  { id: "3", image: "/images/Event_lunch_service.webp", title: "Event lunch service", price: "1,200", description: "Full-course lunch catering for wedding guests, per plate." },
  { id: "4", image: "/images/Bridal_makeup.webp", title: "Bridal makeup", price: "15,000", description: "Award-winning photographer, or 500+ weddings hosted. Full bridal makeup package with trial session included." },
];

const SCROLL_STEP = 216; // card width (200px) + gap-4 (16px), matches the >=500px card size shown alongside the nav buttons

function MobileScroll({ onExpand, onViewDetails }: { onExpand: (s: MockService) => void; onViewDetails: (s: MockService) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useDragScroll(scrollRef);

  function scrollByCard(direction: 1 | -1) {
    scrollRef.current?.scrollBy({ left: direction * SCROLL_STEP, behavior: "smooth" });
  }

  return (
    <div className="relative mx-auto">
      {/* left */}
      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        aria-label="Scroll left"
        className="hidden min-[500px]:flex absolute -left-0 top-1/2 -translate-y-1/2 z-20 p-1.5 items-center justify-center rounded-full bg-black/30 backdrop-blur-[25px] cursor-pointer"
      >
        <BackChevronIcon className="w-6 h-6" stroke="#fff" strokeWidth={3}/>
      </button>
      <div ref={scrollRef} className="overflow-x-auto no-scrollbar" style={{ scrollbarWidth: "none" }}>
        <div className="max-[500px]:px-4 flex flex-row min-[500px]:px-4 w-max max-[500px]:gap-2 gap-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} onExpand={onExpand} onViewDetails={onViewDetails} />
          ))}
        </div>
      </div>
      {/* right */}
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        aria-label="Scroll right"
        className="hidden min-[500px]:flex absolute -right-0 rotate-180 top-1/2 -translate-y-1/2 z-20 p-1.5 items-center justify-center rounded-full bg-black/30 backdrop-blur-[25px] cursor-pointer"
      >
        <BackChevronIcon className="w-6 h-6" stroke="#fff" strokeWidth={3}/>
      </button>
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10"
        style={{ background: "linear-gradient(270deg, #F3F4F6 0%, #F3F4F6 25%, rgba(243,244,246,0.00) 100%)" }}
      />
    </div>
  );
}

function ServiceCard({
  service,
  onExpand,
  onViewDetails,
}: {
  service: MockService;
  onExpand: (s: MockService) => void;
  onViewDetails: (s: MockService) => void;
}) {
  const { t } = useLang();

  return (
    <div className="relative min-w-[200px] max-w-[200px] min-[500px]:min-w-[248px] min-[500px]:max-w-[248px] w-full aspect-square overflow-hidden rounded-[20.645px] bg-[#D9D9D9]">
      {service.image && <Image src={service.image} alt={service.title} fill className="object-cover" />}

      <button
        type="button"
        onClick={() => onExpand(service)}
        aria-label="View full image"
        className="absolute left-2 top-2 flex max-[500px]:h-[34px] h-[43px] max-[500px]:w-[34px] w-[43px] items-center justify-center rounded-full bg-white/80 backdrop-blur-[8px] cursor-pointer shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_6px_0_rgba(0,0,0,0.04),0_4px_8px_0_rgba(0,0,0,0.10)]"
      >
        <ExpandIcon className="max-[500px]:w-4 w-5 max-[500px]:h-4 h-5"/>
      </button>

      <button
        type="button"
        onClick={() => onViewDetails(service)}
        className="absolute bottom-0 right-0 p-2 flex items-center"
      >
        <div className="rounded-[16px] bg-white/80 backdrop-blur-[8px] max-[500px]:px-[9px] px-[11px] max-[500px]:py-[5px] py-[6px] cursor-pointer whitespace-nowrap shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_6px_0_rgba(0,0,0,0.04),0_4px_8px_0_rgba(0,0,0,0.10)]">
          <span className="font-poppins max-[500px]:text-[12px] text-[14px] leading-[130%] font-medium text-[#222222]">{t("View_details")}</span>
        </div>
      </button>
    </div>
  );
}

// Each user's services
function ServiceListItem({ service, onViewDetails }: { service: MockService; onViewDetails: (s: MockService) => void }) {
  const { t } = useLang();

  return (
    <div className="flex max-w-[640px] mx-auto w-full items-center max-[500px]:gap-3 gap-5 max-[500px]:rounded-[16px] rounded-[32px] max-[500px]:p-2 p-4 shadow-[0_0_8px_0_rgba(0,0,0,0.12)]">
      <div className="relative max-[500px]:h-20 h-39 max-[500px]:w-20 w-39 shrink-0 overflow-hidden max-[500px]:rounded-[12px] rounded-[20px] bg-[#D9D9D9]">
        {service.image && <Image src={service.image} alt={service.title} fill className="object-cover" />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="leading-[150%] truncate font-poppins max-[500px]:text-[14px] text-[20px] font-semibold text-[#222222]">{service.title}</p>
        <p className="leading-[135%] max-[500px]:mt-0.5 mt-1 max-[500px]:line-clamp-2 line-clamp-3 font-poppins font-16 text-[#767676]">{service.description}</p>
        <button
          type="button"
          onClick={() => onViewDetails(service)}
          className="max-[500px]:mt-1 mt-4 inline-flex items-center py-[2px] pl-2 pr-1.5 bg-[#F2F2F2] rounded-full gap-1 cursor-pointer"
        >
          <span className="font-poppins max-[500px]:text-[12px] text-[16px] leading-[150%] text-[#B31B38]">{t("View_details")}</span>
          <BackChevronIcon className="max-[500px]:w-3 w-4 max-[500px]:h-3 h-4 shrink-0 rotate-180" stroke="#B31B38" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

function ImageLightbox({ service, onClose }: { service: MockService; onClose: () => void }) {
  useScrollLock(true);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4">
      <button type="button" onClick={onClose} className="absolute right-4 top-4 cursor-pointer p-2" aria-label="Close">
        <XIcon className="h-7 w-7" stroke="#FFFFFF" />
      </button>
      {service.image && (
        <div className="relative h-[80vh] w-full max-w-[640px]">
          <Image src={service.image} alt={service.title} fill className="object-contain" />
        </div>
      )}
    </div>,
    document.body
  );
}

function DetailsModal({ service, onClose }: { service: MockService; onClose: () => void }) {
  const { t } = useLang();

  return (
    <Modal title={service.title} onClose={onClose}>
      {service.image && (
        <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-[#F2F2F2]">
          <Image src={service.image} alt={service.title} fill className="object-cover" />
        </div>
      )}
      <p className="mt-4 font-poppins text-[16px] font-semibold text-[#B31B38]">Rs {service.price} {t("Rs_total")}</p>
      <p className="mt-2 font-poppins text-[14px] leading-[150%] text-[#525252]">{service.description}</p>
    </Modal>
  );
}

export default function ServicesSection() {
  const [lightboxService, setLightboxService] = useState<MockService | null>(null);
  const [detailsService, setDetailsService] = useState<MockService | null>(null);
  
  return (
    <section className="w-full bg-white font-poppins max-[500px]:mt-12 mt-20 md:max-w-[1040px] min-[500px]:px-2 sm:px-4 md:mx-auto">

      <MobileScroll onExpand={setLightboxService} onViewDetails={setDetailsService} />

      <div className="max-[500px]:mt-12 mt-20 flex flex-col max-[500px]:gap-4 gap-5 min-[500px]:px-2 sm:px-4">
        {SERVICES.map((s) => (
          <ServiceListItem key={s.id} service={s} onViewDetails={setDetailsService} />
        ))}
      </div>

      {lightboxService && <ImageLightbox service={lightboxService} onClose={() => setLightboxService(null)} />}
      {detailsService && <DetailsModal service={detailsService} onClose={() => setDetailsService(null)} />}
    </section>
  );
}
