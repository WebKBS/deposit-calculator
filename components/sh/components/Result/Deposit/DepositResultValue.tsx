'use client';
import useShCalcResultStore from '@/components/sh/store/shCalcResultStore';
import { useDepositChangeStore } from '../../../store/depositChangeStore';

const DepositResultValue = () => {
  const isDepositChange = useDepositChangeStore(
    (state) => state.isDepositChange
  );
  const textColor = !isDepositChange ? 'text-blue-500' : 'text-red-500';

  const calcDeposit = useShCalcResultStore((state) => state.calcDeposit);

  return (
    <span className={`mr-1 text-xl font-semibold break-all ${textColor}`}>
      {calcDeposit || 0}
    </span>
  );
};

export default DepositResultValue;
