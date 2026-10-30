export const MAX_PORTRAIT_DATA_LENGTH = 350_000;
const MAX_FILE_BYTES = 8 * 1024 * 1024;

export function isPortraitData(value: unknown): value is string {
  return typeof value === "string" && value.length <= MAX_PORTRAIT_DATA_LENGTH &&
    /^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value);
}

export async function readCharacterPortrait(file: File): Promise<string> {
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) throw new Error("Chọn ảnh PNG, JPEG hoặc WebP.");
  if (file.size > MAX_FILE_BYTES) throw new Error("Ảnh quá lớn. Hãy chọn ảnh không quá 8 MB.");
  let bitmap: ImageBitmap;
  try { bitmap = await createImageBitmap(file); } catch { throw new Error("Không đọc được ảnh này. Hãy thử một ảnh khác."); }
  try {
    const ratio = Math.min(1, 512 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * ratio));
    canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Trình duyệt không hỗ trợ xử lý ảnh.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/webp", 0.82);
    if (!isPortraitData(data)) throw new Error("Ảnh vẫn quá lớn sau khi thu nhỏ. Hãy chọn ảnh đơn giản hơn.");
    return data;
  } finally { bitmap.close(); }
}
