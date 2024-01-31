import { parseInputNumber } from '@/utils/numberUtils';
import { ChangeEvent } from 'react';
import { create } from 'zustand';

interface IDownPaymentStore {
  downPayment: string;
  handleDownPayment: ({ target }: ChangeEvent<HTMLInputElement>) => void;
}

const useDownPaymentStore = create<IDownPaymentStore>((set) => ({
  downPayment: '',

  handleDownPayment: ({ target }) => {
    const downPaymentInputValue = parseInputNumber(target.value);

    set(() => ({
      downPayment: downPaymentInputValue.toString(),
    }));
  },
}));

export default useDownPaymentStore;
