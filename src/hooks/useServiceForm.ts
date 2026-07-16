import { useRef, useState } from "react";
import { compressImage } from "@/utils/imageCompression";
import type { NewService } from "@/type/serviceTypes";

const MAX_PHOTOS = 4;
export const MAX_DESCRIPTION_LENGTH = 800;

export type Photo = { id: string; url: string; uploading: boolean };

export function useServiceForm(initialService?: NewService) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<Photo[]>(
    () => initialService?.photos.map((url) => ({ id: crypto.randomUUID(), url, uploading: false })) ?? []
  );
  const [title, setTitle] = useState(initialService?.title ?? "");
  const [price, setPrice] = useState(initialService?.price ?? "");
  const [description, setDescription] = useState(initialService?.description ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const uploading = photos.some((p) => p.uploading);

  async function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const room = MAX_PHOTOS - photos.length;
    const picked = Array.from(files).slice(0, room);

    for (const file of picked) {
      if (!file.type.startsWith("image/")) continue;
      const compressed = await compressImage(file);
      const url = URL.createObjectURL(compressed);
      const id = crypto.randomUUID();
      setPhotos((prev) => [...prev, { id, url, uploading: false }]);
    }
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const removed = prev.find((p) => p.id === id);
      if (removed) URL.revokeObjectURL(removed.url);
      return prev.filter((p) => p.id !== id);
    });
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "*Service title is required";
    if (!price.trim()) errs.price = "*Starting price is required";
    if (!description.trim()) errs.description = "*Description is required";
    if (photos.length === 0) errs.photos = "*Please add at least one photo";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function toNewService(): NewService {
    return { title, price, description, photos: photos.map((p) => p.url) };
  }

  return {
    fileInputRef,
    photos, setPhotos,
    title, setTitle,
    price, setPrice,
    description, setDescription,
    errors, setErrors,
    uploading,
    addFiles,
    removePhoto,
    validate,
    toNewService,
    MAX_PHOTOS,
  };
}

export type ServiceForm = ReturnType<typeof useServiceForm>;
