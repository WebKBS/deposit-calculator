import { create } from 'zustand';

interface IUseShCalcResultStore {
  calcDownPayment: string;
  calcBalance: string;
  calcDeposit: string;
  calcRent: string;
  calcFinalRent: string;

  setCalcDownPayment: (calcDownPayment: string) => void;
  setCalcBalance: (calcBalance: string) => void;
  setCalcDeposit: (calcDeposit: string) => void;
  setCalcRent: (calcRent: string) => void;
  setCalcFinalRent: (value: string) => void;
}

const useShCalcResultStore = create<IUseShCalcResultStore>((set, get) => ({
  calcDownPayment: '',
  calcBalance: '',
  calcDeposit: '',
  calcRent: '',
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

  setCalcDeposit: (value: string) => {
    set(() => ({
      calcDeposit: value,
    }));
  },

  setCalcRent: (value: string) => {
    set(() => ({
      calcRent: value,
    }));
  },

  setCalcFinalRent: (value) => {
    set(() => ({
      calcFinalRent: value,
    }));
  },
}));

export default useShCalcResultStore;
