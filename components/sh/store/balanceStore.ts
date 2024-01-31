import { create } from 'zustand';

interface IBalanceStore {
  balance: string;
  setBalance: (by: number) => void;
}

const useBalanceStore = create<IBalanceStore>((set) => ({
  balance: '',

  setBalance: (value) => {
    set({ balance: value.toString() });
  },
}));

export default useBalanceStore;
