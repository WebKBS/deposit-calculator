import { create } from 'zustand';

interface ICalcDownPayment {
  calcDownPayment: string;
  setCalcDownPayment: (calcDownPayment: string) => void;
}

const useCalcDownPayment = create<ICalcDownPayment>((set) => ({
  calcDownPayment: '',

  setCalcDownPayment: (value: string) => {
    set(() => ({
      calcDownPayment: value,
    }));
  },
}));

export default useCalcDownPayment;
