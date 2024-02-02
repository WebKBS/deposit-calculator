'use client';
import { Input } from '@/components/ui/input';
import { removeCommaAndConvert } from '@/utils/numberUtils';
import { conversionAmount } from '@/utils/sh/calculator';
import { ChangeEvent, useRef } from 'react';
import useShCalcResultStore from '../../store/shCalcResultStore';
import useShStore from '../../store/shStore';

const DownPaymentInput = () => {
  const ref = useRef<HTMLInputElement>(null);

  const downPayment = useShStore((state) => state.downPayment);
  const setDownPayment = useShStore((state) => state.setDownPayment);
  const setBalance = useShStore((state) => state.setBalance);
  const setCalcDownPayment = useShCalcResultStore(
    (state) => state.setCalcDownPayment
  );
  const setCalcBalance = useShCalcResultStore((state) => state.setCalcBalance);

  // ref 상태
  const setRefState = useShStore((state) => state.setRefState);

  const handleDownPayment = (event: ChangeEvent<HTMLInputElement>) => {
    const defaultDeposit = useShStore.getState().defaultDeposit;

    if (!defaultDeposit) {
      alert('기본 보증금을 입력해주세요.');
      setRefState(true);
      return;
    }

    if (+event.target.value > 100) {
      alert(`계약금 비율은 100%를 초과할 수 없습니다.`);
      return;
    }

    setDownPayment(event);

    const percentage = 100 - +event.target.value;
    const removeCommaDefaultDeposit = removeCommaAndConvert(defaultDeposit);

    const calcDownPayment = conversionAmount(
      removeCommaDefaultDeposit,
      +event.target.value
    );
    const calcBalance = conversionAmount(removeCommaDefaultDeposit, percentage);

    setCalcDownPayment(calcDownPayment.toLocaleString()); // 계약금 추가
    setBalance(percentage); // 잔금 백분율 추가
    setCalcBalance(calcBalance.toLocaleString()); // 잔금 추가
  };

  return (
    <>
      <div className="flex items-center gap-1">
        <Input
          ref={ref}
          id="downPayment"
          type="text"
          placeholder="계약금"
          pattern="[0-9]*"
          inputMode="decimal"
          className="flex-1 w-20 text-right border-red-500"
          maxLength={6}
          onChange={handleDownPayment}
          value={downPayment}
        />
        <span>%</span>
      </div>
    </>
  );
};
export default DownPaymentInput;
