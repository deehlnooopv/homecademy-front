"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleLogin = async (provider: string) => {
    setIsLoading(provider);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loginProvider", provider);
      router.push("/dashboard");
    } finally {
      setIsLoading(null);
    }
  };

  const socialButtons = [
    {
      name: "Kakao",
      id: "kakao",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 5.58 2 10c0 2.54 1.19 4.83 3.1 6.4L4 22l4.56-2.4c1.28.4 2.63.6 4.04.6 5.38 0 10-3.58 10-8s-4.62-8-10-8z" />
        </svg>
      ),
      bgColor: "bg-[#FFE812]",
      textColor: "text-[#000000]",
      hoverColor: "hover:bg-[#FFD700]",
    },
    {
      name: "Naver",
      id: "naver",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9h-3V8.5h-1v6h1v-3h3v3h1v-6h-1v2.5z" />
        </svg>
      ),
      bgColor: "bg-[#00C73C]",
      textColor: "text-white",
      hoverColor: "hover:bg-[#00B530]",
    },
    {
      name: "Google",
      id: "google",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      ),
      bgColor: "bg-white",
      textColor: "text-[#202124]",
      hoverColor: "hover:bg-gray-100",
      border: "border border-gray-300",
    },
    {
      name: "Apple",
      id: "apple",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.05 13.5c-.91 2.18-.41 4.85 1.54 6.5 1.54 1.31 3.84.74 4.88-.74.5-.75.73-1.73.66-2.74-.32.06-.64.09-.97.09-2.53 0-4.68-1.66-5.11-4.11zm-5.28-3.92c1.85-1.11 4.05-1.33 5.96-.8.39-1.41.44-2.92.08-4.4C15.5.5 13.08-1.22 10.56.22c-.42.25-.78.58-1.08.96-1.06 1.45-1.35 3.56-.55 5.46zm4.15-7.42c1.51.15 2.84 1.08 3.5 2.3.26-.08.51-.14.77-.18 1.34-.2 2.68.12 3.83 1.01-.7-1.65-2.1-2.98-3.8-3.47-1.33-.38-2.75-.32-4.1.1-.06.09-.1.19-.2.24zM5.3 6.28c-1.43 0-2.6 1.17-2.6 2.6 0 1.43 1.17 2.6 2.6 2.6 1.43 0 2.6-1.17 2.6-2.6 0-1.43-1.17-2.6-2.6-2.6z" />
        </svg>
      ),
      bgColor: "bg-black",
      textColor: "text-white",
      hoverColor: "hover:bg-gray-900",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F3] via-[#FFF5E6] to-[#FFF9F0]">
      <div className="flex flex-col lg:flex-row items-stretch justify-stretch min-h-screen">
        <div className="w-full lg:w-1/2 flex flex-col px-4 py-8 sm:px-6 sm:py-12 lg:p-12 order-2 lg:order-1">
          <div className="mb-8">
            <Logo size="lg" />
          </div>

          <div className="flex flex-col items-center justify-center flex-1">
            <div className="w-full max-w-md space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a]">
                  부모의 지도하에
                  <br />
                  함께 성장하는
                  <br />
                  AI 교육 팀
                </h2>
                <p className="text-base text-[#666666] leading-relaxed">
                  자녀의 재능을 먼저 찾아주고, AI 선생과 비서가 부모님을 도와 효과적인 학습을 이끌어냅니다
                </p>
              </div>

              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/parent-child-learning.jpg"
                  alt="부모와 자녀가 함께 학습하는 따뜻한 모습"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:p-12 order-1 lg:order-2">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-3 text-center">
              <h1 className="text-4xl font-bold text-[#1a1a1a]">
                만나서 반갑습니다!
              </h1>
            </div>

            <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-[#FFE4CC] space-y-3">
              <h2 className="font-semibold text-[#333333] text-sm">
                홈카데미는 이런 서비스입니다
              </h2>
              <ul className="space-y-2 text-sm text-[#555555]">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8A5B] font-bold flex-shrink-0">•</span>
                  <span>
                    AI가 학습 데이터를 분석하고 최적화된 학습 경로를 제안합니다
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8A5B] font-bold flex-shrink-0">•</span>
                  <span>
                    부모님을 위한 맞춤형 교육 조언으로 효과적인 학습 지도를 도와줍니다
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8A5B] font-bold flex-shrink-0">•</span>
                  <span>
                    자녀와의 소통을 강화하고 함께 성장하는 경험을 선사합니다
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-center text-[#666666] font-medium">
                간편하게 로그인하세요
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {socialButtons.map((provider) => (
                  <Button
                    key={provider.id}
                    onClick={() => handleLogin(provider.id)}
                    disabled={isLoading !== null}
                    className={`h-12 sm:h-14 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 ${provider.bgColor} ${provider.textColor} ${provider.hoverColor} ${provider.border || ""} flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                    variant="ghost"
                  >
                    <span className="flex-shrink-0">{provider.icon}</span>
                    <span className="hidden sm:inline">{provider.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <p className="text-xs text-center text-[#999999]">
              로그인하면{" "}
              <a href="#" className="text-[#FF8A5B] hover:underline">
                이용약관
              </a>
              과{" "}
              <a href="#" className="text-[#FF8A5B] hover:underline">
                개인정보 처리방침
              </a>
              에 동의하게 됩니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
