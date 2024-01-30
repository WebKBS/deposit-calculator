export default function Result({
  calcDesiredDeposit,
}: {
  calcDesiredDeposit: string;
}) {
  return (
    <div className="max-w-80 mx-auto pb-12">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">예상 월 임대료:</h3>
        <p className="flex items-center">
          <strong className="mr-1 text-2xl font-semibold text-red-500 break-all">
            {calcDesiredDeposit || 0}
          </strong>
          원
        </p>
      </div>
      <p className="text-xs text-right mt-2">
        * 참고용이며, 소수점 절삭 및 실제 금액과 다소 다를 수 있습니다.
      </p>
    </div>
  );
}
