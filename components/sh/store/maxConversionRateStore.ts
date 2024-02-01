import { ChangeEvent } from 'react';
import { create } from 'zustand';

interface ImaxConversionRateStore {
  maxConversionRate: string;
  setMaxConversionRate: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

const useMaxConversionRateStore = create<ImaxConversionRateStore>((set) => ({
  maxConversionRate: '',

  setMaxConversionRate: ({ target }) => {
    set(() => ({
      maxConversionRate: target.value,
    }));
  },
}));

export default useMaxConversionRateStore;
