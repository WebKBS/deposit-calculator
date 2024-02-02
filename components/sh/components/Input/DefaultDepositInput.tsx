'use client';
import { Input } from '@/components/ui/input';
import { parseInputNumber } from '@/utils/numberUtils';
import { conversionAmount } from '@/utils/sh/calculator';
import { useRef } from 'react';
import { toast } from 'sonner';
import shCalcResultStore from '../../store/shCalcResultStore';
import useShStore from '../../store/shStore';

const DefaultDepositInput = () => {
  const ref = useRef<HTMLInputElement>(null);

  const defaultDeposit = useShStore((state) => state.defaultDeposit);

  const downPayment = useShStore((state) => state.downPayment);
  const balance = useShStore((state) => state.balance);

  const setCalcDownPayment = shCalcResultStore(
    (state) => state.setCalcDownPayment
  );
  const setCalcBalance = shCalcResultStore((state) => state.setCalcBalance);
  const setDefaultDeposit = useShStore((state) => state.setDefaultDeposit);

  // 리셋
  const resetValue = useShStore((state) => state.resetValue);
  const resetCalcValue = shCalcResultStore((state) => state.resetCalcValue);

  // ref 상태
  const refState = useShStore((state) => state.refState);
  const setRefState = useShStore((state) => state.setRefState);

  if (refState && defaultDeposit === '') {
    ref.current?.focus();
    setRefState(false);
    return;
  }

  const handleDefaultDeposit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const defaultDepositNumber = parseInputNumber(event.target.value);
    setDefaultDeposit(event);

    const maxConversionRate = useShStore.getState().maxConversionRate;
    const conversionRate = useShStore.getState().conversionRate;
    const desiredDeposit = useShStore.getState().desiredDeposit;

    if (maxConversionRate || conversionRate || desiredDeposit) {
      resetValue();
      resetCalcValue();
      toast('상호전환 계산이 초기화 되었습니다.', {
        action: {
          label: '확인',
          onClick: () => console.log('toast closed'),
        },
      });
    }

    if (downPayment && balance) {
      const updatedCalcDownPayment = conversionAmount(
        defaultDepositNumber,
        +downPayment
      );

      const updatedCalcBalance = conversionAmount(
        defaultDepositNumber,
        +balance
      );

      setCalcDownPayment(updatedCalcDownPayment.toLocaleString());
      setCalcBalance(updatedCalcBalance.toLocaleString());
    }
  };

  return (
    <Input
      ref={ref}
      id="defaultDeposit"
      type="text"
      placeholder="기본 보증금 입력"
      pattern="[0-9]*"
      inputMode="decimal"
      className="text-right border-red-500"
      onChange={handleDefaultDeposit}
      value={defaultDeposit}
    />
  );
};

export default DefaultDepositInput;
