import { create } from 'zustand';

interface IBalanceStore {
  balance: string;
  setBalance: (by: number) => void;
}

const useBalanceStore = create<IBalanceStore>((set) => ({
  balance: '',

  setBalance: (by) => {
    set({ balance: by.toString() });
  },
}));

export default useBalanceStore;
