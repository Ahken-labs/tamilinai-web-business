const DEFAULT_MAX_DIMENSION = 1600;
const DEFAULT_QUALITY = 0.82;

export async function compressImage(
  file: File,
  { maxDimension = DEFAULT_MAX_DIMENSION, quality = DEFAULT_QUALITY } = {}
): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(bitmap, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", quality)
  );
  if (!blob) return file;

  const name = file.name.replace(/\.\w+$/, "") + ".webp";
  return new File([blob], name, { type: "image/webp" });
}
