"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { PlusIcon, BackChevronIcon } from "@/assets/Icons";
import AddServiceModal from "@/components/storefront/AddServiceModal";
import EditServiceModal from "@/components/storefront/EditServiceModal";
import type { NewService } from "@/type/serviceTypes";
import Image from "next/image";
import {
  createBizService,
  updateBizService,
  deleteBizService,
  addBizServicePhotos,
  deleteBizServicePhoto,
  getBizMe,
} from "@/lib/api";
import type { BizService } from "@/lib/api";

type Props = { services: BizService[] };

async function blobUrlToBlob(url: string): Promise<Blob> {
  const res = await fetch(url);
  return res.blob();
}

export default function EditServicesSection({ services: initServices }: Props) {
  const { t } = useLang();

  const [services, setServices] = useState<BizService[]>(initServices);
  const [addOpen, setAddOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const editingService = services.find((s) => s.id === editingId);

  async function handleAddSave(service: NewService) {
    setSaving(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", service.title);
      formData.append("price", service.price);
      formData.append("description", service.description);
      for (const url of service.photos) {
        const blob = await blobUrlToBlob(url);
        formData.append("photos", blob, "photo.jpg");
      }
      await createBizService(formData);
      const updated = await getBizMe();
      setServices(updated.services);
      setAddOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add service");
    } finally {
      setSaving(false);
    }
  }

  async function handleEditSave(updated: NewService) {
    if (!editingService) return;
    setSaving(true);
    setError("");
    try {
      await updateBizService(editingService.id, {
        title: updated.title,
        price: parseInt(updated.price, 10),
        description: updated.description,
      });

      const removedPhotos = editingService.photos.filter((p) => !updated.photos.includes(p.url));
      for (const p of removedPhotos) {
        await deleteBizServicePhoto(editingService.id, p.id);
      }

      const newPhotoUrls = updated.photos.filter((url) => url.startsWith("blob:"));
      if (newPhotoUrls.length > 0) {
        const formData = new FormData();
        for (const url of newPhotoUrls) {
          const blob = await blobUrlToBlob(url);
          formData.append("photos", blob, "photo.jpg");
        }
        await addBizServicePhotos(editingService.id, formData);
      }

      const me = await getBizMe();
      setServices(me.services);
      setEditingId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save service");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setSaving(true);
    setError("");
    try {
      await deleteBizService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      setEditingId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete service");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="px-4">
      <div className="max-w-[640px] mx-auto">
        <div className="max-[500px]:mt-5 mt-10 mb-5 border-t border-[#EAEAEA]" />

        <h2 className="font-poppins max-[500px]:text-[16px] text-[20px] font-semibold leading-[150%] text-[#767676]">{t("Services")}</h2>

        {error && <p className="mt-2 text-[14px] text-[#B31B38]">{error}</p>}

        <div className="mt-4 flex flex-col max-[500px]:gap-4 gap-5">
          {services.map((service) => (
            <button
              type="button"
              key={service.id}
              onClick={() => setEditingId(service.id)}
              disabled={saving}
              className="flex w-full items-center gap-4 max-[500px]:rounded-[16px] rounded-[32px] max-[500px]:p-2 p-4 shadow-[0_0_8px_0_rgba(0,0,0,0.12)] cursor-pointer text-left disabled:opacity-60"
            >
              <div className="relative max-[500px]:h-20 h-39 max-[500px]:w-20 w-39 shrink-0 overflow-hidden max-[500px]:rounded-[12px] rounded-[20px] bg-[#D9D9D9]">
                {service.photos[0] && <Image src={service.photos[0].url} alt="" fill className="object-cover" loading="lazy" />}
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
            disabled={saving}
            className="flex items-center gap-4 rounded-[16px] border border-[#F4F4F4] p-4 cursor-pointer shadow-[0_0_8px_0_rgba(0,0,0,0.08)] disabled:opacity-60"
          >
            <div className="rounded-[11.2px] bg-[#F2F2F2] p-3">
              <PlusIcon className="h-8 w-8" stroke="#B31B38" />
            </div>
            <span className="font-poppins text-[16px] font-semibold text-[#B31B38]">
              {t("Add_another_service")}
            </span>
          </button>
        </div>

        {addOpen && (
          <AddServiceModal
            onClose={() => setAddOpen(false)}
            onSave={handleAddSave}
            saving={saving}
          />
        )}

        {editingService && (
          <EditServiceModal
            initialService={{
              title: editingService.title,
              price: String(editingService.price),
              description: editingService.description,
              photos: editingService.photos.map((p) => p.url),
            }}
            onClose={() => setEditingId(null)}
            onSave={handleEditSave}
            onDelete={() => handleDelete(editingService.id)}
            saving={saving}
          />
        )}
      </div>
    </div>
  );
}
