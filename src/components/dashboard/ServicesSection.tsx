"use client";

import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useDragScroll } from "@/hooks/useDragScroll";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useLang } from "@/context/LangContext";
import { BackChevronIcon, ExpandIcon, XIcon } from "@/assets/Icons";
import Button from "@/components/common-layout/Button";

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
    <div className="max-[500px]:py-6 py-7 sm:py-8 md:py-9 lg:py-10 relative mx-auto">
      <div
        className="min-[500px]:flex hidden pointer-events-none absolute left-[-1px] top-0 bottom-0 w-10 z-10"
        style={{ background: "linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 35%, rgba(243,244,246,0.00) 100%)" }}
      />
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
            <div key={i} className="relative w-[clamp(200px,26vw,248px)] aspect-square overflow-hidden rounded-[20.645px] bg-[#D9D9D9]">
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
        className="min-[500px]:flex hidden pointer-events-none absolute right-[-1px] top-0 bottom-0 w-10 z-10"
        style={{ background: "linear-gradient(270deg, #FFFFFF 0%, #FFFFFF 35%, rgba(243,244,246,0.00) 100%)" }}
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
      <div className="relative h-[clamp(80px,20vw,156px)] w-[clamp(80px,20vw,156px)] shrink-0 overflow-hidden max-[500px]:rounded-[12px] rounded-[20px] bg-[#D9D9D9]">
        {cover && <Image src={cover} alt={service.title} fill className="object-cover" loading="lazy" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="leading-[150%] truncate font-poppins max-[500px]:text-[14px] text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-[#222222]">{service.title}</p>
        <p className="leading-[135%] max-[500px]:mt-0.5 mt-1 max-[500px]:line-clamp-2 line-clamp-3 font-poppins max-[500px]:text-[12px] text-[14px] sm:text-[16px] text-[#767676]">{service.description}</p>
        <div className="max-[500px]:mt-1 mt-4 inline-flex items-center py-[2px] pl-2 pr-1.5 bg-[#F2F2F2] rounded-full gap-1">
          <span className="font-poppins max-[500px]:text-[12px] text-[14px] sm:text-[16px] leading-[150%] text-[#B31B38]">{t("View_details")}</span>
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

function Carousel({
  images, title, activeIndex, variant, scrollRef, onScroll, onPrev, onNext,
}: {
  images: string[];
  title: string;
  activeIndex: number;
  variant: "mobile" | "desktop";
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <div ref={scrollRef} onScroll={onScroll} className="flex h-full overflow-x-auto snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
        {images.map((url, i) => (
          <div key={i} className="flex-none w-full h-full snap-center relative">
            <Image src={url} alt={title} fill className="object-cover" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          {variant === "desktop" && (
            <>
              <button type="button" onClick={onPrev} aria-label="Previous" className="absolute left-[5px] top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center cursor-pointer" style={{ borderRadius: 100, background: "rgba(0,0,0,0.30)", backdropFilter: "blur(25px)" }}>
                <BackChevronIcon className="w-5 h-5" stroke="#fff" />
              </button>
              <button type="button" onClick={onNext} aria-label="Next" className="absolute right-[5px] top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center cursor-pointer rotate-180" style={{ borderRadius: 100, background: "rgba(0,0,0,0.30)", backdropFilter: "blur(25px)" }}>
                <BackChevronIcon className="w-5 h-5" stroke="#fff" />
              </button>
            </>
          )}
          {variant === "mobile" ? (
            <div className="absolute h-[26px] bottom-2 left-1/2 -translate-x-1/2 flex items-center" style={{ gap: 8, padding: "8px 12px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.50)", background: "rgba(255,255,255,0.80)", backdropFilter: "blur(25px)" }}>
              {images.map((_, i) => (
                <div key={i} style={i === activeIndex ? { width: 10, height: 10, borderRadius: "50%", background: "#222", flexShrink: 0 } : { width: 8, height: 8, borderRadius: "50%", background: "#B8B8B8", flexShrink: 0 }} />
              ))}
            </div>
          ) : (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex h-8 items-center px-[14.77px]" style={{ gap: 9.85, borderRadius: 100, border: "1px solid rgba(255,255,255,0.50)", background: "rgba(255,255,255,0.80)", backdropFilter: "blur(25px)" }}>
              {images.map((_, i) => (
                <div key={i} style={i === activeIndex ? { width: 12.308, height: 12.308, borderRadius: "50%", background: "#222", flexShrink: 0 } : { width: 9.846, height: 9.846, borderRadius: "50%", background: "#B8B8B8", flexShrink: 0 }} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

function DetailsModal({ service, whatsappHref, onClose }: { service: MockService; whatsappHref: string | null; onClose: () => void }) {
  const { t } = useLang();
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = service.images;
  useScrollLock(true);

  function handleCarouselScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    setActiveIndex(Math.round(el.scrollLeft / el.offsetWidth));
  }

  function goTo(idx: number) {
    [mobileRef, desktopRef].forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      el.scrollTo({ left: idx * el.offsetWidth, behavior: "smooth" });
    });
  }

  const content = (
    <>
      <h2 className="font-poppins text-[20px] font-semibold leading-[150%] text-[#222]">{service.title}</h2>
      <p className="font-poppins text-[14px] leading-[150%] text-[#222]">Starting price <span className="text-[16px] font-semibold">Rs. {Number(service.price).toLocaleString()}</span></p>
      {whatsappHref && <Button text={t("WhatsApp")} className="mt-4 inline-flex" onPress={() => window.open(whatsappHref, "_blank", "noopener")} />}
      <p className="mt-4 font-poppins text-[14px] leading-[150%] text-[#525252]">{service.description}</p>
    </>
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-end min-[500px]:items-center justify-center min-[500px]:p-4 bg-black/60"
      onClick={onClose}
    >
      {/* ── MOBILE: bottom sheet ── */}
      <div
        className="min-[500px]:hidden flex h-[96dvh] max-h-[96dvh] w-full flex-col overflow-hidden rounded-t-[32px] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {images.length > 0 && (
          <div className="relative w-full aspect-square flex-none">
            <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-end px-1 pt-2" style={{ background: "rgba(255,255,255,0.60)", backdropFilter: "blur(11px)" }}>
              <button type="button" onClick={onClose} aria-label="Close" className="flex items-center justify-center p-2 cursor-pointer">
                <XIcon className="w-6 h-6" stroke="#222" />
              </button>
            </div>
            <Carousel
              images={images}
              title={service.title}
              activeIndex={activeIndex}
              variant="mobile"
              scrollRef={mobileRef}
              onScroll={handleCarouselScroll}
              onPrev={() => goTo((activeIndex - 1 + images.length) % images.length)}
              onNext={() => goTo((activeIndex + 1) % images.length)}
            />
          </div>
        )}
        <div className="no-scrollbar flex-1 overflow-y-auto p-4">{content}</div>
      </div>

      {/* ── DESKTOP: header + body ── */}
      <div
        className="hidden min-[500px]:flex flex-col w-full max-w-[1008px] overflow-hidden rounded-[32px] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-end px-2 py-2 shrink-0">
          <button type="button" onClick={onClose} aria-label="Close" className="flex items-center justify-center p-2 cursor-pointer">
            <XIcon className="w-8 h-8" stroke="#222" />
          </button>
        </div>
        {/* Body */}
        <div className="flex items-start px-2 sm:px-5 pb-6 gap-3 sm:gap-5">
          <div className="shrink-0">
            <div className="relative w-[40vw] max-w-[400px] aspect-square rounded-[24px] overflow-hidden bg-[#F2F2F2]">
              <Carousel
                images={images}
                title={service.title}
                activeIndex={activeIndex}
                variant="desktop"
                scrollRef={desktopRef}
                onScroll={handleCarouselScroll}
                onPrev={() => goTo((activeIndex - 1 + images.length) % images.length)}
                onNext={() => goTo((activeIndex + 1) % images.length)}
              />
            </div>
          </div>
          <div className="no-scrollbar flex-1 overflow-y-auto pr-2">{content}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function ServicesSection({ services, whatsappHref }: { services: MockService[]; whatsappHref: string | null }) {
  const [lightbox, setLightbox] = useState<{ url: string; title: string } | null>(null);
  const [detailsService, setDetailsService] = useState<MockService | null>(null);

  return (
    <section className="w-full bg-white font-poppins max-[500px]:mt-6 mt-7 sm:mt-8 md:mt-9 lg:mt-10 md:max-w-[1040px] min-[500px]:px-2 sm:px-4 md:mx-auto">
      <MobileScroll
        services={services}
        onExpand={(url, title) => setLightbox({ url, title })}
        onViewDetails={setDetailsService}
      />

      <div className="max-[500px]:mt-6 mt-10 flex flex-col max-[500px]:gap-4 gap-5 px-4 sm:px-4">
        {services.map((s) => (
          <ServiceListItem key={s.id} service={s} onViewDetails={setDetailsService} />
        ))}
      </div>

      {lightbox && <ImageLightbox url={lightbox.url} title={lightbox.title} onClose={() => setLightbox(null)} />}
      {detailsService && <DetailsModal service={detailsService} whatsappHref={whatsappHref} onClose={() => setDetailsService(null)} />}
    </section>
  );
}
