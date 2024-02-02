import { create } from 'zustand';

interface DepositChangeStore {
  isDepositChange: boolean;
  setToggleDepositChange: () => void;
}

export const useDepositChangeStore = create<DepositChangeStore>((set) => ({
  isDepositChange: false,
  setToggleDepositChange: () =>
    set((state) => ({ isDepositChange: !state.isDepositChange })),
}));
