import { create } from 'zustand';

interface IShStore {
  calcDownPayment: string;
  calcBalance: string;
  calcFinalRent: string;

  setCalcDownPayment: (calcDownPayment: string) => void;
  setCalcBalance: (calcBalance: string) => void;
  setCalcFinalRent: (value: string) => void;
}

const useShStore = create<IShStore>((set) => ({
  calcDownPayment: '',
  calcBalance: '',
  calcFinalRent: '',

  setCalcDownPayment: (value: string) => {
    set(() => ({
      calcDownPayment: value,
    }));
  },

  setCalcBalance: (value: string) => {
    set(() => ({
      calcBalance: value,
    }));
  },

  setCalcFinalRent: (value) => {
    set(() => ({
      calcFinalRent: value,
    }));
  },
}));

export default useShStore;
