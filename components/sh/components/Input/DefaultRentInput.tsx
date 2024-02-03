'use client';
import { Input } from '@/components/ui/input';
import { useRef } from 'react';
import { toast } from 'sonner';
import useShCalcResultStore from '../../store/shCalcResultStore';
import {
  default as useDefaultRentStore,
  default as useShStore,
} from '../../store/shStore';

const DefaultRentInput = () => {
  const ref = useRef<HTMLInputElement>(null);

  const defaultRent = useDefaultRentStore((state) => state.defaultRent);
  const setDefaultRent = useDefaultRentStore((state) => state.setDefaultRent);

  // 리셋
  const resetValue = useShStore((state) => state.resetValue);
  const resetCalcValue = useShCalcResultStore((state) => state.resetCalcValue);

  // ref 상태
  const refState = useShStore((state) => state.refState);
  const setRefState = useShStore((state) => state.setRefState);

  if (refState && defaultRent === '') {
    ref.current?.focus();
    setRefState(false);
  }

  const handleDefaultRent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultRent(event);

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
  };

  return (
    <Input
      ref={ref}
      id="rent"
      type="text"
      placeholder="기본 월 임대료 입력"
      pattern="[0-9]*"
      inputMode="decimal"
      className="text-right border-red-500"
      onChange={handleDefaultRent}
      value={defaultRent}
    />
  );
};

export default DefaultRentInput;
