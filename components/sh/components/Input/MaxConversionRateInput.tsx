'use client';
import { Input } from '@/components/ui/input';
import { removeCommaAndConvert } from '@/utils/numberUtils';
import {
  conversionAmount,
  maxConversionRateAmount,
  maximumMonthlyRentAmount,
} from '@/utils/sh/calculator';
import { ChangeEvent, useRef } from 'react';
import { useDepositChangeStore } from '../../store/depositChangeStore';
import useShCalcResultStore from '../../store/shCalcResultStore';
import {
  default as useMaxConversionRateStore,
  default as useShStore,
} from '../../store/shStore';

const MaxConversionRateInput = () => {
  const ref = useRef<HTMLInputElement>(null);

  const maxConversionRate = useMaxConversionRateStore(
    (state) => state.maxConversionRate
  );

  const setMaxConversionRate = useMaxConversionRateStore(
    (state) => state.setMaxConversionRate
  );

  const setCalcDeposit = useShCalcResultStore((state) => state.setCalcDeposit);
  const setCalcRent = useShCalcResultStore((state) => state.setCalcRent);

  // ref 상태
  const refState = useShStore((state) => state.refState);
  const setRefState = useShStore((state) => state.setRefState);

  if (refState && maxConversionRate === '') {
    ref.current?.focus();
    setRefState(false);
    return;
  }

  const handleMaxConversionRate = (event: ChangeEvent<HTMLInputElement>) => {
    const defaultDeposit = useShStore.getState().defaultDeposit;
    const defaultRent = useShStore.getState().defaultRent;

    if (!defaultDeposit) {
      setRefState(true);
      alert('기본 보증금을 입력해주세요.');
      return;
    } else if (!defaultRent) {
      setRefState(true);
      alert('기본 월 임대료를 입력해주세요.');
      return;
    }

    if (+event.target.value > 100) {
      alert(`최대 전환율은 100%를 초과할 수 없습니다.`);
      return;
    }

    setMaxConversionRate(event);

    useShStore.setState({ desiredDeposit: '' }); // 희망 보증금 초기화
    useShCalcResultStore.setState({ calcFinalRent: '' }); // 최종 월 임대료 초기화

    const conversionRate = useShStore.getState().conversionRate;

    const isDepositChange = useDepositChangeStore.getState().isDepositChange;

    const removeCommaDefaultDeposit = removeCommaAndConvert(defaultDeposit);
    const removeCommaDefaultRent = removeCommaAndConvert(defaultRent);

    if (!isDepositChange) {
      // 월 임대료 상향일 경우

      const minimumDeposit = conversionAmount(
        removeCommaDefaultDeposit,
        +event.target.value
      );

      setCalcDeposit(minimumDeposit.toLocaleString());

      if (conversionRate !== '') {
        // 전환율이 입력되어 있을 경우
        const maximumRent = maximumMonthlyRentAmount(
          removeCommaDefaultRent,
          minimumDeposit,
          removeCommaDefaultDeposit,
          +conversionRate
        );

        setCalcRent(maximumRent.toLocaleString());
      }
    } else {
      // 보증금 상향일 경우

      const minimumRent = conversionAmount(
        removeCommaDefaultRent,
        +event.target.value
      );

      setCalcRent(minimumRent.toLocaleString());

      if (conversionRate !== '') {
        // 전환율이 입력되어 있을 경우
        const maximumDeposit = maxConversionRateAmount(
          removeCommaDefaultRent,
          minimumRent,
          removeCommaDefaultDeposit,
          +conversionRate
        );

        setCalcDeposit(maximumDeposit.toLocaleString());
      }
    }
  };

  return (
    <Input
      ref={ref}
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
