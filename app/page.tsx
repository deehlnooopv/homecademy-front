import { redirect } from 'next/navigation';

/**
 * 루트 페이지 - 랜딩 페이지로 리다이렉트
 * 로그인 상태 확인은 미들웨어 또는 각 페이지에서 처리
 */
export default function RootPage() {
  redirect('/landing');
}
