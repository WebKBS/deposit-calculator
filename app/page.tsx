import Calculator from '@/components/Calculator';
import FormSkeleton from '@/components/Skeleton/FormSkeleton';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="flex-1">
      <div className="max-w-screen-md px-6 pt-8 m-auto">
        <h1 className="mb-1 text-2xl font-bold">SH 보증금 임대료 계산기</h1>
        <p className="text-xs mb-2 break-keep">
          *본 페이지는 SH 보증금 임대료 상호전환 전용 계산기 이며, 타
          상호전환과는 금액이 다를 수 있습니다.
        </p>
        <p className="text-xs text-right text-green-600 dark:text-yellow-300">
          *빨간색 부분만 입력하세요.
        </p>
        <Suspense fallback={<FormSkeleton />}>
          <Calculator />
        </Suspense>
      </div>
    </main>
  );
}
