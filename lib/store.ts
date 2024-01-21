import { create } from 'zustand';

interface MenuState {
  isOpen: boolean;
  toggle: () => void;
}
interface DepositChange {
  isChange: boolean;
  toggleChange: () => void;
}

export const useMenu = create<MenuState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const depositChange = create<DepositChange>((set) => ({
  isChange: false,
  toggleChange: () => set((state) => ({ isChange: !state.isChange })),
}));
