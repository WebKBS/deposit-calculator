export default function CurrentBasicDeposit({
  defaultDeposit,
}: {
  defaultDeposit: string;
}) {
  return (
    <div className="mb-2 text-right mt-2 text-sm ">
      현재 기본 보증금:{' '}
      <span className="text-green-500 dark:text-yellow-300">
        {defaultDeposit || 0}
      </span>{' '}
      원
    </div>
  );
}
