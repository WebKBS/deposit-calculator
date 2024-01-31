import { parseInputNumber } from '@/utils/numberUtils';
import { ChangeEvent } from 'react';
import { create } from 'zustand';

interface IBalanceStore {
  balance: string;
  setBalance: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

const useBalanceStore = create<IBalanceStore>((set) => ({
  balance: '',

  setBalance: ({ target }) => {
    const balanceInputValue = parseInputNumber(target.value);

    set(() => ({
      balance: balanceInputValue.toLocaleString(),
    }));
  },
}));

export default useBalanceStore;
