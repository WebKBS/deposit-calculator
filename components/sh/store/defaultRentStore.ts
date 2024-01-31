import { parseInputNumber } from '@/utils/numberUtils';
import { ChangeEvent } from 'react';
import { create } from 'zustand';

interface IDefaultRentStore {
  defaultRent: string;
  setDefaultRent: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

const useDefaultRentStore = create<IDefaultRentStore>((set) => ({
  defaultRent: '',

  setDefaultRent: ({ target }) => {
    const defaultRentInputValue = parseInputNumber(target.value);

    set(() => ({
      defaultRent: defaultRentInputValue.toLocaleString(),
    }));
  },
}));

export default useDefaultRentStore;
