const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const BIZ_TOKEN_KEY = "inai_biz_access_token";
export const BIZ_USER_KEY = "inai_biz_user";

export interface BizUser {
  id: string;
  username: string;
  businessName: string;
  isApproved: boolean;
}

export interface BizService {
  id: string;
  title: string;
  price: number;
  description: string;
  displayOrder: number;
  photos: { id: string; url: string; displayOrder: number }[];
}

export interface BizMe {
  id: string;
  username: string;
  businessName: string;
  category: string;
  specify?: string;
  bio?: string;
  experience: string;
  qualifications?: string;
  careerHighlight?: string;
  village: string;
  district: string;
  serviceDistricts: string[];
  streetAddress?: string;
  islandWide: boolean;
  phone: string;
  coverPhotoUrl: string | null;
  logoUrl: string | null;
  isApproved: boolean;
  isRejected: boolean;
  countryCode: string;
  services: BizService[];
}

export interface BizPerformance {
  profileViews: number;
  whatsappClicks: number;
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(BIZ_TOKEN_KEY);
}

async function apiFetch<T>(path: string, options?: RequestInit, retry = true): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}/api/business${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers ?? {}),
    },
  });
  if (res.status === 401 && retry) {
    try {
      const refreshRes = await fetch(`${BASE}/api/business/auth/refresh`, { method: "POST", credentials: "include" });
      const refreshBody = await refreshRes.json().catch(() => ({})) as Record<string, unknown>;
      if (refreshRes.ok) {
        saveSession(refreshBody.accessToken as string, refreshBody.business as BizUser);
        return apiFetch<T>(path, options, false);
      }
    } catch { /* refresh failed */ }
    clearSession();
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Session expired. Please log in again.");
  }
  const body = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) throw new Error((body.error as string) ?? "Request failed");
  return body as T;
}

export function saveSession(accessToken: string, user: BizUser) {
  localStorage.setItem(BIZ_TOKEN_KEY, accessToken);
  localStorage.setItem(BIZ_USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(BIZ_TOKEN_KEY);
  localStorage.removeItem(BIZ_USER_KEY);
  sessionStorage.clear();
}

export function getStoredUser(): BizUser | null {
  try {
    const raw = localStorage.getItem(BIZ_USER_KEY);
    return raw ? (JSON.parse(raw) as BizUser) : null;
  } catch {
    return null;
  }
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function checkUsername(username: string): Promise<{ available: boolean }> {
  return apiFetch(`/auth/check-username?username=${encodeURIComponent(username)}`);
}

export async function reserveUsername(username: string): Promise<{ reservationToken: string }> {
  return apiFetch('/auth/reserve-username', {
    method: 'POST',
    body: JSON.stringify({ username }),
  });
}

export async function releaseUsername(username: string, reservationToken: string): Promise<void> {
  await apiFetch('/auth/release-username', {
    method: 'POST',
    body: JSON.stringify({ username, reservationToken }),
  }).catch(() => {});
}

export async function sendBizOtp(phone: string, countryCode: string): Promise<{ cooldownSeconds: number }> {
  return apiFetch("/auth/send-otp", {
    method: "POST",
    body: JSON.stringify({ phone, countryCode }),
  });
}

export async function verifyBizOtp(phone: string, countryCode: string, otp: string): Promise<{ tempToken: string }> {
  return apiFetch("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({ phone, countryCode, otp }),
  });
}

export async function createBizAccount(formData: FormData): Promise<{ accessToken: string; business: BizUser }> {
  const token = getToken();
  const res = await fetch(`${BASE}/api/business/auth/create-account`, {
    method: "POST",
    credentials: "include",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const body = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) throw new Error((body.error as string) ?? "Failed to create account");
  return body as { accessToken: string; business: BizUser };
}

export async function bizLogin(phone: string, countryCode: string, password: string): Promise<{ accessToken: string; business: BizUser }> {
  const res = await fetch(`${BASE}/api/business/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, countryCode, password }),
  });
  const body = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) throw new Error((body.error as string) ?? "Invalid credentials.");
  return body as { accessToken: string; business: BizUser };
}

export async function bizRefresh(): Promise<{ accessToken: string; business: BizUser }> {
  const res = await fetch(`${BASE}/api/business/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  const body = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) throw new Error((body.error as string) ?? "Session expired");
  return body as { accessToken: string; business: BizUser };
}

export async function bizLogout(): Promise<void> {
  await fetch(`${BASE}/api/business/auth/logout`, { method: "POST", credentials: "include" }).catch(() => {});
  clearSession();
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export async function getBizMe(): Promise<BizMe> {
  return apiFetch("/me");
}

export async function updateBizMe(fields: Partial<BizMe>): Promise<{ ok: boolean }> {
  return apiFetch("/me", { method: "PATCH", body: JSON.stringify(fields) });
}

export async function getBizPerformance(): Promise<BizPerformance> {
  return apiFetch("/me/performance");
}

// ─── Services ─────────────────────────────────────────────────────────────────

async function apiFetchMultipart<T>(path: string, method: string, formData: FormData, retry = true): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}/api/business${path}`, {
    method,
    credentials: "include",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (res.status === 401 && retry) {
    try {
      const refreshRes = await fetch(`${BASE}/api/business/auth/refresh`, { method: "POST", credentials: "include" });
      const refreshBody = await refreshRes.json().catch(() => ({})) as Record<string, unknown>;
      if (refreshRes.ok) {
        saveSession(refreshBody.accessToken as string, refreshBody.business as BizUser);
        return apiFetchMultipart<T>(path, method, formData, false);
      }
    } catch { /* refresh failed */ }
    clearSession();
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Session expired. Please log in again.");
  }
  const body = await res.json().catch(() => ({})) as Record<string, unknown>;
  if (!res.ok) throw new Error((body.error as string) ?? "Request failed");
  return body as T;
}

export async function createBizService(formData: FormData): Promise<{ id: string }> {
  return apiFetchMultipart("/me/services", "POST", formData);
}

export async function updateBizService(id: string, data: { title: string; price: number; description: string }): Promise<void> {
  await apiFetch(`/me/services/${id}`, { method: "PATCH", body: JSON.stringify(data) });
}

export async function deleteBizService(id: string): Promise<void> {
  await apiFetch(`/me/services/${id}`, { method: "DELETE" });
}

export async function addBizServicePhotos(serviceId: string, formData: FormData): Promise<void> {
  await apiFetchMultipart(`/me/services/${serviceId}/photos`, "POST", formData);
}

export async function deleteBizServicePhoto(serviceId: string, photoId: string): Promise<void> {
  await apiFetch(`/me/services/${serviceId}/photos/${photoId}`, { method: "DELETE" });
}

export async function updateBizCoverPhoto(formData: FormData): Promise<{ coverPhotoUrl: string }> {
  return apiFetchMultipart("/me/cover-photo", "PATCH", formData);
}

export async function updateBizLogo(formData: FormData): Promise<{ logoUrl: string }> {
  return apiFetchMultipart("/me/logo", "PATCH", formData);
}

export async function deleteBizLogo(): Promise<void> {
  await apiFetch("/me/logo", { method: "DELETE" });
}

export async function sendBizWhatsAppOtp(phone: string, countryCode: string): Promise<{ cooldownSeconds: number }> {
  return apiFetch("/me/whatsapp/request", { method: "POST", body: JSON.stringify({ phone, countryCode }) });
}

export async function confirmBizWhatsAppOtp(phone: string, countryCode: string, otp: string): Promise<void> {
  await apiFetch("/me/whatsapp/confirm", { method: "POST", body: JSON.stringify({ phone, countryCode, otp }) });
}
