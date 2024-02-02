import { parseInputNumber } from '@/utils/numberUtils';
import { ChangeEvent } from 'react';
import { create } from 'zustand';

interface IUseShStore {
  defaultDeposit: string;
  defaultRent: string;
  downPayment: string;
  balance: string;
  conversionRate: string;
  maxConversionRate: string;
  desiredDeposit: string;

  setDefaultDeposit: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  setDefaultRent: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  setDownPayment: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  setBalance: (by: number) => void;
  setConversionRate: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  setMaxConversionRate: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  setDesiredDeposit: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  resetValue: () => void;
}

const useShStore = create<IUseShStore>((set) => ({
  defaultDeposit: '',
  defaultRent: '',
  downPayment: '',
  balance: '',
  conversionRate: '',
  maxConversionRate: '',
  desiredDeposit: '',

  setDefaultDeposit: ({ target }) => {
    const defaultDepositInputValue = parseInputNumber(target.value);

    set(() => ({
      defaultDeposit: defaultDepositInputValue.toLocaleString(),
    }));
  },

  setDefaultRent: ({ target }) => {
    const defaultRentInputValue = parseInputNumber(target.value);

    set(() => ({
      defaultRent: defaultRentInputValue.toLocaleString(),
    }));
  },

  setDownPayment: ({ target }) => {
    set(() => ({
      downPayment: target.value,
    }));
  },

  setBalance: (value) => {
    set({ balance: value.toString() });
  },

  setConversionRate: ({ target }) => {
    set(() => ({
      conversionRate: target.value,
    }));
  },

  setMaxConversionRate: ({ target }) => {
    set(() => ({
      maxConversionRate: target.value,
    }));
  },

  setDesiredDeposit: ({ target }) => {
    const desiredDepositInputValue = parseInputNumber(target.value);

    set({ desiredDeposit: desiredDepositInputValue.toLocaleString() });
  },

  resetValue: () => {
    set({
      conversionRate: '',
      maxConversionRate: '',
      desiredDeposit: '',
    });
  },
}));

export default useShStore;
