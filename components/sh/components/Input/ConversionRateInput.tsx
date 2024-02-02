'use client';
import { Input } from '@/components/ui/input';
import { removeCommaAndConvert } from '@/utils/numberUtils';
import {
  maxConversionRateAmount,
  maximumMonthlyRentAmount,
} from '@/utils/sh/calculator';
import { ChangeEvent, useRef } from 'react';
import { useDepositChangeStore } from '../../store/depositChangeStore';
import useShCalcResultStore from '../../store/shCalcResultStore';
import useShStore from '../../store/shStore';

const ConversionRateInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const conversionRate = useShStore((state) => state.conversionRate);

  const setConversionRate = useShStore((state) => state.setConversionRate);

  const setCalcRent = useShCalcResultStore((state) => state.setCalcRent);
  const setCalcDeposit = useShCalcResultStore((state) => state.setCalcDeposit);

  // ref 상태
  const refState = useShStore((state) => state.refState);
  const setRefState = useShStore((state) => state.setRefState);

  if (refState && conversionRate === '') {
    ref.current?.focus();
    setRefState(false);
    return;
  }

  const handleConversionRate = (event: ChangeEvent<HTMLInputElement>) => {
    const defaultDeposit = useShStore.getState().defaultDeposit;
    const defaultRent = useShStore.getState().defaultRent;
    const maxConversionRate = useShStore.getState().maxConversionRate;

    if (!defaultDeposit) {
      alert('기본 보증금을 입력해주세요.');
      setRefState(true);
      return;
    } else if (!defaultRent) {
      alert('기본 월 임대료를 입력해주세요.');
      setRefState(true);
      return;
    } else if (!maxConversionRate) {
      alert('최대 전환율을 입력해주세요.');
      setRefState(true);
      return;
    }

    if (+event.target.value > 100) {
      alert(`최대 전환율은 100%를 초과할 수 없습니다.`);
      return;
    }

    setConversionRate(event);
    useShStore.setState({ desiredDeposit: '' }); // 희망 보증금 초기화
    useShCalcResultStore.setState({ calcFinalRent: '' }); // 최종 월 임대료 초기화

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
      ref={ref}
      type="text"
      placeholder="%"
      pattern="[0-9]*"
      inputMode="decimal"
      maxLength={6}
      className="w-16 h-8 text-right border-red-500"
      onChange={handleConversionRate}
      value={conversionRate}
    />
  );
};

export default ConversionRateInput;
