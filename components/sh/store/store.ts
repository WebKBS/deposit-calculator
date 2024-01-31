import { parseInputNumber } from '@/utils/numberUtils';
import { ChangeEvent } from 'react';
import { create } from 'zustand';

interface IShCalculatorStore {
  isDepositChange: boolean;
  toggleDepositChange: () => void;
  enteredInput: {
    defaultDeposit: string;
    defaultRent: string;
    downPayment: string;
    balance: string;
    maxConversionRate: string;
    conversionRate: string;
    desiredDeposit: string;
  };

  handleDefaultDeposit: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  handleDefaultRent: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  handleDownPayment: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

const useShCalculatorStore = create<IShCalculatorStore>((set) => ({
  // 월세 전세 변경 버튼 클릭시
  isDepositChange: false,
  toggleDepositChange: () =>
    set((state) => ({ isDepositChange: !state.isDepositChange })),

  //인풋 입력값
  enteredInput: {
    defaultDeposit: '',
    defaultRent: '',
    downPayment: '',
    balance: '',
    maxConversionRate: '',
    conversionRate: '',
    desiredDeposit: '',
  },

  // 기본 보증금 계산
  handleDefaultDeposit: ({ target }) => {
    const defaultDepositInputValue = parseInputNumber(target.value);

    set((state) => ({
      enteredInput: {
        ...state.enteredInput,
        defaultDeposit: defaultDepositInputValue.toLocaleString(),
      },
    }));
  },

  handleDefaultRent: ({ target }) => {
    const defaultRentInputValue = parseInputNumber(target.value);
    set((state) => ({
      enteredInput: {
        ...state.enteredInput,
        defaultRent: defaultRentInputValue.toLocaleString(),
      },
    }));
  },

  handleDownPayment: ({ target }) => {
    const downPaymentInputValue = parseInputNumber(target.value);

    set((state) => ({
      enteredInput: {
        ...state.enteredInput,
        downPayment: downPaymentInputValue.toLocaleString(),
      },
    }));
  },
}));

export default useShCalculatorStore;
