"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useDragScroll } from "@/hooks/useDragScroll";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useLang } from "@/context/LangContext";
import { BackChevronIcon, ExpandIcon, XIcon } from "@/assets/Icons";
import Modal from "@/components/ui/Modal";

export interface MockService {
  id: string;
  images: string[];
  title: string;
  price: string;
  description: string;
}

const SCROLL_STEP = 216;

function MobileScroll({ services, onExpand, onViewDetails }: { services: MockService[]; onExpand: (url: string, title: string) => void; onViewDetails: (s: MockService) => void }) {
  const { t } = useLang();
  const scrollRef = useRef<HTMLDivElement>(null);
  useDragScroll(scrollRef);

  const allPhotos = services.flatMap((s) => s.images.map((url) => ({ url, service: s })));

  function scrollByCard(direction: 1 | -1) {
    scrollRef.current?.scrollBy({ left: direction * SCROLL_STEP, behavior: "smooth" });
  }

  return (
    <div className="relative mx-auto">
      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        aria-label="Scroll left"
        className="hidden min-[500px]:flex absolute -left-0 top-1/2 -translate-y-1/2 z-20 p-1.5 items-center justify-center rounded-full bg-black/30 backdrop-blur-[25px] cursor-pointer"
      >
        <BackChevronIcon className="w-6 h-6" stroke="#fff" strokeWidth={3} />
      </button>
      <div ref={scrollRef} className="overflow-x-auto no-scrollbar" style={{ scrollbarWidth: "none" }}>
        <div className="max-[500px]:px-4 flex flex-row min-[500px]:px-4 w-max max-[500px]:gap-2 gap-4">
          {allPhotos.map((photo, i) => (
            <div key={i} className="relative min-w-[200px] max-w-[200px] min-[500px]:min-w-[248px] min-[500px]:max-w-[248px] w-full aspect-square overflow-hidden rounded-[20.645px] bg-[#D9D9D9]">
              <Image src={photo.url} alt={photo.service.title} fill className="object-cover" loading="lazy" />
              <button
                type="button"
                onClick={() => onExpand(photo.url, photo.service.title)}
                aria-label="View full image"
                className="absolute left-2 top-2 flex max-[500px]:h-[34px] h-[43px] max-[500px]:w-[34px] w-[43px] items-center justify-center rounded-full bg-white/80 backdrop-blur-[8px] cursor-pointer shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_6px_0_rgba(0,0,0,0.04),0_4px_8px_0_rgba(0,0,0,0.10)]"
              >
                <ExpandIcon className="max-[500px]:w-4 w-5 max-[500px]:h-4 h-5" />
              </button>
              <button
                type="button"
                onClick={() => onViewDetails(photo.service)}
                className="absolute bottom-0 right-0 p-2 flex items-center"
              >
                <div className="rounded-[16px] bg-white/80 backdrop-blur-[8px] max-[500px]:px-[9px] px-[11px] max-[500px]:py-[5px] py-[6px] cursor-pointer whitespace-nowrap shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_2px_6px_0_rgba(0,0,0,0.04),0_4px_8px_0_rgba(0,0,0,0.10)]">
                  <span className="font-poppins max-[500px]:text-[12px] text-[14px] leading-[130%] font-medium text-[#222222]">{t("View_details")}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        aria-label="Scroll right"
        className="hidden min-[500px]:flex absolute -right-0 rotate-180 top-1/2 -translate-y-1/2 z-20 p-1.5 items-center justify-center rounded-full bg-black/30 backdrop-blur-[25px] cursor-pointer"
      >
        <BackChevronIcon className="w-6 h-6" stroke="#fff" strokeWidth={3} />
      </button>
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 z-10"
        style={{ background: "linear-gradient(270deg, #F3F4F6 0%, #F3F4F6 25%, rgba(243,244,246,0.00) 100%)" }}
      />
    </div>
  );
}


function ServiceListItem({ service, onViewDetails }: { service: MockService; onViewDetails: (s: MockService) => void }) {
  const { t } = useLang();
  const cover = service.images[0] ?? null;

  return (
    <button
      type="button"
      onClick={() => onViewDetails(service)}
      className="flex max-w-[640px] mx-auto w-full items-center max-[500px]:gap-3 gap-5 max-[500px]:rounded-[16px] rounded-[32px] max-[500px]:p-2 p-4 shadow-[0_0_8px_0_rgba(0,0,0,0.12)] cursor-pointer text-left"
    >
      <div className="relative max-[500px]:h-20 h-39 max-[500px]:w-20 w-39 shrink-0 overflow-hidden max-[500px]:rounded-[12px] rounded-[20px] bg-[#D9D9D9]">
        {cover && <Image src={cover} alt={service.title} fill className="object-cover" loading="lazy" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="leading-[150%] truncate font-poppins max-[500px]:text-[14px] text-[20px] font-semibold text-[#222222]">{service.title}</p>
        <p className="leading-[135%] max-[500px]:mt-0.5 mt-1 max-[500px]:line-clamp-2 line-clamp-3 font-poppins max-[500px]:text-[12px] text-[16px] text-[#767676]">{service.description}</p>
        <div className="max-[500px]:mt-1 mt-4 inline-flex items-center py-[2px] pl-2 pr-1.5 bg-[#F2F2F2] rounded-full gap-1">
          <span className="font-poppins max-[500px]:text-[12px] text-[16px] leading-[150%] text-[#B31B38]">{t("View_details")}</span>
          <BackChevronIcon className="max-[500px]:w-3 w-4 max-[500px]:h-3 h-4 shrink-0 rotate-180" stroke="#B31B38" strokeWidth={2.5} />
        </div>
      </div>
    </button>
  );
}

function ImageLightbox({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
  useScrollLock(true);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4">
      <button type="button" onClick={onClose} className="absolute right-4 top-4 cursor-pointer p-2" aria-label="Close">
        <XIcon className="h-7 w-7" stroke="#FFFFFF" />
      </button>
      <div className="relative h-[80vh] w-full max-w-[640px]">
        <Image src={url} alt={title} fill className="object-contain" />
      </div>
    </div>,
    document.body
  );
}

function DetailsModal({ service, onClose }: { service: MockService; onClose: () => void }) {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const images = service.images;

  return (
    <Modal title={service.title} onClose={onClose}>
      {images.length > 0 && (
        <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-[#F2F2F2]">
          <Image src={images[index]} alt={service.title} fill className="object-cover" />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 backdrop-blur-sm cursor-pointer"
              >
                <BackChevronIcon className="w-5 h-5" stroke="#fff" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={() => setIndex((i) => (i + 1) % images.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 backdrop-blur-sm cursor-pointer rotate-180"
              >
                <BackChevronIcon className="w-5 h-5" stroke="#fff" strokeWidth={2.5} />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${i === index ? "w-4 bg-white" : "w-1.5 bg-white/50"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <p className="mt-4 font-poppins text-[16px] font-semibold text-[#B31B38]">Rs {service.price} {t("Rs_total")}</p>
      <p className="mt-2 font-poppins text-[14px] leading-[150%] text-[#525252]">{service.description}</p>
    </Modal>
  );
}

export default function ServicesSection({ services }: { services: MockService[] }) {
  const [lightbox, setLightbox] = useState<{ url: string; title: string } | null>(null);
  const [detailsService, setDetailsService] = useState<MockService | null>(null);

  return (
    <section className="w-full bg-white font-poppins max-[500px]:mt-12 mt-20 md:max-w-[1040px] min-[500px]:px-2 sm:px-4 md:mx-auto">
      <MobileScroll
        services={services}
        onExpand={(url, title) => setLightbox({ url, title })}
        onViewDetails={setDetailsService}
      />

      <div className="max-[500px]:mt-12 mt-20 flex flex-col max-[500px]:gap-4 gap-5 px-2 sm:px-4">
        {services.map((s) => (
          <ServiceListItem key={s.id} service={s} onViewDetails={setDetailsService} />
        ))}
      </div>

      {lightbox && <ImageLightbox url={lightbox.url} title={lightbox.title} onClose={() => setLightbox(null)} />}
      {detailsService && <DetailsModal service={detailsService} onClose={() => setDetailsService(null)} />}
    </section>
  );
}
