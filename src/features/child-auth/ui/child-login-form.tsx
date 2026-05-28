'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/src/shared/ui/logo';
import { Button } from '@/src/shared/ui/button';
import { Input } from '@/src/shared/ui/input';
import { KeyRound, Star, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CODE_LENGTH = 6;

/**
 * 자녀 코드 로그인 폼
 * - 6자리 코드를 입력하여 자녀 전용 화면으로 진입
 * - 각 자리를 개별 입력 박스로 구성하여 게임적 UX 제공
 */
export function ChildLoginForm() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (index: number, value: string) => {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(-1);
    const next = [...code];
    next[index] = cleaned;
    setCode(next);
    setError(null);

    // 다음 입력칸으로 자동 이동
    if (cleaned && index < CODE_LENGTH - 1) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, CODE_LENGTH);
    const next = Array(CODE_LENGTH).fill('');
    pasted.split('').forEach((char, i) => { next[i] = char; });
    setCode(next);
    const lastIdx = Math.min(pasted.length, CODE_LENGTH - 1);
    document.getElementById(`code-${lastIdx}`)?.focus();
  };

  const handleSubmit = async () => {
    const fullCode = code.join('');
    if (fullCode.length < CODE_LENGTH) {
      setError('코드 6자리를 모두 입력해 주세요.');
      return;
    }
    setIsLoading(true);
    try {
      // TODO: 실제 코드 검증 API 연동 필요
      await new Promise((resolve) => setTimeout(resolve, 900));
      localStorage.setItem('childCode', fullCode);
      localStorage.setItem('childLoggedIn', 'true');
      router.push('/child');
    } catch {
      setError('올바르지 않은 코드예요. 다시 확인해 주세요!');
    } finally {
      setIsLoading(false);
    }
  };

  const isFilled = code.every((c) => c !== '');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 via-amber-50 to-white px-4 py-12 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-violet-200/20 rounded-full blur-2xl pointer-events-none" />

      {/* 뒤로가기 */}
      <div className="absolute top-6 left-6">
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-xl">
          <Link href="/login" className="flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Link>
        </Button>
      </div>

      <div className="w-full max-w-sm space-y-8 relative z-10">
        {/* 로고 */}
        <div className="flex justify-center">
          <Logo size="xl" />
        </div>

        {/* 헤더 */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg shadow-orange-200 mb-2">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">자녀 코드로 입장하기</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            부모님께 받은 <span className="font-bold text-orange-500">6자리 코드</span>를 입력하면<br />
            나만의 학습 공간으로 들어갈 수 있어요!
          </p>
        </div>

        {/* 코드 입력 박스 */}
        <div className="space-y-4">
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {code.map((char, i) => (
              <input
                key={i}
                id={`code-${i}`}
                type="text"
                inputMode="text"
                maxLength={1}
                value={char}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`w-11 h-14 text-center text-xl font-extrabold rounded-xl border-2 outline-none transition-all duration-200 bg-white shadow-sm
                  ${char ? 'border-orange-400 text-orange-600 bg-orange-50 scale-105' : 'border-border text-foreground'}
                  focus:border-orange-400 focus:ring-2 focus:ring-orange-200 focus:scale-105
                  ${error ? 'border-red-400 bg-red-50' : ''}`}
              />
            ))}
          </div>

          {error && (
            <p className="text-center text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
              {error}
            </p>
          )}
        </div>

        {/* 입장 버튼 */}
        <Button
          onClick={handleSubmit}
          disabled={!isFilled || isLoading}
          className="w-full h-13 rounded-xl font-bold text-base bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white shadow-md shadow-orange-200 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          size="lg"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              입장 중...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              나의 학습 공간으로 입장!
              <ArrowRight className="w-5 h-5" />
            </div>
          )}
        </Button>

        {/* 안내 문구 */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
            <p className="text-xs font-bold text-amber-700">코드를 모르시나요?</p>
          </div>
          <p className="text-xs text-amber-600 leading-relaxed pl-6">
            부모님께 홈카데미 앱에서 자녀 코드를 확인해달라고 부탁해 보세요.
          </p>
        </div>
      </div>
    </div>
  );
}
