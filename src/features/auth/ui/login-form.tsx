'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/src/shared/ui/logo';
import { Button } from '@/src/shared/ui/button';
import { AUTH_TEXT, SOCIAL_BUTTONS } from '../model/constants';

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleLogin = async (provider: string) => {
    setIsLoading(provider);
    try {
      // TODO: 실제 OAuth 인증 로직으로 교체 필요
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loginProvider', provider);
      router.push('/dashboard');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F3] via-[#FFF5E6] to-[#FFF9F0]">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="scale-50">
                <Logo size="lg" />
              </div>
            </div>
            <Button
              className="w-full h-12 sm:h-14 rounded-lg font-semibold text-sm sm:text-base bg-[#FF8A5B] hover:bg-[#FF7A45] text-white transition-all duration-200"
              variant="ghost"
            >
              {AUTH_TEXT.childCodeLogin}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <p className="text-xs text-[#CCCCCC]">{AUTH_TEXT.or}</p>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
            <p className="text-sm text-center text-[#666666] font-medium">
              {AUTH_TEXT.socialLogin}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {SOCIAL_BUTTONS.map((provider) => (
                <Button
                  key={provider.id}
                  onClick={() => handleLogin(provider.id)}
                  disabled={isLoading !== null}
                  className={`h-12 sm:h-14 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 ${provider.bgColor} ${provider.textColor} ${provider.hoverColor} ${provider.border} flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                  variant="ghost"
                >
                  <span className="flex-shrink-0">{provider.icon}</span>
                  <span className="hidden sm:inline">{provider.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <p className="text-xs text-center text-[#999999]">
            {AUTH_TEXT.terms}
          </p>
        </div>
      </div>
    </div>
  );
}
