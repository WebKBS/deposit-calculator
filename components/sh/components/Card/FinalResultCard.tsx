import FinalResult from '../Result/FinalResult';

const FinalResultCard = () => {
  return (
    <div className="max-w-80 mx-auto pb-12">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">예상 월 임대료:</h3>
        <p className="flex items-center">
          <FinalResult /> 원
        </p>
      </div>
      <p className="text-xs text-right mt-2">
        * 참고용이며, 소수점 절삭 및 실제 금액과 다소 다를 수 있습니다.
      </p>
    </div>
  );
};

export default FinalResultCard;
