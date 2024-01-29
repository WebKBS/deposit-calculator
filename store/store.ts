import { create } from 'zustand';

interface MenuState {
  isOpen: boolean;
  toggle: () => void;
}
interface DepositChange {
  isDepositChange: boolean;
  setToggleDepositChange: () => void;
}

interface PwaModal {
  isPwaOpen: boolean;
  setClosePwaModal: () => void;
}

interface IosPwaModal {
  isIosPwaOpen: boolean;
  setIosClosePwaModal: () => void;
}

export const useMenu = create<MenuState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useDepositChange = create<DepositChange>((set) => ({
  isDepositChange: false,
  setToggleDepositChange: () =>
    set((state) => ({ isDepositChange: !state.isDepositChange })),
}));
