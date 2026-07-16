'use client';

import { useEffect } from 'react';
import { BIZ_TOKEN_KEY, BIZ_USER_KEY, saveSession, clearSession } from '@/lib/api';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export default function BizSessionRestorer() {
  useEffect(() => {
    const token = localStorage.getItem(BIZ_TOKEN_KEY);
    const user = localStorage.getItem(BIZ_USER_KEY);
    if (!token || !user) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiresAt = payload.exp * 1000;
      if (Date.now() < expiresAt - 60_000) return;
    } catch {
      return;
    }

    fetch(`${BASE}/api/business/auth/refresh`, { method: 'POST', credentials: 'include' })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { accessToken: string; business: Parameters<typeof saveSession>[1] }) => {
        saveSession(data.accessToken, data.business);
      })
      .catch(() => {
        clearSession();
      });
  }, []);

  return null;
}
