'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

const TEXT = {
  welcome: 'Welcome',
  childCodeLogin: 'Login with Child Code',
  or: 'or',
  socialLogin: 'Social Login',
  terms: 'By logging in, you agree to our Terms and Privacy Policy',
};

const socialButtons = [
  {
    name: 'Kakao',
    id: 'kakao',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 5.58 2 10c0 2.54 1.19 4.83 3.1 6.4L4 22l4.56-2.4c1.28.4 2.63.6 4.04.6 5.38 0 10-3.58 10-8s-4.62-8-10-8z" />
      </svg>
    ),
    bgColor: 'bg-[#FFE812]',
    textColor: 'text-[#000000]',
    hoverColor: 'hover:bg-[#FFD700]',
  },
  {
    name: 'Naver',
    id: 'naver',
    icon: <span className="text-lg font-bold">N</span>,
    bgColor: 'bg-[#00C73C]',
    textColor: 'text-white',
    hoverColor: 'hover:bg-[#00B530]',
  },
  {
    name: 'Google',
    id: 'google',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
    bgColor: 'bg-white',
    textColor: 'text-[#202124]',
    hoverColor: 'hover:bg-gray-100',
    border: 'border border-gray-300',
  },
  {
    name: 'Apple',
    id: 'apple',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 1.5c-.5 0-1.5 1-2 1s-1-.5-2-1c-1.5-1-2.5-1.5-4-1.5-3 0-6 2-7 5-.5 1.5-.5 3-.5 4.5 0 3 1 5.5 3 7 .5.5 1 1 1.5 1.5v2c0 1.5 1 2 2 2h.5c.5 0 1 0 1.5.5 1 .5 1.5 1 2.5 1s1.5-.5 2.5-1c.5-.5 1-.5 1.5-.5h.5c1 0 2-.5 2-2v-2c.5-.5 1-1 1.5-1.5 2-1.5 3-4 3-7 0-1.5 0-3-.5-4.5-1-3-4-5-7-5z" />
      </svg>
    ),
    bgColor: 'bg-black',
    textColor: 'text-white',
    hoverColor: 'hover:bg-gray-900',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(null);

  const handleLogin = async (provider) => {
    setIsLoading(provider);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loginProvider', provider);
      router.push('/dashboard');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F3] via-[#FFF5E6] to-[#FFF9F0] relative">
      <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-10">
        <Logo size="lg" />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-3 text-center">
            <h1 className="text-4xl font-bold text-[#1a1a1a]">
              {TEXT.welcome}
            </h1>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full h-12 sm:h-14 rounded-lg font-semibold text-sm sm:text-base bg-[#FF8A5B] hover:bg-[#FF7A45] text-white transition-all duration-200"
              variant="ghost"
            >
              {TEXT.childCodeLogin}
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-300"></div>
              <p className="text-xs text-[#CCCCCC]">{TEXT.or}</p>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <p className="text-sm text-center text-[#666666] font-medium">
              {TEXT.socialLogin}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {socialButtons.map((provider) => (
                <Button
                  key={provider.id}
                  onClick={() => handleLogin(provider.id)}
                  disabled={isLoading !== null}
                  className={`h-12 sm:h-14 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105 ${provider.bgColor} ${provider.textColor} ${provider.hoverColor} ${provider.border || ''} flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
                  variant="ghost"
                >
                  <span className="flex-shrink-0">{provider.icon}</span>
                  <span className="hidden sm:inline">{provider.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <p className="text-xs text-center text-[#999999]">
            {TEXT.terms}
          </p>
        </div>
      </div>
    </div>
  );
}
