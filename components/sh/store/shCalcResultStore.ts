import { create } from 'zustand';

interface IUseShCalcResultStore {
  calcDownPayment: string;
  calcBalance: string;
  calcFinalRent: string;

  setCalcDownPayment: (calcDownPayment: string) => void;
  setCalcBalance: (calcBalance: string) => void;
  setCalcFinalRent: (value: string) => void;
}

const useShCalcResultStore = create<IUseShCalcResultStore>((set, get) => ({
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

export default useShCalcResultStore;
