"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";
import Button from "@/components/common-layout/Button";

const DEMO_SERVICES = [
  { title: "Bridal makeup", price: "Rs 5,000 total", image: "/images/Bridal_makeup.webp", rotate: -8.421, top: 15, left: 1.6 },
  { title: "Luxury wedding hall", price: "Rs 75,000 total", image: "/images/wedding_hall.webp", rotate: -2.113, top: 78.02, left: 22.27 },
  { title: "Event lunch service", price: "Rs 50,000 total", image: "/images/Event_lunch_service.webp", rotate: 6.669, top: 140.5, left: 30.49 },
  { title: "Wedding car", price: "Rs 7,000 total", image: "/images/Wedding_car.webp", rotate: 16.604, top: 206.71, left: 36.4 },
];

export default function ServicesPage() {
  const { t } = useLang();
  const router = useRouter();

  useEffect(() => {
    history.pushState(null, "", window.location.href);
    const handlePop = () => history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  function handleNext() {
    router.push("/register/storefront/your-services");
  }

  return (
    <div className="font-poppins flex flex-col px-5 py-4 sm:w-[640px] mx-auto">
      <h1 className="mx-auto text-center font-48 font-semibold leading-[120%] text-[#000]">
        {t("Add_your_services")}
      </h1>

      <p className="mx-auto max-w-[560px] mt-2 sm:mt-3 md:mt-4 lg:mt-5 text-center font-20 leading-[150%] text-[#525252]">
        {t("Add_services_description")}
      </p>

      {/* --card-scale drives top/left/width/image/gap/radius together via calc(),
          so the whole fanned stack grows for sm/md as one proportional unit instead
          of two disconnected sets of numbers that drift apart at different sizes. */}
      <div className="relative mt-8 sm:mt-10 md:mt-12 mx-auto h-[312px] sm:h-[401px] w-full max-w-[290px] sm:max-w-[373px] [--card-scale:1] sm:[--card-scale:1.2851]">
        {DEMO_SERVICES.map((service, i) => (
          <div
            key={service.title}
            className="service-card absolute flex items-center shadow-[0_1.2px_12px_0_rgba(0,0,0,0.12)] bg-white"
            style={{
              top: `calc(${service.top}px * var(--card-scale))`,
              left: `calc(${service.left}px * var(--card-scale))`,
              width: "calc(235px * var(--card-scale))",
              gap: "calc(8px * var(--card-scale))",
              padding: "calc(8px * var(--card-scale))",
              borderRadius: "calc(16px * var(--card-scale))",
              zIndex: DEMO_SERVICES.length - i,
              "--card-rotate": `${service.rotate}deg`,
              animationDelay: `${i * 90}ms`,
            } as React.CSSProperties}
          >
            <Image
              src={service.image}
              alt=""
              width={48}
              height={48}
              className="shrink-0 rounded-[10px] object-cover"
              style={{ width: "calc(48px * var(--card-scale))", height: "calc(48px * var(--card-scale))" }}
            />
            <div className="min-w-0">
              <p className="truncate font-poppins text-[14px] sm:text-[16px] md:text-[18px] font-medium leading-[150%] text-[#222222]">
                {service.title}
              </p>
              <p className="truncate font-poppins text-[12px] sm:text-[13.5px] md:text-[15px] font-normal leading-[150%] text-[#525252]">
                {service.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button text={t("Next")} onPress={handleNext} className="mt-8 sm:mt-9 md:mt-10 lg:mt-11 mx-auto w-[173px]" />
    </div>
  );
}
