import { ChangeEvent } from 'react';
import { create } from 'zustand';

interface IConversionRateStore {
  conversionRate: string;
  setConversionRate: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

const useConversionRateStore = create<IConversionRateStore>((set) => ({
  conversionRate: '',

  setConversionRate: ({ target }) => {
    set(() => ({
      conversionRate: target.value,
    }));
  },
}));

export default useConversionRateStore;
