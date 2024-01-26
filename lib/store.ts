import { create } from 'zustand';

interface MenuState {
  isOpen: boolean;
  toggle: () => void;
}
interface DepositChange {
  isDepositChange: boolean;
  toggleDepositChange: () => void;
}

export const useMenu = create<MenuState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const depositChange = create<DepositChange>((set) => ({
  isDepositChange: false,
  toggleDepositChange: () =>
    set((state) => ({ isDepositChange: !state.isDepositChange })),
}));
