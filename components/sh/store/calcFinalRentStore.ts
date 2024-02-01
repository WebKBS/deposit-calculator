import { create } from 'zustand';

interface ICalcFinalRentStore {
  calcFinalRent: string;
  setCalcFinalRent: (value: string) => void;
}

const useCalcFinalRentStore = create<ICalcFinalRentStore>((set) => ({
  calcFinalRent: '',

  setCalcFinalRent: (value) => {
    set(() => ({
      calcFinalRent: value,
    }));
  },
}));

export default useCalcFinalRentStore;
