'use client';
import useShCalcResultStore from '../../store/shCalcResultStore';

const FinalResult = () => {
  const calcFinalRent = useShCalcResultStore((state) => state.calcFinalRent);

  return (
    <strong className="mr-1 text-2xl font-semibold text-red-500 break-all">
      {calcFinalRent || 0}
    </strong>
  );
};

export default FinalResult;
