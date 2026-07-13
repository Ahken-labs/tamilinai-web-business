"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BIZ_TOKEN_KEY } from "@/lib/api";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(BIZ_TOKEN_KEY);
    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/register/basic-details/intro");
    }
  }, [router]);

  return null;
}
