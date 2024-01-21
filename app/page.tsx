import Calculator from '@/components/Calculator';

export default function Home() {
  return (
    <main className="flex-1">
      <div className="max-w-screen-md px-6 pt-8 m-auto">
        <h2 className="mb-6 text-2xl">SH 보증금 임대료 계산기</h2>
        <p className="text-xs text-right text-green-600 dark:text-yellow-300">
          *빨간색 부분만 입력하세요.
        </p>
        <Calculator />
      </div>
    </main>
  );
}
