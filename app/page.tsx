"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // 로그인 상태 확인 (나중에 실제 인증 로직으로 변경 필요)
    const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn");
    
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null;
}
