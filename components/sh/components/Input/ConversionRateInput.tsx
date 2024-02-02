import { Input } from '@/components/ui/input';
import { removeCommaAndConvert } from '@/utils/numberUtils';
import {
  maxConversionRateAmount,
  maximumMonthlyRentAmount,
} from '@/utils/sh/calculator';
import { ChangeEvent } from 'react';
import { useDepositChangeStore } from '../../store/depositChangeStore';
import useShCalcResultStore from '../../store/shCalcResultStore';
import useShStore from '../../store/shStore';

const ConversionRateInput = () => {
  const conversionRate = useShStore((state) => state.conversionRate);

  const setConversionRate = useShStore((state) => state.setConversionRate);

  const setCalcRent = useShCalcResultStore((state) => state.setCalcRent);
  const setCalcDeposit = useShCalcResultStore((state) => state.setCalcDeposit);

  const handleConversionRate = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 100) {
      alert(`최대 전환율은 100%를 초과할 수 없습니다.`);
      return;
    }

    setConversionRate(event);

    const defaultDeposit = useShStore.getState().defaultDeposit;
    const defaultRent = useShStore.getState().defaultRent;
    const calcDeposit = useShCalcResultStore.getState().calcDeposit;
    const isDepositChange = useDepositChangeStore.getState().isDepositChange;

    const removeCommaDefaultDeposit = removeCommaAndConvert(defaultDeposit);
    const removeCommaDefaultRent = removeCommaAndConvert(defaultRent);
    const removeCommaCalcDeposit = removeCommaAndConvert(calcDeposit);

    if (!isDepositChange) {
      // 최소 보증금 월 임대료 상향일 경우
      const maximumRent = maximumMonthlyRentAmount(
        removeCommaDefaultRent,
        removeCommaCalcDeposit,
        removeCommaDefaultDeposit,
        +event.target.value
      );

      setCalcRent(maximumRent.toLocaleString());
    } else {
      // 최소 월 임대료 보증금 상향일 경우

      const calcRent = useShCalcResultStore.getState().calcRent;
      const minimumRent = removeCommaAndConvert(calcRent);

      const maximumDeposit = maxConversionRateAmount(
        removeCommaDefaultRent,
        minimumRent,
        removeCommaDefaultDeposit,
        +event.target.value
      );

      setCalcRent(minimumRent.toLocaleString());
      setCalcDeposit(
        maximumDeposit === Infinity ? '0' : maximumDeposit.toLocaleString()
      );
    }
  };

  return (
    <Input
      type="text"
      placeholder="%"
      maxLength={6}
      className="w-16 h-8 text-right border-red-500"
      onChange={handleConversionRate}
      value={conversionRate}
    />
  );
};

export default ConversionRateInput;
