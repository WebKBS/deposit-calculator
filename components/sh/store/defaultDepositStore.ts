import { parseInputNumber } from '@/utils/numberUtils';
import { ChangeEvent } from 'react';
import { create } from 'zustand';

interface IDefaultDepositStore {
  defaultDeposit: string;
  handleDefaultDeposit: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

const useDefaultDepositStore = create<IDefaultDepositStore>((set) => ({
  defaultDeposit: '',

  handleDefaultDeposit: ({ target }) => {
    const defaultDepositInputValue = parseInputNumber(target.value);

    set(() => ({
      defaultDeposit: defaultDepositInputValue.toLocaleString(),
    }));
  },
}));

export default useDefaultDepositStore;
