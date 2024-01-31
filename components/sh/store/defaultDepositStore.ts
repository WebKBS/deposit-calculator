import { parseInputNumber } from '@/utils/numberUtils';
import { ChangeEvent } from 'react';
import { create } from 'zustand';

interface IDefaultDepositStore {
  defaultDeposit: string;
  setDefaultDeposit: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

const useDefaultDepositStore = create<IDefaultDepositStore>((set) => ({
  defaultDeposit: '',

  setDefaultDeposit: ({ target }) => {
    const defaultDepositInputValue = parseInputNumber(target.value);

    set(() => ({
      defaultDeposit: defaultDepositInputValue.toLocaleString(),
    }));
  },
}));

export default useDefaultDepositStore;
