/**
 * 인증 관련 텍스트 상수
 */
export const AUTH_TEXT = {
  headline: '아이의 재능을 찾아주는\n가장 스마트한 방법',
  subheadline: 'AI 부모님이 분석하고, 부모님이 이끄는\n맞춤형 홈 러닝 플랫폼',
  childCodeLogin: '자녀 코드로 로그인',
  childCodeDesc: '부모님에게 받은 코드로 입장',
  or: '또는',
  socialLogin: '소셜 계정으로 시작하기',
  terms: '로그인하면 이용약관 및 개인정보처리방침에 동의합니다',
} as const;

/**
 * 소셜 로그인 버튼 설정 데이터
 * - 각 소셜 플랫폼의 공식 브랜드 색상 및 아이콘 사용
 */
export const SOCIAL_BUTTONS = [
  {
    name: '카카오',
    id: 'kakao',
    bgColor: 'bg-[#FEE500]',
    textColor: 'text-[#191919]',
    hoverColor: 'hover:bg-[#F5DC00]',
    border: '',
  },
  {
    name: '네이버',
    id: 'naver',
    bgColor: 'bg-[#03C75A]',
    textColor: 'text-white',
    hoverColor: 'hover:bg-[#02B350]',
    border: '',
  },
  {
    name: '구글',
    id: 'google',
    bgColor: 'bg-white',
    textColor: 'text-[#3C4043]',
    hoverColor: 'hover:bg-gray-50',
    border: 'border border-[#DADCE0]',
  },
  {
    name: '애플',
    id: 'apple',
    bgColor: 'bg-[#000000]',
    textColor: 'text-white',
    hoverColor: 'hover:bg-[#1a1a1a]',
    border: '',
  },
] as const;
