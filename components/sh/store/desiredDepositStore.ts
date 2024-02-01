import { parseInputNumber } from '@/utils/numberUtils';
import { ChangeEvent } from 'react';
import { create } from 'zustand';

interface IDesiredDepositStore {
  desiredDeposit: string;
  setDesiredDeposit: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

const useDesiredDepositStore = create<IDesiredDepositStore>((set) => ({
  desiredDeposit: '',

  setDesiredDeposit: ({ target }) => {
    const desiredDepositInputValue = parseInputNumber(target.value);

    set({ desiredDeposit: desiredDepositInputValue.toLocaleString() });
  },
}));

export default useDesiredDepositStore;
