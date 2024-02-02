'use client';
import useShCalcResultStore from '@/components/sh/store/shCalcResultStore';
import { useDepositChangeStore } from '../../../store/depositChangeStore';

const RentResultValue = () => {
  const isDepositChange = useDepositChangeStore(
    (state) => state.isDepositChange
  );
  const textColor = isDepositChange ? 'text-blue-500' : 'text-red-500';

  const calcRent = useShCalcResultStore((state) => state.calcRent);

  return (
    <span className={`mr-1 text-xl font-semibold break-all ${textColor}`}>
      {calcRent || 0}
    </span>
  );
};

export default RentResultValue;
