import { Input } from '@/components/ui/input';
import { removeCommaAndConvert } from '@/utils/numberUtils';
import { conversionAmount } from '@/utils/sh/calculator';
import { ChangeEvent } from 'react';
import { useDepositChangeStore } from '../../store/depositChangeStore';
import useShCalcResultStore from '../../store/shCalcResultStore';
import {
  default as useMaxConversionRateStore,
  default as useShStore,
} from '../../store/shStore';

const MaxConversionRateInput = () => {
  const maxConversionRate = useMaxConversionRateStore(
    (state) => state.maxConversionRate
  );

  const setMaxConversionRate = useMaxConversionRateStore(
    (state) => state.setMaxConversionRate
  );

  const setCalcDeposit = useShCalcResultStore((state) => state.setCalcDeposit);
  const setCalcRent = useShCalcResultStore((state) => state.setCalcRent);

  const handleMaxConversionRate = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 100) {
      alert(`최대 전환율은 100%를 초과할 수 없습니다.`);
      return;
    }

    setMaxConversionRate(event);

    const defaultDeposit = useShStore.getState().defaultDeposit;
    const defaultRent = useShStore.getState().defaultRent;
    const isDepositChange = useDepositChangeStore.getState().isDepositChange;

    const removeCommaDefaultDeposit = removeCommaAndConvert(defaultDeposit);
    const removeCommaDefaultRent = removeCommaAndConvert(defaultRent);

    if (!isDepositChange) {
      // 월 임대료 상향일 경우
      console.log('월 임대료 상향일 경우');

      const minimumDeposit = conversionAmount(
        removeCommaDefaultDeposit,
        +event.target.value
      );

      setCalcDeposit(minimumDeposit.toLocaleString());
    } else {
      // 보증금 상향일 경우

      const minimumRent = conversionAmount(
        removeCommaDefaultRent,
        +event.target.value
      );

      setCalcRent(minimumRent.toLocaleString());
    }
  };

  return (
    <Input
      type="text"
      placeholder="%"
      pattern="[0-9]*"
      inputMode="decimal"
      maxLength={6}
      className="w-16 h-8 text-right border-red-500"
      onChange={handleMaxConversionRate}
      value={maxConversionRate}
    />
  );
};

export default MaxConversionRateInput;
