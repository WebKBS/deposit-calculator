import { create } from 'zustand';

interface ICalcBalance {
  calcBalance: string;
  setCalcBalance: (calcBalance: string) => void;
}

const useCalcBalanceStore = create<ICalcBalance>((set) => ({
  calcBalance: '',

  setCalcBalance: (value: string) => {
    set(() => ({
      calcBalance: value,
    }));
  },
}));

export default useCalcBalanceStore;
