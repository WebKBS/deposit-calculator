import Calculator from '@/components/Calculator';

export default function Home() {
  return (
    <main className="flex-1">
      <div className="max-w-screen-md m-auto pt-8 px-6">
        <h2 className="mb-6">SH 보증금 임대료 계산기</h2>
        <Calculator />
      </div>
    </main>
  );
}
